import { useState } from 'react';
import Modal from './Modal';
import { createChatroom } from '../library/chatroomService';

function CreateChatroom({ onChatroomCreated, buttonClass }) {
  const [chatroomName, setChatroomName] = useState('');
  const [chatroomImage, setChatroomImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (chatroomName.trim() === '') {
      alert('Chatroom name is required!');
      return;
    }
    try {
      const chatroomId = await createChatroom(chatroomName, chatroomImage);
      onChatroomCreated(chatroomId); 
      setChatroomName('');
      setChatroomImage(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating chatroom: ", error);
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className={`bg-blue-500 text-white p-2 rounded ${buttonClass}`}
      >
        Create Chatroom
      </button>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <form onSubmit={handleSubmit} className="mb-4">
            <input
              type="text"
              value={chatroomName}
              onChange={(e) => setChatroomName(e.target.value)}
              placeholder="Enter chatroom name"
              className="border border-gray-300 p-2 rounded w-full mb-4"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setChatroomImage(e.target.files[0])}
              className="border border-gray-300 p-2 rounded w-full mb-4"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
              Create Chatroom
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default CreateChatroom;

