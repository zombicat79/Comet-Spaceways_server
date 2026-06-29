const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A user must have a name"],
        trim: true
    },
    surname: {
        type: String,
        required: [true, "A user must have a surname"],
        trim: true
    },
    race: {
        type: String,
        required: [true, "A user must have a race"],
    },
    nationality: String,
    origin: String,
    build: String,
    gender: String,
    job: {
        type: String,
        required: [true, "A user must have a job"],
    },
    avatar: String,
    username: {
        type: String,
        required: [true, "A user must specify an alias / username"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "A user must specify a password"],
    },
    email: {
        type: String,
        required: [true, "A user must specify an email"],
        unique: true
    },
    health: {
        type: Number,
        default: 0
    },
    strength: {
        type: Number,
        default: 0
    },
    intelligence: {
        type: Number,
        default: 0
    },
    wisdom: {
        type: Number,
        default: 0
    },
    dexterity: {
        type: Number,
        default: 0
    },
    diplomacy: {
        type: Number,
        default: 0
    },
    skills: [String],
    money: {
        type: Number,
        default: 50
    },
    inventory: [String],
    activeFlight: {},
    flightHistory: [String],
    activeQuest: {},
    questHistory: [String]
});

const User = mongoose.model('User', userSchema);

module.exports = User;