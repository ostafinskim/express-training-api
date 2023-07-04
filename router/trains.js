const express = require('express');
const { getAlltrains, addNewTrain, updateTrain, deleteTrain } = require('../controller/trains');

const trainRouter = express.Router()

trainRouter.route('/').get(getAlltrains);
trainRouter.route('/').post(addNewTrain);

trainRouter.route('/:id').put(updateTrain);
trainRouter.route('/:id').delete(deleteTrain);

module.exports = trainRouter;