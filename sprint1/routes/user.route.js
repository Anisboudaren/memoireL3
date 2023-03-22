const express = require('express')
const router = express.Router()
const Member = require("../models/member.model")
const {authUser , authRole} = require("../src/auth")

router.get('/login'  , authUser , async (req , res , next)=>{
   console.log(req.user._id);
    Member.findById(req.user.owner)
   .then( result => {
      res.status(200).json(result)
   })
   .catch(err =>{
      console.log(err);
      res.status(404).send("this user isn't a member")
   })
  
})

 

module.exports = router