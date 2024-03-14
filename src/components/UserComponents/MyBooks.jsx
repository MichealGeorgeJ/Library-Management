import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { API_URL } from '../../App';

const MyBooks = ({ user }) => {
  const [booksData, setBooksData] = useState([]);

  useEffect(() => {
    const fetchBooksData = async () => {
      try {
        const allBooksData = [];
        for (const bookId of user.myBooks) {
          const response = await axios.get(`${API_URL}/books/${bookId}`);
          if (response.status === 200) {
            allBooksData.push(response.data.book); // Push only the book object
          }
        }
        console.log(allBooksData)
        setBooksData(allBooksData);
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };
    if (user) {
      fetchBooksData();
    }
  }, [user]);

  return (
    <div>
      <h1 className="text-success ml-3">My Books</h1>
      <hr className="ml-3 bg-success" />

      <div className="container-fluid mt-5">
        <div className="row d-flex justify-content-between">
          {booksData.map((book, index) => (
            <div key={index} className="col-sm-6 col-lg-4 mb-4">
              <div className="card p-2 d-flex flex-row h-100">
                <div className="image w-50 d-flex">
                  <img className="w-100" src={book.image} alt="Book Cover" />
                </div>
                <div>
                  <div className="p-2">
                    <h4>{book.title}</h4>
                    <h6>{book.author}</h6>
                    <p>{book.isbn}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBooks;