// REST API interacts with local JSON pseudo-database file managed by fs module

const express = require('express');
const { getAllRAces } = require('../../controllers/races/races-controller');

const racesRouter = express.Router();

racesRouter.route('/').get(getAllRAces);

module.exports = racesRouter;