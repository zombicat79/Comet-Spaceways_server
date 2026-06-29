const User = require('../../db/models/user-model.prod');

// MIDDLEWARE FUNCTIONS
// * --- Must be preserved as void functions to maintain code integrity of 'users-routes.js' file --- *
function fetchUptodateData(req, res, next) {
    next();
}

function checkID(req, res, next, value) {
    next();
}

function checkRequiredProps(req, res, next) {
    next();
}

function checkDisallowedProps(req, res, next) {
    next();
}

// ROUTE HANDLERS
async function getAllUsers(req, res) {
    try {
        const users = await User.find();
        res.status(200).json({
            status: "success",
            data: users
        })
    } catch(err) {
        res.status(404).json({
            status: "fail",
            message: err
        });
    }
}

async function getUser (req, res) {
    try {
        const user = await User.findOne({ username: req.params.id });
        res.status(200).json({
            status: "success",
            data: user
        })
    } catch(err) {
        res.status(404).json({
            status: "fail",
            message: err
        });
    }
}

async function createUser(req, res) {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json({
            status: 'success',
            data: newUser
        });
    } catch(err) {
        res.status(500).json({
            status: 'error',
            message: err
        });
    }
}

async function updateUser(req, res) {
    try {
        const updatedUser = await User.findOneAndUpdate({ username: req.params.id }, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: "success",
            data: updatedUser
        })
    } catch(err) {
        res.status(500).json({
            status: "error",
            message: err
        })
    }
}

async function deleteUser(req, res) {
    try {
        await User.findOneAndDelete({ username: req.params.id });
        res.status(204).json({
            status: "success"
        })
    } catch(err) {
        res.status(500).json({
            status: "error",
            message: err
        })
    }
}

module.exports = {
    checkID,
    fetchUptodateData,
    getAllUsers,
    getUser,
    checkRequiredProps,
    checkDisallowedProps,
    createUser,
    updateUser,
    deleteUser
}