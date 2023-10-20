import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Line,Bar } from 'react-chartjs-2';
import {
    listSumScore,
    listSumTime,
    listSumUser,
    listTopTenScore,
    listSumUserOnInstitution,
    listSumScoreLimitDate
} from '../functions/dashboard';

import {
    UserOutlined,
    LineChartOutlined,
    SolutionOutlined,
    TrophyOutlined
} from '@ant-design/icons';

const Dashboard = () => {
    const [sumUser, setSumUser] = useState([]);
    const [sumScore, setSumScore] = useState([]);
    const [sumTime, setSumTime] = useState([]);
    const [sumScoreLimitDate, setSumScoreLimitDate] = useState([]);
    const [topTenScore, setTopTenScore] = useState([]);
    const [sumUserOnInstitution, setSumUserOnInstitution] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));

    const loadDataSumUser = (authtoken) => {
        listSumUser(authtoken)
            .then((res) => {
                setSumUser(res.data);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    };

    const loadDataSumScore = (authtoken) => {
        listSumScore(authtoken)
            .then((res) => {
                setSumScore(res.data);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    };

    const loadDataSumTime = (authtoken) => {
        listSumTime(authtoken)
            .then((res) => {
                setSumTime(res.data);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    };

    const loadDataSumScoreLimitDate = (authtoken) => {
        listSumScoreLimitDate(authtoken)
            .then((res) => {
                setSumScoreLimitDate(res.data);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    };

    const loadDataTopTenScore = (authtoken) => {
        listTopTenScore(authtoken)
            .then((res) => {
                setTopTenScore(res.data);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    };

    const loadDataSumUserOnInstitution = (authtoken) => {
        listSumUserOnInstitution(authtoken)
            .then((res) => {
                setSumUserOnInstitution(res.data);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    };

    useEffect(() => {
        loadDataSumUser(user.token);
        loadDataSumScore(user.token);
        loadDataSumTime(user.token);
        loadDataSumScoreLimitDate(user.token);
        loadDataSumUserOnInstitution(user.token);
        loadDataTopTenScore(user.token);
    }, [user]);

    const chartLabelsScore = sumScoreLimitDate.map((entry) => entry.formatted_date);
    const chartDataPointsScore = sumScoreLimitDate.map((entry) => parseInt(entry.total_score, 10));

    const chartDataScore = {
        labels: chartLabelsScore,
        datasets: [
            {
                label: 'Total Score',
                data: chartDataPointsScore,
                fill: true,
                backgroundColor: '#0f2d5923',
                borderColor: '#0F2C59',

                borderWidth: 2,
            },
        ],
    };

    const chartLabels = sumUserOnInstitution.map(entry => entry.institution_name);
    const chartDataPoints = sumUserOnInstitution.map(entry => parseInt(entry.sum_institution, 10));

    const chartData = {
        labels: chartLabels,
        datasets: [
            {
                label: 'users',
                data: chartDataPoints,
                backgroundColor: '#0f2d5923',
                borderColor: '#0F2C59', 
                borderWidth: 2,
            },
        ],
    };

    return (
        <div className="w-full h-full p-10 bg-gray">
            <div className="flex justify-center">
                <div className="rounded-xl bg-white border-white w-72  pt-4 pl-8 mr-8">
                    <p className='text-xl flex items-center  text-blue'><UserOutlined style={{
                        background: '#0F2C59',
                        borderRadius: '20px',
                        fontSize: '20px',
                        padding: '10px',
                        color: '#F8F6F4',
                        marginRight: '15px',
                    }} /> Total User</p>
                    {sumUser[0] ? (
                        <>
                            <span className="text-center pl-14 text-[50px] text-blue ">{sumUser[0].user_count}
                                <p className='text-sm inline pl-2'>people</p></span>

                        </>
                    ) : (
                        <p className="text-center px-8 pt-4 text-4xl text-blue font-semibold">Loading...</p>
                    )}
                </div>

                <div className="rounded-xl bg-white border-white w-72  pt-4 pl-8 mr-8">
                    <p className='text-xl flex items-center  text-blue'><UserOutlined style={{
                        background: '#0F2C59',
                        borderRadius: '20px',
                        fontSize: '20px',
                        padding: '10px',
                        color: '#F8F6F4',
                        marginRight: '15px',
                    }} />User online</p>
                    {sumUser[0] ? (
                        <>
                            <span className="text-center pl-14 text-[50px] text-blue">0
                                <p className='text-sm inline pl-2'>people</p></span>

                        </>
                    ) : (
                        <p className="text-center px-8 pt-4 text-4xl text-blue font-semibold">Loading...</p>
                    )}
                </div>

                <div className="rounded-xl bg-white border-white w-72  pt-4 pl-8 mr-8">
                    <p className='text-xl flex items-center  text-blue'><SolutionOutlined style={{
                        background: '#0F2C59',
                        borderRadius: '20px',
                        fontSize: '20px',
                        padding: '10px',
                        color: '#F8F6F4',
                        marginRight: '15px',
                    }} /> Total Score</p>
                    {sumScore[0] ? (
                        <>
                            <span className="text-center pl-14 text-[50px] text-blue ">{sumScore[0].sum_score}
                                <p className='text-sm inline pl-2'>score</p></span>

                        </>
                    ) : (
                        <p className="text-center px-8 pt-4 text-4xl text-blue font-semibold">Loading...</p>
                    )}
                </div>

                <div className="rounded-xl bg-white border-white w-72  pt-4 pl-8">
                    <p className='text-xl flex items-center  text-blue'><SolutionOutlined style={{
                        background: '#0F2C59',
                        borderRadius: '20px',
                        fontSize: '20px',
                        padding: '10px',
                        color: '#F8F6F4',
                        marginRight: '15px',
                    }} /> Total time</p>
                    {sumTime[0] ? (
                        <>
                            <span className="text-center pl-14 text-[50px] text-blue">{sumTime[0].sum_time}
                                <p className='text-sm inline pl-2'>minute</p></span>

                        </>
                    ) : (
                        <p className="text-center px-8 pt-4 text-4xl text-blue font-semibold">Loading...</p>
                    )}
                </div>

            </div>
            <div className='flex'>
                <div className='w-[55%] h-[480px] mt-10 mr-10 rounded-xl bg-white border-white px-10 pb-10 pt-5'>
                <p className='text-xl flex items-center justify-center  text-blue'><LineChartOutlined style={{
                        background: '#0F2C59',
                        borderRadius: '20px',
                        fontSize: '20px',
                        padding: '10px',
                        color: '#F8F6F4',
                        marginRight: '15px',
                    }} />User's 7-day Total Rating Graph</p>
                    <Line data={chartDataScore} options={{ maintainAspectRatio: false }}
                        style={{
                            height: '380px',
                            marginTop : '10px'
                        }} />
                </div>

                <div className='w-[45%] h-[480px] mt-10 rounded-xl bg-white border-white px-10 pb-10 pt-5 '>
                    <p className='text-xl flex items-center  text-blue'><TrophyOutlined style={{
                        background: '#0F2C59',
                        borderRadius: '20px',
                        fontSize: '20px',
                        padding: '10px',
                        color: '#F8F6F4',
                        marginRight: '15px',
                    }} />Top 10 User's Score</p>
                    {topTenScore.map((item, index) => (
                        <div key={index} className='mt-3 flex'>
                            <span className='w-5'>{index + 1}.</span>
                            <span className='mx-3 w-36'>{item.username}</span>
                            <span className='mx-3 w-48'>{item.fname} {item.lname}</span>
                            <span className='mx-3 '>score : {item.total_score}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className='w-[100%] h-[500px] mt-10 mr-10 rounded-xl bg-white border-white px-10 pb-10 pt-5'>
            <p className='text-xl flex items-center justify-center  text-blue'><LineChartOutlined style={{
                        background: '#0F2C59',
                        borderRadius: '20px',
                        fontSize: '20px',
                        padding: '10px',
                        color: '#F8F6F4',
                        marginRight: '15px',
                    }} />User's Institution Data</p>
                <Bar
                    data={chartData}
                    options={{
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    }}
                    style={{
                        marginTop : '10px',
                        height: '400px'
                    }} 
                    
                />
            </div>
        </div>
    );
};

export default Dashboard;
