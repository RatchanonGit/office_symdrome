const express = require("express");
const router = express.Router();
const { getInstitutions,
        getInstitutionById,
        addInstitution,
        removeInstitution,
        updateInstitution
} = require('../controllers/institution')

const {auth,adminCheck} = require('../middleware/auth')

//@Endpoint  http://localhost:5000/api/institutions
//@Method    GET
//@Access    Private
router.get('/institutions',auth,adminCheck, getInstitutions)

//@Endpoint  http://localhost:5000/api//institution/1
//@Method    GET
//@Access    Private
router.get('/institution/:id', getInstitutionById)

//@Endpoint  http://localhost:5000/api/institution
//@Method    POST
//@Access    Private
router.post('/institution', addInstitution)

//@Endpoint  http://localhost:5000/api/institution/1
//@Method    DELETE
//@Access    Private
router.delete('/institution/:id', removeInstitution)

//@Endpoint  http://localhost:5000/api/institution/1
//@Method    PUT
//@Access    Private
router.put('/institution/:id',updateInstitution)

module.exports = router;