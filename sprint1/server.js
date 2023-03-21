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

app.use(setUser)
app.use('/'  , require("./routes/tasks.route"))
app.use('/' , require('./routes/user.route.js'))
app.use('/' , require('./routes/member.route'))


const bcrypt = require('bcrypt')
const saltRounds = 10 

const insert = require('./src/insertion');

const listpatients  = require("./test/mockData/patient.data")
const listreports = require("./test/mockData/reports.data")

listreports.forEach(report =>{
  insert.insertReport(report);
})
// list.forEach(patient => {
//   patient.medicalConditions = [""]
//   patient.medications = [""]
//   patient.caregivers = [""]
//   insert.insertPatient(patient);
// });


// for (let i = 0; i < 10; i++) {
//   const task = {
//     teamID: "64177d02d2d7c35037e0eb35",
//     assignedTo: ["6402133e5e92ffcdd9cc54d8" , "6402133e5e92ffcdd9cc54e2"],
//     patientID: null,
//     status: "pending",
//     desc: "its is just a task  " + i,
//     dueDate:'2023-03-20',
//     finishedAT: null,
//   }
//   insert.insertTask(task)
// }
async function fill(doc) {
  //  bcrypt.hash('password#', saltRounds).then(
  //   async (hash)=> { 
  //       const mem = await insert.insertMember(doc);
  //       console.log("this is : " + mem) 

  //       insert.insertUser({username :mem.firstName ,password: hash , owner: mem._id})
  //     }
  //  )
}

function setUser(req , res , next) {
  const username = req.body.username
  const password = req.body.password
  if(username || password){
    req.username = username
    req.password = password
  }
  next()
}


app.listen(3000, () => {
  console.log("listening at 3000");
})