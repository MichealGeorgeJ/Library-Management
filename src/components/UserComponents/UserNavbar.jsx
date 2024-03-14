import React from 'react'
import {Link} from 'react-router-dom'
const UserNavbar = () => {
  return (
    <div>
     <div style={{borderRadius:".5rem"}} className="admin-bar bg-success ">
     <div className='bg-success' style={{height:"5px"}} ></div>
      <Link  style={{textDecoration:"none"}} to='/user'>
      <div className=" title routes ">
      <i className="fa-solid fa-book-open-reader  px-2 pl-2   "></i>
        <span className='ml-1' >Library</span>
      </div>
      </Link>
      <hr className='bg-white' />
      <Link  style={{textDecoration:"none"}} to='profile'>
      <div className=" routes d-flex align-items-center ">
      <i className="fa-solid fa-user px-3 py-3 my-2 nav-icon"></i>
        <span >Profile</span>
      </div>
      </Link>
      <Link  style={{textDecoration:"none"}} to='mybooks'>
      <div className=" routes d-flex align-items-center ">
      <i className="fa-solid fa-book px-3 py-3  my-2 nav-icon "></i>
        <span >My Books</span>
      </div>
      </Link>
      <Link  style={{textDecoration:"none"}} to='magazines'>
      <div className=" routes d-flex align-items-center ">
      <i className="fa-regular fa-newspaper  px-3 py-3 nav-icon my-2"></i>
        <span >Magazines</span>
      </div>
      </Link>
      <Link  style={{textDecoration:"none"}} to='notification'>
      <div className=" routes d-flex align-items-center ">
      <i className="fa-solid fa-bell  px-3 py-3 my-2 nav-icon"></i>
        <span >Notifications</span>
      </div>
      </Link>
      <Link  style={{textDecoration:"none"}} to='logout'>
      <div className=" routes d-flex align-items-center ">
      <i className="fa-solid fa-right-from-bracket px-3 py-3 nav-icon my-2"></i>
        <span >Logout</span>
      </div>
      </Link>
     </div>
    </div>
  )
}

export default UserNavbar

