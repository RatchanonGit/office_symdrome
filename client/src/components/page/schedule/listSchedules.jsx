import React, { useEffect, useState } from 'react';
import { listSchedules, removeSchedules } from '../../functions/schedules';
import { useSelector } from "react-redux";
import Schedules from './createSchedules';
import Modal from 'react-modal';
import EditSchedules from './editSchedules';
import { toast } from "react-toastify";
import { Table } from 'antd';

const ListSchedules = () => {
    const [schedules, setSchedules] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));
    const [editSchedulesId, setEditSchedulesId] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCreateModalOpen, setIsModalOpen] = useState(false);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'schedules_id',
            width: 50,
        },
        {
            title: 'Mode',
            dataIndex: 'mode',
            width: 60,
        },
        {
            title: 'Day of week',
            dataIndex: 'days_of_week',
            width: 100,
        },
        {
            title: 'Schedules time',
            dataIndex: 'schedule_time',
            width: 100,
        },
        {
            title: 'Task description',
            dataIndex: 'task_description',
            width: 300,
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
            width: 30,
            render: (text, record) => (
                <button className='text-red-600 underline'
                    onClick={() => handleRemove(record.schedules_id)}
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

    const handleEdit = (item) => {
        setEditSchedulesId(item.schedules_id);
        setIsEditModalOpen(true);
        loadData(user.token);
    };

    useEffect(() => {
        loadData(user.token);
    }, [user]);

    const handleCreated = () => {
        setIsModalOpen(false);
        loadData(user.token);
    };

    const handleUpdated = () => {
        loadData(user.token);
        setIsEditModalOpen(false);
    };

    const loadData = (authtoken) => {
        listSchedules(authtoken)
            .then(res => {
                setSchedules(res.data);
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }

    const handleAddSchedules = () => {
        setIsModalOpen(!isCreateModalOpen);
    };

    const handleRemove = (id) => {
        console.log(id)
        if (window.confirm("Are you sure you want to delete this?")) {
            removeSchedules(user.token, id)
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
                    <h1 className='text-3xl pr-7 text-black pt-1 inline'>SCHEDULES DATA</h1>
                    <div>
                        <button
                            className='bg-blue text-white py-2 px-3 rounded '
                            onClick={() => handleAddSchedules()}
                        >
                            Add Schedules
                        </button>
                    </div>
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={schedules}
                pagination={{
                    pageSize: 8,
                }}
                className='w-full'
            />
            <Modal
                isOpen={isCreateModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                style={{
                    content: {
                        width: '1000px',
                        height: '600px',
                        margin: 'auto',
                        padding: 0,
                    },
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                }}
            >
                <Schedules
                    onCreated={handleCreated}
                    onClose={() => setIsModalOpen(false)}
                />
            </Modal>

            <Modal
                isOpen={isEditModalOpen}
                onRequestClose={() => setIsEditModalOpen(false)}
                style={{
                    content: {
                        width: '1000px',
                        height: 'auto',
                        margin: 'auto',
                        padding: 0,
                        backgroundColor: 'white',
                    },
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },


                }}
            >
                <EditSchedules
                    schedulesId={editSchedulesId}
                    onClose={() => setIsEditModalOpen(false)}
                    onUpdated={handleUpdated}
                    schedules={schedules}
                />

            </Modal>
        </div>
    );
}

export default ListSchedules;
