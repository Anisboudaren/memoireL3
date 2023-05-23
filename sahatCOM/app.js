require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRouter = require('./routes/user.route');
const caregiverRouter = require('./routes/cg.route');
const patientRouter = require('./routes/patient.route');
const visitRouter = require('./routes/visit.route');
const adminRouter = require('./routes/admin.route');

//define data type
app.use(express.json());
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'staticFolder')));

require('./models/mongooseDB.js');

app.use('/api/patient', patientRouter);
app.use('/api/user', userRouter);
app.use('/api/caregiver', caregiverRouter);
app.use('/api/visit', visitRouter);
app.use('/admin', adminRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, (err, suc) => {
	if (err) throw err;
	console.log(`Server running on ${PORT} port`);
});
