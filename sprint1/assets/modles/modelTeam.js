const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const teamModel = new Schema({
  teamates: [mongoose.SchemaTypes.ObjectId],
  leader: mongoose.SchemaTypes.ObjectId,
  tasks: [mongoose.SchemaTypes.ObjectId],
});
