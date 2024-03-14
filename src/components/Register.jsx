import React from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {useNavigate,Link} from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { API_URL } from '../App'

const Register = ({setUser,setAuthorized}) => {

    const navigate=useNavigate()
    const formik=useFormik({
        initialValues:{
            name:"",
            email:"",
            password:"",
        },
        validationSchema:Yup.object({
            name:Yup.string().required('Name is required'),
            email:Yup.string().required('Email is required').matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"Enter a valid email"),
            password:Yup.string().required('Password is required').min(6,' must be at least 6 characters'),
            
        }),
        onSubmit:async(values)=>{
           try{
           if(values){
            const res= await axios.post(`${API_URL}/users/createUser`,values)
            if(res.status===200){
                toast.success("Register successful")

                const res2 = await axios.get(`${API_URL}/users/${values.email}`);
                if (res2.status === 200) {
                    setUser(res2.data.user);
                    localStorage.setItem('user', JSON.stringify(res2.data.user));
                    const storedUser = localStorage.getItem('user');
if (storedUser!==undefined) {
setUser(JSON.parse(storedUser))
setAuthorized(true)
}
                    toast.success('User details fetched');
                } else {
                    toast.error('Failed to fetch user details');
                }

                
                if(res.data.role==='admin'){
                    navigate('/admin')
                }else{
                    navigate('/user')
                }
               
               
            }
           }
           }
           catch(error){
            console.log(error.message)
           }
            
        }
        
    })

  return (
    <div className='mt-5 ' >
        <div className="container  text-success ">
            <div className="row d-flex justify-content-center align-items-center ">
               <form onSubmit={formik.handleSubmit}>
                
                <div style={{width:"30rem",borderRadius:"1rem"}} className="col bg-white py-5 p-4 mt-5 mb-5 pb-5 ">
                    <div className='d-flex justify-content-center text-success'><h1>Register</h1></div>
                    <div className="form-group ">
                        <label htmlFor="email">Name</label>
                        <input type="text" className="form border border-success " id='name' name='name' onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}  />
                 {formik.touched.name && formik.errors.name?(<div style={{color:"red"}} > {formik.errors.name} </div>):null}
                    </div>
                    <div className="form-group ">
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form border border-success " id='email' name='email' onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}  />
                 {formik.touched.email && formik.errors.email?(<div style={{color:"red"}} > {formik.errors.email} </div>):null}
                    </div>
                    <div className="form-group ">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form border border-success " id='password' name='password' onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}  />
                 {formik.touched.password && formik.errors.password ?(<div style={{color:"red"}} > {formik.errors.password} </div>):null}
                 <div className=' mt-2 mr-2 d-flex justify-content-end'><Link to='/login' style={{textDecoration:"none"}} className="   text-danger " ><p className=' '>Already have an account?</p></Link></div>
                    </div>
                    
                    <div className='d-flex justify-content-center'>
                        <button type='submit' className="btn btn-outline-success px-5">Submit</button>
                    </div>
                </div>
               </form>
            </div>
        </div>
    </div>
  )
}

export default Register