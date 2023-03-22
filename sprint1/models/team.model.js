const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const teamModel = new Schema({
  teammates: [mongoose.SchemaTypes.ObjectId],
  leader: mongoose.SchemaTypes.ObjectId,
  tasks: [mongoose.SchemaTypes.ObjectId],
});

module.exports = mongoose.model("team" , teamModel)
