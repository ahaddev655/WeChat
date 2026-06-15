import { Send } from "lucide-react";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function ChatComp() {
  // --- States ---
  const [message, setMessage] = useState(null);

  // --- Variables ---

  const route = useLocation();
  const location = route.pathname.split("/");

  // --- ID & UID from routing ---

  const id = location[2];
  const uid = location[3];

  const messageData = [
    { sender: "ayesha", text: "Hey" },
    {
      sender: "ayesha",
      text: "How are you?",
    },
    { sender: "you", text: "I am fine" },
  ];

  return (
    <div className="px-4 py-3">
      <div className="max-h-55 overflow-auto scrollbar-none flex flex-col gap-3">
        {messageData.map((message, i) => (
          <div
            className={`flex w-full items-end gap-2 ${
              message.sender === "you" ? "justify-end" : "justify-start"
            }`}
          >
            {/* Message Bubble */}
            <div
              className={`max-w-md rounded-2xl px-4 py-2 text-sm wrap-break-word shadow-sm
      ${
        message.sender === "you"
          ? "bg-blue-600 text-white rounded-br-none order-2"
          : "bg-white text-neutral-800 rounded-bl-none border border-gray-100 order-1"
      }`}
            >
              {message.text}
            </div>

            {/* Timestamp */}
            <div
              className={`text-[11px] text-gray-400 select-none pb-1
      ${message.sender === "you" ? "order-1" : "order-2"}`}
            >
              12:45 PM
            </div>
          </div>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full p-3.5 flex items-center gap-3 bg-white"
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
