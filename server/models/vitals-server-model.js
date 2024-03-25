//VITAL MODEL
const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');
//const saltRounds = 10;

const Schema = mongoose.Schema;

const vitalsSchema = new Schema({
    timeStamp: {
        type: Date,
        required: true,
        default: Date.now
    } ,
	bloodPressure: {
        type: String,
        required: true,
    },
    heartRate: {
        type: Number,
        required: true,
    },
    temperature: {
        type: Number,
        required: true,
    },
    respiratoryRate: {
        type: Number,
        required: true,
    },
    bloodOxygen: {
        type: Number,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',	
        required: true,
    },
    
   
});

const VitalsModel = mongoose.model('Vitals', vitalsSchema)

module.exports = VitalsModel
