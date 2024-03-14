import React from 'react'
import {Link} from 'react-router-dom'
import Books from './Books'
const AdminNavbar = () => {
  return (
    <div>
     <div className="admin-bar bg-success ">
     <div className='bg-success' style={{height:"5px"}} ></div>
      <Link  style={{textDecoration:"none"}} to='/admin'>
      <div className=" title routes ">
      <i className="fa-solid fa-book-open-reader  px-2 pl-2   "></i>
        <span className='ml-1' >Library</span>
      </div>
      </Link>
      <hr className='bg-white' />
      <Link to='graphs' className=""  style={{textDecoration:"none"}} >
      <div className=" routes d-flex align-items-center  ">
      <i className="fa-solid fa-user-tie px-3 py-3 nav-icon   "></i>
        <span >Dashboard</span>
      </div>
      </Link>

      <Link style={{textDecoration:"none"}} to='books'>
  <div className="routes d-flex align-items-center">
    <i className="fa-solid fa-book px-3 py-3 nav-icon"></i>
    <span>All Books</span>
  </div>
</Link>
      <Link  style={{textDecoration:"none"}} to='users'>
      <div className=" routes d-flex align-items-center ">
      <i className="fa-solid fa-user px-3 py-3 nav-icon "></i>
        <span >All Users</span>
      </div>
      </Link>
      <Link  style={{textDecoration:"none"}} to='addbook'>
      <div className=" routes d-flex align-items-center ">
      <i className="fa-solid fa-plus px-3 py-3 nav-icon "></i>
        <span >Add Books</span>
      </div>
      </Link>
      <Link  style={{textDecoration:"none"}} to='magazines'>
      <div className=" routes d-flex align-items-center ">
      
      <i className="fa-regular fa-newspaper  px-3 py-3 nav-icon"></i>
        <span >Magazines</span>
      </div>
      </Link>
      <Link  style={{textDecoration:"none"}} to='returnbook'>
      <div className=" routes d-flex align-items-center ">
      <i className="fa-solid fa-right-left px-3 py-3 nav-icon "></i>
        <span >Return Books</span>
      </div>
      </Link>
      <Link  style={{textDecoration:"none"}} to='bendingbooks'>
      <div className=" routes d-flex align-items-center ">
      <i className="fa-regular fa-hourglass-half px-3 py-3 nav-icon "></i>
        <span >Bending Books</span>
      </div>
      </Link>
      <Link  style={{textDecoration:"none"}} to='logout'>
      <div className=" routes d-flex align-items-center ">
      <i className="fa-solid fa-right-from-bracket px-3 py-3 nav-icon "></i>
        <span >Logout</span>
      </div>
      </Link>
     </div>
    </div>
  )
}

export default AdminNavbar

