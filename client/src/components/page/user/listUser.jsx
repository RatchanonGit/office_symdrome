import React, { useEffect, useState } from 'react';
import { listUser, removeUser } from '../../functions/user';
import { useSelector } from "react-redux";
import CreateUser from './createUser';
import EditUser from './editUser';
import Modal from 'react-modal';
import { toast } from "react-toastify";
import SelectUser from './SelectUser';
import { Table } from 'antd';


const ListUser = () => {
    const [data, setData] = useState([]);
    const [userQuery, setUserQuery] = useState("");
    const { user } = useSelector((state) => ({ ...state }));
    const [editUserId, setEditUserId] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'user_id',
            width: 50,
        },
        {
            title: 'Username',
            dataIndex: 'username',
            width: 100,
            render: (text, record) => (
                <button
                    className='text-blue underline'
                    onClick={() => handleSelect(record.user_id)}
                >
                    {text}
                </button>
            ),
        },
        {
            title: 'Title',
            dataIndex: 'title_name',
            width: 50,
        },
        {
            title: 'Firstname',
            dataIndex: 'fname',
            width: 100,
        },
        {
            title: 'Lastname',
            dataIndex: 'lname',
            width: 100,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: 150,
        },
        {
            title: 'Tel',
            dataIndex: 'tel',
            width: 100,
        },
        {
            title: 'Institution',
            dataIndex: 'institution_name',
            width: 150,
        },
        {
            title: 'Role',
            dataIndex: 'role_name',
            width: 70,
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
            width: 30,
            render: (text, record) => (
                <button className='text-red-600 underline'
                    onClick={() => handleRemove(record.user_id)}
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

    const handleSelect = (userId) => {
        setSelectedUserId(userId);
        loadData(user.token);
        setIsSelectModalOpen(true)
    };

    const handleEdit = (item) => {
        setEditUserId(item.user_id);
        setIsEditModalOpen(true);
        loadData(user.token);
    };

    useEffect(() => {
        loadData(user.token);
    }, [user]);

    const handleCreated = () => {
        setIsSelectModalOpen(false);
        loadData(user.token);
    };


    const handleUpdated = () => {
        loadData(user.token);
        setIsEditModalOpen(false);
    };

    const loadData = (authtoken) => {
        listUser(authtoken)
            .then(res => {
                setData(res.data);
                console.log(res.data);
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }

    const handleSearch = (query) => {
        setUserQuery(query);
        if (!query) {
            loadData(user.token);
            return;
        }
        const filteredData = data.filter((user) => {
            return user.username.toLowerCase().includes(query.toLowerCase());
        });
        setData(filteredData);
    };


    const handleAddUser = () => {
        setIsCreateModalOpen(!isCreateModalOpen);
    };

    const handleRemove = (id) => {
        console.log(id)
        if (window.confirm("Are You Sure Delete!!")) {
            removeUser(user.token, id)
                .then((res) => {
                    loadData(user.token);
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
    return (
        <div className='mx-10'>
            <div className='flex justify-center my-10'>
                <div className='flex justify-between w-full'>
                    <h1 className='text-3xl pr-7 text-black font-medium pt-1 inline'>USER DATA</h1>
                    <div>
                        <input
                            type="text"
                            placeholder="Useranme search..."
                            className='border rounded py-2 px-3 focus:outline-none focus:border-purple-500 text-black text-sm mr-2'
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                        <button
                            className='bg-blue text-white py-2 px-3 rounded'
                            onClick={() => handleAddUser()}
                        >
                            Add User
                        </button>
                    </div>
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={data}
                pagination={{
                    pageSize: 8,
                }}
                className='w-full'
            />
            <Modal
                isOpen={isSelectModalOpen}
                onRequestClose={() => setIsSelectModalOpen(false)}
                style={{
                    content: {
                        width: '600px',
                        height: 'auto',
                        margin: 'auto',
                        padding: 0,
                    },
                }}
            >
                <SelectUser
                    userId={selectedUserId}
                    data={data}
                />
            </Modal>
            <Modal
                isOpen={isCreateModalOpen}
                onRequestClose={() => setIsCreateModalOpen(false)}
                style={{
                    content: {
                        width: '1000px',
                        height: '650px',
                        margin: 'auto',
                        padding: 0,
                    },
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                }}
            >
                <CreateUser
                    onCreated={handleCreated}
                    onClose={() => setIsCreateModalOpen(false)}
                />
            </Modal>
            <Modal
                isOpen={isEditModalOpen}
                onRequestClose={() => setIsEditModalOpen(false)}
                style={{
                    content: {
                        width: '1000px',
                        height: '500px',
                        margin: 'auto',
                        padding: 0,      
                    },
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                }}
            >
                <EditUser
                    userId={editUserId}
                    onClose={() => setIsEditModalOpen(false)}
                    onUpdated={handleUpdated}
                    data={data}
                />
            </Modal>

        </div>
    );
}

export default ListUser;