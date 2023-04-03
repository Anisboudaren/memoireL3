const userRouter = require('express').Router();
const userController = require('../controllers/user.controller');
const { authToken } = require('../utils/jwt');
const { authRole, ROLES } = require('../utils/auth');

//userRouter.post('/addNewUser' , userController.addNewUser )
userRouter.get('/getUser', authToken, userController.getUser);
userRouter.delete(
  '/deleteUser',
  authToken,
  authRole(ROLES.ADMIN),
  userController.deleteUser,
);
userRouter.put(
  '/updateUser',
  authToken,
  authRole(ROLES.ADMIN),
  userController.updateUser,
); // when updating the model doesn't have to respect the schema anymore
userRouter.get(
  '/getAll',
  authToken,
  authRole(ROLES.PATIENT),
  userController.getAllUsers,
);
userRouter.get('/login', userController.loginUser);

module.exports = userRouter;
