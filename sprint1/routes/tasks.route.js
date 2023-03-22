const express = require('express')
const router = express.Router()
const  tasks = require("../models/task.model")

router.get("/tasks/team" , async (req , res)=>{
     tasks.find({teamID : req.body.teamID})
    .then(list =>{
        
        res.json(list)
    }).catch(err =>{
        console.log(err);
        res.send("there is no result that match this team")
    })
    
})

router.get("/tasks/filter" , async (req , res)=>{
    const filterParam = {}
    
    if(req.body.startDate)
        filterParam.dueDate = {$gte : new Date(req.body.startDate)}
    if(req.body.endDate) 
        filterParam.dueDate = { ...filterParam.dueDate , $lte : new Date(req.body.endDate)}     
    if(req.body.teamID) 
        filterParam.teamID = req.body.teamID
    if(req.body.status)
        filterParam.status = req.body.status

    tasks.find(filterParam)
   .then(list =>{
       res.json(list)
   }).catch(err =>{
       console.log(err);
       res.send("there is no result that match this filter")
   })
   
})

router.get("/tasks/member" , async (req , res)=>{
    tasks.find({ assignedTo: {$in: req.body.memberId }})
    .then(list =>{
        res.json(list)
    }).catch(err =>{
        console.log(err);
        res.send("there is no result that match this member")
    })
})          
module.exports = router;