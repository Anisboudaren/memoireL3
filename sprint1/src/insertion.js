const mongoose = require("mongoose");

const member = require("../models/member.model");
const user = require("../models/user.model");
const medRecord = require("../models/record.model");
const report = require("../models/report.model");
const task = require("../models/task.model");
const team = require("../models/team.model");
const patient = require("../models/patient.model");
const { ROLES } = require("../config/roles_list");

async function insertUser(userObject , role) {
  try {
    await user.create(userObject).then((result) => {
      console.log(role + " has been added");
      return result;
    });
  } catch (error) {
    console.log("error inserting a user: " + error.message);
    throw error;
  }
}
async function insertMember(memberObject , username , password) {
  try {
    return member.create(memberObject).then((result) => {
      console.log(result);
      //insertUser({username , password , owner: result._id})
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
      console.log("a new report has been created");
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
async function insertPatient(patientObject) {
  try {
    await patient.create(patientObject).then((result) => {
      console.log("patient has been added");
      return result;
    });
  } catch (error) {
    console.log("error inserting a patient: " + error.message);
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
  insertPatient
};
