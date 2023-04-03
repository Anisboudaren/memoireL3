const caregiverRouter = require('express').Router();
const caregiverController = require('../controllers/cgController');
const { authToken } = require('../utils/jwt');
const { authRole, ROLES } = require('../utils/auth');

caregiverRouter.post(
  '/add',
  authToken,
  authRole(ROLES.ADMIN),
  caregiverController.addNewCaregiver,
);
caregiverRouter.put('/update', authToken, authRole());
caregiverRouter.get('/:id', authToken, caregiverController.getCaregiver);
caregiverRouter.get('/getProfile', authToken, caregiverController.getProfile);
caregiverRouter.get(
  '/all',
  authToken,
  authRole(ROLES.ADMIN),
  caregiverController.getAll,
);

module.exports = caregiverRouter;
