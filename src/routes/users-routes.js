const express = require('express');

let usersControllers = {};
if (process.env.NODE_ENV === 'development') {
    usersControllers = require('../controllers/users-controller.dev');
} else {
    // Change file request below when using real DB!!!
    usersControllers = require('../controllers/users-controller.prod');
}
const { fetchUptodateData, checkID, getAllUsers, getUser, createUser, checkRequiredProps, checkDisallowedProps, updateUser, deleteUser } = usersControllers;

const usersRouter = express.Router();

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