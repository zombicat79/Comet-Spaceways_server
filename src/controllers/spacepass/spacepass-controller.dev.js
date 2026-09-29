const fs = require('fs');
const { readFile } = require('node:fs/promises');
const spacepassModel = require('../../../db/models/spacepass/spacepass-model.dev');

const spacepassesData = JSON.parse(fs.readFileSync(`${__dirname}/../../../db/collections/spacepasses.json`));

// MIDDLEWARE FUNCTIONS
async function fetchUptodateData(req, res, next) {
    try {
        const dbContent = await readFile(`${__dirname}/../../db/collections/spacepasses.json`, { encoding: 'utf8' });
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
    const targetSpacepass = {...req.dbReading}.spacepasses.find((el) => el.id === +value);
    
    if (!targetSpacepass) {
        return res.status(404).json({
            status: 'fail',
            message: `Spacepass with ID: ${value} does not exist in the DB!`
        });
    }

    req.target = targetSpacepass;
    next();
}

function checkRequiredProps(req, res, next) {
    for (const prop of spacepassModel) {
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
        if (!(spacepassModel.includes(prop))) {
            return res.status(400).json({
                status: 'fail',
                message: `${prop} property is not allowed`
            });
        }
    }
    next();
}

// ROUTE HANDLERS
function getAllSpacepasses(req, res) {
    res.status(200).json({
        status: 'success',
        data: req.dbReading
    });
}

function getSpacepass (req, res) {
    res.status(200).json({
        status: 'success',
        data: req.target
    });
}

function createSpacepass(req, res) {
    const currentSpacepasses = {...req.dbReading}.spacepasses;
    const newSpacepass = { 
        ...req.body, 
        id: currentSpacepasses[currentSpacepasses.length-1]
            ? currentSpacepasses[currentSpacepasses.length-1].id + 1
            : 1
    };
    const updatedSpacepasses = [...currentSpacepasses, newSpacepass];

    try {
        fs.writeFile(`${__dirname}/../../db/collections/users.json`, JSON.stringify({ spacepasses: updatedSpacepasses }), () => {
            res.status(201).json({
                status: 'success',
                data: updatedSpacepasses
            });
        });
    } catch(err) {
        res.status(500).json({
            status: 'error',
            message: err
        });
    }
}

function updateSpacepass(req, res) {
    const updatedSpacepass = {...req.target, ...req.body};
    const updatedData = {...req.dbReading}.spacepasses.map((el) => {
        if (el.id === req.target.id) return updatedSpacepass;
        return el;
    });

    try {
        fs.writeFile(`${__dirname}/../../db/collections/users.json`, JSON.stringify({ spacepasses: updatedData }), () => {
            res.status(200).json({
                status: 'success',
                data: {
                    previous: req.target,
                    updated: updatedSpacepass
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

function deleteSpacepass(req, res) {
    const updatedData = {...req.dbReading}.spacepasses.filter((el) => el.id !== req.target.id);

    try {
        fs.writeFile(`${__dirname}/../../db/collections/users.json`, JSON.stringify({ spacepasses: updatedData }), () => {
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
    getAllSpacepasses,
    getSpacepass,
    checkRequiredProps,
    checkDisallowedProps,
    createSpacepass,
    updateSpacepass,
    deleteSpacepass
}