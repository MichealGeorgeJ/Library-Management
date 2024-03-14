import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from '../../App';

const Notification = ({ user }) => {
  const [dueBooks, setDueBooks] = useState([]);
  const [showAlert, setShowAlert] = useState(true); // Initialize to true

  const getNotifications = async () => {
    try {
      const res = await axios.get(`${API_URL}/issuedbooks/${user.LibraryId}`);
      if (res.status === 200) {
        setDueBooks(res.data.books);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    if (user) {
      getNotifications();
    }
  }, [user]);

  useEffect(() => {
    // Check due dates and show notifications
    dueBooks.forEach(book => {
      const dueDate = new Date(book.dueDate);
      const currentDate = new Date();
      const daysUntilDue = Math.ceil((dueDate - currentDate) / (1000 * 60 * 60 * 24));

      if (daysUntilDue === 1) {
        toast.info(`Tomorrow is the last date to renew or return the book "${book.title}"`, {
          autoClose: false, 
        });
      } else if (daysUntilDue < 0 && daysUntilDue >= -3) {
        const daysOverdue = Math.abs(daysUntilDue);
        const fineAmount = 10 * daysOverdue; 
        toast.warning(`$${fineAmount} fine added for late return of the book "${book.title}"`, {
          autoClose: false, 
        });
      }
    });

    // Check if there are any toast notifications shown
    const toastNotifications = document.getElementsByClassName('Toastify__toast');
    setShowAlert(toastNotifications.length === 0);
  }, [dueBooks]);

  return (
    <div>
      <div>
        <h1 className="text-success ml-3 mt-3">Notifications</h1>
        <h1 ><hr className=' ml-3 bg-success' /></h1>
      </div>
      <div className="container-fluid">
        <div className="row d-flex justify-content-center align-items-center mt-5 ">
          <div className=""><div className='d-flex justify-content-center align-items-center '>
            
          {showAlert && (
              <div style={{ boxShadow: " rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset " }} className="card text-center center-notification">
                <div className="card-body">
                  <h5 className="card-title">Notifications will alert you before the due date</h5>
                </div>
              </div>
            )}
          </div>
          </div>
        </div>
      </div>

      <div className="d-flex align-items-baseline mt-1 book-search"></div>
    </div>
  );
};

export default Notification;