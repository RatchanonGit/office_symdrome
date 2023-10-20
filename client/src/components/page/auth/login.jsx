import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { login } from '../../functions/auth';
import home from '../../../image/home.svg'
import { RiAdminLine } from "react-icons/ri";
import { toast } from "react-toastify";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const roleBaseRedirect = (role) => {
        if (role === "admin") {
            setTimeout(() => {
                navigate("/dashboard");
            }, 2000); 
        } else {
            navigate("/dashboard");
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        login(formData)
            .then((res) => {
                toast.success("Login Success", {
                    position: "top-center",
                    autoClose : 1000
                  });
                dispatch({
                    type: 'LOGIN',
                    payload: {
                        token: res.data.token,
                        username: res.data.payload.user.username,
                        role: res.data.payload.user.role,
                        firstname: res.data.payload.user.firstname,
                        lastname: res.data.payload.user.lastname
                    }
                });
                localStorage.setItem('token', res.data.token);
                roleBaseRedirect(res.data.payload.user.role);
                setError('');
            })
            .catch((err) => {
                console.log(err.response.data);
                setError(err.response.data);
            });
    }
  
    return (
        <div className="min-h-[91vh] flex justify-between bg-slate-50" >
            <img src={home} alt="home" className='w-3/5 ' />
            <div className="w-full max-w-md bg-white p-8">
                <div className='bg-blue rounded-full p-8 shadow w-[125px] mx-auto mt-6'>
                    <RiAdminLine size={60} color='white' />
                </div>

                <h1 className="text-xl font-medium uppercase  mt-3 ml-[170px] text-blue">Login</h1>
                <form onSubmit={handleSubmit} className='mt-9'>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-base font-medium text-black uppercase">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder='username'
                            className="w-full border border-gray-300 rounded-md py-3 px-3 shadow-sm focus:ring focus:ring-opacity-50 mt-4"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-base font-medium text-black uppercase">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder='password'
                            className="w-full border border-gray-300 rounded-md py-3 px-3 shadow-sm focus:ring focus:ring-opacity-50 mt-4"
                        />
                    </div>
                    <div className="mb-4">
                        <p className="text-red-600 text-base flex items-center justify-center ">{error}</p>
                    </div>
                    <button type="submit" className="w-full px-6 py-3 bg-blue text-white rounded h">
                        <h1 className="text-lg uppercase font-semibold">Login</h1>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
