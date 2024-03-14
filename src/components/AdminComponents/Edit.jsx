import React,{useEffect, useState} from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate,useParams } from 'react-router-dom'
import { API_URL } from '../../App'
import axios from 'axios'
import { toast } from 'react-toastify'
const Add = () => {
    const params=useParams()
    const Navigate=useNavigate()
    const [initialValues,setValues]=useState({
      title:"",
      author:"",
      isbn:"",
      category:"",
      publicationDate:"",
      dob:"",
      bio:"",
      image:"",

    })
    const getBook=async()=>{
      const {id}=params
      console.log(id)
      try{
        const res=await axios.get(`${API_URL}/books/${id}`)
        console.log(`${API_URL}/books/${id}`)
        console.log(res)
        if(res.status===200){
toast.success("edit get")
          setValues({
      title:res.data.book.title,
      author:res.data.book.author,
      isbn:res.data.book.isbn,
      category:res.data.book.category,
publicationDate:res.data.book.publicationDate,
      dob:res.data.book.dob,
      bio:res.data.book.bio,
      image:res.data.book.image
          })
        }
      }
      catch(error){
        toast.error("error")
      }
    }

   

    const formik=useFormik({
        initialValues:initialValues,
        validationSchema:Yup.object({
            title:Yup.string().required('Title is required'),
            author:Yup.string().required("Author Name isrequired"),
            isbn:Yup.string().required("Valid ISBN Number required"),
            publicationDate:Yup.string().required("enter a publication date"),
            dob:Yup.string().required("Enter a author's DoB"),
            bio:Yup.string().required("Enter a short bio of author").min(30,"Minimum 30 character"),
            image:Yup.string().url().required("Enter a valid image URL"),


        }),enableReinitialize:true,
        onSubmit:async(values)=>{
            try{
                const {id}=params
                console.log(`${API_URL}/books/${id}`)
                console.log(values)
                
                
              
              const res=await axios.put(`${API_URL}/books/${id}`,values)
                console.log(res)
                if(res.status===200){
                    Navigate('/admin/books');             toast.success("updated")

                    
                }
            }catch(error){
                toast.error("error")
            }
        }

    })
    useEffect(()=>{
        console.log(params);
      getBook()
      },[params.id])
  return (
    <div>
        <div className="container">
            <div className="row d-flex flex-column">
                <form onSubmit={formik.handleSubmit} action=""><div className="col-lg-6 col-sm-12">
                    
                <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control" id='title' name='title' onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title} />
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
                    <div className='d-flex justify-content-center '><button className="btn btn-primary w-50 mb-5" type='submit'>Submit</button></div>
                </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Add