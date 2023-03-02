const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const memberSchema = new Schema({
  // teamId: mongoose.SchemaTypes.ObjectId,
  firstName: String,
  lastName: String,
  role: ["doctor", "nurse"],
  address: {
    city: String,
    street: String,
    appartement: String,
  },
  phoneNumber: String, // add match statement later
  e_mail: String, // add match statement later
  speciality: String, // add list with all availble speciliaties later
  avatar: String,
});

module.exports = mongoose.model("member", memberSchema);
