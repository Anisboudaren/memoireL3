const caregiverRouter = require('express').Router();
const caregiverController = require('../controllers/cgController');
const { authToken } = require('../utils/jwt');
const { authRole, ROLES } = require('../utils/auth');

//for my profile 
caregiverRouter.get('/get/me', authToken, caregiverController.getProfile);
caregiverRouter.put('/update/me', authToken, caregiverController.updateProfile);
//for the rest
caregiverRouter.post('/add',  authToken,  authRole(ROLES.ADMIN),  caregiverController.addNewCaregiver,);
caregiverRouter.put('/update', authToken, authRole(ROLES.ADMIN) , caregiverController.updateCaregiver);
caregiverRouter.get('/getAll', authToken, authRole(ROLES.ADMIN), caregiverController.getAll);
caregiverRouter.get('/get/:id', authToken, caregiverController.getCaregiver);
caregiverRouter.delete('/delete/:id' , authToken , authRole(ROLES.ADMIN) , caregiverController.deleteCaregiver)


module.exports = caregiverRouter;
