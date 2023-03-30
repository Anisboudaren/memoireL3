const userRouter = require("express").Router();
const userController = require('../controllers/user.controller')
const {authToken} = require('../utils/jwt')
userRouter.post('/addNewUser' , userController.addNewUser )
userRouter.get("/getUser" , authToken  ,(req , res)=>{
  res.json(req.user)
})

module.exports = userRouter