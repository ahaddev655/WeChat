import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

function CommunityComp() {
  // --- States ---
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("Muhammad");

  // --- Use Refs ---
  const chatParentDivRef = useRef();

  // --- Variables ---
  const route = useLocation();
  const location = route.pathname.split("/");

  // --- ID & UID from routing ---
  const id = location[2];
  const uid = location[3];

  // --- Messages Stored Data ---
  const [messageData, setMessageData] = useState([
    { sender: "Ayesha", messageText: "Hey", time: "12:45 PM" },
    {
      sender: "Ayesha",
      messageText: "How are you?",
      time: "12:45 PM",
    },
    { sender: "Muhammad", messageText: "I am fine", time: "12:45 PM" },
  ]);

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

    setMessageData((prev) => [...prev, payload]);
    setMessage("");

    setTimeout(() => {
      if (chatParentDivRef.current) {
        chatParentDivRef.current.scrollTop =
          chatParentDivRef.current.scrollHeight;
      }
    }, 50);
  };

  return (
    <div className="px-4 py-3 relative flex flex-col h-full pb-20">
      <div
        className="flex-1 overflow-auto scrollbar-none flex flex-col gap-3"
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
              {message.messageText}
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

export default CommunityComp;
