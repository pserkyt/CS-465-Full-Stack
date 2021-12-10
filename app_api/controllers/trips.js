const mongoose = require('mongoose');
const Trip = mongoose.model('trips');
const User = mongoose.model('users');

// GET: /trips - list all trips
const tripsList = async (req, res) => {
    Trip
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
    Trip
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

const tripsAddTrip = async (req, res) => {
    getUser(req, res,
        (req, res) => {
            Trip
                .create({
                    code: req.body.code,
                    name: req.body.name,
                    length: req.body.length,
                    start: req.body.start,
                    resort: req.body.resort,
                    perPerson: req.body.perPerson,
                    image: req.body.image,
                    description: req.body.description
                },
                    (err, trip) => {
                        if (err) {
                            return res
                                .status(400) // bad request, invalid content
                                .json(err);
                        } else {
                            return res
                                .status(201) // created
                                .json(trip);
                        }
                    });
        }
    )
};

const tripsUpdateTrip = async (req, res) => {
    console.log(req.body);
    getUser(req, res,
        (req, res) => {
            Trip
                .findOneAndUpdate({ 'code': req.params.tripCode }, {
                    code: req.body.code,
                    name: req.body.name,
                    length: req.body.length,
                    start: req.body.start,
                    resort: req.body.resort,
                    perPerson: req.body.perPerson,
                    image: req.body.image,
                    description: req.body.description
                }, { new: true })
                .then(trip => {
                    if (!trip) {
                        return res
                            .status(404)
                            .send({
                                message: "Trip not found with code " + req.params.tripCode
                            });
                    }
                    res.send(trip);
                }).catch(err => {
                    if (err.kind === 'ObjectId') {
                        return res
                            .status(404)
                            .send({
                                message: "Trip not found with code " + req.params.tripCode
                            });
                    }
                    return res
                        .status(500) // server error
                        .json(err);
                });
        }
    )
};

const tripsDeleteTrip = async (req, res) => {
    getUser(req, res,
        (req, res) => {
            Trip
                .findOneAndDelete({ 'code': req.params.tripCode })
                .exec((err) => {
                    if (err) {
                        return res
                            .status(404) // error
                            .json(err);
                    } else {
                        return res
                            .status(200) // success
                    }
                });
        }
    )
};

const getUser = (req, res, callback) => {
    if (req.payload && req.payload.email) {
        User
            .findOne({ email: req.payload.email })
            .exec((err, user) => {
                if (!user) {
                    return res
                        .status(404)
                        .json({ "message": "User not found" });
                } else if (err) {
                    console.log(err);
                    return res
                        .status(404)
                        .json(err);
                }
                callback(req, res, user.name);
            });
    } else {
        return res
            .status(404)
            .json({ "message": "User not found" });
    }
};

module.exports = {
    tripsList,
    tripsFindCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip
};

