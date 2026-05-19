const express = require('express');
const { createUser, checkBody } = require('./../controllers/users-controller');

const usersRouter = express.Router();

usersRouter.route('/')
    .get((req, res) => {
        console.log(req);
        res.status(200).send('Users router was hit!')
    })
    .post(checkBody, createUser);

usersRouter.route('/:id')
    .get((req, res) => {
        // Route controller to be defined
    })
    .patch((req, res) => {
        // Route controller to be defined
    })
    .delete((req, res) => {
        // Route controller to be defined
    });

module.exports = usersRouter;