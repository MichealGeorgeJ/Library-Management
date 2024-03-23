import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { API_URL } from '../../App';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    try {
      const res = await axios.get(`${API_URL}/books`);
      if (res.status === 200) {
        
        setBooks(res.data.books);
        setFilteredBooks(res.data.books);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching data");
    }
  }

  const formik = useFormik({
    initialValues: {
      isbn: "",
      category: ""
    },
    validationSchema: Yup.object({
      isbn: Yup.string().matches(/^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/, 'Valid ISBN Number required').required("Valid ISBN Number required")
    }),
    onSubmit: async (values) => {
      try {
        if (values.isbn) {
          const res = await axios.get(`${API_URL}/books/${values.isbn}`);
          if (res.status === 200) {
            toast.success("Book found");
            setBooks([res.data.book]);
            setFilteredBooks([res.data.book]);
          }
        }
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 404) {
          toast.error("Book not found");
         
        } else {
          toast.error("Error searching for book");
          setBooks([]);
          setFilteredBooks([]);
        }
      }
    }
  });

  const handleCategoryChange = (event) => {
    formik.handleChange(event);
    const selectedCategory = event.target.value;
    const filteredBooks = selectedCategory ? books.filter(book => book.category === selectedCategory) : books;
    setFilteredBooks(filteredBooks);
  };

  return (
    <div>
      <div className='d-flex align-items-center  book-search  '>
        <div><h1 className="text-success ml-3 ">All Books</h1></div>
        <div className='ml-5 margin'>
          <form onSubmit={formik.handleSubmit} className="form-inline my-2 my-lg-0">
            <div className="d-flex">
              <div><input className="form-control search-nav mr-sm-2" type="search" placeholder="Search Book" aria-label="Search" id='isbn' name='isbn' value={formik.values.isbn} onChange={formik.handleChange} onBlur={formik.handleBlur} /></div>
              <div className=' '><button className="btn btn-outline-success  my-2 my-sm-0" type='submit'>Search</button></div>
            </div>
          </form>
        </div>
        <div className="ml-5 margin mt-3 category ">
          <div>
            <form>
              <div className="form-group">
                <select
                  className="form-control nav-select category"
                  id='category'
                  name='category'
                  onChange={handleCategoryChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.category}
                >
                  <option value="">Select a category</option>
                  <option value="Finance">Finance</option>
                  <option value="Cooking">Cooking</option>
                  <option value="Biography">Biography</option>
                  <option value="Education">Education</option>
                </select>
                {formik.touched.category && formik.errors.category ? (
                  <div style={{ color: "red" }} > {formik.errors.category} </div>
                ) : null}
              </div>
            </form>
          </div>
        </div>
      </div>
      <h1 ><hr className=' ml-3 bg-success' /></h1>

      <div className="container-fluid mt-5">
        <div className="row d-flex justify-content-between">
          {
            filteredBooks.map((book, id) => (
              <div className="col-sm-6 col-lg-4 mb-4" key={id}  >
                <div className="card  p-2 d-flex flex-row h-100 " style={{ boxShadow: " rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset " }}>
                  <div className="image w-100 d-flex "><img className='w-100 ' src={book.image} alt="img" />

                  </div>
                  <div className='d-flex justify-content-between align-items-end'>
                    <div className='p-2'>
                      <h4> {book.title} </h4>
                      <h6> -{book.author} </h6>
                      <p>ISBN :  {book.isbn} </p>
                      <div className=' d-flex flex-row justify-content-end align-items-end   text-white'>
                  <button className='btn btn-success'>
                    <a  className=' text-white' style={{textDecoration:'none'}} href={book.pdfFile}> View & Download</a>
                  </button>
                </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            ))
          }

        </div>
      </div>
    </div>
  );
}

export default Books;