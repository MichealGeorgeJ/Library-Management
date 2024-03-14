import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../App';
import { toast } from 'react-toastify';

const ReturnBook = ({setBendingBooks}) => {
  const [books, setBooks] = useState([]);
  const [booksToRender, setBooksToRender] = useState([]);
  
  const handleDelete=async(id)=>{
    try{
     
      const res=await axios.delete(`${API_URL}/issuedbooks/${id}`)
      if(res.status===200){
        {
          getBooks()
          toast.success("deleted")
        }
      }
    }
    catch(error){
      toast.error("error")
    }
  }

  const handleReturn = async(id) => {
    // Handle return action
    try{
      const res=await axios.patch(`${API_URL}/issuedbooks/${id}`,{
        returnStatus:true
      })
      if(res.status===200){
        handleDelete(id)
        toast.success('book Returned')
        console.log(res)
        setBooksToRender(prevBooks => prevBooks.filter(book => book._id !== id))

        console.log(res)
        getBooks();
      }

const res2 = await axios.get(`${API_URL}/issuedbooks/${id}`);
console.log(res2)
      if (res2.status === 200) {
       
        const book = await axios.get(`${API_URL}/books/${res2.data.book.isbn}`);
       
        if(book.status===200){
          console.log('book',book)
          
          const user = await axios.get(`${API_URL}/users/${res2.data.book.libraryId}`);
          console.log('user',user)
          if(user.status===200){
            const removeBooks= await axios.patch(`${API_URL}/users/${user.data.user._id}/myBooks/${book.data.book._id}`);
            console.log('remove',removeBooks)
            if(removeBooks.status===200){
             
            }else
            {
              toast.error('myBooks not updated')
            }
          }else{
            toast.error('user not got')
          }
        }else{
          toast.error('book not got')
        }
        
      }else{
        toast.error('issuedbooks not got')
      }
      
      
    }
    catch(error){
      console.error(error);
      toast.error(error.message);
    }
    
  };

  const handleRenewal =async (id) => {
    const dueDate=new Date() 
    dueDate.setDate(dueDate.getDate()+15)
    const day = String(dueDate.getDate()).padStart(2, '0')
    const month = String(dueDate.getMonth() + 1).padStart(2, '0')
    const year = dueDate.getFullYear()
    const newDueDate = `${day}-${month}-${year}`
    console.log(newDueDate)


    try{
      const res=await axios.patch(`${API_URL}/issuedbooks/${id}`,{
        dueDate:dueDate,
        renewalStatus:true
      })
      if(res.status===200){
        console.log(res)
        toast.success('book Renewal successfuly')
        getBooks();
      }
    }
    catch(error){
      console.error(error);
      toast.error(error.message);
    }

  };

  const getBooks = async () => {
    try {
      const res = await axios.get(`${API_URL}/issuedbooks`);
      if (res.status === 200) {
       
        setBooks(res.data.books);
        
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBooks();
    const currentDate = new Date();
    const oneDayInMillis = 24 * 60 * 60 * 1000; // One day in milliseconds

    // Check if the due date is one day ahead of the current date
    const updateRenewalStatus = () => {
      setBooks((prevBooks) =>
        prevBooks.map((book) => {
          const dueDate = new Date(book.dueDate);
          if (Math.abs(dueDate - currentDate) <= oneDayInMillis) {
            return { ...book, renewalStatus: false };
          }
          return book;
        })
      );
    };

    // Call the function to update renewalStatus
    updateRenewalStatus();
  }, []);

  useEffect(() => {
    // Filter books and setBooksToRender after books state changes
    const filteredBooks = books.filter(book => book.returnStatus===false)
    setBooksToRender(filteredBooks);
    setBendingBooks(filteredBooks.length)
  }, [books]);

  return (
    <div>
      <h1 className="text-success ml-3 mt-2">Return & Renewal</h1>
      <h1 ><hr className=' ml-3 bg-success' /></h1>
      <div className="container-fluid mt-4">
        <div className="row ">
          <div className='col-sm-12 col-lg-12  d-flex flex-column align-items center justify-content-center '>
            <div  style={{ borderRadius: "10px", overflow: "hidden" }} ><table className='table table-bordered'  style={{ borderRadius: "10px", overflow: "hidden" }}>
              <thead>
                <tr className='bg-success text-white'>
                <th scope="col">Id</th>
                  <th scope="col">UserId</th>
                  <th scope="col">Due date</th>
                  <th scope="col">ISBN</th>
                  <th scope="col">Return</th>
                  <th scope="col">Renewal</th>
                </tr>
              </thead>
              <tbody>
                {booksToRender.map((book, id) => (
                  <tr className='text-dark' key={id}>
                     <td className='bg-success text-white' scope="row">{id+1}</td>
                    <td scope="row">{book.libraryId}</td>
                    <td>{book.isbn}</td>
                    <td> {book.dueDate} </td>
                    
                    <td>
                      <button onClick={() => handleReturn(book._id)} className='btn btn-primary'> Return</button>
                    </td>
                    <td>
                    <button onClick={() => handleRenewal(book._id)} className='btn btn-danger'>
  {book.renewalStatus ? 'Renewed' : 'Renewal'}
</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReturnBook;