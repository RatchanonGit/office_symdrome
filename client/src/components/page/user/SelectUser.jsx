import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { listSumScoreAndSumTime, listScoreLimitDate } from '../../functions/score'
import { useSelector } from "react-redux";

// นำเข้า date adapter
import 'chartjs-adapter-date-fns';

const SelectUser = ({ userId, data }) => {
    const [scoreLimitDate, setScoreLimitDate] = useState([]);
    const [scoreAndTime, setScoreAndTime] = useState([])
    const { user } = useSelector((state) => ({ ...state }));
    const selectedUser = data.find(item => item.user_id === userId);
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);
    const [isScoreDataLoaded, setIsScoreDataLoaded] = useState(false);
    
    const loadDataScoreAndtime = (authtoken) => {
        listSumScoreAndSumTime(userId, authtoken)
            .then(res => {
                setScoreAndTime(res.data);
                console.log(res.data);
                setIsScoreDataLoaded(true);
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }

    const loadDataScoreLimitDate = (authtoken) => {
        listScoreLimitDate(userId, authtoken)
            .then(res => {
                setScoreLimitDate(res.data);
                console.log(res.data);
                setIsScoreDataLoaded(true);
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }

    useEffect(() => {
        if (!isScoreDataLoaded) {
            loadDataScoreLimitDate(user.token);
            loadDataScoreAndtime(user.token)
        }
    }, [isScoreDataLoaded, user.token]);

    useEffect(() => {
        if (isScoreDataLoaded) {
            if (scoreLimitDate.length > 0) {
                if (chartInstanceRef.current) {
                    chartInstanceRef.current.destroy();
                }
                const chartData = {
                    labels: [],
                    datasets: [{
                        label: 'Score',
                        data: [],
                        backgroundColor: '#0F2C59',
                        borderColor: '#0F2C59',
                        borderWidth: 2,
                        fill: false,
                    }],
                };
                scoreLimitDate.forEach(score => {
                    chartData.labels.push(score.formatted_date);
                    chartData.datasets[0].data.push(score.total_score);
                });
                const ctx = chartRef.current.getContext('2d');

                chartInstanceRef.current = new Chart(ctx, {
                    type: 'line',
                    data: chartData,
                    options: {
                        scales: {
                            x: {
                                type: 'time',
                                time: {
                                    unit: 'day',
                                    displayFormats: {
                                        day: 'yyyy-MM-dd',
                                    },
                                },
                                title: {
                                    display: true,
                                    text: 'date',
                                },
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'score',
                                },
                            },
                        },
                    },
                });
                chartRef.current.style.width = '300px';
                chartRef.current.style.height = '250px';
            }
        }
    }, [isScoreDataLoaded, scoreLimitDate]);



    return (
        <div className="">
            {selectedUser && isScoreDataLoaded ? (
                <div>
                    <p className='text-center text-xl my-2 text-blue'>User statistics</p>
                    <div className='flex items-center bg-blue px-3 py-1 text-white'>
                        <img src={selectedUser.image} alt="" className='w-16 h-16 mr-4 rounded-full object-cover ml-5' />
                        <div className="flex flex-col w-full">
                            <div className="flex justify-between items-center">
                                <p className='text-base'>{selectedUser.title_name} {selectedUser.fname} {selectedUser.lname}</p>
                            </div>
                            <p className='text-base'>Institution : {selectedUser.institution_name}</p>
                        </div>
                    </div>

                    <div className='flex  justify-between mx-10 my-6'>
                        <div className='rounded-md border-[2px] border-blue w-60'>
                            <p className='bg-blue text-white text-center p-2 text-xl'>Active time</p>
                            {scoreAndTime[0] ? (
                                <p className='text-center p-5 text-2xl text-blue'>{scoreAndTime[0].watch_time} minute</p>
                            ) : (
                                <p className='text-center p-5 text-2xl text-blue'>Loading...</p>
                            )}
                        </div>
                        <div className='rounded-md border-[2px] border-blue w-60'>
                            <p className='bg-blue text-center text-white p-2 text-xl'>Total score</p>
                            {scoreAndTime[0] ? (
                                <p className='text-center p-5 text-2xl text-blue'>{scoreAndTime[0].total_score} score</p>
                            ) : (
                                <p className='text-center p-5 text-2xl text-blue'>Loading...</p>
                            )}
                        </div>
                    </div>


                    <canvas ref={chartRef}></canvas>

                </div>
            ) : (
                <p>ไม่พบข้อมูลผู้ใช้</p>
            )}
        </div>
    );
};

export default SelectUser;
