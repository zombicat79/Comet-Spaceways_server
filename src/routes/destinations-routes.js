const express = require('express');
const { getAllDestinations, getDestination, createDestination, editDestination, deleteDestination, checkID, checkBody } = require('./../controllers/destinations-controller');

const destinationsRouter = express.Router();

// MIDDLEWARE STACK
destinationsRouter.param('id', checkID);

// ROUTES
destinationsRouter.route('/')
    .get(getAllDestinations)
    .post(checkBody, createDestination);

destinationsRouter.route('/:id')
    .get(getDestination)
    .patch(editDestination)
    .delete(deleteDestination);

module.exports = destinationsRouter;