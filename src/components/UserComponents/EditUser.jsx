import React,{useEffect, useState} from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate,useParams } from 'react-router-dom'
import { API_URL } from '../../App'
import axios from 'axios'
import { toast } from 'react-toastify'
const Add = ({setUser,user}) => {
    const params=useParams()
    const Navigate=useNavigate()
    const [initialValues,setValues]=useState({
        name: "",
        bio: "",
        image: "",
    })
    const getBook=async()=>{
      const {id}=params
      console.log(id)
      try{
        const res=await axios.get(`${API_URL}/users/${id}`)
        console.log(`${API_URL}/users/${id}`)
       
        console.log(res.data.user.LibraryId)
        if(res.status===200){

          setValues({
            name: res.data.user.name,
            bio: res.data.user.bio,
            image: res.data.user.image
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
            name: Yup.string().required('Name is required'),
            
            bio: Yup.string().required("Bio is required").min(30, "Bio must be at least 30 characters"),
            image: Yup.string().required("Image URL is required"),


        }),enableReinitialize:true,
        onSubmit:async(values)=>{
            try{
                if(values){
                    const {id}=params
                
                
                
              console.log(values)
              const res=await axios.put(`${API_URL}/users/${id}`,values)
                console.log(res)
                if(res.status===200){
                    
                    localStorage.setItem('user', JSON.stringify(values));
                    
                    console.log(res.data.user)
                    Navigate('/user/profile');             toast.success("updated")

                    
                }
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
        <div><h1 className="text-success ml-3 mt-3 ">Update Profile</h1></div>
        <h1 ><hr className=' ml-3 bg-success' /></h1>
        <div className="container">
            <div className="row d-flex flex-column">
                <form onSubmit={formik.handleSubmit} action=""><div className="col-lg-6 col-sm-12">
                    
                <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id='name' name='name' onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name} />
                        {formik.touched.name && formik.errors.name ?(<div style={{color:"red"}} > {formik.errors.name} </div>):null}
                    </div>
                   
                    
                    <div className="form-group">
                        <label htmlFor="Bio">Bio</label>
                        <input type="text" className="form-control" id='bio' name='bio'onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.bio} />
                        {formik.touched.bio && formik.errors.bio ?(<div style={{color:"red"}} > {formik.errors.bio} </div>):null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Image Url </label>
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