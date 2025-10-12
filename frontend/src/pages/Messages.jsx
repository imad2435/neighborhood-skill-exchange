import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchConversations, setActiveChat } from "../redux/messagesSlice";
import ChatWindow from "../features/chatSystem/components/ChatWindow";

export default function Messages() {
  const dispatch = useDispatch();
  const { conversations, activeChatId, loading, error } = useSelector((s) => s.messages);
  const activeChat = conversations.find((c) => c.id === activeChatId);

  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  return (
    <div className="flex h-screen bg-purple-50">
      {/* Sidebar */}
      <aside className="w-1/3 min-w-[280px] border-r border-purple-300 bg-purple-100 overflow-y-auto">
        <h2 className="text-xl font-bold p-4 border-b border-purple-300 text-purple-700">
          Messages
        </h2>

        {loading && <p className="p-4 text-purple-400">Loading...</p>}
        {error && <p className="p-4 text-red-500">{error}</p>}

        {conversations.map((chat) => (
          <div
            key={chat.id}
            onClick={() => dispatch(setActiveChat(chat.id))}
            className={`p-4 cursor-pointer hover:bg-purple-200 transition rounded-r-lg ${
              chat.id === activeChatId ? "bg-purple-300 font-semibold" : ""
            }`}
          >
            <p className="text-purple-800">{chat.participants[1]}</p>
            <p className="text-sm text-purple-600 truncate">
              {chat.messages.at(-1)?.text || "No messages yet"}
            </p>
          </div>
        ))}
      </aside>

      {/* Chat Window */}
      <main className="flex-1">
        {activeChat ? (
          <ChatWindow chat={activeChat} />
        ) : (
          <div className="flex items-center justify-center h-full text-purple-400 font-medium">
            Select a conversation to start chatting
          </div>
        )}
      </main>
    </div>
  );
}
