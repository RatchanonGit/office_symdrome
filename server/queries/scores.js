const getScores = "SELECT * FROM scores";
const getScoreById = "SELECT * FROM scores WHERE score_id = $1";
const addScore = `INSERT INTO scores(user_id, task_description, score_value, watch_time, score_date) 
                  VALUES ($1,$2,$3,$4,$5)`;
const removeScore = "DELETE FROM scores WHERE score_id = $1";
const updateScore = `UPDATE scores SET user_id = $1, task_description = $2, score_value = $3, 
                    watch_time = $4, score_date = $5 WHERE score_id = $6`

const sumScoreAndSumtime = `SELECT u.user_id,
                            COALESCE(SUM(s.watch_time), 0) AS watch_time,
                            COALESCE(SUM(s.score_value), 0) AS total_score
                            FROM users AS u
                            LEFT JOIN scores AS s ON u.user_id = s.user_id
                            WHERE u.user_id = $1
                            GROUP BY u.user_id`

const scoreLimitdate = ` WITH date_series AS (
                         SELECT generate_series (
                         CURRENT_DATE - INTERVAL '6 days', 
                         CURRENT_DATE, '1 day' :: interval ) :: date AS generated_date )
                         SELECT  to_char(ds.generated_date, 'YYYY-MM-DD') AS formatted_date, u.user_id,
                         COALESCE(SUM(s.score_value), 0) AS total_score
                         FROM date_series ds
                         CROSS JOIN 
                         ( SELECT DISTINCT user_id FROM scores WHERE user_id = $1) u
                           LEFT JOIN scores s 
                           ON ds.generated_date = s.score_date AND u.user_id = s.user_id
                           GROUP BY ds.generated_date, u.user_id
                           ORDER BY u.user_id, ds.generated_date ASC ` 

module.exports = {
    getScores,
    getScoreById,
    addScore,
    removeScore,
    updateScore,
    sumScoreAndSumtime,
    scoreLimitdate
}
