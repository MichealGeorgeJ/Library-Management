import React from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { API_URL } from '../../App'

const IssueBooks = () => {

    const navigate=useNavigate()
    const formik=useFormik({
        initialValues:{
            libraryId:"",
        isbn:""
        },
        validationSchema:Yup.object({
            libraryId:Yup.string().required('libraryId is required').matches(/^LIB-\d+$/,"Enter a valid email"),
            isbn:Yup.string().matches( /^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/,
            'Valid ISBN Number required').required("Valid ISBN Number required")
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                console.log(values.isbn)
                if(values){
                    const book = await axios.get(`${API_URL}/books/${values.isbn}`);
                    if (book.data && book.data.book) {
                        toast.success('book got')
                        const books = book.data.book;
                        const data = {
                            ...values,
                            bookId: books._id
                        };
                        const user = await axios.get(`${API_URL}/users/${values.libraryId}`);
                       
                        if(user.status===200){
                            
               const bookId=book.data.book._id; 
               const userId=user.data.user._id; 
               console.log(bookId) 
                         console.log(userId)
                            const updateUser = await axios.post(`${API_URL}/users/add-mybook/${user.data.user._id}/${book.data.book._id}`);
                            if(updateUser.status===200){
                                console.log(updateUser)
                            }
                        }

                       console.log(data) 

                        const issueResponse = await axios.post(`${API_URL}/issuedbooks/create`, data);
            
                        if (issueResponse.status === 200) {
                            toast.success("Book Issueddd");
                            resetForm();
                        } 
                        else {
                            toast.error("Failed to issue the book");
                        }
                        
                        const res=await axios.patch(`${API_URL}/books/${books._id}`,{
                            returnStatus:false
                          })
                          if(res.status===200){
                            toast.success('status updated')

                            
                          }
                          else{
                            toast.error('status error')
                          }
                         
                    
                    } else
                     {
                        toast.error("Book not found");
                    }
                }
              
            } 
            catch (error) {
                console.error("Error:", error.message);
                toast.error("An error occurred while processing the request");
            }
        }
        
    })

  return (
    
   <div> 
    <h1 className="text-success mt-3 ml-3 mt-2"> Book Entry</h1>
    
    <div className=' ' >
   
   <div className="container  text-success ">
       <div className="row d-flex justify-content-center align-items-center  ">
          <form onSubmit={formik.handleSubmit}>
           
           <div style={{width:"33.6rem",borderRadius:"1rem",border:"1px solid green"}} className="col  bg-white py-5 p-4 mt-5 align-items-center justify-content-center input-length ">
               <div className='d-flex justify-content-center text-success input-length'></div>
               <div className="form-group input-length ">
                   <label htmlFor="libraryId">Library Id</label>
                   <input 
                     type="text" className=" border border-success form-control input-length " id='libraryId' name='libraryId' onChange={formik.handleChange}
           onBlur={formik.handleBlur}
           value={formik.values.libraryId}   />
            {formik.touched.libraryId && formik.errors.libraryId?(<div style={{color:"red"}} > {formik.errors.libraryId} </div>):null}
               </div>
               <div className="form-group input-length">
                   <label htmlFor="isbn">ISBN</label>
                   <input type="text" className="form-control  input-length" id='isbn' name='isbn' onChange={formik.handleChange}
           onBlur={formik.handleBlur}
           value={formik.values.isbn} />
                   {formik.touched.isbn && formik.errors.isbn ?(<div style={{color:"red"}} > {formik.errors.isbn} </div>):null}
               </div>
               <div className='d-flex justify-content-center'>
                   <button type='submit' className="btn btn-outline-success px-5">Submit</button>
               </div>
           </div>
          </form>
       </div>
   </div>
</div></div>
  )
}

export default IssueBooks