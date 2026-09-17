const express = require("express");

const spacepassRouter = express.Router();

let spacepassControllers = {};
if (process.env.NODE_ENV === 'development') {
    spacepassControllers = require('../../controllers/spacepass/spacepass-controller.dev');
    // Controller interacts with local JSON database file managed by fs module

    const { fetchUptodateData, checkID, getAllSpacepasses, getSpacepass, createSpacepass, checkRequiredProps, checkDisallowedProps, updateSpacepass, deleteSpacepass } = spacepassControllers;

    // MIDDLEWARE STACK
    spacepassRouter.use(fetchUptodateData);
    spacepassRouter.param('id', checkID);

    // ROUTES
    spacepassRouter.route('/')
        .get(getAllSpacepasses)
        .post(checkRequiredProps, checkDisallowedProps, createSpacepass);

    spacepassRouter.route('/:id')
        .get(getSpacepass)
        .patch(checkDisallowedProps, updateSpacepass)
        .delete(deleteSpacepass);
} else {
    spacepassControllers = require('../../controllers/user/users-controller.prod');
    // Controller interacts with remote MongoDB database

    const { checkParamType, getSpacepass, getAllSpacepasses, createSpacepass } = spacepassControllers;

    // MIDDLEWARE STACK
    spacepassRouter.param('identifier', checkParamType);

    // ROUTES
    spacepassRouter.route('/')
        .get(getAllSpacepasses)
        .post(createSpacepass);

    spacepassRouter.route('/:identifier')
        .get(checkParamType, getSpacepass);
}

module.exports = spacepassRouter;