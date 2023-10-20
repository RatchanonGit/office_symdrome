import React from 'react';
import {
    LogoutOutlined,
    DownOutlined,
    UserOutlined,
    ScheduleOutlined,
    LineChartOutlined,
    TrophyOutlined,
    SolutionOutlined,
    ContainerOutlined,
    FundProjectionScreenOutlined
} from '@ant-design/icons';
import { Dropdown, Space, Menu } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const menu = [
        {
            key: '1',
            label: (
                <Link to="/dashboard">
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

    const items = [
        {
            key: '8',
            label: "Logout",
            icon: <LogoutOutlined />,
            onClick: () => {
                dispatch({
                    type: "LOGOUT",
                    payload: null,
                });
                navigate("/");
            }
        },
    ];



    return (
        <div className='w-full h-16 bg-blue flex justify-between items-center'>
            <Dropdown
                overlay={(
                    <Menu>
                        {menu.map(item => (
                            <Menu.Item key={item.key} icon={item.icon}>
                                {item.label}
                            </Menu.Item>
                        ))}
                    </Menu>
                )}
                placement="bottomRight"
            >
                <Space>
                    <h1 className='text-white font-medium text-[25px] ml-6'>Office syndrome</h1>
                    <DownOutlined style={{
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        marginTop: '5px',
                    }} />
                </Space>
            </Dropdown>

            {user && (
                <div className="flex items-center mr-6 text-white">
                    <UserOutlined style={{
                        fontSize: '20px',
                        marginRight: '10px',
                        backgroundColor: 'white',
                        color: '#0F2C59',
                        padding: '8px',
                        borderRadius: '20px'
                    }} />
                    <div>
                        <p className="text-sm font-semibold">{user.firstname} {user.lastname}</p>
                        <p className="text-xs">Role : {user.role}</p>
                    </div>
                    <Dropdown
                        menu={{
                            items,
                        }}
                    >
                        <DownOutlined style={{
                            color: 'white',
                            fontSize: '12px',
                            marginLeft: '10px',
                            fontWeight: 'bold',
                        }} />
                    </Dropdown>
                </div>
            )}
        </div>
    );
}

export default Navbar;
