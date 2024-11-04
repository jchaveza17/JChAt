import { useEffect, useState, useRef } from 'react';
import { addMessageToChatroom, listenToMessages } from '../library/chatroomService';
import { useUserStore } from '../library/userStore';

function ChatArea({ chat, isJoined }) {
  const { currentUser } = useUserStore();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chat && isJoined) {
      const unsubscribe = listenToMessages(chat.id, (newMessages) => {
        setMessages(newMessages);
        scrollToBottom(); 
      });

      return () => unsubscribe();
    }
  }, [chat, isJoined]);

  useEffect(() => {
    scrollToBottom(); 
  }, [messages]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (message.trim() && currentUser && currentUser.id) {
      try {
        await addMessageToChatroom(chat.id, currentUser.id, message.trim(), currentUser.avatar, currentUser.username);
        setMessage('');
      } catch (error) {
        console.error("Error sending message:", error);
      }
    } else {
      console.warn("Cannot send message. Ensure message and userId are defined.");
    }
  };

  return (
    <div className="flex flex-col h-full p-5">
      <div className="flex-grow overflow-y-auto chat-container">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col mb-5 ${msg.userId === currentUser.id ? 'items-end' : 'items-start'}`}
          >
            {msg.userId !== currentUser.id && (
              <div className="text-sm text-black mb-1 ml-10">
                <span>{msg.username}</span> • <span>{msg.timestamp ? new Date(msg.timestamp.seconds * 1000).toLocaleString() : 'Sending...'}</span>
              </div>
            )}

            <div className="flex items-center">
              {msg.userId !== currentUser.id && (
                <img src={msg.avatar} alt="User Avatar" className="w-10 h-10 rounded-full mr-2" />
              )}
              <div
                className={`rounded-lg p-2 ${
                  msg.userId === currentUser.id ? 'bg-blue-400 text-white' : 'bg-white text-gray-800'
                }`}
              >
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} /> 
      </div>

      {isJoined ? (
        <div className="flex items-center p-2 border-t border-gray-300">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type message"
            className="flex-grow p-2 border rounded-lg"
          />
          <button onClick={sendMessage} className="ml-2 px-4 py-2 bg-pink-600 text-white rounded-lg">
            Send
          </button>
        </div>
      ) : (
        <div className="text-center p-4 text-gray-500">
          Join this chat to send messages
        </div>
      )}
    </div>
  );
}

export default ChatArea;







