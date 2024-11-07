
import './App.css';
import SignupCard from './components/Singup';  
import LoginCard from './components/Login';
import Dashboard from './components/Dashboard'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import { useEffect } from 'react';
// import { useEffect } from 'react';
// import * as jwt_decode from 'jwt-decode';

function App() {
 // const navigate = useNavigate();
  // const location = useLocation(); // Get the current route

  // useEffect(() => {
  //   // Check if the token exists in cookies
  //   const token = Cookies.get('token');
  //   console.log("token",token);
    

  //   if (!token) {
  //     // Token is missing, handle redirects based on the current route
  //     if (location.pathname !== '/signup') {
  //       navigate('/login'); // Redirect to login if not on signup page
  //     }
  //   } else {
  //     // Decode the token
  //     try {
  //       const decodedToken = jwt_decode(token);
  //       const currentTime = Math.floor(Date.now() / 1000);

  //       if (decodedToken.exp < currentTime) {
  //         // Token has expired, redirect to login if not on signup page
  //         console.log('Token has expired');
  //         if (location.pathname !== '/signup') {
  //           navigate('/login');
  //         }
  //       } else {
  //         // Token is valid, navigate to the dashboard
  //         if (location.pathname === '/login' || location.pathname === '/signup') {
  //           navigate('/');
  //         }
  //       }
  //     } catch (error) {
  //       // If token decoding fails (invalid token), redirect to login if not on signup page
  //       console.error('Invalid token');
  //       if (location.pathname !== '/signup') {
  //         navigate('/login');
  //       }
  //     }
  //   }
  // }, [navigate, location.pathname]); // Include location as a dependency
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<SignupCard />} />
        <Route path="/login" element={<LoginCard />} />
      </Routes>
    </>
  );
}

export default App;
