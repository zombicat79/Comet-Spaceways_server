const fs = require('fs');

const flights = JSON.parse(fs.readFileSync(`${__dirname}/../../data/flight-schedule.json`));

function getAllFLights(req, res) {
    res.status(200).json({
        status: 'success',
        data: flights
    });
};

module.exports = {
    getAllFLights
}