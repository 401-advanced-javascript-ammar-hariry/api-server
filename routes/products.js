'use strict';

const express = require('express');
const product = require('../models/products/product-model');


const router = express.Router();

router.post('/products', productsHandler);
router.get('/products/', getProducts);
router.get('/products/:id', getProductsById);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);


function productsHandler(req, res, next) {

  product.create(req.body)
    .then(record => {
      res.status(201).json(record);
    }).catch(next);

}

function getProducts(req, res, next) {

  product.read()
    .then(record => {
      res.status(200).json(record);
    }).catch(next);
}

function getProductsById(req, res, next) {

  product.read(req.params.id)
    .then(record => {
      res.status(200).json(record);
    }).catch(next);
}

function updateProduct(req, res, next) {

  product.update(req.params.id, req.body)
    .then(record => {
      res.status(201).json(record);
    }).catch(next);
}

function deleteProduct(req, res, next) {

  product.delete(req.params.id)
    .then(record => {
      res.status(200).json('the deletion  done');
    }).catch(next);
}


module.exports = router;