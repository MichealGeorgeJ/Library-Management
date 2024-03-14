import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
const Profile = ({user,setUser}) => {
 
  const Navigate=useNavigate()
  const ProfilePage=  (user && (  <div className="container mt-4">
    <h1 className="text-success">My Profile</h1>
  <div className="row d-flex justify-content-center align-items-center flex-row">
    <div className='col-lg-10 col-sm-12 mt-5'>
     
    <div className="card  p-2 d-flex flex-row " style={{ boxShadow: " rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset ",borderRadius:"1rem" }}>
                <div className="image w-25 d-flex  flex-column justify-content-center align-items center p-2  text-white " style={{backgroundImage: "linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)",borderRadius:"1rem"}}>
                  <div className='d-flex justify-content-center '> <img style={{borderRadius:"50%"}} className='w-100 ' src={user.image} alt="img" /> 
                  {/* <a href="https://ibb.co/HYB1pY3"><img src="https://i.ibb.co/RPYZ4Pd/1708196844322-01.jpg" alt="1708196844322-01" border="0" /></a> */}
                 
                 </div>
                 <div style={{width:"2px",height:"2px"}} className='vr bg-success '></div>
               <div className='d-flex justify-content-center'> <h4 className=''>
                 {user.LibraryId}
                </h4></div>

                </div>
                
                <div className='d-flex '>
                  <div className='p-2'>
                    <h4> {user.name}  </h4>
                    <div className='user-bio'><h6>{user.bio} </h6></div>
                   
                  </div>
                </div>
                <div className='d-flex flex-column align-items-start justify-content-end'>
                <button onClick={()=>Navigate(`/user/edit/${user._id}`)}  className='btn btn-outline-success'>Edit Profile</button>
                </div>
              </div>
    </div>
  </div>
 </div>)
)
  return (
   
    <div>
   {user &&  ProfilePage}
   
    </div>
  )
}

export default Profile