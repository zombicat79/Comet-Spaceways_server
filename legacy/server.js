// Server interacts with local JSON pseudo-database file managed by fs module

const app = require('./app');
const dotenv = require('dotenv');

dotenv.config();

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
})