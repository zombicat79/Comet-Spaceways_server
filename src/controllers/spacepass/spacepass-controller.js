// Controller interacts with remote MongoDB database

const Spacepass = require("../../models/spacepass/spacepass-model");

// MIDDLEWARE FUNCTIONS
// * --- Needed to determine whether the param passed into the URL is a SPACEPASS NUMBER or an OWNER ID --- *
function checkParamType(req, res, next, value) {
    if (/^[A-Z]{3}\d{6}$/.test(value)) {
        req.paramType = 'passnumber';
    } else {
        req.paramType = 'owner-id';
    }
    next();
}

// ROUTE HANDLERS
async function getAllSpacepasses(req, res) {
    try {
        const spacepasses = await Spacepass.find();
        res.status(200).json({
            status: "success",
            data: spacepasses
        })
    } catch(err) {
        res.status(404).json({
            status: "fail",
            message: err
        });
    }
}

async function createSpacepass(req, res) {
    try {
        const newSpacepass = await Spacepass.create(req.body);
        res.status(201).json({
            status: 'success',
            data: newSpacepass
        });
    } catch(err) {
        res.status(500).json({
            status: 'error',
            message: err
        });
    }
}

function getSpacepassDetails (req, res) {
    req.paramType === 'passnumber' ? getSpacepass(req, res) : getPassNum(req, res);
}

async function getPassNum(req, res) {
    try {
        const passNum = await Spacepass.findOne({ owner: req.params.identifier }, { passNum: 1});
        res.status(200).json({
            status: "success",
            data: passNum
        })
    } catch(err) {
        res.status(404).json({
            status: "fail",
            message: err
        });
    }
}

async function getSpacepass(req, res) {
    try {
        const spacepass = await Spacepass.findOne({ passNum: req.params.identifier });
        res.status(201).json({
            status: 'success',
            data: spacepass
        });
    } catch(err) {
        res.status(500).json({
            status: 'error',
            message: err
        });
    }
}

module.exports = {
    checkParamType,
    getSpacepassDetails,
    getAllSpacepasses,
    createSpacepass
}