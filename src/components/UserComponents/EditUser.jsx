import React,{useEffect, useState} from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate,useParams } from 'react-router-dom'
import { API_URL } from '../../App'
import axios from 'axios'
import { toast } from 'react-toastify'
import { HashLoader } from 'react-spinners';
const Add = ({setUser,user}) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const api = 'https://api.cloudinary.com/v1_1/dkwftase4/image/upload';

  const handleFileChange = (e) => {
      setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
      setLoading(true);
      try {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', 'usersImages_preset');

          const response = await axios.post(api, formData);

          console.log(response.data.secure_url); // Log the uploaded URL

          return response.data.secure_url; // Return the uploaded URL
      } catch (error) {
          console.log(error)
          return null;
      }
  };

    const params=useParams()
    const Navigate=useNavigate()
    const [initialValues,setValues]=useState({
        name: "",
        bio: "",
        image: null,
    })
    const getUser=async()=>{
      const {id}=params
      console.log(id)
      try{
        const res=await axios.get(`${API_URL}/users/${id}`)
        console.log(`${API_URL}/users/${id}`)
       
        console.log(res.data.user.LibraryId)
        if(res.status===200){

          setValues({
            name: res.data.user.name,
            bio: res.data.user.bio,
            image:null,
          })
        }
        return res.data.user
      }
      catch(error){
        toast.error("error")
      }
    }

   

    const formik=useFormik({
        initialValues:initialValues,
        validationSchema:Yup.object({
            name: Yup.string().required('Name is required'),
            
            bio: Yup.string().required("Bio is required").min(30, "Bio must be at least 30 characters"),
           


        }),enableReinitialize:true,
        onSubmit:async(values)=>{
            try{
                if(values){
                    const {id}=params
                    const uploadUrl = await handleUpload();

                    if(uploadUrl !==null){
                      values.image = uploadUrl;
                     
                      const res=await axios.put(`${API_URL}/users/${id}`,values)
                        console.log(res)
                        if(res.status===200){
                          const user=await  getUser();
                            
                            localStorage.setItem('user', JSON.stringify(user));
                            getUser();
                            setLoading(false);
                            
                            
                            Navigate('/user/profile');             toast.success("updated");
                            toast.success("Refresh the page to view profile update")

        
                            
                        }
                    }
                
                
             
                }
            }catch(error){
                toast.error("error")
            }
            finally {
             
              setLoading(false);
          }
        }

    })
    useEffect(()=>{
        console.log(params);
      getUser()
      },[params.id])
  return (
    <div>

        <div><h1 className="text-success ml-3 mt-3 ">Update Profile</h1></div>
        <h1 ><hr className=' ml-3 bg-success' /></h1>
        {loading && (
    <div  className="position-fixed top-0 start-25 w-100 h-100 " style={{ zIndex: 999,marginLeft:"14rem",marginTop:"7rem" }}>
        <HashLoader color={'#28a745'} loading={loading} size={50} />
    </div>
)}
        <div className="container">
            <div className="row d-flex flex-column">
                <form onSubmit={formik.handleSubmit} action=""><div className="col-lg-6 col-sm-12">
                    
                <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id='name' name='name' onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name} />
                        {formik.touched.name && formik.errors.name ?(<div style={{color:"red"}} > {formik.errors.name} </div>):null}
                    </div>
                   
                    
                    <div className="form-group">
                        <label htmlFor="Bio">Bio</label>
                        <input type="text" className="form-control" id='bio' name='bio'onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.bio} />
                        {formik.touched.bio && formik.errors.bio ?(<div style={{color:"red"}} > {formik.errors.bio} </div>):null}
                    </div>
                    <div className="form-group mb-5">
                        <label htmlFor="image">Select Image</label>
                        <input  type="file" accept="image/*" className="form-control " id='image' name='image' onChange={handleFileChange}
                onBlur={formik.handleBlur}
                />
                        {formik.touched.image && formik.errors.image ?(<div style={{color:"red"}} > {formik.errors.image} </div>):null}
                    </div>
                    <div className='d-flex justify-content-center w-100 mt-5 '><button className="btn btn-success w-50 mb-5 edit-submit" type='submit'>Submit</button></div>
                </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Add