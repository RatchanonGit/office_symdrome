import React, { useState, useEffect, useRef } from 'react';
import MenuAdmin from '../../layouts/menuAdmin';
import { listUser } from '../../functions/user';
import { useSelector } from "react-redux";
import Chart from 'chart.js/auto'; // เพิ่ม import Chart

const Home = () => {
    const [data, setData] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));
    const [dataCount, setDataCount] = useState(0); // เพิ่ม state เพื่อเก็บจำนวนข้อมูล
    const [topRankedUsers, setTopRankedUsers] = useState([]);
    const chartRef = useRef(null); // สร้าง ref สำหรับ Canvas

    useEffect(() => {
        loadData(user.token);
    }, [user]);

    useEffect(() => {
        // เรียกฟังก์ชันสร้างกราฟเมื่อมีการอัพเดทข้อมูล
        createChart(data);
    }, [data]);

    const loadData = (authtoken) => {
        listUser(authtoken)
            .then(res => {
                setData(res.data);
                setDataCount(res.data.length); // ตั้งค่าจำนวนข้อมูล
                console.log(res.data);
                const sortedData = [...res.data].sort((a, b) => b.rank - a.rank); // เรียงลำดับข้อมูลตามแรงค์
                const top10RankedUsers = sortedData.slice(0,10); // เลือกเฉพาะ top 10 ของแรงค์
                setTopRankedUsers(top10RankedUsers);
                console.log(top10RankedUsers);
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }

    const createChart = (data) => {
        const institutions = {}; // สร้างออบเจ็กต์เพื่อเก็บจำนวนผู้ใช้ในแต่ละสาขา

        // นับจำนวนผู้ใช้ในแต่ละสาขา
        data.forEach(user => {
            const institutionName = user.institution_name;
            if (!institutions[institutionName]) {
                institutions[institutionName] = 1;
            } else {
                institutions[institutionName]++;
            }
        });

        // แปลงข้อมูลในรูปแบบที่ Chart.js สามารถใช้ได้
        const labels = Object.keys(institutions);
        const dataValues = Object.values(institutions);

        // ล้าง Canvas เก่า
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        // สร้าง Canvas และกราฟใหม่
        const ctx = document.getElementById('userChart');
        chartRef.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'จำนวนผู้ใช้',
                    data: dataValues,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    return (
        <div className='flex'>
            <MenuAdmin />
            <div><p>จำนวนข้อมูล: {dataCount}</p> {/* แสดงจำนวนข้อมูลที่นับได้ */}</div>
            <div>
                <h2>Top 10 ของแรงค์</h2>
                <ul>
                    {topRankedUsers.map((user, index) => (
                        <li key={index}>{user.username} - Rank: {user.rank}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>กราฟจำนวนผู้ใช้ตามสาขา</h2>
                <canvas id="userChart" width="400" height="200"></canvas>
            </div>
        </div>
    );
}

export default Home;
