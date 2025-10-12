import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { sendMessageAsync } from "../../../redux/messagesSlice";

import formatTime from "../../../utils/formatTime";


export default function ChatWindow({ chat }) {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const chatEndRef = useRef();

  const handleSend = () => {
    if (!message.trim()) return;
    dispatch(sendMessageAsync({ chatId: chat.id, sender: "seeker_john", text: message }));
    setMessage("");
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat.messages]);

  return (
    <div className="flex flex-col h-full bg-purple-50">
      {/* Header */}
      <div className="p-4 border-b border-purple-300 bg-purple-100 font-semibold text-purple-700 flex items-center justify-between shadow-sm">
        <span>Chat with {chat.participants[1]}</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {chat.messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.senderId === "seeker_john" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-3 rounded-2xl max-w-xs shadow ${
                msg.senderId === "seeker_john"
                  ? "bg-purple-600 text-white"
                  : "bg-white text-gray-800 border border-purple-200"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <span className="block text-xs text-purple-200 mt-1 text-right">
                {formatTime(msg.time)}
              </span>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-purple-300 bg-purple-100 flex items-center gap-2">
        <input
          className="flex-1 border border-purple-300 rounded-2xl px-4 py-2 outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="bg-purple-600 text-white px-5 py-2 rounded-2xl hover:bg-purple-700 transition"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}
