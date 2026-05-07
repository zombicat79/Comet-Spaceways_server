const fs = require('fs');
const express = require('express');

const app = express();

const destinations = JSON.parse(fs.readFileSync(`${__dirname}/data/destinations.json`));
const flights = JSON.parse(fs.readFileSync(`${__dirname}/data/flight-schedule.json`));
const races = JSON.parse(fs.readFileSync(`${__dirname}/data/races.json`));

app.use(express.json());

// DESTINATIONS
app.get('/api/v1/destinations', (req, res) => {
    res.status(200).json({
        status: 'success',
        data: destinations
    });
});

app.get('/api/v1/destinations/:id', (req, res) => {
    const { id } = req.params;
    const selectedDestination = {...destinations}.destinations.find(el => el.id === +id);

    if (selectedDestination) {
        res.status(200).json({
            status: 'success',
            data: selectedDestination
        });
    } else {
        res.status(404).json({
            status: 'error',
            message: 'The requested destination does not exist'
        });
    }
});

app.post('/api/v1/destinations', async (req, res) => {
    const updatedDestinations = {...destinations};
    updatedDestinations.destinations.push(req.body);

    try {
        fs.writeFile(`${__dirname}/data/destinations.json`, JSON.stringify(updatedDestinations), () => {
            res.status(201).json({
                status: 'success',
                message: 'New destination successfully saved to DB'
            });
        });
    } catch(err) {
        res.status(500).json({
            status: 'error',
            message: err
        });
    }
})

// FLIGHTS
app.get('/api/v1/flights', (req, res) => {
    res.status(200).json({
        status: 'success',
        data: flights
    });
});

// RACES
app.get('/api/v1/races', (req, res) => {
    res.status(200).json({
        status: 'success',
        data: races
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
})