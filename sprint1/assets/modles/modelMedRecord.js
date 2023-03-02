const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const file = new Schema({
  fileName: String,
  doctorName: String,
  desc: String,
  doneAt: Date,
  url: String,
});

const medRecord = new Schema({
  patientID: mongoose.SchemaTypes.ObjectId,
  auths: [mongoose.SchemaTypes.ObjectId],
  files: [file],
});

module.exports = mongoose.model("medical Record", medRecord);
