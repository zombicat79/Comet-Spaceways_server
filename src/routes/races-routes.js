const express = require('express');
const { getAllRAces } = require('./../controllers/races-controller');

const racesRouter = express.Router();

racesRouter.route('/').get(getAllRAces);

module.exports = racesRouter;