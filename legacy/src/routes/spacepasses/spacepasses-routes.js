// REST API interacts with local JSON pseudo-database file managed by fs module

const express = require("express");

const spacepassRouter = express.Router();

const { fetchUptodateData, checkID, getAllSpacepasses, getSpacepass, createSpacepass, checkRequiredProps, checkDisallowedProps, updateSpacepass, deleteSpacepass } = require('../../controllers/spacepasses/spacepasses-controller');

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

module.exports = spacepassRouter;