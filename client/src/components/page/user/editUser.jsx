import React, { useState, useEffect } from 'react';
import { updateUser } from '../../functions/user';
import { listTitle } from '../../functions/title';
import { listRole } from '../../functions/role';
import { listInstitution } from '../../functions/institution';
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const EditUser = ({ userId, data, onClose, onUpdated }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const [title, setTitle] = useState([]);
    const [role, setRole] = useState([]);
    const [institution, setInstitution] = useState([]);
    const [userData, setUserData] = useState({
        registration_date: Date.now(),
        rank: "0",
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

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser(user.token, userId, userData)
            .then(res => {
                console.log(res.data);
                toast.success((res.data), {
                    position: "top-center",
                    autoClose: 2000
                });
                onUpdated();
                onClose();
            }).catch(error => {
                toast.error((error.response.data), {
                    position: "top-center",
                    autoClose: 2000
                });
            });
    }

    useEffect(() => {
        if (data && data.length > 0) {
            const selectedUser = data.find((user) => user.user_id === userId);
            if (selectedUser) {
                setUserData(selectedUser);
            }
        }
        loadDataRole(user.token);
        loadDataInstitution(user.token);
        loadDataTitle(user.token);

    }, [userId, data, user]);

    return (
        <div className='h-full flex justify-center items-center'>
            <form className='w-auto' onSubmit={handleSubmit}>
                <h1 className='text-4xl  uppercase text-blue'>Edit User</h1>
                <div className="flex mt-5">
                    <div className="w-[140px] mr-8">
                        <label className="block text-lg  text-blue">Title</label>
                        <select
                            name="title_id"
                            onChange={handleChange}
                            value={userData.title_id}
                            required
                            className="w-full border border-gray-300 rounded-md py-[10px] px-3"
                        >
                            {/* <option value="">Select Title</option> */}
                            {title.map((item, index) => (
                                <option key={index} value={item.title_id}>
                                    {item.title_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="w-[300px] mr-8">
                        <label className="block text-lg  text-blue">First name</label>
                        <input
                            type="text"
                            name="fname"
                            onChange={handleChange}
                            value={userData.fname}
                            required
                            placeholder='input first name'
                            className="w-full border border-gray-300 rounded-md py-2 px-3"
                            pattern="^[A-Z][a-z]+"
                            onInvalid={(e) => {
                                e.target.setCustomValidity("Please enter a first name that starts with an uppercase letter followed by lowercase letters.");
                            }}
                            onInput={(e) => {
                                e.target.setCustomValidity("");
                            }}
                        />
                    </div>
                    <div className="w-[300px]">
                        <label className="block text-lg  text-blue">Last name</label>
                        <input
                            type="text"
                            name="lname"
                            onChange={handleChange}
                            value={userData.lname}
                            required
                            placeholder='input last name'
                            className="w-full border border-gray-300 rounded-md py-2 px-3"
                            pattern="^[A-Z][a-z]+"
                            onInvalid={(e) => {
                                e.target.setCustomValidity("Please enter a last name that starts with an uppercase letter followed by lowercase letters.");
                            }}
                            onInput={(e) => {
                                e.target.setCustomValidity("");
                            }}
                        />
                    </div>
                </div>

                <div className="mt-6 flex">
                    <div className="w-[385px] mr-8">
                        <label className="block text-lg  text-blue">Email</label>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            value={userData.email}
                            required
                            placeholder='ex. john@gmail.com'
                            className="w-full border border-gray-300 rounded-md py-2 px-3"
                        />
                    </div>
                    <div className="w-[385px] mr-8">
                        <label className="block text-lg  text-blue">Tel</label>
                        <input
                            type="text"
                            name="tel"
                            onChange={handleChange}
                            value={userData.tel}
                            pattern="^(08|09|06)\d{1}-\d{5,10}$"
                            placeholder='ex. 099-9909990'
                            className="w-full border border-gray-300 rounded-md py-2 px-3"
                            onInvalid={(e) => {
                                e.target.setCustomValidity("Please enter a phone number in the format 09X-XXXXXX, where X is a digit.");
                            }}
                            onInput={(e) => {
                                e.target.setCustomValidity("");
                            }}
                        />
                    </div>
                </div>
                <div className="mt-6 flex">
                    <div className="w-[385px] mr-8">
                        <label className="block text-lg  text-blue">Institution</label>
                        <select
                            name="institution_id"
                            onChange={handleChange}
                            value={userData.institution_id}
                            required
                            className="w-full border border-gray-300 rounded-md py-[10px] px-3"
                        >
                            {/* <option value="">Select institution</option> */}
                            {institution.map((item, index) => (
                                <option key={index} value={item.institution_id}>
                                    {item.institution_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="w-[385px] mr-8">
                        <label className="block text-lg  text-blue">Role</label>
                        <select
                            name="role_id"
                            onChange={handleChange}
                            value={userData.role_id}
                            required
                            className="w-full border border-gray-300 rounded-md py-[10px] px-3"
                        >
                            {/* <option value="">Select Role</option> */}
                            {role.map((item, index) => (
                                <option key={index} value={item.role_id}>
                                    {item.role_name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <button className="bg-blue text-white py-3 px-5 rounded-xl mt-8">Save Changes</button>
            </form>
        </div>
    );
}

export default EditUser;
