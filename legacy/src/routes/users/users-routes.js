// REST API interacts with local JSON pseudo-database file managed by fs module

const express = require('express');

const usersRouter = express.Router();

const { fetchUptodateData, checkID, getAllUsers, getUser, createUser, checkRequiredProps, checkDisallowedProps, updateUser, deleteUser } = require('../../controllers/users/users-controller');

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

module.exports = usersRouter;