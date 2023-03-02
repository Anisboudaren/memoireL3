const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  teamID: mongoose.SchemaTypes.ObjectId,
  assignedTo: [mongoose.SchemaTypes.ObjectId],
  patientID: mongoose.SchemaTypes.ObjectId,
  status: ["pending", "assigned", "abort", "done"],
  desc: String,
  createdAt: Date,
  dueDate: Date,
  finishedAT: Date,
});

module.exports = mongoose.model("task", taskSchema);
