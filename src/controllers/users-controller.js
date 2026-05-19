const fs = require('fs');
const userModel = require('./../../data/models/user-model');

const users = JSON.parse(fs.readFileSync(`${__dirname}/../../data/users.json`));

function checkBody(req, res, next) {
    userModel.forEach((prop) => {
        if (!(prop in req.body)) {
            return res.status(400).json({
                status: 'fail',
                message: `${prop} property is missing in the data that was sent. It is mandatory to include it`
            });
        }
    });
    next();
}

async function createUser(req, res) {
    const currentUsers = {...users}.users;
    const newUser = { ...req.body, id: currentUsers.length+1 };
    const updatedUsers = [...currentUsers, newUser];

    try {
        await fs.writeFile(`${__dirname}/../../data/users.json`, JSON.stringify({ users: updatedUsers }), () => {
            res.status(201).json({
                status: 'success',
                message: 'New user successfully saved into DB',
                data: updatedUsers
            });
        });
    } catch(err) {
        res.status(500).json({
            status: 'error',
            message: err
        })
    }
}

module.exports = {
    checkBody,
    createUser
}