const fs = require('fs');

const flights = JSON.parse(fs.readFileSync(`${__dirname}/../../db/collections/flights.json`));

function getAllFLights(req, res) {
    res.status(200).json({
        status: 'success',
        data: flights
    });
};

module.exports = {
    getAllFLights
}