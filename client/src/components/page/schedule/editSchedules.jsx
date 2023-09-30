import React, { useState, useEffect } from 'react';
import { updateSchedules } from '../../functions/schedules'
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const EditSchedules = ({ schedulesId, schedules, onClose, onUpdated }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const [schesulesData, setSchesulesData] = useState({
        days_of_week: [],
    });

    const weekdays = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
    ];

    const modeSelect = [
        'video', 'publish'
    ]

    const handleChange = (e) => {
        const { name, checked } = e.target;
        const updatedDays = [...schesulesData.days_of_week.split(',').join('')]; // แยกข้อมูลที่มีอยู่เป็นอาร์เรย์

        if (checked) {
            updatedDays.push(weekdays.indexOf(name).toString()); // เพิ่มค่าลงในอาร์เรย์
        } else {
            const index = updatedDays.indexOf(weekdays.indexOf(name).toString());
            if (index !== -1) {
                updatedDays.splice(index, 1); // ลบค่าออกจากอาร์เรย์
            }
        }

        // รวมข้อมูลใหม่เป็น string และอัปเดต state
        setSchesulesData({
            ...schesulesData,
            [e.target.name]: e.target.value,
            days_of_week: updatedDays.join(',')
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        updateSchedules(user.token, schedulesId, schesulesData)
            .then(res => {
                console.log(res.data)
                toast.success((res.data), {
                    position: "top-center",
                    autoClose : 2000
                  });
                onUpdated();
                onClose();
            }).catch(error => {
                console.log(error.data)
            })
    }

    useEffect(() => {
        if (schedules && schedules.length > 0) {
            const selectedSchedules = schedules.find((item) => item.schedules_id === schedulesId);
            if (selectedSchedules) {
                setSchesulesData(selectedSchedules);
            }
        }
    }, [schedules, user, schedulesId]);

    return (
        <div className='bg-[#fbf9ff] min-h-full flex justify-center items-center'>
            <form className='w-auto' onSubmit={handleSubmit} >
                <h1 className='text-4xl font-semibold uppercase text-black mb-10'>Update Schedules</h1>
                <label className="block text-lg font-semibold mt-5 text-black">Select Days :</label>
                <div className="flex flex-wrap gap-4 mt-2">
                    {weekdays.map((day) => (
                        <label key={day} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                value={day} 
                                name={day}
                                onChange={handleChange}
                                checked={schesulesData.days_of_week && schesulesData.days_of_week.includes(weekdays.indexOf(day).toString())}
                                className="form-checkbox h-5 w-5 text-blue-600"
                            />
                            <span className="text-lg text-black">{day}</span>
                        </label>
                    ))}
                </div>

                <div className="mt-6 flex">
                    <div className="w-[385px] mr-8">
                        <label className="block text-lg font-semibold text-black">Schedule_time :</label>
                        <input
                            type="text"
                            value={schesulesData.schedule_time}
                            name="schedule_time"
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 mt-2"
                        />
                    </div>

                    <div className="w-[385px] mr-8">
                        <label className="block text-lg font-semibold text-black">Mode :</label>
                        <select
                            name="mode"
                            onChange={handleChange}
                            className="w-[100%] border border-gray-300 rounded-md py-[10px] px-3 mt-2"
                            value={schesulesData.mode}
                        >
                            <option value="">Select mode</option>
                            {modeSelect.map((item, index) => (
                                <option key={index} value={schesulesData.modeSelect}>
                                    {item}
                                </option>
                            ))}
                        </select>

                    </div>
                </div>

                <div className="w-[800px] mr-8 mt-6">
                    <label className="block text-lg font-semibold text-black">Task description :</label>
                    <input
                        type="text"
                        value={schesulesData.task_description}
                        name="task_description"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 mt-2"
                        onChange={handleChange}
                    />
                </div>
                <div className="w-[800px] mr-8 mt-6">
                    <label className="block text-lg font-semibold text-black">Video :</label>
                    <input
                        type="text"
                        value={schesulesData.video_id}
                        name="video_id"
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md py-2 px-3 mt-2"
                    />
                </div>

                <div className="mt-8">
                    <button className="bg-blue py-3 px-5 rounded-xl font-normal text-white">Save Changes</button>
                </div>

            </form>
        </div>
    );
}

export default EditSchedules;
