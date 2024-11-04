import { Link } from "react-router-dom";
import Logo from '../images/IMG_0934.png'

function Footer() {
    return (
      <footer className="bg-navbar-bg text-main-color py-4 text-center">
        <div className="flex items-center justify-center mb-4">
          <Link to="/" className="flex items-center">
            <img src={Logo} alt="JChAt Logo" className="h-5 w-auto mr-2" />
          </Link>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} JChAt. All rights reserved.
          </p>
        </div>
  
        <div className="flex justify-center space-x-4">
          <a href="#about" className="hover:text-black">About</a>
          <a href="#contact" className="hover:text-black">Contact</a>
          <a href="#privacy" className="hover:text-black">Privacy Policy</a>
        </div>
      </footer>
    );
  }
  
  export default Footer;