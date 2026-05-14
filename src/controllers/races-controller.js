const fs = require('fs');

const races = JSON.parse(fs.readFileSync(`${__dirname}/../../data/races.json`));

function getAllRAces(req, res) {
    res.status(200).json({
        status: 'success',
        data: races
    });
};

module.exports = {
    getAllRAces
}