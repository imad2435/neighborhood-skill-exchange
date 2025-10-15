import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchConversations,
  setActiveChat,
  fetchMessagesForConversation,
  addMessage,
} from '../redux/messagesSlice';
import socket from '../socket/socket';
import ChatWindow from '../features/chatSystem/components/ChatWindow';

export default function Messages() {
  const dispatch = useDispatch();
  const {
    conversations,
    messagesByConversationId,
    activeChatId,
    status,
    error,
  } = useSelector((state) => state.messages);
  
  // Get the messages for the currently selected chat.
  const activeChatMessages = messagesByConversationId[activeChatId] || [];
  const activeConversation = conversations.find((c) => c._id === activeChatId);

  // Fetch conversations on initial load and set up socket listener.
  useEffect(() => {
    dispatch(fetchConversations());

    // Listen for 'receiveMessage' events from the server.
    const handleReceiveMessage = (newMessage) => {
      dispatch(addMessage(newMessage));
    };
    socket.on('receiveMessage', handleReceiveMessage);

    // Clean up the listener when the component unmounts.
    return () => {
      socket.off('receiveMessage', handleReceiveMessage);
    };
  }, [dispatch]);

  // Handler for when a user clicks on a conversation in the sidebar.
  const handleSelectChat = (chatId) => {
    dispatch(setActiveChat(chatId));
    // Tell the server we want to join this conversation's "room".
    socket.emit('joinRoom', chatId);
    // Fetch the message history for this conversation.
    dispatch(fetchMessagesForConversation(chatId));
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-gray-50"> {/* Adjust height for navbar */}
      {/* Sidebar with conversation list */}
      <aside className="w-1/3 min-w-[280px] border-r border-gray-200 bg-white flex flex-col">
        <h2 className="text-xl font-bold p-4 border-b border-gray-200 text-gray-800">
          Messages
        </h2>
        <div className="overflow-y-auto">
          {status === 'loading' && <p className="p-4 text-gray-500">Loading conversations...</p>}
          {error && <p className="p-4 text-red-500">{error}</p>}
          {conversations.map((convo) => {
            // Find the other participant's name to display
            const otherParticipant = convo.participants.find(p => p._id !== socket.userId); // This assumes you store userId on socket
            return (
              <div
                key={convo._id}
                onClick={() => handleSelectChat(convo._id)}
                className={`p-4 cursor-pointer hover:bg-gray-100 transition ${
                  convo._id === activeChatId ? 'bg-purple-100 font-semibold' : ''
                }`}
              >
                <p className="text-gray-900">{otherParticipant?.name || 'Unknown User'}</p>
                <p className="text-sm text-gray-500 truncate">
                  {convo.lastMessage?.content || 'No messages yet'}
                </p>
              </div>
            );
          })}
        </div>
      </aside>

      {/* Main Chat Window Area */}
      <main className="flex-1">
        {activeConversation ? (
          <ChatWindow
            conversation={activeConversation}
            messages={activeChatMessages}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 font-medium">
            Select a conversation to start chatting
          </div>
        )}
      </main>
    </div>
  );
}