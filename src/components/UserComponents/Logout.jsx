import React from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored authentication data
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');

    // Notify the user that they have been logged out
    toast.success("Logged out successfully");

    // Redirect the user to the login page
    navigate('/login');
  };

  return (
    <div className=''>
      <h1 className=' ml-4 mt-3 text-success'>Logout</h1>
        <div className="container d-flex justify-content-center  text-success ml-3 ">
       <div className="row logout d-flex align-items-center justify-content-center py-5  ">
         
          <div className='d-flex justify-content-center align-items-center logout py-5'>
             
           <div style={{borderRadius:".5rem",border:"1px solid green"}} className="    bg-white py-5 p-4 mt-5 align-items-center justify-content-center    ">
            <div  className='d-flex justify-content-center align-items-end '><h1>Confirm
              <hr className='bg-success'/></h1></div>
           <div  className='d-flex justify-content-center align-items-end '>
          <Link to='/admin' > <div><button className='btn mx-5 px-5 py-2 mt-4 btn-primary' >Cancel</button></div></Link>
          <div><button className='btn mt-4 px-5 py-2 mx-5 btn-danger' onClick={handleLogout}>Logout</button></div>
           </div>
           </div>
      </div> </div>
   </div>
      
    </div>
  );
};

export default Logout;