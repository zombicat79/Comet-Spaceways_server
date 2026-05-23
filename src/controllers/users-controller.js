const fs = require('fs');
const userModel = require('../../db/models/user-model');

const usersData = JSON.parse(fs.readFileSync(`${__dirname}/../../db/collections/users.json`));

function checkID(req, res, next, value) {
    const targetUser = {...usersData}.users.find((el) => el.id === +value);
    
    if (!targetUser) {
        return res.status(404).json({
            status: 'fail',
            message: `User with ID: ${value} does not exist in the DB!`
        });
    }

    req.target = targetUser;
    next();
}

function getAllUsers(req, res) {
    res.status(200).json({
        status: 'success',
        data: usersData
    });
}

function getUser (req, res) {
    res.status(200).json({
        status: 'success',
        data: req.target
    });
}

function checkRequiredProps(req, res, next) {
    /* userModel.forEach((prop) => {
        if (!(prop in req.body)) {
            return res.status(400).json({
                status: 'fail',
                message: `${prop} property is missing in the data that was sent. It is mandatory to include it`
            });
            break;
        }
    }); */
    for (const prop of userModel) {
        if (!(prop in req.body)) {
            return res.status(400).json({
                status: 'fail',
                message: `${prop} property is missing in the data that was sent. It is mandatory to include it`
            });
        }
    }
    console.log('before next')
    next();
}

function checkDisallowedProps(req, res, next) {
    for (const prop in req.body) {
        if (!(userModel.includes(prop))) {
            return res.status(400).json({
                status: 'fail',
                message: `${prop} property is not allowed`
            });
        }
    }
    next();
}

function createUser(req, res) {
    const currentUsers = {...usersData}.users;
    const newUser = { ...req.body, id: currentUsers[currentUsers.length-1].id + 1 };
    const updatedUsers = [...currentUsers, newUser];

    try {
        fs.writeFile(`${__dirname}/../../db/collections/users.json`, JSON.stringify({ users: updatedUsers }), () => {
            res.status(201).json({
                status: 'success',
                data: updatedUsers
            });
        });
    } catch(err) {
        res.status(500).json({
            status: 'error',
            message: err
        });
    }
}

function updateUser(req, res) {
    const updatedUser = {...req.target, ...req.body};
    const updatedData = {...usersData}.users.map((el) => {
        if (el.id === req.target.id) return updatedUser;
        return el;
    });

    try {
        fs.writeFile(`${__dirname}/../../db/collections/users.json`, JSON.stringify({ users: updatedData }), () => {
            res.status(200).json({
                status: 'success',
                data: {
                    previous: req.target,
                    updated: updatedUser
                }
            });
        });
    } catch(err) {
        res.status(500).json({
            status: 'error',
            message: err
        });
    }
}

function deleteUser(req, res) {
    const updatedData = {...usersData}.users.filter((el) => el.id !== req.target.id)

    try {
        fs.writeFile(`${__dirname}/../../db/collections/users.json`, JSON.stringify({ users: updatedData }), () => {
            res.status(204).json({
                status: 'success'
            })
        });
    } catch(err) {
        res.status(500).json({
            status: 'error',
            message: err
        });
    }
}

module.exports = {
    checkID,
    getAllUsers,
    getUser,
    checkRequiredProps,
    checkDisallowedProps,
    createUser,
    updateUser,
    deleteUser
}