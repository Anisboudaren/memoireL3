const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  owner : {
    type : mongoose.Types.ObjectId , 
    required : true , 
    refPath : 'role'
  } , 
  role: {
    type: String,
    enum: ['caregiver', 'patient' , 'admin'],
    default: 'caregiver'
  }
});



  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    token: Joi.string().required(),
    role: Joi.string().valid('caregiver', 'admin' , 'patient')
  });
 
userSchema.methods.validation = function (userObject) {
    schema.required();
    return schema.validate(userObject);
};

const User = mongoose.model('User', userSchema);

module.exports = User
