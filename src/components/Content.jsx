import React from 'react'
import { Link } from 'react-router-dom'
const Content = () => {
  return (
    <div   className='my-5 '>
        <div className="container-fluid  " style={{width:"40rem",marginTop:"1.5rem"}}>
            <div className="row d-flex  justify-content-center align-items-center flex-column"  >
                <div className='col quates ' >
                    <h1 className="quote-text" >“The only thing that you absolutely have to know, is the location of the library.”
</h1>
<div className="d-flex justify-content-end quote-author"><h1 >― Albert Einstein</h1></div>

                </div>
               
                <Link to='login'>
                <button  style={{marginTop:"20rem",borderRadius:"2rem",width:"30rem"}} className="btn btn-success px-5 "><h3>Search Books</h3></button></Link>
               
            </div>
        </div>
    </div>
  )
}

export default Content
