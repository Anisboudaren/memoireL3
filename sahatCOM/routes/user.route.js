const userRouter = require('express').Router();
const userController = require('../controllers/user.controller');
const { authToken } = require('../utils/jwt');
const { authRole, ROLES } = require('../utils/auth');

userRouter.post('/add' , userController.addNewUser )
userRouter.get('/get/:id', authToken,  userController.getUser  );
userRouter.delete('/delete/:id',  authToken,  authRole(ROLES.ADMIN), userController.deleteUser,); 
userRouter.put('/update/:id',  authToken,  authRole(ROLES.ADMIN),  userController.updateUser,); // when updating the model doesn't have to respect the schema anymore
userRouter.get('/getAll',  authToken,  authRole(ROLES.PATIENT),  userController.getAllUsers,);
userRouter.post('/login', userController.loginUser);


module.exports = userRouter;
