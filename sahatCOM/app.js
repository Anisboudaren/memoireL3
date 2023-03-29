require('dotenv').config();

const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const userRouter = require('./routes/user.route')
//define data type
app.use(express.json());
app.use(bodyParser.json());

require('./models/mongooseDB.js')
const jwt = require('jsonwebtoken')

app.get('/login' , (req , res)=>{
  res.json(jwt.sign(req.body , process.env.TOKEN_SECRET)) 
})

app.use('/api/user' , userRouter)
const PORT = process.env.PORT || 3000
app.listen(PORT, (err, suc) => {
    if (err) throw err;
    console.log(`Server running on ${PORT} port`);
  });