const express = require('express');

const usersRouter = require('./src/routes/users-routes');
const destinationsRouter = require('./src/routes/destinations-routes');
const flightsRouter = require('./src/routes/flights-routes');
const racesRouter = require('./src/routes/races-routes');

const app = express();
app.use(express.json());
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/destinations', destinationsRouter);
app.use('/api/v1/flights', flightsRouter);
app.use('/api/v1/races', racesRouter);

module.exports = app;