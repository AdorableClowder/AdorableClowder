var db = require('./config.js');
var Models = require('./models.js');

var Users = exports.Users = db.Collection.extend({
  model: Models.User
});

var Offers = exports.Offers = db.Collection.extend({
  model: Models.Offer
});

var Wants = exports.Wants = db.Collection.extend({
  model: Models.Want
});

var allOffers = exports.allOffers = Offers.forge();