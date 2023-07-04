// mod.cjs
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

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

module.exports = {
    getAlltrains,
}