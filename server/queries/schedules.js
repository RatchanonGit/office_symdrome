const getSchedules = "SELECT * FROM schedules";
const getScheduleById = "SELECT * FROM schedules WHERE schedule_id = $1";
const removeSchedule = "DELETE FROM schedules WHERE schedules_id = $1";
const updateSchedule = `UPDATE schedules SET days_of_week = $1, schedule_time = $2, task_description = $3, 
                        video_id = $4, mode = $5, image = $6 WHERE schedules_id = $7`
const addSchedule = `INSERT INTO schedules(days_of_week, schedule_time, task_description, video_id, mode, image) 
                     VALUES ($1,$2,$3,$4,$5,$6)`;

module.exports = {
    getSchedules,
    getScheduleById,
    addSchedule,
    removeSchedule,
    updateSchedule
}