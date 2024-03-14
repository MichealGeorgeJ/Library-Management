
import React, {useState,useEffect } from 'react'
import { API_URL } from '../../App'
import axios from 'axios'
import {toast }from 'react-toastify'

const Magazines = () => {
  const [magazines,setMagazines]=useState([])
  const getMagazines=async()=>{
    try{
      const res=await axios.get(`${API_URL}/magazines`);
      if(res.status==200){
      
        setMagazines(res.data.magazines)
        

      }
  
    }
    catch(error){
      console.error(error)
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
                
               
                <h3 className='text-success magazine-info'><i className="fa-solid fa-calendar-days"></i> Publication Date : {magazine.publicationDate} </h3>
                

              </div>
            <div className="buttons d-flex">
                
              
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