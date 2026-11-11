const mongoose = require("mongoose");
const { Schema } = mongoose;

const spacepassSchema = new mongoose.Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },   
    passNum: {
        type: String,
        minLength: 9,
        maxLength: 9,
        unique: true
    },
    category: {
        type: String,
        enum: ["A+", "A", "B1", "B2", "C", "D"],
        default: "D"
    },
    status: {
        type: String,
        enum: ["initial", "renewed", "blocked", "terminated"],
        default: "initial"
    },
    issueDate: {
        type: Date
    },
    expiryDate: {
        type: Date
    },
    issuePlace: {
        type: String,
        minLength: 3,
        maxLength: 3,
        default: "EAS"
    },
    namePrint: {
        type: String,
        minLength: 17,
        unique: true
    },
    serialNum: {
        type: String,
        minLength: 17,
        unique: true
    }
});

const Spacepass = mongoose.model("Spacepass", spacepassSchema);

module.exports = Spacepass;

