'use strict';

const express = require('express');
const logger = require('./logger');
const notFoundHandler = require('./404');
const errorHandler = require('./500');

const app = express();

app.use(express.json());
app.use(logger);

let productsArr = [];
let categoriesArr = [];

app.post('/products', productsHandler);
app.get('/products', getProducts);
app.get('/products/:id', getProductById);
app.put('/products/:id', updateProduct);
app.delete('/products/:id', deleteProduct);
app.post('/categories', categoriesHandler);
app.get('/categories', getCategory);
app.get('/categories/:id', getCategoryById);
app.put('/categories/:id', updateCategory);
app.delete('/categories/:id', deleteCategory);

function productsHandler(req, res) {

  let record = {
    name: req.body.name,
    display_name: req.body.display_name,
    description: req.body.description,
    category: req.body.category,
  };
  record.id = productsArr.length + 1;
  productsArr.push(record);
  res.status(200).json(record);
}

function getProducts(req, res) {
  res.status(200).json(productsArr);
}

function getProductById(req, res) {

  let getProductByIdArr = [];
  productsArr.forEach(val => {
    if (val.id == req.params.id) {
      getProductByIdArr.push(val);
    }
  });
  res.status(200).json(getProductByIdArr);
}

function updateProduct(req, res) {

  let newRecord = {};
  productsArr.forEach((val, index) => {
    if (val.id == req.params.id) {
      newRecord = {
        name: req.body.name,
        display_name: req.body.display_name,
        description: req.body.description,
        category: req.body.category,
        id: req.params.id,
      };
      productsArr.splice(index, 1, newRecord);
    }
  });
  res.status(200).json(newRecord);
}

function deleteProduct(req, res) {

  productsArr.forEach((val, index) => {
    if (val.id == req.params.id) {
      //   console.log('this is the index ---->', index);
      productsArr.splice(index, 1);
    }
  });
  res.status(200).json(productsArr);
}

function categoriesHandler(req, res) {
  let record = {
    name: req.body.name,
    display_name: req.body.display_name,
    description: req.body.description,
  };
  record.id = categoriesArr.length + 1;
  categoriesArr.push(record);
  res.json(record);
}

function getCategory(req, res) {
  res.status(200).json(categoriesArr);
}

function getCategoryById(req, res) {

  let getCAtegoryByIdArr = [];
  categoriesArr.forEach(val => {
    if (val.id == req.params.id) {
      getCAtegoryByIdArr.push(val);
    }
  });
  res.status(200).json(getCAtegoryByIdArr);
}

function updateCategory(req, res) {
  let newRecord = {};
  categoriesArr.forEach((val, index) => {
    if (val.id == req.params.id) {
      console.log('this is the index ---->', index);

      newRecord = {
        name: req.body.name,
        display_name: req.body.display_name,
        description: req.body.description,
        id: req.params.id,
      };

      categoriesArr.splice(index, 1, newRecord);
    }
  });
  res.status(200).json(newRecord);
}

function deleteCategory(req, res) {

  categoriesArr.forEach((val, index) => {
    if (val.id == req.params.id) {
      console.log('this is the index ---->', index);
      categoriesArr.splice(index, 1);
    }
  });
  res.status(200).json(categoriesArr);
}

app.use('*', notFoundHandler);
app.use(errorHandler);


module.exports = {

  server: app,
  start: () => {
    const PORT = process.env.PORT || 3030;

    app.listen(PORT, () => { console.log(`listining on PORT ${PORT}`); });
  },
};