import { useState, useEffect } from 'react';
import ChatList from '../components/ChatroomList';
import ChatArea from '../components/ChatArea';
import ChatInfo from '../components/ChatInfo';
import { joinChatroom, leaveChatroom } from '../library/chatroomService';
import { useUserStore } from '../library/userStore';
import { collection, onSnapshot } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { getDoc } from 'firebase/firestore';

const db = getFirestore();

function ChatroomPage() {
  const { currentUser } = useUserStore(); 
  const [joinedChats, setJoinedChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatrooms, setChatrooms] = useState([]);

  useEffect(() => {
    const chatroomsRef = collection(db, 'Chatrooms');
    const unsubscribe = onSnapshot(chatroomsRef, (snapshot) => {
      const loadedChatrooms = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      setChatrooms(loadedChatrooms);
  
      const userJoinedChats = loadedChatrooms.filter(chat => {
      const memberIds = chat.members.map(member =>
          typeof member === 'object' ? member.userId : member);
            return memberIds.includes(currentUser.id);
          }).map(chat => chat.id);
          setJoinedChats(userJoinedChats);
      
      setJoinedChats(userJoinedChats);
    });
  
    return () => unsubscribe(); 
  }, [currentUser.id]);

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  const handleJoinChat = async (chatId) => {
    if (!currentUser.id) {
      alert("You must be logged in to join a chat.");
      return;
    }
  
    if (joinedChats.includes(chatId)) {
      alert("You are already a member of this chat.");
      return;
    }
  
    await joinChatroom(currentUser, chatId);
    setJoinedChats([...joinedChats, chatId]);
    // Re-fetch the updated chatroom data
    const chatroomDocRef = doc(db, 'Chatrooms', chatId);
    const updatedChatroomSnap = await getDoc(chatroomDocRef);
    setSelectedChat({
      id: chatId,
      ...updatedChatroomSnap.data()
    });
  };
  
  const handleLeaveChat = async () => {
    if (!currentUser.id) {
      alert("You must be logged in to leave a chat.");
      return;
    }
    await leaveChatroom(currentUser, selectedChat.id);
    setJoinedChats(joinedChats.filter(id => id !== selectedChat.id));
    const chatroomDocRef = doc(db, 'Chatrooms', selectedChat.id);
    const updatedChatroomSnap = await getDoc(chatroomDocRef);
    setSelectedChat({
      id: selectedChat.id,
      ...updatedChatroomSnap.data()
    });
  };
  

  const isJoined = selectedChat && joinedChats.includes(selectedChat.id);

  return (
    <div className="flex h-screen">
      <div className="w-1/5 bg-custom-bg p-4">
        <ChatList
          chatrooms={chatrooms}
          onJoinChat={handleJoinChat}
          joinedChats={joinedChats}
          onSelectChat={handleSelectChat}
        />
      </div>

      <div className="flex-grow bg-chat-area p-4 border-l border-r border-gray-300">
        {selectedChat ? (
          <ChatArea chat={selectedChat} isJoined={isJoined} />
        ) : (
          <p>Select a chat to start messaging.</p>
        )}
      </div>

      <div className="w-1/5 bg-custom-bg p-4">
        {selectedChat ? (
          <ChatInfo
            chat={selectedChat}
            isJoined={isJoined}
            onJoin={() => handleJoinChat(selectedChat.id)}
            onLeave={handleLeaveChat}
          />
        ) : (
          <p>Select a chat to see details.</p>
        )}
      </div>
    </div>
  );
}

export default ChatroomPage;





