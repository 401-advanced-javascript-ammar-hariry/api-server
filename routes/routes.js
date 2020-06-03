'use strict';

const express = require('express');
// const product = require('../models/products/products-model');
// const categories = require('../models/category/category-model');
const getModel = require('../middleware/params');
const router = express.Router();
router.param('model', getModel);

router.post('/api/v1/:model', modelHandler);
router.get('/api/v1/:model', getModels);
router.get('/api/v1/:model/:id', getModelById);
router.put('/api/v1/:model/:id', updateModel);
router.delete('/api/v1/:model/:id', deleteModel);


function modelHandler(req, res, next) {

  req.model.create(req.body)
    .then(record => {
      res.status(201).json(record);
    }).catch(next);
}

function getModels(req, res, next) {

  req.model.read()
    .then(record => {
      res.status(200).json(record);
    }).catch(next);
}

function getModelById(req, res, next) {

  req.model.read(req.params.id)
    .then(record => {
      res.status(200).json(record);
    }).catch(next);
}

function updateModel(req, res, next) {

  req.model.update(req.params.id, req.body)
    .then(record => {
      res.status(201).json(record);
    }).catch(next);
}

function deleteModel(req, res, next) {

  req.model.delete(req.params.id)
    .then(record => {
      res.status(200).json('the deletion  done');
    }).catch(next);
}


module.exports = router;