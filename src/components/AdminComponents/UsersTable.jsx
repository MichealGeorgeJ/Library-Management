
import React, {useState,useEffect } from 'react'
import { API_URL } from '../../App'
import axios from 'axios'
import {toast }from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const UsersTable = () => {
  const Navigate=useNavigate()
  const [tableUsers,setTableUsers]=useState([])

const getUsers=async()=>{
  try{
    const res=await axios.get(`${API_URL}/users`);
    if(res.status==200){
      toast.success("data got")
      setTableUsers(res.data.users)
      
      console.log(res.data.users)
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
    <table class="table">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">NAME</th>
      <th scope="col">EMAIL</th>
      <th scope="col">USERID</th>
    </tr>
  </thead>
  <tbody>
   {
    tableUsers.map((user,id)=>(
        <tr key={id}>
        <th scope="row">{id+1}</th>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user._id}</td>
      </tr>
    ))
   }
    
  </tbody>
</table>
   </div>
  )
}

export default UsersTable