// REST API interacts with remote MongoDB database

const express = require('express');

const usersRouter = express.Router();

const { checkParamType, getAllUsers, getUser, getAverages, createUser, updateUser, deleteUser } = require('../../controllers/user/user-controller');

    // MIDDLEWARE STACK
    usersRouter.param('identifier', checkParamType);

    // ROUTES
    usersRouter.route('/')
        .get(getAllUsers)
        .post(createUser);

    usersRouter.route('/average-characteristics')
        .get(getAverages);

    usersRouter.route('/:identifier')
        .get(checkParamType, getUser)
        .post(checkParamType, getUser)
        .patch(updateUser)
        .delete(deleteUser);

module.exports = usersRouter;