// mod.cjs
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { readFile, writeFile } = require('fs');

const getAlltrains = async (req, res) => {
    try {
        const results = await fetch('http://localhost:4000/data/trains.json');
        const data = await results.json();
        res.status(200).json({
            data
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            msg: 'Service unavailable. Try again'
        });
    }
}

const addNewTrain = async (req, res) => {
    const createTrainPayload = {
        trainExpressName,
        countryOfOrigin,
        yearOfConstruction,
        maxKilometerPerHour,
        destinationFrom,
        destinationTo,
     } = req.body;

     if (!trainExpressName || !countryOfOrigin || !yearOfConstruction || !maxKilometerPerHour || !destinationFrom || !destinationTo) {
        res.status(400).json({
            msg: 'Please provide valid data to enter new train'
        })
     }
    try {
        readFile('public/data/trains.json', (err, data) => {
            if (err) throw err;
            const result = JSON.parse(data);
            const key = 'id';
            const val = `${result.length + 1}`;
            const newTrain = { [key]: val, ...createTrainPayload };
            const updated = [...result, newTrain];

        writeFile('public/data/trains.json', JSON.stringify(updated, null, 4), (err) => {
            if (err) throw err;
            res.status(200).json({
                msg: 'File has been updated'
            })
          })
        }); 
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            msg: 'Service is not available at this time. Try again'
        })
    }
}

module.exports = {
    getAlltrains,
    addNewTrain
}