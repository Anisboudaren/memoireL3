const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const preSchema = new Schema({
  createdAt: Date,
  doctorName: String,
  meds: [{ med: String, qunatity: String, note: String }],
  note: String,
});

const reportSchema = new Schema({
  memberId: mongoose.SchemaTypes.ObjectId,
  desc: String,
  patientId: mongoose.SchemaTypes.ObjectId,
  prescription: preSchema,
  createdAt: Date,
  updatedAt: Date,
});

module.exports = mongoose.model("report", reportSchema);
