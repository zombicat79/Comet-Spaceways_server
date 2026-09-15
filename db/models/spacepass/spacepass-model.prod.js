const mongoose = require("mongoose");

const spacepassSchema = new mongoose.Schema({
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
        default: "EAS"
    },
    serialNum: {
        type: String,
        minLength: 17,
        maxLength: 17
    }
});

const Spacepass = mongoose.model("Spacepass", spacepassSchema);

module.exports = Spacepass;

