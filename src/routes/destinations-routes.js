const express = require('express');
const { getAllDestinations, getDestination, createDestination, editDestination, deleteDestination } = require('./../controllers/destinations-controller');

const destinationsRouter = express.Router();

destinationsRouter.route('/')
    .get(getAllDestinations)
    .post(createDestination);

destinationsRouter.route('/:id')
    .get(getDestination)
    .patch(editDestination)
    .delete(deleteDestination);

module.exports = destinationsRouter;