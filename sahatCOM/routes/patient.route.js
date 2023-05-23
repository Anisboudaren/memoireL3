const patientRouter = require('express').Router();
const patientController = require('../controllers/patient.controller');
const { authToken } = require('../utils/jwt');
const { authRole, ROLES } = require('../utils/auth');
const bodyParser = require('body-parser');
// Use the body-parser middleware to parse the request body
patientRouter.use(bodyParser.raw({ type: 'application/pdf' }));

patientRouter.post('/newMedRec', authToken, patientController.addNewMedRec);
//for my profile
patientRouter.get('/get/me', authToken, patientController.getProfile);
patientRouter.put('/update/me', authToken, patientController.updateProfile);
//for the rest
patientRouter.post('/register', patientController.addNewPatient);
patientRouter.put('/update', authToken, authRole(ROLES.ADMIN), patientController.updatePatient);
patientRouter.get('/getAll', patientController.getAll);
patientRouter.get('/get/:id', patientController.getPatient);
patientRouter.delete('/delete/:id', patientController.deletePatient);

module.exports = patientRouter;
