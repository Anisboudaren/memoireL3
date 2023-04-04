const patientRouter = require('express').Router();
const patientController = require('../controllers/patient.controller');
const { authToken } = require('../utils/jwt');
const { authRole, ROLES } = require('../utils/auth');

//for my profile 
patientRouter.get('/get/me', authToken, patientController.getProfile);
patientRouter.put('/update/me', authToken, patientController.updateProfile);
//for the rest
patientRouter.post('/add',  authToken , authRole(ROLES.ADMIN) , patientController.addNewPatient);
patientRouter.put('/update', authToken, authRole(ROLES.ADMIN) , patientController.updatePatient);
patientRouter.get('/getAll', authToken, authRole(ROLES.ADMIN), patientController.getAll);
patientRouter.get('/get/:id', authToken, patientController.getPatient);
patientRouter.delete('/delete/:id' , authToken , authRole(ROLES.ADMIN) , patientController.deletePatient)


module.exports = patientRouter;
