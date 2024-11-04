const ChatroomCard = ({ chatroom, isJoined, onJoin, onSelect }) => (
  <li
    className="flex flex-row items-center p-4 border-b border-gray-300 hover:text-main-color cursor-pointer"
    onClick={onSelect}
  >
    <img className="w-10 h-10 rounded-full mr-4" src={chatroom.imageUrl} alt={chatroom.name} /> {/* Make sure it's chatroom.imageUrl */}
    <div className="text-lg font-medium text-text-color">{chatroom.name}</div>
    {!isJoined && (
      <button
        onClick={(e) => { e.stopPropagation(); onJoin(); }}
        className="bg-main-color hover:bg-black text-white font-bold m-3 py-2 px-4 rounded mt-2"
      >
        Join Chat
      </button>
    )}
  </li>
);

export default ChatroomCard;





