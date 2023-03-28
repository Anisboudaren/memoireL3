const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
  username: {
    type : String,
    required : true  , 
    unique : true
  },
  password:  {  // this stores the hashed value of the password
    type : String,
    required : true 
  }, 
  owner: {
    required : true ,
    type : mongoose.SchemaTypes.ObjectId,
    refPath : 'role'
  } 
  , 
  role : {
    type : String , 
    required : true , 
    enum : [ 'member' , 'patient']
  }
}  // this to will overlap multiple types of collections 
);

module.exports = mongoose.model("user", userModel);
