const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Products = require('../../models/products.js');
const MongoClient = require('mongodb').MongoClient;
const bodyparser = require('body-parser');  

/* const db = MongoClient.connect('mongodb://127.0.0.1:27017/mean-stack', function(err, db) {
    if(err) throw err;
    console.log("connected to the mongoDB !");
}); */

router.post('/', (req, res, next) => {
    console.log("request:", req)
    Products.create({
        name: req.body.name, 
        description: req.body.description, 
        price: req.body.price
    }, (err, post) => {
        if(err) throw err;
        res.status(201).json({
            message: "Product Created Successfully",
            product: post
        })
    })
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    if (id === 'special') {
        res.status(200).json({
            message: 'You discovered the special ID',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'You passed an ID'
        });
    }
});

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated product!'
    });
});

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted product!'
    });
});

module.exports = router;