import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../App';

const ReturnBook = ({setIssuedBooks,setRenewedBooks,renewedBooks}) => {

const [books,setBooks]=useState()


const getBooks = async () => {
  try {
    const res = await axios.get(`${API_URL}/issuedbooks`);
    if (res.status === 200) {
     
      setBooks(res.data.books);
      setIssuedBooks(res.data.books.length)
      if (!books) return []; 
  const renewedBooks = books.filter(book => book.renewalStatus === true);
  setRenewedBooks(renewedBooks.length)
  
      
      
    }
  } catch (error) {
    console.error(error);
  }
};



useEffect(()=>{
  getBooks()
  
},[renewedBooks])

  return (
    <div>
      <h1 className="text-success ml-3 mt-2 ">Bending Books</h1>
      <h1 ><hr className=' ml-3 text-success bg-success' /></h1>
      <div className="container-fluid mt-4">
        <div className="row d-flex">
          <div className='col-sm-12 col-lg-12 ' >
         <div >
         <table style={{ borderRadius: "10px", overflow: "hidden" }}  className=' bending-book-table table table-bordered    '>
  <thead>
    <tr className='bg-success text-white'>
      <th scope="col">UserId</th>
      <th scope="col">BookName</th>
      <th scope="col">ISBN</th>
      <th scope="col">Issued Date</th>
      <th scope="col">Due Date</th>
     
    </tr>
  </thead>
  <tbody>
    {
      books && books.map((book,id)=>(
        <tr key={id}>
      <th scope="row">{id+1}</th>
    
      <td>{book.libraryId}</td>
      <td>{book.isbn}</td>
      <td>
        {book.issueDate}
      </td>
      <td>
      {book.dueDate}
      </td>
    </tr>
      ))
    }
  </tbody>
</table>
         </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReturnBook