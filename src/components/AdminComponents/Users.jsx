
import React, {useState,useEffect } from 'react'
import { API_URL } from '../../App'
import axios from 'axios'
import {toast }from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const Users = ({setAllUsers}) => {
  const Navigate=useNavigate()
  const [users,setUsers]=useState([])

const getUsers=async()=>{
  try{
    const res=await axios.get(`${API_URL}/users`);
    if(res.status==200){
      
      setUsers(res.data.users)
      setAllUsers(res.data.users.length)
      
    }

  }
  catch(error){
    console.error(error)
  }
}

const handleDelete=async(id)=>{
  try{
    console.log(id)
    const res=await axios.delete(`${API_URL}/users/${id}`)
    if(res.status===200){
      {
        getUsers()
        toast.success("deleted")
      }
    }
  }
  catch(error){
    console.log(error.message)
    toast.error("error")
  }
}

useEffect(()=>{
  
  getUsers()
},[])

  return (
    <div>
      <h1 className="text-success mt-2 ml-3">Users</h1>
      <h1 ><hr className=' ml-3 text-success bg-success' /></h1>
      <div className="container-fluid mt-3">
        <div className="row d-flex justify-content-between">
          {
            users.map((user,id)=>(
              <div className="col-lg-3 mt-5 col-sm-6 "key={id} >
              <div className="card h-100" style={{boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"}} >
               <div className='d-flex justify-content-center '>
               <img src={user.image} style={{width:"50%"}}  alt="ggg" className="card-img-top mt-2" />
               </div>
              <div className="card-body">
                <h3>{user.name}</h3>
                <p>LibraryId :{user.LibraryId}</p>
              <p><i className="fa-regular fa-envelope"></i> {user.email}</p>
               <div className="d-flex justify-content-center align-items-end">
               <button className='btn btn-outline-success' type='button' onClick={()=>handleDelete(user._id)}>Remove User</button>
               </div>
                </div></div>
          </div>
            ))
          }
         
        </div>
      </div>
      <div>

    </div>
    </div>
  )
}

export default Users