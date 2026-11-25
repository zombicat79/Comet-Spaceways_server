// REST API interacts with remote MongoDB database

const express = require("express");

const spacepassesRouter = express.Router();

// Controller interacts with remote MongoDB database

const { checkParamType, getSpacepassDetails, getAllSpacepasses, createSpacepass } = require('../../controllers/spacepasses/spacepasses-controller');

// MIDDLEWARE STACK
spacepassesRouter.param('identifier', checkParamType);

// ROUTES
spacepassesRouter.route('/')
    .get(getAllSpacepasses)
    .post(createSpacepass);

spacepassesRouter.route('/:identifier')
    .get(checkParamType, getSpacepassDetails);

module.exports = spacepassesRouter;