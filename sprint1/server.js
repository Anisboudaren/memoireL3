const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bp = require("body-parser");
const app = express()

mongoose.connect("mongodb://localhost/memoire")
  .then(() => console.log("connected"));

  app.use(cors())
  app.use(bp.urlencoded({extended:true}))
  app.use(bp.json())

app.use('/' , require('./routes/user.route.js'))

app.listen(3000, () => {
  console.log("listening at 3000");
})
const bcrypt = require('bcrypt')
const saltRounds = 10 

const insert = require('./src/insertion');
for (let i = 0; i < 5; i++) {
  let doc = {
    firstName: "member" + i ,
    lastName: "member" + i ,
    role: "doctor",
    address: {
      city: "LA",
      street: "dunno",
      apartment: "don't care",
    },
    phoneNumber: "0659595959", 
    e_mail: "j3jou3@gmail.com", 
    specialty: "gynecologist", 
    avatar: "avatar.png",
  }
   bcrypt.hash('password'+i+'#', saltRounds, async (err, hash) => {
        if (err) {
          console.error(err);
        } else {
          console.log("this is : " + await insert.insertMember(doc)) 
          
          insert.insertUser({username :'username' + i ,password: hash , owner: mem._id})
        }
      });
  
  
 
}


