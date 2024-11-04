import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../library/firebase";
import { setDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Avatar from '../images/blank-profile-picture-png.webp';
import uploadImage from "../library/uploadImage";

function SignUpPage() {
  const Navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        Navigate('/findchats');  
      }
    });
  
    return () => unsubscribe();  
  }, [Navigate]);


  const [avatar, setAvatar] = useState({
    file: null,
    url: ''
  });

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      });
      console.log('Avatar set:', e.target.files[0]);
    } else {
      console.error('No file selected');
    }
  };
  

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);
    
    try {
      console.log('Attempting to create user with:', email);
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created:', res.user.uid);
  
      let imgURL = Avatar; 
      if (avatar.file) {
        imgURL = await uploadImage(avatar.file);
        console.log('Image uploaded, URL:', imgURL);
      }
  
      await setDoc(doc(db, "Users", res.user.uid), {
        username,
        email,
        avatar: imgURL,
        id: res.user.uid
      });
      console.log('User document created');
  
      await setDoc(doc(db, "Userchats", res.user.uid), {
        chats: [],
      });
      console.log('Userchats document created');
  
      Navigate('/findchats'); 
    } catch (err) {
      console.error("Error:", err);
    }
  };
  
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h2 className="text-3xl font-semibold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleRegister}>
          <div>
            <img className="rounded-full h-30" src={avatar.url || Avatar} alt=""/>
            <label className="text-main-color font-semibold cursor-pointer hover:underline" htmlFor="file">Upload Image</label>
            <input 
              type="file"
              id="file"
              name="file"
              onChange={handleAvatar}
              className="hidden"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-main-color text-white font-bold py-2 px-4 rounded hover:bg-black focus:outline-none focus:bg-main-color"
          >
            Sign Up
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-main-color hover:underline font-bold">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;


