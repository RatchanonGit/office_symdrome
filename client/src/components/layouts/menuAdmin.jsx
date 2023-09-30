import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosAddCircleOutline, IoIosArrowDropdown, IoIosArrowDropright } from "react-icons/io";

const MenuAdmin = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav
            className={`w-72 h-screen bg-[#f8f5ff]  flex-shrink ${isDropdownOpen ? "flex flex-col" : "flex flex-row"
                }`}
        >
            <ul className="text-purple-500 flex-grow ">

                <Link to="/listUser"> 
                    <li className="p-5 hover:bg-purple-500 hover:text-white transition duration-300 uppercase text-lg ">
                        <div className="flex items-center">
                            <IoIosAddCircleOutline size={25} />
                            <h2 className="ml-2">User Management</h2>
                        </div>
                    </li>
                </Link>
                <Link to="/scores">
                    <li className="p-5 hover:bg-purple-500 hover:text-white transition duration-300 uppercase text-lg ">
                        <div className="flex items-center">
                            <IoIosAddCircleOutline size={25} />
                            <h2 className="ml-2">Scores</h2>
                        </div>
                    </li>
                </Link>
                <Link to="/schedules">
                    <li className="p-5 hover:bg-purple-500 hover:text-white transition duration-300 uppercase text-lg ">
                        <div className="flex items-center">
                            <IoIosAddCircleOutline size={25} />
                            <h2 className="ml-2">Schedules</h2>
                        </div>
                    </li>
                </Link>
                
                <li
                    onClick={toggleDropdown}
                    className={`transition duration-400 uppercase text-lg cursor-pointer`}
                >
                    <div className="flex items-center p-5 hover:bg-purple-500 hover:text-white">
                        {isDropdownOpen ? <IoIosArrowDropdown size={25} /> : <IoIosArrowDropright size={25} />}
                        <h2 className="ml-2 ">Combo boxes</h2>
                    </div>

                    {isDropdownOpen && (
                        <ul className="text-[#8062D6]">
                            <Link to="/title">
                                <li className="p-5 text-lg  hover:bg-purple-500 hover:text-white ">
                                    <div className="flex items-center pl-5">
                                        <IoIosArrowDropright size={25} />
                                        <h2 className="ml-2">Title</h2>
                                    </div>
                                </li>
                            </Link>

                            <Link to="/role">
                                <li className="p-5 text-lg hover:bg-purple-500 hover:text-white">
                                    <div className="flex items-center pl-5">
                                        <IoIosArrowDropright size={25} />
                                        <h2 className="ml-2">Role</h2>
                                    </div>
                                </li>
                            </Link>

                            <Link to="/institution">
                                <li className="p-5 text-lg hover:bg-purple-500 hover:text-white">
                                    <div className="flex items-center pl-5">
                                        <IoIosArrowDropright size={25} />
                                        <h2 className="ml-2">Institution</h2>
                                    </div>
                                </li>
                            </Link>


                        </ul>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default MenuAdmin;
