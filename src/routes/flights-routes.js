const express = require('express');
const { getAllFLights } = require('./../controllers/flights-controller');

const flightsRouter = express.Router();

flightsRouter.route('/').get(getAllFLights);

module.exports = flightsRouter;