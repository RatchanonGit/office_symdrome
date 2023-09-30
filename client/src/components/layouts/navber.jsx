import React from 'react';
import {
    DownOutlined,
    UserOutlined,
    ScheduleOutlined,
    LineChartOutlined,
    TrophyOutlined,
    SolutionOutlined,
    ContainerOutlined,
    FundProjectionScreenOutlined 
} from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { Link } from 'react-router-dom';

const items = [
    {
        key: '1',
        label: (
            <Link to="/admin/home">
               Dashboard
            </Link>
        ),
        icon: <FundProjectionScreenOutlined />
    },
    {
        key: '2',
        label: (
            <Link to="/listUser">
                User Management
            </Link>
        ),
        icon: <UserOutlined />
    },
    {
        key: '3',
        label: (
            <Link to="/schedules">
                Schedules
            </Link>
        ),
        icon: <ScheduleOutlined />
    },
    {
        key: '4',
        label: (
            <Link to="/scores">
                Scores
            </Link>
        ),
        icon: <LineChartOutlined />
    },
    {
        key: '5',
        label: (
            <Link to="/institution">
                Institution
            </Link>
        ),
        icon: <ContainerOutlined />
    },
    {
        key: '6',
        label: (
            <Link to="/role">
                Role
            </Link>
        ),
        icon: <TrophyOutlined />
    },
    {
        key: '7',
        label: (
            <Link to="/title">
                Title
            </Link>
        ),
        icon: <SolutionOutlined />
    },

];

const Navbar = () => {
    return (
        <div className='w-full h-16 bg-blue flex justify-between items-center'>
            <Dropdown
                menu={{
                    items,
                }}
            >
                <Space>
                    <h1 className='text-white font-medium text-[25px] ml-6'>Office symdrome</h1>
                    <DownOutlined style={{
                        color: 'white',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        marginTop: '5px',
                    }} />
                </Space>
            </Dropdown>
        </div>
    );
}

export default Navbar;
