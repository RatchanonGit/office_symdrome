const getTitles = "SELECT * FROM titles";
const getTitleById = "SELECT * FROM titles WHERE title_id = $1";
const addTitle = "INSERT INTO titles(title_name) VALUES ($1)";
const removeTitle = "DELETE FROM titles WHERE title_id = $1";
const updateTitle = "UPDATE titles SET title_name = $1 WHERE title_id = $2"
const titleQuery = `SELECT title_name FROM titles WHERE title_name = $1`;

module.exports = {
    getTitles,
    getTitleById,
    addTitle,
    removeTitle,
    updateTitle,
    titleQuery
}