// REST API interacts with local JSON pseudo-database file managed by fs module

const express = require('express');
const { getAllFLights } = require('../../controllers/flights/flights-controller');

const flightsRouter = express.Router();

flightsRouter.route('/').get(getAllFLights);

module.exports = flightsRouter;