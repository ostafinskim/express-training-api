const express = require('express');
const { getAlltrains, addNewTrain } = require('../controller/trains');

const trainRouter = express.Router()

trainRouter.route('/').get(getAlltrains);
trainRouter.route('/').post(addNewTrain);

module.exports = trainRouter;