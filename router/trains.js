const express = require('express');
const { getAlltrains, addNewTrain, updateTrain } = require('../controller/trains');

const trainRouter = express.Router()

trainRouter.route('/').get(getAlltrains);
trainRouter.route('/').post(addNewTrain);

trainRouter.route('/:id').put(updateTrain);

module.exports = trainRouter;