import React from 'react'
import {Link} from 'react-router-dom'
const Navbar = () => {
  return (
    <div style={{height:"4rem"}} className='container-fluid' >
      <div className="row d-flex flex-column ">
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top    " style={{height:"4rem"}} >
  <div className=' mx-5-lg'><Link style={{textDecoration:"none"}} to='/'><h1 className='text-success '>Library <i className="fa-solid fa-book-open-reader"></i></h1></Link></div>
  <button className="navbar-toggler icon-1   " type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation" style={{backgroundColor:"#5cb85c"}} >
  <i className="fa-solid fa-bars text-white b-4 "></i>
  </button>

  <div className="collapse navbar-collapse nav-position   " id="navbarTogglerDemo02">
   
    
     
      <div className=' d-flex align-items-center '><Link to='register' style={{textDecoration:"none"}} className="   text-success " ><p className='active mt-3 px-3 py-1'>Get Started</p></Link></div>

      <div className=' d-flex align-items-center' ><Link to='login' style={{textDecoration:"none"}}  >
        <p className=" px-3 mt-3  py-1 login " >Login</p></Link></div>
   
  </div>
</nav>
      </div>
    </div>
  )
}

export default Navbar