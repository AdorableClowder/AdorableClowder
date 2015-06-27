var db = require('../config.js');
var Promise = require('bluebird');
var _ = require('underscore');
var Models = require('../models.js');
var User = Models.User;
var Offer = Models.Offer;
var Want = Models.Want;


// getskills will take a user object and a skill table and return an array of skills associated with that user obj

// User.forge({
//   username: 'justin24',
//   password: '#!$!*@(#@*#(!@#*!(#!',
//   email: 'justin22@gmail.com'
// })
// .save()
// .then(function (user) {
//   user.related('offers').attach([13,9,8]);
// });



User.forge({
  username: 'jwok'
})
.fetch({
  withRelated: ['offers', 'wants']
})
.then(function (user) {
  console.log(user.toJSON());
});
