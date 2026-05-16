const express = require('express');

const usersRouter = require('./src/routes/users-routes');
const destinationsRouter = require('./src/routes/destinations-routes');
const flightsRouter = require('./src/routes/flights-routes');
const racesRouter = require('./src/routes/races-routes');

const app = express();
app.use(express.json());
app.use('cometspaceways/api/v1/users', usersRouter);
app.use('cometspaceways/api/v1/destinations', destinationsRouter);
app.use('cometspaceways/api/v1/flights', flightsRouter);
app.use('cometspaceways/api/v1/races', racesRouter);

app.get('cometspaceways/api/v1', (req, res) => {
    res.send('Comet Spaceways API is up and running!');
});

module.exports = app;