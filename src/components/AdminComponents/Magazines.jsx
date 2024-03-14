
import React, {useState,useEffect } from 'react'
import { API_URL } from '../../App'
import axios from 'axios'
import {toast }from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const Magazines = ({setAllMagazines}) => {
  const Navigate=useNavigate()
  const [magazines,setMagazines]=useState([])

const getMagazines=async()=>{
  try{
    const res=await axios.get(`${API_URL}/magazines`);
    if(res.status==200){
    
      setMagazines(res.data.magazines)
      setAllMagazines(res.data.magazines.length)
      
    }

  }
  catch(error){
    console.error(error)
  }
}

const handleDelete=async(id)=>{
  try{
    const res=await axios.delete(`${API_URL}/magazines/${id}`)
    if(res.status===200){
      {
        getMagazines()
        toast.success("deleted")
      }
    }
  }
  catch(error){
    toast.error("error")
    console.log(error.message)
  }
}

useEffect(()=>{
  
  getMagazines()
},[])

  return (
    <div>
      <h1 className='mt-2 ml-3 text-success'>Magazines</h1>
     
      <h1 ><hr className=' ml-3 bg-success' /></h1>
      <div className="container-fluid mt-5">
        
        <div className="row d-flex justify-content-between">
          {
            magazines.map((magazine,id)=>(
              <div className="col-sm-12 col-lg-6 mb-4" key={id}  >
            <div className="card h-100 p-2 d-flex flex-column" style={{boxShadow:" rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset "}}>
            <div className="image  d-flex justify-content-between flex-column"><img className='w-100 ' src={magazine.image} alt="img" />

            <div className="contents d-flex  ml-2">
                
               
                <p><i className="fa-solid fa-calendar-days"></i> Publication Date : {magazine.publicationDate} </p>
                

              </div>
            <div className="buttons d-flex">
                <div><button className="btn btn-primary ml-2 mr-2 mt-2" onClick={()=>Navigate(`/edit/${magazine._id}`)} ><i className="fa-solid fa-pen-to-square"></i> Edit</button></div>
               <div> <button className="btn btn-danger mt-2" onClick={()=>handleDelete(magazine._id)} ><i className="fa-solid fa-trash"></i> Delete</button></div>
              </div>
            </div>
              
              

            </div>
            
          </div>
            ))
          }
         
        </div>
      </div>
    </div>
  )
}

export default Magazines