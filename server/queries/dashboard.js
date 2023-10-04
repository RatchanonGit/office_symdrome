const sumUser = `SELECT COUNT(*) AS user_count 
                 FROM users AS u 
                 INNER JOIN roles AS r 
                 ON u.role_id = r.role_id
                 WHERE r.role_name = 'User'`

const sumScore = `SELECT COALESCE(SUM(score_value), 0) AS sum_score 
                  FROM scores AS s
                  INNER JOIN users AS u 
                  ON u.user_id = s.user_id
                  INNER JOIN roles AS r 
                  ON u.role_id = r.role_id
                  WHERE r.role_name = 'User'`

const sumTime =  `SELECT COALESCE(SUM(watch_time), 0) AS sum_time
                  FROM scores AS s
                  INNER JOIN users AS u 
                  ON u.user_id = s.user_id
                  INNER JOIN roles AS r 
                  ON u.role_id = r.role_id
                  WHERE r.role_name = 'User'`

const sumScoreLimitDate = `WITH date_series AS (
                            SELECT generate_series(
                                CURRENT_DATE - INTERVAL '6 days', 
                                CURRENT_DATE, '1 day'::interval
                            )::date AS generated_date
                        )       
                            SELECT to_char(ds.generated_date, 'YYYY-MM-DD') AS formatted_date,
                            COALESCE(SUM(s.score_value), 0) AS total_score
                            FROM date_series ds
                            LEFT JOIN scores s 
                            ON ds.generated_date = s.score_date
                            GROUP BY ds.generated_date
                            ORDER BY ds.generated_date ASC`

const sumUserOnInstitution = `SELECT i.institution_name, COUNT(u.institution_id) AS sum_institution
                              FROM users AS u
                              INNER JOIN institution AS i 
                              ON u.institution_id = i.institution_id
                              INNER JOIN roles AS r
                              ON u.role_id = r.role_id
                              WHERE r.role_name = 'User'     
                              GROUP BY i.institution_name`

const topTenScore = `SELECT u.username, u.fname , u.lname, SUM(s.score_value) AS total_score
                        FROM users AS u
                        INNER JOIN scores AS s ON u.user_id = s.user_id
                        GROUP BY u.user_id, u.username
                        ORDER BY total_score DESC
                        LIMIT 10`

module.exports = {
    sumUser,
    sumScore,
    sumTime,
    sumScoreLimitDate,
    sumUserOnInstitution,
    topTenScore
}

