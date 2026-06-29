const express = require('express');
const cors = require('cors');

const usersRouter = require('./src/routes/users-routes');
const destinationsRouter = require('./src/routes/destinations-routes');
const flightsRouter = require('./src/routes/flights-routes');
const racesRouter = require('./src/routes/races-routes');

const app = express();

// MIDDLEWARE STACK
app.use(cors({ origin: ["https://cometspaceways.zombiecat.dev", "http://localhost:5173"]} ));
app.use(express.json());

// ROUTERS
app.use('/cometspaceways/api/v1/users', usersRouter);
app.use('/cometspaceways/api/v1/destinations', destinationsRouter);
app.use('/cometspaceways/api/v1/flights', flightsRouter);
app.use('/cometspaceways/api/v1/races', racesRouter);

app.get('/cometspaceways/api/v1', (req, res) => {
    res.send('Comet Spaceways API is up and running!');
});

module.exports = app;