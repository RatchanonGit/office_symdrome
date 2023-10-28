const getInstitutions = "SELECT * FROM institution";
const getInstitutionById = "SELECT * FROM institution WHERE institution_id = $1";
const addInstitution = "INSERT INTO institution(institution_name) VALUES ($1)";
const removeInstitution = "DELETE FROM institution WHERE institution_id = $1";
const updateInstitution = "UPDATE institution SET institution_name = $1 WHERE institution_id = $2"
const institutionQuery = `SELECT institution_name FROM institution WHERE institution_name = $1`;

module.exports = {
    getInstitutions,
    getInstitutionById,
    addInstitution,
    removeInstitution,
    updateInstitution,
    institutionQuery
}