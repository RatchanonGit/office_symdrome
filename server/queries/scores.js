const getScores = "SELECT * FROM scores";
const getScoreById = "SELECT * FROM scores WHERE score_id = $1";
const addScore = "INSERT INTO scores(user_id, task_description, score_value, watch_time, score_date) VALUES ($1,$2,$3,$4,$5)";
const removeScore = "DELETE FROM scores WHERE score_id = $1";
const updateScore = "UPDATE scores SET user_id = $1, task_description = $2, score_value = $3, watch_time = $4, score_date = $5 WHERE score_id = $6"

module.exports = {
    getScores,
    getScoreById,
    addScore,
    removeScore,
    updateScore
}