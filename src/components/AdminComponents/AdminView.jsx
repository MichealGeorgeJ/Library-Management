import React from 'react'

const AdminView = ({allBooks,allUsers,fines,allMagazines,bendingBooks,issuedbooks,renewedBooks}) => {
  return (
    <div>
      <div className=" ">
      <h1 className=" text-success bg-white  mt-3">Dashboard</h1>
      
      <h1 ><hr className='bg-success' /></h1></div>
     <div className="dashboard contents1  mt-4 ">
      <div className="row d-flex  justify-content-between  text-white ">
      <div className="col-lg-4 col-sm-11 mb-4  ">
          <div className="card bg-success px-3 py-2   ">
            <div className='d-flex flex-row justify-content-between '>
            <h1>Books </h1>
           <h1> <i className="fa-solid fa-book"></i></h1>
            </div>
            <div>
              <h1>{allBooks}</h1>
            </div>

          </div>
        </div>

        <div className="col-lg-4 col-sm-11 mb-4  ">
          <div className="card bg-success px-3 py-2   ">
            <div className='d-flex flex-row justify-content-between '>
            <h1>Users </h1>
           <h1> <i className="fa-solid fa-users"></i></h1>
            </div>
            <div>
              <h1>{allUsers}</h1>
            </div>

          </div>
        </div>
        <div className="col-lg-4 col-sm-11 mb-4  ">
          <div className="card bg-success px-3 py-2   ">
            <div className='d-flex flex-row justify-content-between '>
            <h1>Magazines </h1>
           <h1> <i className="fa-solid fa-newspaper"></i></h1>
            </div>
            <div>
              <h1>{allMagazines}</h1>
            </div>

          </div>
        </div>
        <div className="col-lg-4 col-sm-11 mb-4  ">
          <div className="card card-2 text-success px-3 py-2   ">
            <div className='d-flex flex-row justify-content-between '>
            <h3>Issued Books</h3>
           <h1> <i className="fa-solid fa-hand-holding-hand"></i></h1>
            </div>
            <div>
              <h1>{issuedbooks}</h1>
            </div>

          </div>
        </div>
        <div className="col-lg-4 col-sm-11 mb-4  ">
          <div className="card text-success px-3 py-2 card-2   ">
            <div className='d-flex flex-row justify-content-between '>
            <h3>Bending Books</h3>
           <h1> <i className="fa-regular fa-hourglass-half"></i></h1>
            </div>
            <div>
              <h1> {bendingBooks} </h1>
            </div>

          </div>
        </div>
        <div className="col-lg-4 col-sm-11 mb-4  ">
          <div className="card text-success px-3 py-2 card-2   ">
            <div className='d-flex flex-row justify-content-between '>
            <h3>Renewed Books</h3>
           <h1> <i className="fa-solid fa-retweet"></i></h1>
            </div>
            <div>
              <h1> {renewedBooks} </h1>
            </div>

          </div>
        </div>
        <div className="col-lg-4 col-sm-11 mb-4  ">
          <div className="card text-success px-3 py-2 card-2   ">
            <div className='d-flex flex-row justify-content-between '>
            <h3>Fines</h3>
           <h1> <i className="fa-solid fa-indian-rupee-sign"></i></h1>
            </div>
            <div>
              <h1>{fines}</h1>
            </div>

          </div>
        </div>
        
      </div>
     </div>

    </div>
  )
}

export default AdminView