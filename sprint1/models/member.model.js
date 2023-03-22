const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const memberSchema = new Schema({
  teamId: mongoose.SchemaTypes.ObjectId,
  firstName: String,
  lastName: String,
  role: ["doctor", "nurse"],
  desc : String ,
  workAddress: String,
  phoneNumber: String, // add match statement later
  e_mail: String, // add match statement later
  specialty: String, // add list with all available speciliaties later
  avatar: String,
});

module.exports = mongoose.model("member", memberSchema);
