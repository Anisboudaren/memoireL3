const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    doctor_ID : mongoose.SchemaTypes.ObjectId , 
    patient_ID :mongoose.SchemaTypes.ObjectId  , 
    vital_signs : [String],
    symptoms : [String] ,
    relevent_rec_causes : [String] , 
    diagnosis : String  ,
    treatment_plans : {
        advices : [String] , 
        prescription : String // url of the stored photos
    }  ,
    Visit_circumstances : String , // any unexpexed accidents or bad recovery envirmenet for the patient ....
} , {timestamps : true});

module.exports = mongoose.model("report", reportSchema);


