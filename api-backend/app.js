const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const listRouter = require('./routes/listRouter');

const app = express();

// CORS
app.use(cors('*'));

// Body parsing
app.use(express.json());

// Logging request
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

// Routes
app.use('/api/v1/list', listRouter);

// Error handling
app.all('*', (req, res, next) => next(`${req.originalUrl} not found`));
app.use((err, req, res, next) => {
    console.log(err);

    res.status(500).json({
        status: 'error',
        message: err.message || 'Something went wrong',
    });
});

module.exports = app;
