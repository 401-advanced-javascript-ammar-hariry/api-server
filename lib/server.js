'use strict';

const express = require('express');
// const logger = require('./logger');
const notFoundHandler = require('./404');
const errorHandler = require('./500');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const productRouter = require('../routes/products');
const categoryRouter = require('../routes/category');


const app = express();

app.use(express.json());
// app.use(logger);
app.use(cors());
app.use(morgan('dev'));

app.use('/api/v1', productRouter);
app.use('/api/v1', categoryRouter);

app.use('*', notFoundHandler);
app.use(errorHandler);


module.exports = {

  server: app,
  start: () => {
    const PORT = process.env.PORT || 3030;

    app.listen(PORT, () => { console.log(`listining on PORT ${PORT}`); });
  },
};