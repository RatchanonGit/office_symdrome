import React, { useState, useEffect } from 'react';
import {
    listTitle,
    createTitle,
    removeTitle,
    updateTitle
} from '../../functions/title';
import { useSelector } from "react-redux";
import { Table } from 'antd';
import { toast } from "react-toastify";

const Titles = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [title, setTitle] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [selectTitleId, setSelectTitleId] = useState(null);
    const [value, setValue] = useState({
        title_name: ""
    })

    const columns = [
        {
            title: 'ID',
            dataIndex: 'title_id',
            width: 50,
        },
        {
            title: 'Name',
            dataIndex: 'title_name',
            width: 150,
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
            width: 30,
            render: (text, record) => (
                <button className='text-red-600 underline'
                    onClick={() => handleRemove(record.title_id)}
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
        loadDataTitle(user.token);
    }, [user]);

    const loadDataTitle = (authtoken) => {
        listTitle(authtoken)
            .then(res => {
                setTitle(res.data);
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!value.title_name) {
            toast.error(('Please input Title'), {
                position: "top-center",
                autoClose: 2000
            });
        }
        else {
            createTitle(user.toekn,value)
                .then(res => {
                    console.log(res.data)
                    toast.success((res.data), {
                        position: "top-center",
                        autoClose: 2000
                    });
                    loadDataTitle(user.token);
                    setValue({
                        title_name: ""
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
        updateTitle(user.token, selectTitleId, value)
            .then(res => {
                toast.success((res.data), {
                    position: "top-center",
                    autoClose: 2000
                });
                loadDataTitle(user.token);
                setEditMode(false);
                setSelectTitleId(null);
                setValue({
                    title_name: ""
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
        setSelectTitleId(item.title_id)
        setValue({
            title_name : item.title_name
        });
    };

    const handleCancelEdit = (e) => {
        e.preventDefault()
        setEditMode(false);
        setSelectTitleId(null);
        setValue({
            title_name: ""
        });
    };

    const handleRemove = (id) => {
        if (window.confirm("Are you sure you want to delete this?")) {
            removeTitle(user.token, id)
                .then((res) => {
                    loadDataTitle(user.token);
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
                    <h1 className='text-2xl pr-7 text-black  pt-1 inline'>TITLE</h1>
                    <input type="text" className='border rounded py-2 px-3 focus:outline-none  text-black w-[480px] mr-5 text-lg'
                        placeholder='Enter title'
                        name='title_name'
                        value={value.title_name}
                        onChange={handleChange}
                        pattern="^[A-Z][a-z\s]+"
                        onInvalid={(e) => {
                            e.target.setCustomValidity("Please enter a title that starts with an uppercase letter followed by lowercase letters.");
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
                dataSource={title}
                pagination={{
                    pageSize: 7,
                }}
                className='w-4/5 mx-auto '
            />
        </div>
    );
};

export default Titles;
