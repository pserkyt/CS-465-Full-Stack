const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');

// express router - take trips request and pass to controller:
router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(tripsController.tripsAddTrip); // post goes here

router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindCode)
    .put(tripsController.tripsUpdateTrip); // update goes here

module.exports = router;

