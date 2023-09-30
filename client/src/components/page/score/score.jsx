import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { listscore } from '../../functions/score'
import { useSelector } from "react-redux";

const Score = () => {
    const [score, setScore] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));
    const columns = [
        {
            title: 'ID',
            dataIndex: 'score_id',
            width: 50,
        },
        {
            title: 'Username',
            dataIndex: 'user_id',
            width: 120,
        },
        {
            title: 'Task description',
            dataIndex: 'task_description',
            width: 200,
        },
        {
            title: 'Score',
            dataIndex: 'score_value',
            width: 100,
        },
        {
            title: 'Watch time',
            dataIndex: 'watch_time',
            width: 100,
        },
        {
            title: 'Date',
            dataIndex: 'score_date',
            width: 150,
        },

    ];

    useEffect(() => {
        loadDataScore(user.token);
    }, [user]);

    const loadDataScore = (authtoken) => {
        listscore(authtoken)
            .then(res => {
                setScore(res.data);
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }

    return (
        <div className='m-12'>
            <h1 className='text-3xl pr-7 text-black font-bold pt-1 mb-6'>SCORE</h1>
            <Table
                columns={columns}
                dataSource={score}
                pagination={{
                    pageSize: 8,
                }}
                className='w-full'
            
            />
        </div>

    );
}

export default Score;
