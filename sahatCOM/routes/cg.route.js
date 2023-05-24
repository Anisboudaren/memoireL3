const caregiverRouter = require('express').Router();
const caregiverController = require('../controllers/cgController');
const { authToken } = require('../utils/jwt');
const { authRole, ROLES } = require('../utils/auth');

//for my profile
caregiverRouter.get('/get/me', authToken, caregiverController.getProfile);
caregiverRouter.put('/update/me', authToken, caregiverController.updateProfile);
//for the rest
caregiverRouter.post('/add', caregiverController.addNewCaregiver);
caregiverRouter.put('/update', caregiverController.updateCaregiver);
caregiverRouter.get('/getAll', authToken, authRole(ROLES.ADMIN), caregiverController.getAll);
caregiverRouter.get('/get/:id', caregiverController.getCaregiver);
caregiverRouter.delete('/delete/:id', caregiverController.deleteCaregiver);

module.exports = caregiverRouter;
