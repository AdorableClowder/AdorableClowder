var db = require('../config.js');
var Promise = require('bluebird');
var _ = require('underscore');
var Models = require('../models.js');
var User = Models.User;
var Offer = Models.Offer;
var Want = Models.Want;


// getskills will take a user object and a skill table and return an array of skills associated with that user obj

User.forge({
  username: 'justin3'
})
.fetch({
  withRelated: ['offers']
})
.then(function (user) {
  console.log(user.related('offers').toJSON());
});
