// REST API interacts with remote MongoDB database

const express = require('express');
const cors = require('cors');

const usersRouter = require('./src/routes/users/users-routes');
const spacepassesRouter = require('./src/routes/spacepasses/spacepasses-routes');

const app = express();

// MIDDLEWARE STACK
app.use(cors({ 
    origin: ["http://localhost:5173"],
    credentials: true
}));
app.use(express.json());

// ROUTERS
app.use('/cometspaceways/api/v1/users', usersRouter);
app.use('/cometspaceways/api/v1/spacepasses', spacepassesRouter);

app.get('/cometspaceways/api/v1', (req, res) => {
    res.send('Comet Spaceways API is up and running!');
});

module.exports = app;