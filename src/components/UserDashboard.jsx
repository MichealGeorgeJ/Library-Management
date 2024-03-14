import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import UserNavbar from './UserComponents/UserNavbar';
import Logout from './UserComponents/Logout';
import Books from './UserComponents/Books';
import Magazines from './UserComponents/Magazines';
import MyBooks from './UserComponents/MyBooks';
import Profile from './UserComponents/Profile';
import Notification from './UserComponents/Notification';
import EditUser from './UserComponents/EditUser';
import { toast } from 'react-toastify';

const UserDashboard = ({ setUser, user,authorized }) => {
  const [showNavbar, setShowNavbar] = useState(false);
  
  const location = useLocation();

  useEffect(() => {
    // Check if the user is logged in and has user privileges
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const isUser = storedUser && storedUser.role === 'user';
   
  }, [user]); // Add user to the dependency array

  useEffect(() => {
    // Show toast message for unauthorized access
    if (!authorized && location.pathname.startsWith('/user')) {
      toast.error(`You are not authorized to access this page.
      Please Login`, {
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [authorized, location]);

  if (!authorized) {
    // If the user is not authorized, redirect to login
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    const pathsToShowNavbar = ['/user', ];
    setShowNavbar(pathsToShowNavbar.includes(location.pathname));
  }, [location]);

  return (
    <div className='admin-dashboard row d-flex px-3 flex-row'>
      <div> <UserNavbar /></div>
      <div className='admin-contents'>
        {showNavbar && <Books /> }
        <Routes>
          <Route path="logout" element={<Logout />} />
          <Route path="profile" element={<Profile user={user} setUser={setUser} />} />
          <Route path="mybooks" element={<MyBooks user={user} />} />
          <Route path="magazines" element={<Magazines />} />
          <Route path="books" element={<Books />} />
          <Route path="notification" element={<Notification user={user} />} />
          <Route path="/edit/:id" element={< EditUser user={user} setUser={setUser} />} />
        </Routes>
         {/* This might be unnecessary, depending on your UI structure */}
      </div>
    </div>
  );
}

export default UserDashboard;