const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require("mongoose");
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

mongoose.connect('mongodb://localhost:27017/mean-stack').catch((err) => console.error(err));

// Morgan to display results in console
app.use(morgan('dev'));

// Body Parser to read request body parameters
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));

// Routes which should handle requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// Error Parameter 404
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

// Error Parameter 500
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;