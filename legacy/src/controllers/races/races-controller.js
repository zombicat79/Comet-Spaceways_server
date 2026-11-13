// Controller interacts with with local JSON pseudo-database file managed by fs module

const fs = require('fs');

const races = JSON.parse(fs.readFileSync(`${__dirname}/../../../db/collections/races.json`));

function getAllRAces(req, res) {
    res.status(200).json({
        status: 'success',
        data: races
    });
};

module.exports = {
    getAllRAces
}