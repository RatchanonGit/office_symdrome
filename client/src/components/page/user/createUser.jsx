import React, { useState, useEffect } from 'react';
import { createUser } from '../../functions/user';
import { listTitle } from '../../functions/title';
import { listRole } from '../../functions/role';
import { listInstitution } from '../../functions/institution';
import { AiOutlineUser, AiOutlineEdit } from "react-icons/ai";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CreateUser = ({ onCreated }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const [title, setTitle] = useState([]);
    const [role, setRole] = useState([]);
    const [institution, setInstitution] = useState([]);
    const [value, setValue] = useState({
        registration_date: Date.now(),
        rank: "0",
        image: null,
    });

    const loadDataRole = (authtoken) => {
        listRole(authtoken)
            .then(res => {
                setRole(res.data);
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }

    const loadDataTitle = (authtoken) => {
        listTitle(authtoken)
            .then(res => {
                setTitle(res.data);
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }

    const loadDataInstitution = (authtoken) => {
        listInstitution(authtoken)
            .then(res => {
                setInstitution(res.data);
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setValue({
                    ...value,
                    image: e.target.result,
                });
            };
            reader.readAsDataURL(selectedImage);
        }
    };

    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createUser(user.token, value)
            .then(res => {
                console.log(res.data);
                toast.success(res.data, {
                    position: "top-center",
                    autoClose: 2000
                });
                onCreated();
            }).catch(error => {
                console.log(error.response.data);
            });
    }

    useEffect(() => {
        loadDataRole(user.token);
        loadDataInstitution(user.token);
        loadDataTitle(user.token);
    }, [user]);

    return (
        <div className='h-full flex justify-center items-center'>
            <form className='w-auto' onSubmit={handleSubmit}>
                <h1 className='text-4xl font-semibold uppercase text-blue'>Create User</h1>
                <div className="relative my-2">
                    <input
                        type="file"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                        id="imageInput"
                    />
                    {value.image ? (
                        <div className="relative mt-3">
                            <img src={value.image} alt="Profile Preview" className="ml-[320px] w-28 h-28 object-cover rounded-full" />
                            <label
                                htmlFor="imageInput"
                                className="absolute bottom-0 left-[400px] cursor-pointer bg-blue-500 text-white py-2 px-2 rounded-full bg-slate-300"
                            >
                                <AiOutlineEdit />
                            </label>
                        </div>
                    ) : (
                        <div className="mt-3 relative">
                            <label
                                htmlFor="imageInput"
                                className="absolute bottom-0 left-[400px] cursor-pointer bg-slate-300 text-white py-2 px-2 rounded-full"
                            >
                                <AiOutlineEdit />
                            </label>
                            <AiOutlineUser className=" ml-[320px] w-28 h-28 object-cover rounded-full bg-slate-200 p-3" />
                        </div>
                    )}
                </div>

                <div className="flex w-full">
                    <div className="w-[140px] mr-8">
                        <label className="block text-lg font-semibold text-blue">Title:</label>
                        <select
                            name="title_id"
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md py-[10px] px-3"
                        >
                            <option value="">Select Title</option>
                            {title.map((item, index) => (
                                <option key={index} value={item.title_id}>
                                    {item.title_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="w-[300px] mr-8">
                        <label className="block text-lg font-semibold text-blue">Username :</label>
                        <input
                            type="text"
                            name="username"
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md py-2 px-3"
                        />
                    </div>
                    <div className="w-[300px]">
                        <label className="block text-lg font-semibold text-blue">Password :</label>
                        <input
                            type="text"
                            name="password"
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md py-2 px-3"
                        />
                    </div>
                </div>

                <div className="mt-6 flex">
                    <div className="w-[385px] mr-8">
                        <label className="block text-lg font-semibold text-blue">First Name :</label>
                        <input
                            type="text"
                            name="fname"
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md py-2 px-3"
                        />
                    </div>
                    <div className="w-[385px]">
                        <label className="block text-lg font-semibold text-blue">Last Name :</label>
                        <input
                            type="text"
                            name="lname"
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md py-2 px-3"
                        />
                    </div>
                </div>
                <div className="mt-6 flex">
                    <div className="w-[385px] mr-8">
                        <label className="block text-lg font-semibold text-blue">Email :</label>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md py-2 px-3"
                        />
                    </div>
                    <div className="w-[385px] mr-8">
                        <label className="block text-lg font-semibold text-blue">Tel :</label>
                        <input
                            type="text"
                            name="tel"
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md py-2 px-3"
                        />
                    </div>
                </div>
                <div className="mt-6 flex">
                    <div className="w-[385px] mr-8">
                        <label className="block text-lg font-semibold text-blue">Institution :</label>
                        <select
                            name="institution_id"
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md py-[10px] px-3"
                        >
                            <option value="">Select institution</option>
                            {institution.map((item, index) => (
                                <option key={index} value={item.institution_id}>
                                    {item.institution_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="w-[385px] ">
                        <label className="block text-lg font-semibold text-blue">Role :</label>
                        <select
                            name="role_id"
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md py-[10px] px-3"
                        >
                            <option value="">Select Role</option>
                            {role.map((item, index) => (
                                <option key={index} value={item.role_id}>
                                    {item.role_name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="mt-8 flex justify-end mr-8">
                    <button className="bg-blue text-white py-3 px-5 rounded-xl">Create User</button>
                </div>
            </form>
        </div>
    );
}

export default CreateUser;
