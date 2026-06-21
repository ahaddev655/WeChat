import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Pusher from "pusher-js";

const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
  cluster: "ap2",
});

function ChatComp() {
  // --- States ---

  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState();

  // --- Use Refs ---

  const chatParentDivRef = useRef();

  // --- Variables ---

  const route = useLocation();
  const location = route.pathname.split("/");
  const id = localStorage.getItem("wechat_id") || null;
  const uid = localStorage.getItem("wechat_uid") || null;
  const base_url = import.meta.env.VITE_API_PRODUCTION_BASE_URL;

  // --- ID & UID from routing ---

  const chat_user_id = location[3];
  const chat_user_uid = location[2];

  // --- Messages Stored Data ---

  const [messageData, setMessageData] = useState([]);

  // --- Add Message ---

  const handleMessageSend = () => {
    if (!message || !message.trim()) {
      alert("Message is required...");
      return;
    }

    const now = new Date();
    const currentFormattedTime = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(now);

    const payload = {
      messageText: message,
      sender: userName,
      time: currentFormattedTime,
    };

    axios
      .post(`${base_url}/messages/add/${id}/${chat_user_id}`, payload)
      .then((response) => {
        console.log(response.data);
        // setMessageData((prev) => [...prev, payload]);
        setMessage("");
        setTimeout(() => {
          if (chatParentDivRef.current) {
            chatParentDivRef.current.scrollTop =
              chatParentDivRef.current.scrollHeight;
          }
        }, 50);
        fetchMessages();
      })
      .catch((err) => {});
  };

  const fetchMessages = () => {
    axios
      .get(`${base_url}/messages/${id}/${chat_user_id}`)
      .then((response) => {
        const raw_messages = response?.data.data[0]?.messages || [];
        const messages = JSON.parse(raw_messages);
        setMessageData(messages);

        setTimeout(() => {
          if (chatParentDivRef.current) {
            chatParentDivRef.current.scrollTop =
              chatParentDivRef.current.scrollHeight;
          }
        }, 100);
      })
      .catch((err) => {});
  };

  // --- Fetch Messages ---

  useEffect(() => {
    fetchMessages();

    if (!id || !chat_user_id) return;
    const sortedIds = [id, chat_user_id].sort().join("-");
    const channel = pusher.subscribe(`chat-${sortedIds}`);

    channel.bind("new-message", (newMessage) => {
      setMessageData((prev) => [...prev, newMessage]);
      setTimeout(() => {
        if (chatParentDivRef.current) {
          chatParentDivRef.current.scrollTop =
            chatParentDivRef.current.scrollHeight;
        }
      }, 50);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [id, chat_user_id]);

  // --- Fetch Name ---
  useEffect(() => {
    axios
      .get(`${base_url}/user/user/${uid}/${id}`)
      .then((response) => {
        setUserName(
          response?.data.user_details.firstName +
            " " +
            response?.data.user_details.lastName || "Unknown User",
        );
      })
      .catch((err) => {});
  }, [id]);

  return (
    <div className="px-4 py-3 relative flex flex-col h-full pb-20">
      <div
        className="h-full overflow-auto scrollbar-none flex flex-col gap-3"
        ref={chatParentDivRef}
      >
        {messageData.map((message, i) => (
          <div
            key={i}
            className={`flex w-full items-end gap-2 ${
              message.sender === userName ? "justify-end" : "justify-start"
            }`}
          >
            {/* Message Bubble */}
            <div
              className={`max-w-md rounded-2xl px-4 py-2 text-sm wrap-break-word shadow-sm
      ${
        message.sender === userName
          ? "bg-blue-600 text-white rounded-br-none order-2"
          : "bg-white text-neutral-800 rounded-bl-none border border-gray-100 order-1"
      }`}
            >
              {message.message}
            </div>

            {/* Timestamp */}
            <div
              className={`text-[11px] text-gray-400 select-none pb-1
      ${message.sender === userName ? "order-1" : "order-2"}`}
            >
              {message.time}
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleMessageSend();
        }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full p-3.5 flex items-center gap-3 bg-white shadow-[0px_-10px_10px_rgb(0_0_0/0.1)]"
      >
        <div className="relative flex-1">
          <input
            type="text"
            name="message"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm font-medium text-neutral-800 placeholder-gray-400 outline-none transition-all duration-200 ease-in-out focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100"
            placeholder="Write your message..."
          />
        </div>

        <button
          type="submit"
          disabled={!message?.trim()}
          className="h-11 w-11 shrink-0 rounded-xl bg-blue-600 font-medium text-white shadow-sm transition-all duration-200 ease-in-out hover:bg-blue-700 active:scale-95 disabled:pointer-events-none disabled:opacity-40 grid place-items-center"
        >
          <Send size={18} color="#ffffff" />
        </button>
      </form>
    </div>
  );
}

export default ChatComp;
