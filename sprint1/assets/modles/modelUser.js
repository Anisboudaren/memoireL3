const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
  username: String,
  passoword: String, // hash that later of course
  owner: mongoose.SchemaTypes.ObjectId,
});

module.exports = mongoose.model("user", userModel);
