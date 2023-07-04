const express = require('express');
const { getAlltrains } = require('../controller/trains');

const trainRouter = express.Router()

trainRouter.route('/').get(getAlltrains);

module.exports = trainRouter;