import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';



function WelcomePage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-custom-bg relative">
      <div className="relative flex flex-col items-center">
        <h1 className="text-6xl font-bold text-main-color mb-6 relative font-playfair italic">
          Start Chatting
        </h1>

        
        <div className="absolute -top-12 right-0 flex space-x-2">
          <FontAwesomeIcon
            icon={faHeart}
            className="text-red-500 text-4xl animate-bounce opacity-80"
          />
          <FontAwesomeIcon
            icon={faHeart}
            className="text-red-400 text-3xl animate-bounce opacity-70 delay-100"
          />
          <FontAwesomeIcon
            icon={faHeart}
            className="text-red-300 text-2xl animate-bounce opacity-60 delay-200"
          />
        </div>
      </div>

      <Link to="/findchats">
        <button className="bg-navbar-bg text-main-color px-8 py-3 text-lg rounded-lg shadow-md hover:bg-main-color hover:text-white transition-colors">
          Find Chatrooms
        </button>
      </Link>
    </div>
  );
}

export default WelcomePage;

