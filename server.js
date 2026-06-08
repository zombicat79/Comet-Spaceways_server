const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

if (process.env.NODE_ENV === 'production') {
    const pwd = process.env.REMOTE_DB_PWD;
    mongoose.connect(process.env.REMOTE_DB_CONNECTION.replace(/{{PASSWORD}}/, pwd))
        .then(() => console.log('Connected to MongoDB!'))
        .catch((err) => console.log(err));
}

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
})