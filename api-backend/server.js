require('dotenv').config({ path: './config.env' });
const mongoose = require('mongoose');
const app = require('./app');

mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log('Connected to the database...'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
