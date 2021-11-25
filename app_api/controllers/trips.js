const mongoose = require('mongoose');
const model = mongoose.model('trips');

// GET: /trips - list all trips
const tripsList = async (req, res) => {
    model
        .find({}) // empty filler for all (finds all trips)
        .exec((err, trips) => {
            if (trips.length == 0) { // (!trips returns empty array: [])
                return res
                    .status(404) // no trips found
                    .json({ "message": "trip not found" });
            } else if (err) {
                return res
                    .status(404) // error
                    .json(err);
            } else {
                return res
                    .status(200) // success
                    .json(trips);
            }
        });
};

// GET: /trips/:tripCode - returns single trip
const tripsFindCode = async (req, res) => {
    model
        .find({ 'code': req.params.tripCode })
        .exec((err, trip) => {
            if (trip.length == 0) { // (!trip returns empty array: [])
                return res
                    .status(404) // trip not found
                    .json({ "message": "trip not found" });
            } else if (err) {
                return res
                    .status(404) // error
                    .json(err);
            } else {
                return res
                    .status(200) // success
                    .json(trip)
            }
        });
};

module.exports = {
    tripsList,
    tripsFindCode
};

