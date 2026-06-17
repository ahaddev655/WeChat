import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";

function CommunityComp() {
  // --- States ---
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("Muhammad Ahad");

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
    { sender: "Ayesha Siraj", messageText: "Hey", time: "12:45 PM" },
    {
      sender: "John Doe",
      messageText: "How are you?",
      time: "12:45 PM",
    },
    { sender: "Muhammad Ahad", messageText: "I am fine", time: "12:45 PM" },
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
    <>
      <Header />
      <div className="px-4 py-3 relative flex flex-col h-full pb-20">
        <div
          className="flex-1 overflow-auto scrollbar-none flex flex-col gap-4"
          ref={chatParentDivRef}
        >
          {messageData.map((message, i) => (
            <div
              key={i}
              className={`flex w-full items-end gap-3 ${
                message.sender === userName ? "justify-end" : "justify-start"
              }`}
            >
              {/* Avatar Name */}
              {message.sender === userName ? (
                ""
              ) : (
                <div className="w-9 h-9 bg-linear-to-tr from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm tracking-wider shadow-sm border border-blue-100/20 shrink-0">
                  <span>{message.sender?.charAt(0).toUpperCase()}</span>
                </div>
              )}

              {/* Message Bubble */}
              <div
                className={`flex flex-col gap-1 max-w-md ${message.sender === userName ? "items-end order-2" : "items-start order-1"}`}
              >
                {message.sender !== userName && (
                  <span className="text-[11px] font-semibold text-blue-600 px-1 select-none">
                    {message.sender}
                  </span>
                )}
                <div
                  className={`rounded-2xl px-4 py-2.5 text-sm wrap-break-word shadow-sm
        ${
          message.sender === userName
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-white text-neutral-800 rounded-bl-none border border-neutral-100"
        }`}
                >
                  {message.messageText}
                </div>
              </div>

              {/* Timestamp */}
              <div
                className={`text-[10px] text-gray-400 select-none pb-1 font-medium
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
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full p-3.5 flex items-center gap-3 bg-white shadow-[0px_-10px_10px_rgb(0_0_0/0.05)] border-t border-gray-50"
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
    </>
  );
}

export default CommunityComp;
