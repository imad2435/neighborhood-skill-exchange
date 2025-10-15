import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import socket from '../../../socket/socket';
import formatTime from '../../../utils/formatTime';

export default function ChatWindow({ conversation, messages }) {
  const [newMessage, setNewMessage] = useState('');
  const { user } = useAuth();
  const chatEndRef = useRef(null);
  
  const otherParticipant = conversation.participants.find(p => p._id !== user._id);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !user) return;
    
    // Emit a 'sendMessage' event to the server.
    socket.emit('sendMessage', {
      conversationId: conversation._id,
      senderId: user._id,
      content: newMessage,
    });
    
    setNewMessage('');
  };

  // Auto-scroll to the latest message.
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50 font-semibold text-gray-700">
        Chat with {otherParticipant?.name || 'User'}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg._id || Date.now()} // Use a temporary key for newly sent messages
            className={`flex ${msg.sender._id === user._id ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`p-3 rounded-lg max-w-lg shadow-sm ${
                msg.sender._id === user._id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              <p className="text-sm">{msg.content}</p>
              <span className={`block text-xs mt-1 text-right ${
                msg.sender._id === user._id ? 'text-purple-200' : 'text-gray-500'
              }`}>
                {formatTime(msg.createdAt)}
              </span>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-gray-200 bg-gray-50 flex items-center gap-2">
        <input
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button
          className="bg-purple-600 text-white px-5 py-2 rounded-full hover:bg-purple-700 transition"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}