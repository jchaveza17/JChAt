import { Link } from 'react-router-dom';
import Logo from '../images/IMG_0934.png';

function Navbar({ currentUser }) {
  return (
    <nav className='flex justify-between items-center p-5 bg-navbar-bg'>
      <Link to='/' className='flex items-center ml-5'>
        <img src={Logo} alt='JChAt Logo' className='h-20 w-auto' />
      </Link>
      <div className='flex space-x-10 text-3xl mr-5 font-playfair italic'>
        <Link to='/' className='text-main-color hover:text-black'>
          Home
        </Link>
        <Link to='/findchats' className='text-main-color hover:text-black'>
          Chatrooms
        </Link>
        <Link to='/account' className='text-main-color hover:text-black'>
          Account
        </Link>
        {!currentUser && (
          <>
            <Link to='/login' className='text-main-color hover:text-black'>
              Login
            </Link>
            <Link to='/signup' className='text-main-color hover:text-black'>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

