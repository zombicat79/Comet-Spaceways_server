const express = require('express');

const { getAllDestinations, getDestination, createDestination, editDestination, deleteDestination } = require('./routes/destinations-routes');
const { getAllFLights } = require('./routes/flights-routes');
const { getAllRAces } = require('./routes/races-routes');

const app = express();

app.use(express.json());

// DESTINATIONS
app.route('/api/v1/destinations')
    .get(getAllDestinations)
    .post(createDestination);

app.route('/api/v1/destinations/:id')
    .get(getDestination)
    .patch(editDestination)
    .delete(deleteDestination);

// FLIGHTS
app.route('/api/v1/flights')
    .get(getAllFLights);

// RACES
app.route('/api/v1/races')
    .get(getAllRAces);

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
})