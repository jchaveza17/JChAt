import Avatar from '../images/blank-profile-picture-png.webp';
import { useUserStore } from '../library/userStore';

function ChatInfo({ chat, isJoined, onJoin, onLeave }) {
  const { currentUser } = useUserStore();

  const handleJoin = async () => {
    if (currentUser) {
      await onJoin();
    } else {
      alert("You must be logged in to join a chat.");
    }
  };

  const handleLeave = async () => {
    if (currentUser) {
      await onLeave();
    } else {
      alert("You must be logged in to leave a chat.");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="text-center mb-4">
        <img
          className="w-50 h-30 rounded-full"
          src={chat.imageUrl || Avatar}
          alt={chat.name || 'Chat Avatar'}
        />
        <h2 className="text-xl font-semibold">{chat.name}</h2>
      </div>

      <div className="flex-grow overflow-y-auto mb-4 text-center text-xl">
        <ul>
          {chat.members && chat.members.map((user, index) => (
            <li key={index} className="mb-1 text-pink-700">
              {user.username}
            </li>
          ))}
        </ul>
      </div>

      {!isJoined && (
        <button
          onClick={handleJoin}
          className="bg-main-color hover:bg-black text-white font-bold px-4 py-2 rounded-lg"
        >
          Join Chat
        </button>
      )}

      {isJoined && (
        <button
          onClick={handleLeave}
          className="mt-auto px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          Leave Chat
        </button>
      )}
    </div>
  );
}

export default ChatInfo;











