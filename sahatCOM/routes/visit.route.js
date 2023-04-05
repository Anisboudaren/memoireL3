const visitRouter = require('express').Router();
const visitController = require('../controllers/visit.controller');
const { authToken } = require('../utils/jwt');
const { authRole, ROLES } = require('../utils/auth');

//visitRouter.post('/add' , visitController.addNewVisit )
visitRouter.get('/get/:id', authToken,  visitController.getVisit  );
visitRouter.delete('/delete/:id',  authToken,  authRole(ROLES.ADMIN), visitController.deleteVisit,); 
visitRouter.put('/update/:id',  authToken,  authRole(ROLES.ADMIN),  visitController.updateVisit,); // when updating the model doesn't have to respect the schema anymore
visitRouter.get('/getAll',  authToken,  authRole(ROLES.PATIENT),  visitController.getAllVisits,);



module.exports = visitRouter;
