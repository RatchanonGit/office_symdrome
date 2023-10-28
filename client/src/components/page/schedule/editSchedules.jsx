import React, { useState, useEffect } from 'react';
import { updateSchedules } from '../../functions/schedules'
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const EditSchedules = ({ schedulesId, schedules, onClose, onUpdated }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const [value, setValue] = useState({
        days_of_week: "",
        video_id: "",
        schedule_time: "",
        image: null,
        task_description: "",
        mode: "",
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
        'video',
        'publish'
    ]

    const handleChange = (e) => {
        const { name, checked } = e.target;
        const updatedDays = [...value.days_of_week.split(',').join('')];

        if (checked) {
            updatedDays.push(weekdays.indexOf(name).toString());
        } else {
            const index = updatedDays.indexOf(weekdays.indexOf(name).toString());
            if (index !== -1) {
                updatedDays.splice(index, 1);
            }
        }

        setValue({
            ...value,
            [e.target.name]: e.target.value,
            days_of_week: updatedDays.join(',')
        });

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (value.days_of_week && value.days_of_week.split(',').length >= 1) {
            updateSchedules(user.token, schedulesId, value)
                .then(res => {
                    toast.success((res.data), {
                        position: "top-center",
                        autoClose: 2000
                    });
                    onUpdated();
                    onClose();
                }).catch(error => {
                    toast.error((error.response.data), {
                        position: "top-center",
                        autoClose: 2000
                    });
                });
        } else {
            toast.error("Please select at least 1 day.", {
                position: "top-center",
                autoClose: 2000
            });
        }
    }


    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setValue({
                    ...value,
                    image: e.target.result,
                });
            };
            reader.readAsDataURL(selectedImage);
        }
    };

    useEffect(() => {
        if (schedules && schedules.length > 0) {
            const selectedSchedules = schedules.find((item) => item.schedules_id === schedulesId);
            if (selectedSchedules) {
                setValue(selectedSchedules);
            }
        }
    }, [schedules, user, schedulesId]);

    return (
        <div className='min-h-full flex justify-center items-center'>
            <form className='w-auto' onSubmit={handleSubmit} >
                <h1 className='text-4xl  uppercase text-black mb-8'>Update Schedules</h1>
                <label className="block text-lg  mt-5 text-black">Select Days</label>
                <div className="flex flex-wrap gap-4 mt-2">
                    {weekdays.map((day) => (
                        <label key={day} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                value={day}
                                name={day}
                                onChange={handleChange}
                                checked={value.days_of_week && value.days_of_week.includes(weekdays.indexOf(day).toString())}
                                className="form-checkbox h-5 w-5 text-blue-600"
                            />
                            <span className="text-lg text-black">{day}</span>
                        </label>
                    ))}
                </div>

                <div className="mt-6 flex">
                    <div className="w-[385px] mr-8">
                        <label className="block text-lg  text-black">Schedule_time</label>
                        <input
                            type="text"
                            value={value.schedule_time}
                            name="schedule_time"
                            onChange={handleChange}
                            required
                            pattern="^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"
                            maxLength={5}
                            placeholder='HH:mm'
                            className="w-full border border-gray-300 rounded-md py-2 px-3 mt-2"
                            onInvalid={(e) => {
                                e.target.setCustomValidity("Please enter a time in the format HH:mm, where HH is hours (00-23) and mm is minutes (00-59).");
                            }}
                            onInput={(e) => {
                                e.target.setCustomValidity("");
                            }}
                        />
                    </div>

                    <div className="w-[385px] mr-8">
                        <label className="block text-lg  text-black">Mode</label>
                        <select
                            name="mode"
                            onChange={handleChange}
                            required
                            className="w-[100%] border border-gray-300 rounded-md py-[10px] px-3 mt-2"
                            value={value.mode}
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

                <div className="w-[800px] mr-8 mt-6">
                    <label className="block text-lg  text-black">Task description</label>
                    <input
                        type="text"
                        value={value.task_description}
                        name="task_description"
                        pattern="^\S[A-Za-z0-9\s]*$"
                        placeholder='Please input task description.'
                        className="w-full border border-gray-300 rounded-md py-2 px-3 mt-2"
                        onChange={handleChange}
                        required
                        onInvalid={(e) => {
                            e.target.setCustomValidity("Please input task description.");
                        }}
                        onInput={(e) => {
                            e.target.setCustomValidity("");
                        }}   
                        
                    />
                </div>

                <div className="w-[800px] mr-8 mt-6">
                    {value.mode === 'video' && (
                        <>
                            <label className="block text-lg text-blue">Video </label>
                            <input
                                type="text"
                                value={value.video_id}
                                name="video_id"
                                onChange={handleChange}
                                required={value.mode === 'video'}
                                className="w-full border border-gray-300 rounded-md py-2 px-3 mt-2"
                                placeholder='Please provide the URL of the desired video.'
                                pattern="^\S*$"
                                onInvalid={(e) => {
                                    e.target.setCustomValidity("Please provide the URL of the desired video.");
                                }}
                                onInput={(e) => {
                                    e.target.setCustomValidity("");
                                }}
                            />
                        </>
                    )}

                    {value.mode === 'publish' && (
                        <>
                            <label className="block text-lg text-blue">Image </label>
                            <input
                                type="file"
                                name="image"
                                required={value.mode === 'publish'}
                                onChange={handleImageChange}
                                className='mt-2'
                            />
                        </>
                    )}
                </div>

                <div className="mt-8">
                    <button className="bg-blue py-3 px-5 rounded-xl font-normal text-white">Save Changes</button>
                </div>

            </form>
        </div>
    );
}

export default EditSchedules;
