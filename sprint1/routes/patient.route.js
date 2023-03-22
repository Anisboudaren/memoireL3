const express = require('express')
const router = express.Router()
const  patient = require("../models/patient.model")

const insert = require('../src/insertion');

router.post("/patient/create" , (req , res)=>{
   insert.insertReport(req.body).then( ()=>{
        res.status(200).send("a report has been added")
   }).catch(err => {
    console.log(err);
        res.status(500).send("faild to create a new report")
   })

})

router.get("/patient/member" , async (req , res)=>{
    patient.find({ caregivers: {$in: req.body.memberId }})
    .then(list =>{
        res.json(list)
    }).catch(err =>{
        console.log(err);
        res.send("there is no result that match this member")
    })
})     
router.get("/patient/filter" , (req , res)=>{
    report.find({patient_id : req.body.patient_id , doctor_ID : req.body.doctor_ID})
    .then(list =>{
        res.json(list)
    }).catch(err =>{
        console.log(err);
        res.send("there is no result that match this patient")
    })
    
})


module.exports = router