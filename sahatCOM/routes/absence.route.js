const absenceRouter = require('express').Router();
const absenceController = require('../controllers/absence.controller');

absenceRouter.post('/add', absenceController.addNewAbsence);
absenceRouter.get('/get/:id', absenceController.getAbsence);
absenceRouter.delete('/delete/:id', absenceController.deleteAbsence);
absenceRouter.put('/update/:id', absenceController.updateAbsence); // when updating the model doesn't have to respect the schema anymore
absenceRouter.get('/getAll', absenceController.getAllAbsences);

module.exports = absenceRouter;
