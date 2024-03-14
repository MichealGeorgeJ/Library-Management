import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Contetnt from './components/Content';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import Magazines from './components/Magazines';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserDashboard from './components/UserDashboard';

export const API_URL = 'https://library-backend-c4vc.onrender.com';

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

const AppContent = () => {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(false);
  const [allBooks, setAllBooks] = useState(10);
  const [allUsers, setAllUsers] = useState(10);
  const [fines, setFines] = useState(500);
  const [allMagazines, setAllMagazines] = useState(4);
  const [bendingBooks, setBendingBooks] = useState(15);
  const [issuedbooks, setIssuedBooks] = useState(15);
  const [renewedBooks, setRenewedBooks] = useState(10);
  const [user, setUser] = useState(null);
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    // Function to update user state from localStorage
    const updateUserFromLocalStorage = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser!==undefined) {
        setUser(JSON.parse(storedUser))
      }
    };

    // Call the function to update user state from localStorage
    updateUserFromLocalStorage();

    // Add event listener to listen for changes in localStorage
    window.addEventListener('storage', updateUserFromLocalStorage);

    // Clean up the event listener
    return () => {
      window.removeEventListener('storage', updateUserFromLocalStorage);
    };
  }, []);

  useEffect(() => {
    const pathsToShowNavbar = ['/', '/login', '/register'];
    setShowNavbar(pathsToShowNavbar.includes(location.pathname));
  }, [location]);

  return (
    <div className={showNavbar ? 'homePage' : ''}>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Contetnt />} />
        <Route path="/login" element={<Login setUser={setUser} user={user} setAuthorized={setAuthorized} />} />
        <Route path="/register" element={<Register setAuthorized={setAuthorized} setUser={setUser} user={user} />} />
        <Route
          path="/admin/*"
          element={<AdminDashboard
            setAllBooks={setAllBooks}
            setAllUsers={setAllUsers}
            setFines={setFines}
            allBooks={allBooks}
            allUsers={allUsers}
            fines={fines}
            allMagazines={allMagazines}
            setAllMagazines={setAllMagazines}
            bendingBooks={bendingBooks}
            setBendingBooks={setBendingBooks}
            setIssuedBooks={setIssuedBooks}
            issuedbooks={issuedbooks}
            setRenewedBooks={setRenewedBooks}
            renewedBooks={renewedBooks} 
            user={user} authorized={authorized} setAuthorized={setAuthorized} 
          />}
        />
        <Route path="/user/*" element={<UserDashboard setUser={setUser} authorized={authorized} user={user} setAuthorized={setAuthorized}  />} />
      </Routes>
      {showNavbar && <Magazines/>}
      {showNavbar && <Footer/>}
      
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default App;