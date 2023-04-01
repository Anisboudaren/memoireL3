const userRouter = require("express").Router();
const userController = require('../controllers/user.controller')
const {authToken} = require('../utils/jwt')

//userRouter.post('/addNewUser' , userController.addNewUser )
userRouter.get("/getUser" , userController.getUser)
userRouter.delete("/deleteUser" , userController.deleteUser)
userRouter.put("/updateUser", userController.updateUser) // when updating the model doesn't have to respect the schema anymore 
userRouter.get("/getAll" , userController.getAllUsers)

module.exports = userRouter