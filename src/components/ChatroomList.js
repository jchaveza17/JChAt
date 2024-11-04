import UserInfo from "./UserInfo";
import ChatroomCard from './ChatroomCard';
import CreateChatroom from './CreateChatroom'; 

const ChatList = ({ chatrooms, onJoinChat, joinedChats, onSelectChat, onChatroomCreated }) => {
  const renderedChatrooms = chatrooms.map((chatroom) => {
    const isJoined = joinedChats.includes(chatroom.id);

    return (
      <ChatroomCard
        key={chatroom.id}
        chatroom={chatroom}
        isJoined={isJoined}
        onJoin={() => onJoinChat(chatroom.id)}
        onSelect={() => onSelectChat(chatroom)}
      />
    );
  });

  return (
    <div>
      <UserInfo />
      <div className="flex items-center justify-between mb-4 mt-3">
        <h2 className="text-2xl font-semibold">Chats:</h2>
        <CreateChatroom onChatroomCreated={onChatroomCreated} buttonClass="bg-main-color text-white px-2 py-1 rounded" />
      </div>
      <div className="chat-container max-h-96 overflow-y-auto">
        <ul>
          {renderedChatrooms}
        </ul>
      </div>
    </div>
  );
};

export default ChatList;
