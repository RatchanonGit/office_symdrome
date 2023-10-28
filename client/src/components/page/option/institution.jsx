import React, { useState, useEffect } from 'react';
import {
    listInstitution,
    createInstitution,
    removeInstitution,
    updateInstitution
} from '../../functions/institution';
import { useSelector } from "react-redux";
import { Table } from 'antd';
import { toast } from "react-toastify";

const Institutions = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [institution, setInstitution] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [selectInstitutionId, setSelectInstitutionId] = useState(null);
    const [value, setValue] = useState({
        institution_name: ""
    })

    const columns = [
        {
            title: 'ID',
            dataIndex: 'institution_id',
            width: 50,
        },
        {
            title: 'Name',
            dataIndex: 'institution_name',
            width: 150,
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
            width: 30,
            render: (text, record) => (
                <button className='text-red-600 underline'
                    onClick={() => handleRemove(record.institution_id)}
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
        loadDataInstitution(user.token);
    }, [user]);

    const loadDataInstitution = (authtoken) => {
        listInstitution(authtoken)
            .then(res => {
                setInstitution(res.data);
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!value.institution_name) {
            toast.error(('Please input Institution'), {
                position: "top-center",
                autoClose: 2000
            });
        }
        else {
            createInstitution(user.token,value)
                .then(res => {
                    console.log(res.data)
                    toast.success((res.data), {
                        position: "top-center",
                        autoClose: 2000
                    });
                    loadDataInstitution(user.token);
                    setValue({
                        institution_name: ""
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
        updateInstitution(user.token, selectInstitutionId, value)
            .then(res => {
                toast.success((res.data), {
                    position: "top-center",
                    autoClose: 2000
                });
                loadDataInstitution(user.token);
                setEditMode(false);
                setSelectInstitutionId(null);
                setValue({
                    institution_name: ""
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
        setSelectInstitutionId(item.institution_id)
        setValue({
            institution_name : item.institution_name
        });
    };

    const handleCancelEdit = (e) => {
        e.preventDefault()
        setEditMode(false);
        setSelectInstitutionId(null);
        setValue({
            institution_name: ""
        });
    };

    const handleRemove = (id) => {
        if (window.confirm("Are you sure you want to delete this?")) {
            removeInstitution(user.token, id)
                .then((res) => {
                    loadDataInstitution(user.token);
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
                    <h1 className='text-2xl pr-7 text-black  pt-1 inline'>INSTITUTION</h1>
                    <input type="text" className='border rounded py-2 px-3 focus:outline-none  text-black w-[480px] mr-5 text-lg'
                        placeholder='Enter institution'
                        name='institution_name'
                        value={value.institution_name}
                        onChange={handleChange}
                        required
                        pattern="^[A-Z][a-z\s]+"
                        onInvalid={(e) => {
                            e.target.setCustomValidity("Please enter a institution that starts with an uppercase letter followed by lowercase letters.");
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
                dataSource={institution}
                pagination={{
                    pageSize: 7,
                }}
                className='w-4/5 mx-auto '
            />
        </div>
    );
};

export default Institutions;
