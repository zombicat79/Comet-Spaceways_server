const fs = require('fs');
const { readFile } = require('node:fs/promises');
const userModel = require('../../db/models/user-model.dev');

const usersData = JSON.parse(fs.readFileSync(`${__dirname}/../../db/collections/users.json`));

// MIDDLEWARE FUNCTIONS
async function fetchUptodateData(req, res, next) {
    try {
        const dbContent = await readFile(`${__dirname}/../../db/collections/users.json`, { encoding: 'utf8' });
        console.log('New data returned!');
        req.dbReading = JSON.parse(dbContent);
    } catch(err) {
        console.log('Old data returned!');
        req.dbReading = usersData;
    } finally {
        next();
    }
}

function checkID(req, res, next, value) {
    const targetUser = {...req.dbReading}.users.find((el) => el.id === +value);
    
    if (!targetUser) {
        return res.status(404).json({
            status: 'fail',
            message: `User with ID: ${value} does not exist in the DB!`
        });
    }

    req.target = targetUser;
    next();
}

function checkRequiredProps(req, res, next) {
    for (const prop of userModel) {
        if (!(prop in req.body)) {
            return res.status(400).json({
                status: 'fail',
                message: `${prop} property is missing in the data that was sent. It is mandatory to include it`
            });
        }
    }
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

// ROUTE HANDLERS
function getAllUsers(req, res) {
    res.status(200).json({
        status: 'success',
        data: req.dbReading
    });
}

function getUser (req, res) {
    res.status(200).json({
        status: 'success',
        data: req.target
    });
}

function createUser(req, res) {
    const currentUsers = {...req.dbReading}.users;
    const newUser = { 
        ...req.body, 
        id: currentUsers[currentUsers.length-1]
            ? currentUsers[currentUsers.length-1].id + 1
            : 1
    };
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
    const updatedData = {...req.dbReading}.users.map((el) => {
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
    const updatedData = {...req.dbReading}.users.filter((el) => el.id !== req.target.id)

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
    fetchUptodateData,
    getAllUsers,
    getUser,
    checkRequiredProps,
    checkDisallowedProps,
    createUser,
    updateUser,
    deleteUser
}