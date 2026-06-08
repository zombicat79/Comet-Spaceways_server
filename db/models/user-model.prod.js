const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    surname: String,
    race: String,
    nationality: String,
    origin: String,
    build: String,
    gender: String,
    job: String,
    avatar: String,
    username: {
        type: String,
        unique: true
    },
    password: String,
    email: {
        type: String,
        unique: true
    },
    health: Number,
    strength: Number,
    intelligence: Number,
    wisdom: Number,
    dexterity: Number,
    diplomacy: Number,
    skills: [String],
    money: Number,
    inventory: [String],
    activeFlight: {},
    flightHistory: [String],
    activeQuest: {},
    questHistory: [String]
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;