const visitRouter = require('express').Router();
const visitController = require('../controllers/visit.controller');
const { authToken } = require('../utils/jwt');
const { authRole, ROLES } = require('../utils/auth');

//visitRouter.post('/add' , visitController.addNewVisit )
visitRouter.get('/get/:id', authToken, visitController.getVisit);
visitRouter.delete('/delete/:id', visitController.deleteVisit);
visitRouter.put('/update/:id', visitController.updateVisit); // when updating the model doesn't have to respect the schema anymore
visitRouter.get('/getAll', visitController.getAllVisits);

module.exports = visitRouter;
