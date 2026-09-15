const express = require("express");

const spacepassRouter = express.Router();
const spacepassControllers = require("./../../controllers/spacepass/spacepass-controller.prod");

const { checkParamType, getSpacepass, getAllSpacepasses, createSpacepass } = spacepassControllers;

// MIDDLEWARE STACK
spacepassRouter.param('identifier', checkParamType);

// ROUTES
spacepassRouter.route('/')
.get(getAllSpacepasses)
.post(createSpacepass);

spacepassRouter.route('/:identifier')
.get(checkParamType, getSpacepass);

module.exports = spacepassRouter;