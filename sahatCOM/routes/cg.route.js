const caregiverRouter = require('express').Router()
const caregiverController = require('../controllers/cgController')
const userController = require('../controllers/user.controller')

caregiverRouter.post("/addNewCaregiver" , caregiverController.addNewCaregiver)

module.exports = caregiverRouter