const fs = require('fs');

const destinations = JSON.parse(fs.readFileSync(`${__dirname}/../../data/destinations.json`));

function getAllDestinations(req, res) {
    res.status(200).json({
        status: 'success',
        data: destinations
    });
};

function getDestination(req, res) {
    const { id } = req.params;
    const selectedDestination = {...destinations}.destinations.find(el => el.id === +id);

    if (selectedDestination) {
        res.status(200).json({
            status: 'success',
            data: selectedDestination
        });
    } else {
        res.status(404).json({
            status: 'fail',
            message: 'The requested destination does not exist'
        });
    }
};

async function createDestination(req, res) {
    const updatedDestinations = {...destinations};
    const lastId = destinations.destinations.length;
    updatedDestinations.destinations.push({ id: lastId+1, ...req.body });

    try {
        fs.writeFile(`${__dirname}/../data/destinations.json`, JSON.stringify(updatedDestinations), () => {
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
    const { id } = req.params;
    const patchData = req.body;
    const selectedDestination = {...destinations}.destinations.find(el => el.id === +id);
    const patchedDestination = {...selectedDestination, ...patchData};
    const updatedDestinations = {...destinations}.destinations.map(el => {
        if (el.id === +id) return patchedDestination;
        return el;
    })

    if (selectedDestination) {
        try {
            fs.writeFile(`${__dirname}/../data/destinations.json`, JSON.stringify({ destinations: updatedDestinations }), () => {
                res.status(200).json({
                    status: 'success',
                    message: `Destination with ID: ${id} successfully modified`,
                    data: updatedDestinations
                });
            });
        } catch(err) {
            res.status(500).json({
                status: 'error',
                message: err
            });
        }
    } else {
        res.status(404).json({
            status: 'fail',
            message: 'The requested destination does not exist'
        });
    }
};

function deleteDestination(req, res) {
    const { id } = req.params;
    const targetDestination = {...destinations}.destinations.find((el => el.id === +id));
    const updatedDestinations = {...destinations}.destinations.filter((el => el.id !== +id));

    if (targetDestination) {
        try {
            fs.writeFile(`${__dirname}/../data/destinations.json`, JSON.stringify({ destinations: updatedDestinations }), () => {
                res.status(204).json({
                    status: 'success',
                    message: `Destination with ID: ${id} successfully deleted`,
                    data: null
                });
            });
        } catch(err) {
            res.status(500).json({
                status: 'error',
                message: err
            });
        }
    } else {
        res.status(404).json({
            status: 'fail',
            message: 'The requested destination does not exist'
        });
    }
};

module.exports = {
    getAllDestinations,
    createDestination,
    getDestination,
    editDestination,
    deleteDestination
}