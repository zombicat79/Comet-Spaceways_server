const fs = require('fs');

const destinations = JSON.parse(fs.readFileSync(`${__dirname}/../../data/destinations.json`));

function checkID(req, res, next, value) {
    const targetDestination = {...destinations}.destinations.find(el => el.id === +value);
    req.target = targetDestination;
    if (!targetDestination) {
        return res.status(404).json({
            status: 'fail',
            message: 'The requested destination does not exist'
        });
    }
    next();
}

function getAllDestinations(req, res) {
    res.status(200).json({
        status: 'success',
        data: destinations
    });
};

function getDestination(req, res) {
    res.status(200).json({
        status: 'success',
        data: req.target
    });
};

function checkBody(req, res, next) {
    if (!req.body.full_name) {
        return res.status(400).json({
            status: 'fail',
            message: 'New destination is lacking full_name property. Cannot be created'
        });
    }
    next();
}

async function createDestination(req, res) {
    const updatedDestinations = {...destinations};
    const lastId = destinations.destinations.length;
    updatedDestinations.destinations.push({ id: lastId+1, ...req.body });

    try {
        fs.writeFile(`${__dirname}/../../data/destinations.json`, JSON.stringify(updatedDestinations), () => {
            res.status(201).json({
                status: 'success',
                message: 'New destination successfully saved to DB',
                data: updatedDestinations
            });
        });
    } catch(err) {
        res.status(500).json({
            status: 'error',
            message: err
        });
    }
};

function editDestination(req, res) {
    const patchData = req.body;
    const patchedDestination = {...req.target, ...patchData};
    const updatedDestinations = {...destinations}.destinations.map(el => {
        if (el.id === req.target.id) return patchedDestination;
        return el;
    })

    try {
        fs.writeFile(`${__dirname}/../../data/destinations.json`, JSON.stringify({ destinations: updatedDestinations }), () => {
            res.status(200).json({
                status: 'success',
                message: `Destination with ID: ${req.target.id} successfully modified`,
                data: updatedDestinations
            });
        });
    } catch(err) {
        res.status(500).json({
            status: 'error',
            message: err
        });
    }
};

function deleteDestination(req, res) {
    const updatedDestinations = {...destinations}.destinations.filter((el => el.id !== +req.target.id));

    try {
        fs.writeFile(`${__dirname}/../../data/destinations.json`, JSON.stringify({ destinations: updatedDestinations }), () => {
            res.status(204).json({
                status: 'success',
                message: `Destination with ID: ${req.target.id} successfully deleted`,
                data: null
            });
        });
    } catch(err) {
        res.status(500).json({
            status: 'error',
            message: err
        });
    }
};

module.exports = {
    getAllDestinations,
    createDestination,
    getDestination,
    editDestination,
    deleteDestination,
    checkID,
    checkBody
}