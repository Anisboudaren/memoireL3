
const User = require('../models/user.model')
const Member = require("../models/member.model");

const bcrypt = require('bcrypt')

async function authUser(req , res , next) {
   
    if(req.username == null || req.password == null ){
        res.status(403)
        return res.send("you need to log in")
    }
    
    await User.findOne({username:req.username}).then(async userResult =>{
      await bcrypt.compare(req.password, userResult.password).then(function(result) {
            if(result){
                res.status(200)
                req.user = (userResult)
            }else{
                res.status(403)
                res.send("you need to log in")
            }
        })
    })

    next()
}

 function authRole(Role){
    return (req , res , next) => {
         if(req.body.role != Role){
            res.status(401)
            res.send("Unauthorized role")
         }
         next()
    }
}
async function search(id) {
    const results = await Promise.all([
      Member.findOne({ _id: id }),
    ]);
    return results.flat()[0];
  }
  
  // Usage example:
 

  module.exports = {
    authUser ,
    authRole ,

  }