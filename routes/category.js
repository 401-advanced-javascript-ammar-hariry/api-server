'use strict';

const express = require('express');
const categories = require('../models/category/category-model');

const router = express.Router();

router.post('/categories', categoriesHandler);
router.get('/categories/', getcategories);
router.get('/categories/:id', getcategoriesById);
router.put('/categories/:id', updatecategories);
router.delete('/categories/:id', deletecategories);


function categoriesHandler(req, res, next) {

  categories.create(req.body)
    .then(record => {
      res.status(201).json(record);
    }).catch(next);

}

function getcategories(req, res, next) {

  categories.read()
    .then(record => {
      res.status(200).json(record);
    }).catch(next);
}

function getcategoriesById(req, res, next) {

  categories.read(req.params.id)
    .then(record => {
      res.status(200).json(record);
    }).catch(next);
}

function updatecategories(req, res, next) {

  categories.update(req.params.id, req.body)
    .then(record => {
      res.status(201).json(record);
    }).catch(next);
}

function deletecategories(req, res, next) {

  categories.delete(req.params.id)
    .then(record => {
      res.status(200).json('the deletion  done');
    }).catch(next);
}


module.exports = router;