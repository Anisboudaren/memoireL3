const express = require('express')
const {ROLES} = require("../config/roles_list")
const router = express.Router()
const Member = require("../models/member.model")
const {authUser , authRole} = require("../src/auth")

// router.get(`/getProfile:id` , authUser , authRole(), async (req , res)=>{
//    await Member.findById(req.body._id).then()
// })

router.get("/:name" ,authUser , authRole(ROLES.DOCTOR),(req , res ) =>{
    res.send(req.params.name)
}) 

module.exports = router