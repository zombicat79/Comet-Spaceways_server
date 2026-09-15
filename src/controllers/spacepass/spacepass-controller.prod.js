const Spacepass = require("./../../../db/models/spacepass/spacepass-model.prod");

// MIDDLEWARE FUNCTIONS
// * --- Needed to determine whether the param passed into the URL is an ID or a USERNAME --- *
function checkParamType(req, res, next, value) {
    if (/^\d+$/.test(value) || /^\w{24}$/.test(value)) {
        req.paramType = 'passnumber';
    } else {
        req.paramType = 'name';
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

function getSpacepass (req, res) {
    req.paramType === 'passnumber' ? getUserByPassnum(req, res) : getUserByName(req, res);
}

async function createSpacepass(req, res) {
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

module.exports = {
    checkParamType,
    getSpacepass,
    getAllSpacepasses,
    createSpacepass
}