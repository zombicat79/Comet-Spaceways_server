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
function getAllUsers(req, res) {
    /* res.status(200).json({
        status: 'success',
        data: req.dbReading
    }); */

    res.send('under construction');
}

function getUser (req, res) {
    /* res.status(200).json({
        status: 'success',
        data: req.target
    }); */

    res.send('under construction');
}

async function createUser(req, res) {
    try {
        const newUser = await new User(req.body).save();
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

function updateUser(req, res) {
    /* const updatedUser = {...req.target, ...req.body};
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
    } */

    res.send('under construction');
}

function deleteUser(req, res) {
    /* const updatedData = {...req.dbReading}.users.filter((el) => el.id !== req.target.id)

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
    } */

    res.send('under construction');
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