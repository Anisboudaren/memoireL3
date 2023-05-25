const reportRouter = require('express').Router();
const reportController = require('../controllers/report.controller');

reportRouter.post('/add', reportController.addNewReport);
reportRouter.get('/get/:id', reportController.getReport);
reportRouter.delete('/delete/:id', reportController.deleteReport);
reportRouter.put('/update/:id', reportController.updateReport); // when updating the model doesn't have to respect the schema anymore
reportRouter.get('/getAll', reportController.getAllReports);

module.exports = reportRouter;
