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

const updateTrain = async (req, res) => {
    const { id } = req.params;
    const trainPayload = {
        trainExpressName,
        countryOfOrigin,
        yearOfConstruction,
        maxKilometerPerHour,
        destinationFrom,
        destinationTo,
     } = req.body;
    const token = String(id);
    try {
        readFile('public/data/trains.json', (err, data) => {
            if (err) throw err;
            const result = JSON.parse(data);
            const item = result.filter(el => el.id === token);
            if (!item) res.status(400).json({ msg: 'Item not found check ID'});
            function updateElementById(array, id, updatedData) {
                const updatedArray = array.map((element) => {
                  if (element.id === id) {
                    return { ...element, ...updatedData };
                  }
                  return element;
                });
              
                return updatedArray;
              }
              function updateObjectExcludingId(oldObject, updatedProperties) {
                const { id, ...rest } = updatedProperties;
                return { ...oldObject, ...rest };
              }
              const updatedTrain = updateObjectExcludingId(item[0], trainPayload);              
            
            const updatedResults = updateElementById(result, token, updatedTrain).sort((a,b) => a.id - b.id);

            writeFile('public/data/trains.json', JSON.stringify(updatedResults, null, 4), (err) => {
                if (err) throw err;
                res.status(200).json({
                    msg: 'File has been updated'
                })
              })
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            msg: 'Service is not available at this time. Try again'
        })
    }
}

const deleteTrain = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) res.status(400).json({ msg: 'Invalid ID'});
        readFile('public/data/trains.json', (err, data) => {
            if (err) throw err;
            const result = JSON.parse(data);
            const updated = result.filter(item => item.id !== id);
        writeFile('public/data/trains.json', JSON.stringify(updated, null, 4), (err) => {
            if (err) throw err;
            res.status(200).json({
                msg: 'File has been removed'
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
    addNewTrain,
    updateTrain,
    deleteTrain
}