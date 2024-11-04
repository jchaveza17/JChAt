import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignupPage';
import AccountPage from './pages/AccountPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './library/firebase';
import { useUserStore } from './library/userStore';
import ChatroomPage from './pages/ChatroomPage';

function App() {
  const { currentUser, setCurrentUser, fetchUserInfo } = useUserStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserInfo(user.uid);
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
        console.log("No user is logged in");
      }
      setLoading(false); 
    }, (error) => {
      console.error('Error in auth state change:', error);
      setLoading(false);
    });
  
    return () => {
      unSub();
    };
  }, [fetchUserInfo, setCurrentUser]);
  
  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <Router>
      <div className=''>
        <Navbar currentUser={currentUser} />
      </div>
      <Routes>
        <Route path='/' element={<WelcomePage />} />
        <Route path='/findchats' element={
          currentUser ? <ChatroomPage/> : <Navigate to="/login" />
        } />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/account' element={
          currentUser ? <AccountPage/> : <Navigate to="/login" />
        } />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;




