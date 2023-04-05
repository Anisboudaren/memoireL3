require('dotenv').config();

const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const userRouter = require('./routes/user.route')
const caregiverRouter = require('./routes/cg.route')
const patientRouter = require('./routes/patient.route')
const visitRouter = require('./routes/visit.route')
//define data type
app.use(express.json());
app.use(bodyParser.json());

require('./models/mongooseDB.js')

app.use('/api/patient' , patientRouter )
app.use('/api/user' , userRouter)
app.use('/api/caregiver' , caregiverRouter)
app.use('/api/visit' , visitRouter )

const PORT = process.env.PORT || 3000
app.listen(PORT, (err, suc) => {
    if (err) throw err;
    console.log(`Server running on ${PORT} port`);
  });