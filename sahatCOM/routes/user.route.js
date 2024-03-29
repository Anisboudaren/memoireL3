const userRouter = require('express').Router();
const userController = require('../controllers/user.controller');
const { authToken } = require('../utils/jwt');
const { authRole, ROLES } = require('../utils/auth');

userRouter.post('/add', userController.addNewUser);
userRouter.get('/get/:id', userController.getUser);
userRouter.delete('/delete/:id', userController.deleteUser);
userRouter.put('/update/:id', userController.updateUser); // when updating the model doesn't have to respect the schema anymore
userRouter.get('/getAll', userController.getAllUsers);
userRouter.post('/loginAdmin', userController.loginAdmin);
userRouter.post('/login', userController.loginUser);

module.exports = userRouter;
