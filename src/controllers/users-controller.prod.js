const User = require('../../db/models/user-model.prod');

// MIDDLEWARE FUNCTIONS
// * --- Needed to determine whether the param passed into the URL is an ID or a USERNAME --- *
function checkParamType(req, res, next, value) {
    if (/^\d+$/.test(value) || /^\w{24}$/.test(value)) {
        req.paramType = 'id';
    } else {
        req.paramType = 'username';
    }
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

function getUser (req, res) {
    req.paramType === 'id' ? getUserById(req, res) : getUserByUsername(req, res);
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
        const updatedUser = await User.findOneAndUpdate({ _id: req.params.identifier }, req.body, {
            runValidators: true,
            returnDocument: 'after'
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
        await User.findOneAndDelete({ _id: req.params.identifier });
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

// GET USER HELPERS
async function getUserById (req, res) {
    try {
        const user = await User.findOne({ _id: req.params.identifier });
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

async function getUserByUsername (req, res) {
    const providedPwd = req.body.password;
    
    try {
        const user = await User.findOne({ username: req.params.identifier });
        if (user.password === providedPwd) {
            res.status(200).json({
                status: "success",
                data: user
            })
        } else {
            res.status(400).json({
                status: "fail",
                message: "Identification not successful"
            })
        }
    } catch(err) {
        res.status(404).json({
            status: "fail",
            message: err
        });
    }
}

module.exports = {
    checkParamType,
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}