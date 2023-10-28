import React, { useState, useEffect } from 'react';
import {
    listRole,
    createRole,
    removeRole,
    updateRole
} from '../../functions/role';
import { useSelector } from "react-redux";
import { Table } from 'antd';
import { toast } from "react-toastify";

const Roles = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [role, setRole] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [selectRoleId, setSelectRoleId] = useState(null);
    const [value, setValue] = useState({
        role_name: ""
    })

    const columns = [
        {
            title: 'ID',
            dataIndex: 'role_id',
            width: 50,
        },
        {
            title: 'Name',
            dataIndex: 'role_name',
            width: 150,
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
            width: 30,
            render: (text, record) => (
                <button className='text-red-600 underline'
                    onClick={() => handleRemove(record.role_id)}
                >
                    Delete</button>
            ),
        },
        {
            title: 'Edit',
            dataIndex: 'edit',
            width: 30,
            render: (text, record) => (
                <button className='text-blue underline'
                    onClick={() => handleEdit(record)}
                >

                    Edit</button>
            ),
        },
    ];

    useEffect(() => {
        loadDataRole(user.token);
    }, [user]);

    const loadDataRole = (authtoken) => {
        listRole(authtoken)
            .then(res => {
                setRole(res.data);
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!value.role_name) {
            toast.error(('Please input Role'), {
                position: "top-center",
                autoClose: 2000
            });
        }
        else {
            createRole(user.token,value)
                .then(res => {
                    toast.success((res.data), {
                        position: "top-center",
                        autoClose: 2000
                    });
                    loadDataRole(user.token);
                    setValue({
                        role_name: ""
                    });
                }).catch(error => {
                    toast.error((error.response.data), {
                        position: "top-center",
                        autoClose: 2000
                    });
                })
        }
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        updateRole(user.token, selectRoleId, value)
            .then(res => {
                toast.success((res.data), {
                    position: "top-center",
                    autoClose: 2000
                });
                loadDataRole(user.token);
                setEditMode(false);
                setSelectRoleId(null);
                setValue({
                    role_name: ""
                });
            })
            .catch(error => {
                toast.error((error.response.data), {
                    position: "top-center",
                    autoClose: 2000
                });
            });
    };

    const handleEdit = (item) => {
        setEditMode(true);
        setSelectRoleId(item.role_id)
        setValue({
            role_name : item.role_name
        });
    };

    const handleCancelEdit = (e) => {
        e.preventDefault()
        setEditMode(false);
        setSelectRoleId(null);
        setValue({
            role_name: ""
        });
    };

    const handleRemove = (id) => {
        if (window.confirm("Are you sure you want to delete this?")) {
            removeRole(user.token, id)
                .then((res) => {
                    loadDataRole(user.token);
                    toast.success((res.data), {
                        position: "top-center",
                        autoClose: 2000
                    });
                })
                .catch((error) => {
                    toast.error((error.response.data), {
                        position: "top-center",
                        autoClose: 2000
                    });
                });
        }
    };

    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
        console.log(value)
    }

    return (
        <div>
            <div className="flex justify-center my-10">
                <form onSubmit={editMode ? handleUpdate : handleSubmit}>
                    <h1 className='text-2xl pr-7 text-black  pt-1 inline'>ROLE</h1>
                    <input type="text" className='border rounded py-2 px-3 focus:outline-none  text-black w-[480px] mr-5 text-lg'
                        placeholder='Enter role'
                        name='role_name'
                        value={value.role_name}
                        onChange={handleChange}
                        pattern="^[A-Z][a-z\s]+"
                        onInvalid={(e) => {
                            e.target.setCustomValidity("Please enter a role that starts with an uppercase letter followed by lowercase letters.");
                        }}
                        onInput={(e) => {
                            e.target.setCustomValidity("");
                        }}
                    />
                    {editMode ? (
                        <>
                            <button
                                className='bg-blue text-white py-2 px-3 rounded mr-2'
                                onClick={handleUpdate}
                            >
                                Update
                            </button>
                            <button
                                className='bg-red-500 text-white py-2 px-3 rounded'
                                onClick={handleCancelEdit}
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button className= 'bg-blue text-white py-2 px-4 rounded' type="submit">
                            Add
                        </button>
                    )}
                </form>
            </div>

            <Table
                columns={columns}
                dataSource={role}
                pagination={{
                    pageSize: 7,
                }}
                className='w-4/5 mx-auto '
            />
        </div>
    );
};

export default Roles;
