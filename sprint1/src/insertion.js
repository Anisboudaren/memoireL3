const mongoose = require("mongoose");

const member = require("../assets/modles/modelMember");
const user = require("../assets/modles/modelUser");
const medRecord = require("../assets/modles/modelMedRecord");
const report = require("../assets/modles/modelReport");
const task = require("../assets/modles/modelTask");
const team = require("../assets/modles/modelTeam");

async function insertUser(userObject) {
  try {
    await user.create(userObject).then((result) => {
      console.log(result);
      return result;
    });
  } catch (error) {
    console.log("error inserting a user: " + error.message);
    throw error;
  }
}
async function insertMember(memberObject) {
  try {
    await member.create(memberObject).then((result) => {
      console.log(result);
      return result;
    });
  } catch (error) {
    console.log("error inserting a member: " + error.message);
    throw error;
  }
}
async function insertTeam(teamObject) {
  try {
    await team.create(teamObject).then((result) => {
      console.log(result);
      return result;
    });
  } catch (error) {
    console.log("error inserting a team: " + error.message);
    throw error;
  }
}
async function insertReport(reportObject) {
  try {
    await report.create(reportObject).then((result) => {
      console.log(result);
      return result;
    });
  } catch (error) {
    console.log("error inserting a report: " + error.message);
    throw error;
  }
}
async function insertTask(taskObject) {
  try {
    await task.create(taskObject).then((result) => {
      console.log(result);
      return result;
    });
  } catch (error) {
    console.log("error inserting a task: " + error.message);
    throw error;
  }
}
async function insertMedRecord(medRecordObject) {
  try {
    await medRecord.create(medRecordObject).then((result) => {
      console.log(result);
      return result;
    });
  } catch (error) {
    console.log("error inserting a medRecord: " + error.message);
    throw error;
  }
}

module.exports = {
  insertMember,
  insertMedRecord,
  insertTeam,
  insertTask,
  insertUser,
  insertReport,
};
