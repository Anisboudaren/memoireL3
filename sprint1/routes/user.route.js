const express = require('express')

// hashing the password
const bcrypt = require('bcrypt')
const saltRounds = 10 

// bcrypt.hash("nidal", saltRounds, (err, hash) => {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log(hash);
//     }
//   });

const router = express.Router()
const User = require('../models/user.model')
const Member = require("../models/member.model")

router.post('/login' , async (req , res)=>{
    User.findOne({username:req.body.username} , (err , user)=>{
        if(err){
            console.log(err)
            console.log("in error");
            res.json(err)
        }else if (user == null ) {
            
            res.sendStatus(404)
        }else {
            console.log(user);
            bcrypt.compare(req.body.password, user.password).then(async (result) => {
                 if (result) {
                  console.log('Passwords match!')
                  const mem = await Member.findOne({_id : user.owner})
                  res.json(mem).sendStatus(200)
                } else {
                  console.log('Passwords do not match!')
                  res.json({err :'Passwords do not match!' });
                }
            })
        }
    })
})

 

module.exports = router