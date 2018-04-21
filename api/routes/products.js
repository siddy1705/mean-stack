const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Products = require('../../models/products.js');
const MongoClient = require('mongodb').MongoClient;
const bodyparser = require('body-parser');

router.post('/create', (req, res, next) => {
  Products.create({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price
  }, (err, post) => {
    if (err) throw err;
    res.status(201).json({
      message: "Product Created Successfully",
      product: post
    })
  })
});

router.get('/', (req, res, next) => {
  var limit = req.body.limit;
  var skip = req.body.skip;
  Products.find({}, (err, data) => {
    res.status(200).json(data)
  })
});

router.post('/', (req, res, next) => {
  var limit = req.body.limit;
  var skip = req.body.skip;
  Products.find({}, (err, data) => {
    res.status(200).json(data)
  }).skip(skip).limit(limit)
});

router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Products.find({ _id: id }, (err, data) => {
    if (err) throw err;
    res.status(200).json(data)
  })
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