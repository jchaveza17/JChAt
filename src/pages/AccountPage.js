import Avatar from '../images/blank-profile-picture-png.webp';
import { useUserStore } from '../library/userStore';
import { auth } from '../library/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function AccountPage() {
  const { currentUser, setCurrentUser } = useUserStore();

  const Navigate = useNavigate();

  const handleSignout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      console.log('User signed out');
      Navigate('/login'); 
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <img src={currentUser.avatar || Avatar} alt="Profile" className="rounded-full h-30"/>
        <h2 className="text-3xl font-semibold text-center mb-6">{currentUser.username}</h2>
        <p className="text-center">Welcome to your account page.</p>
        <button
          onClick={handleSignout}
          className="w-full bg-main-color text-white font-bold py-2 px-4 rounded hover:bg-black focus:outline-none focus:bg-main-color"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default AccountPage;
