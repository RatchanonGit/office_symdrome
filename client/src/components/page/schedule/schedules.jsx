import React, { useState } from 'react';
import { createSchedules } from '../../functions/schedules'
import { toast } from "react-toastify";

const Schedules = ({ onCreated, onClose }) => {
    const [value, setValue] = useState({
        days_of_week: "",
        schedule_time: "",
        mode: "",
        video_id: "",
        task_description: ""
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
        const updatedDays = [...value.days_of_week.split(',').join('')]; // แยกข้อมูลที่มีอยู่เป็นอาร์เรย์

        if (checked) {
            updatedDays.push(weekdays.indexOf(name).toString()); // เพิ่มค่าลงในอาร์เรย์
        } else {
            const index = updatedDays.indexOf(weekdays.indexOf(name).toString());
            if (index !== -1) {
                updatedDays.splice(index, 1); // ลบค่าออกจากอาร์เรย์
            }
        }

        // รวมข้อมูลใหม่เป็น string และอัปเดต state
        setValue({
            ...value,
            [e.target.name]: e.target.value,
            days_of_week: updatedDays.join(',')
        });
    }
    console.log(value)

    const handleSubmit = (e) => {
        console.log(value)
        e.preventDefault()
        createSchedules(value)
            .then(res => {
                console.log(res.data)
                toast.success((res.data), {
                    position: "top-center",
                    autoClose : 2000
                  });
                onCreated();
                onClose()
            }).catch(error => {
                toast.error((error.response.data), {
                    position: "top-center",
                    autoClose: 2000
                });
            })
    }

    return (
        <div className='min-h-full flex justify-center items-center'>
                <form className='w-auto' onSubmit={handleSubmit} >
                    <h1 className='text-4xl font-semibold uppercase text-blue mb-10'>Create Schedules</h1>
                    <label className="block text-lg font-semibold mt-5 text-blue">Select Days :</label>
                    <div className="flex flex-wrap gap-4 mt-2">
                        {weekdays.map((day) => (
                            <label key={day} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    value={value.days_of_week}
                                    name={day}
                                    onChange={handleChange}
                                    className="form-checkbox h-5 w-5 text-blue-600"
                                />
                                <span className="text-lg text-blue">{day}</span>
                            </label>
                        ))}
                    </div>

                    <div className="mt-6 flex">
                        <div className="w-[385px] mr-8">
                            <label className="block text-lg font-semibold text-blue">Schedule_time :</label>
                            <input
                                type="text"
                                value={value.schedule_time}
                                name="schedule_time"
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md py-2 px-3 mt-2"
                            />
                        </div>

                        <div className="w-[385px] mr-8">
                            <label className="block text-lg font-semibold text-blue">Mode :</label>

                            <select
                                name="mode"
                                onChange={handleChange}
                                className="w-[87%] border border-gray-300 rounded-md py-[10px] px-3 mt-2"
                            >
                                <option value="">Select mode</option>
                                {modeSelect.map((item, index) => (
                                    <option key={index} value={value.modeSelect}>
                                        {item}
                                    </option>
                                ))}
                            </select>

                        </div>
                    </div>

                    <div className="w-[750px] mr-8 mt-6">
                        <label className="block text-lg font-semibold text-blue">Task description :</label>
                        <input
                            type="text"
                            value={value.task_description}
                            name="task_description"
                            className="w-full border border-gray-300 rounded-md py-2 px-3 mt-2"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-[750px] mr-8 mt-6">
                        <label className="block text-lg font-semibold text-blue">Video :</label>
                        <input
                            type="text"
                            value={value.video_id}
                            name="video_id"
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 mt-2"
                        />
                    </div>

                    <div className="mt-6">
                        <button className="bg-blue py-3 px-5 rounded-xl font-normal text-white">Create Schedules</button>
                    </div>

                </form>
        </div>
    );
}

export default Schedules;
