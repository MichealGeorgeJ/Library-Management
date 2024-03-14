import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import AdminNavbar from './AdminComponents/AdminNavbar';
import Books from './AdminComponents/Books';
import Logout from './AdminComponents/Logout';
import AddBook from './AdminComponents/AddBook';
import BendingBooks from './AdminComponents/BendingBooks';
import Magazines from './AdminComponents/Magazines';
import ReturnBooks from './AdminComponents/ReturnBook';
import Users from './AdminComponents/Users';
import AdminView from './AdminComponents/AdminView';
import UsersTable from './AdminComponents/UsersTable';
import IssueBooks from './AdminComponents/BookEntry';
import Edit from './AdminComponents/Edit';
import BookEntry from './AdminComponents/BookEntry'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminDashboard = ({ SetFines, setAllBooks, setAllUsers, allBooks, allUsers, fines, allMagazines, setAllMagazines, setBendingBooks, bendingBooks, issuedbooks, setIssuedBooks, renewedBooks, setRenewedBooks, user,authorized,setAuthorized }) => {
  const navigate = useNavigate(); // Change to useNavigate
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
   
    const isAdmin = storedUser && storedUser.role === 'admin';
   
  }, [user]);

  useEffect(() => {
    // Show toast message for unauthorized access
    if (!authorized && location.pathname.startsWith('/admin')) {
      toast.error('You are not authorized to access this page.', {
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Redirect to login
      navigate('/login'); // Use navigate instead of Navigate
    }
  }, [authorized, location]);

  if (!authorized) {
    // If not authorized, redirect to login
    return null;
  }

  useEffect(() => {
    const pathsToShowNavbar = ['/admin', ];
    setShowNavbar(pathsToShowNavbar.includes(location.pathname));
  }, [location]);

  return (
    <div className='admin-dashboard row d-flex px-3 flex-row'>
      <div><AdminNavbar /></div>
      
      
      <div className='admin-contents'>
      {showNavbar && <BookEntry/> }
        <Routes> {/* Wrap all Routes in a Routes component */}
          <Route path="graphs" element={<AdminView allBooks={allBooks} allUsers={allUsers} fines={fines} allMagazines={allMagazines} bendingBooks={bendingBooks} issuedbooks={issuedbooks} renewedBooks={renewedBooks} />} />
          <Route path="books" element={<Books setAllBooks={setAllBooks} />} />
          <Route path='/edit/:id' element={<Edit />} />
          <Route path="logout" element={<Logout setAuthorized={setAuthorized} />} />
          <Route path="users" element={<Users setAllUsers={setAllUsers} />} />
          <Route path="addbook" element={<AddBook />} />
          <Route path="magazines" element={<Magazines setAllMagazines={setAllMagazines} />} />
          <Route path="returnbook" element={<ReturnBooks setBendingBooks={setBendingBooks} />} />
          <Route path="bendingbooks" element={<BendingBooks setIssuedBooks={setIssuedBooks} setRenewedBooks={setRenewedBooks} renewedBooks={renewedBooks} />} />
          <Route path="usertable" element={<UsersTable />} />
          <Route path="/admin" element={<IssueBooks />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;