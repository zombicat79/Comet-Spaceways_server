const express = require('express');

const usersRouter = express.Router();

usersRouter.route('/')
    .get((req, res) => {
        console.log(req);
        res.status(200).send('Users router was hit!')
    })
    .post((req, res) => {
        // Route controller to be defined
    });

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