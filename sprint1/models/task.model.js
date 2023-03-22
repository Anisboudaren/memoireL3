const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  teamID: mongoose.SchemaTypes.ObjectId,
  assignedTo: [mongoose.SchemaTypes.ObjectId],
  patientID: mongoose.SchemaTypes.ObjectId,
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    required: true
  },
  desc: String,
  dueDate: Date,
  finishedAT: Date,
} , {timestamps : true});

module.exports = mongoose.model("task", taskSchema);
