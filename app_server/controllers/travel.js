var fs = require('fs');

var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

/* GET travel view */
const travel = (req, res) => {
   pageTitle = 'Travlr Getaways - Travel';
   res.render('travel', { title: pageTitle, trips });
};

module.exports = {
   travel
};
