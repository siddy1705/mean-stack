const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Products = require('../../models/products.js');
const MongoClient = require('mongodb').MongoClient;

router.post('/create', (req, res, next) => {
  Products.create(req.body, (err, post) => {
    if (err) throw err;
    res.status(201).json({
      message: "Product Created Successfully",
      product: post
    })
  })
});

router.get('/', (req, res, next) => {
  // default show first 30 records if limit and offset not specified
  var limit = (req.query.limit != undefined ? req.query.limit : 30);
  var skip = (req.query.skip != undefined ? req.query.skip : 0);
  
  Products.find({}, (err, data) => {
    res.status(200).json(data)
  }).skip(skip).limit(limit)
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
    res.status(200).JSON.str(data)
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