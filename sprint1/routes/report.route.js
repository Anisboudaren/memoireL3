const express = require('express')
const router = express.Router()
const  report = require("../models/report.model")

const insert = require('../src/insertion');

router.post("/report/create" , (req , res)=>{
   insert.insertReport(req.body).then( ()=>{
        res.status(200).send("a report has been added")
   }).catch(err => {
    console.log(err);
        res.status(500).send("faild to create a new report")
   })

})

router.get("/report/doctor" , (req , res)=>{
    console.log("correct route");
    report.find({doctor_ID : req.body.doctor_ID})
    .then(list =>{
        res.json(list)
    }).catch(err =>{
        console.log(err);
        res.send("there is no result that match this doctor")
    })
    
})
router.get("/report/filter" , (req , res)=>{
    report.find({patient_id : req.body.patient_id , doctor_ID : req.body.doctor_ID})
    .then(list =>{
        res.json(list)
    }).catch(err =>{
        console.log(err);
        res.send("there is no result that match this patient")
    })
    
})


module.exports = router