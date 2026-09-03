const express = require('express');

const usersRouter = express.Router();

let usersControllers = {};
if (process.env.NODE_ENV === 'development') {
    usersControllers = require('../controllers/users-controller.dev');
    // Controller interacts with local JSON database file managed by fs module

    const { fetchUptodateData, checkID, getAllUsers, getUser, createUser, checkRequiredProps, checkDisallowedProps, updateUser, deleteUser } = usersControllers;

    // MIDDLEWARE STACK
    usersRouter.use(fetchUptodateData);
    usersRouter.param('id', checkID);

    // ROUTES
    usersRouter.route('/')
        .get(getAllUsers)
        .post(checkRequiredProps, checkDisallowedProps, createUser);

    usersRouter.route('/:id')
        .get(getUser)
        .patch(checkDisallowedProps, updateUser)
        .delete(deleteUser);
} else {
    usersControllers = require('../controllers/users-controller.prod');
    // Controller interacts with remote MongoDB database

    const { checkParamType, getAllUsers, getUser, getAverages, createUser, updateUser, deleteUser } = usersControllers;

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
}

module.exports = usersRouter;