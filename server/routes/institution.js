const express = require("express");
const router = express.Router();
const { getInstitutions,
    getInstitutionById,
    addInstitution,
    removeInstitution,
    updateInstitution
} = require('../controllers/institution')

const { auth, adminCheck } = require('../middleware/auth')

//@Endpoint  http://localhost:5000/api/option/institutions
//@Method    GET
//@Access    Private
router.get('/option/institutions', auth, getInstitutions)

//@Endpoint  http://localhost:5000/api/option/institutions
//@Method    GET
//@Access    Private
router.get('/institution/:id',auth, getInstitutionById)

//@Endpoint  http://localhost:5000/api/option/institutions
//@Method    POST
//@Access    Private
router.post('/option/institution', auth, adminCheck, addInstitution)

//@Endpoint  http://localhost:5000/api/option/institutions
//@Method    DELETE
//@Access    Private
router.delete('/option/institution/:id', auth, adminCheck, removeInstitution)

//@Endpoint  http://localhost:5000/api/option/institutions
//@Method    PUT
//@Access    Private
router.put('/option/institution/:id', auth, adminCheck, updateInstitution)

module.exports = router;