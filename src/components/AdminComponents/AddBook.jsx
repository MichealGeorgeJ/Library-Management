import React,{useState} from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { API_URL } from '../../App'

const AddBook = () => {
    
    const Navigate=useNavigate()
    const formik=useFormik({
        initialValues:{
            title:"",
            author:"",
            isbn:"",
            category:"",
            publicationDate:"",
            dob:"",
            bio:"",
            image:"",
            
        },
        validationSchema:Yup.object({
            title:Yup.string().required('Title is required'),
            author:Yup.string().required("Author Name isrequired"),
            isbn:Yup.string().matches( /^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/,
            'Valid ISBN Number required').required("Valid ISBN Number required"),
            publicationDate:Yup.date().required("enter a publication date"),
            dob:Yup.date().required("Enter a author's DoB"),
            bio:Yup.string().required("Enter a short bio of author").min(30,"Minimum 30 character"),
            image:Yup.string().url().required("Enter a valid image URL"),


        }),
        onSubmit:async(values)=>{
            try{
                const res= await axios.post(`${API_URL}/books`,values)
                if(res.status===200){
                    toast.success("book added")
                    Navigate('/admin/books')
                   
                }
            }catch(error){
              console.log(error)
                toast.error("error")
            }
        }

    })

  return (
    <div>
       <h1 className=" ml-4 text-success mt-2" >Add Book</h1>
       <h1 ><hr className=' ml-3 text-success bg-success' /></h1>
        <div className=" mx-5  mt-4"  >
        
            <div className="row d-flex flex-column">
               
                <form onSubmit={formik.handleSubmit} action="">
                    <div className="">
                        <div className="form-group">
                        <label className='' htmlFor="title">Title</label>
                        <input type="text" className="form-control  " id='title' name='title' onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}  />
                        {formik.touched.title && formik.errors.title ?(<div style={{color:"red"}} > {formik.errors.title} </div>):null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="author">Author Name</label>
                        <input type="text" className="form-control" id='author' name='author' onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.author} />
                        {formik.touched.author && formik.errors.author ?(<div style={{color:"red"}} > {formik.errors.author} </div>):null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="isbn">ISBN</label>
                        <input type="text" className="form-control" id='isbn' name='isbn' onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.isbn} />
                        {formik.touched.isbn && formik.errors.isbn ?(<div style={{color:"red"}} > {formik.errors.isbn} </div>):null}
                    </div>
                    <div className="form-group">
    <label htmlFor="category">Category</label>
    <select 
        className="form-control" 
        id='category' 
        name='category' 
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.category}
    >
        <option value="">Select a category</option>
        <option value="Finance">Finance</option>
        <option value="Cooking">Cooking</option>
        <option value="Biography">Biography</option>
        <option value="Science Fiction">Science Fiction</option>
        <option value="Education">Education</option>
    </select>
    {formik.touched.category && formik.errors.category ? (
        <div style={{color:"red"}} > {formik.errors.category} </div>
    ) : null}
</div>
                    <div className="form-group">
                        <label htmlFor="publicationDate">Publication Date</label>
                        <input type="date" className="form-control" id='publicationDate' name='publicationDate' onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.publicationDate} />
                        {formik.touched.publicationDate && formik.errors.publicationDate ?(<div style={{color:"red"}} > {formik.errors.publicationDate} </div>):null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="dob">Date of Birth</label>
                        <input type="date" className="form-control" id='dob' name='dob'onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dob} />
                        {formik.touched.dob && formik.errors.dob ?(<div style={{color:"red"}} > {formik.errors.dob} </div>):null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="Bio">Bio</label>
                        <input type="text" className="form-control" id='bio' name='bio'onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.bio} />
                        {formik.touched.bio && formik.errors.bio ?(<div style={{color:"red"}} > {formik.errors.bio} </div>):null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Image URL</label>
                        <input type="text" className="form-control" id='image' name='image'onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.image} />
                        {formik.touched.image && formik.errors.image ?(<div style={{color:"red"}} > {formik.errors.image} </div>):null}
                    </div>
                    <div className='d-flex justify-content-center align-items-center mb-5 '><button className="btn btn-outline-success w-50 " type='submit'>Add Book</button></div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default AddBook