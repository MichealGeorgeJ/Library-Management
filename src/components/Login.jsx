import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../App';

const Login = ({ setUser,user,setAuthorized }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const updateUserFromLocalStorage = async () => {
            const storedUser = localStorage.getItem('user');
            
            if (storedUser !== null) {
                const parsedUser = JSON.parse(storedUser);
                setUser(JSON.parse(storedUser))
               
                try {
                    // Fetch the updated user data from the server
                    const res = await axios.get(`${API_URL}/users/${parsedUser.email}`);
                    if (res.status === 200) {
                        // Update the user data in local storage
                        localStorage.setItem('user', JSON.stringify(res.data.user));
                        // Update the user state in the component
                        setUser(res.data.user);
                       
                    }
                } catch (error) {
                    
                    
                }
            }
        };
    
        updateUserFromLocalStorage();
    
        window.addEventListener('storage', updateUserFromLocalStorage);
    
        return () => {
            window.removeEventListener('storage', updateUserFromLocalStorage);
        };
    }, []);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Email is required').matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Enter a valid email'),
            password: Yup.string().required('Password is required')
        }),
        onSubmit: async (values) => {
            try {
                if (values) {
                    const res = await axios.post(`${API_URL}/users/login`, values);
                    if (res.status === 200) {
                        toast.success('Login successful');
                        const res2 = await axios.get(`${API_URL}/users/${values.email}`);
                        if (res2.status === 200) {
                            setUser(res2.data.user);
                            localStorage.setItem('user', JSON.stringify(res2.data.user));
                            const storedUser = localStorage.getItem('user');
      if (storedUser!==undefined) {
        setUser(JSON.parse(storedUser))
        setAuthorized(true)
      }
                            
                        } else {
                            toast.error('Failed to fetch your details');
                        }

                        if (res.data.role === 'admin') {
                            navigate('/admin');
                        } else {
                            navigate('/user');
                        }
                    }
                }
            } catch (error) {
                console.log(error.message);
            }
        }
    });

    return (
        <div className="mt-5 login-page">
            <div className="container text-success">
                <div className="row d-flex justify-content-center align-items-center">
                    <form onSubmit={formik.handleSubmit}>
                        <div style={{ width: '30rem', borderRadius: '1rem' }} className="col bg-white py-5 p-4 mt-5">
                            <div className="d-flex justify-content-center text-success">
                                <h1>Login</h1>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    style={{ width: '100%', borderRadius: '5px' }}
                                    type="text"
                                    className="py-1 border border-success"
                                    id="email"
                                    name="email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <div style={{ color: 'red' }}> {formik.errors.email} </div>
                                ) : null}
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Password</label>
                                <input
                                    type="password"
                                    className=" py-1 border border-success"
                                    id="password"
                                    name="password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                    style={{ width: '100%', borderRadius: '5px' }}
                                />
                                {formik.touched.password && formik.errors.password ? (
                                    <div style={{ color: 'red' }}> {formik.errors.password} </div>
                                ) : null}
                                <div className=" mt-2 mr-2 d-flex justify-content-end">
                                    <Link to="/register" style={{ textDecoration: 'none' }} className="text-danger">
                                        <p className="">New user?</p>
                                    </Link>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button type="submit" className="btn btn-outline-success px-5">
                                    Login
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;