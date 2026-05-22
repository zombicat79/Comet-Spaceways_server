const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

function resetDB(mode, resource) {
    if (mode === 'total') {
        const allCollections = fs.readdirSync(`${__dirname}/collections`);
        allCollections.forEach((col) => {
            const collectionName = col.slice(0, col.indexOf('.'));
            fs.writeFileSync(`${__dirname}/collections/${collectionName}.json`, JSON.stringify({ [collectionName]: [] }));
        });
        console.log('The DB has been successfuly reset!');
    } else {
        fs.writeFileSync(`${__dirname}/collections/${resource}.json`, JSON.stringify({ [resource]: [] }));
        console.log(`${resource} collection has been successfuly reset!`);
    }
}

resetDB(process.env.DB_RESET_MODE, process.env.DB_RESET_COLLECTION);
