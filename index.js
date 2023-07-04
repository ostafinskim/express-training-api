const express = require('express')
const trainRouter = require('./router/trains')
const app = express()

const PORT = process.env.PORT || 4000
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello from Nerdbord!')
})

app.use('/trains', trainRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
})
