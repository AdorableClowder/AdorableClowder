var db = require('./config.js');
var Models = require('./models.js');

var Users = db.Collection.extend({
  model: Models.User
});

var Offers = db.Collection.extend({
  model: Models.Offer
});

var Wants = db.Collection.extend({
  model: Models.Want
});