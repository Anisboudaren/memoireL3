const userRouter = require("express").Router();
const userController = require('../controllers/user.controller')

userRouter.post('/addNewUser' , userController.addNewUser )


module.exports = userRouter