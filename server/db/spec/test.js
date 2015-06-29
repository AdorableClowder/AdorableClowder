//proto-testing file. No functionality

// var query = require('../queries.js');
var Models = require('../models.js');
var buildUserObj = require('../queries/buildUserObj.js');
var User = Models.User;
var Want = Models.Want;
var _ = require('underscore');


var testUser = {
  "username": "justin6",
  "password": "1234",
  "offer": ["angularrr", "mmmeatloaferitto", "dodgeballlicious"],
  "want": ["javascripton", "bakingg cookiessrs", "wheat toastterton"],
  "email": "justin.thareja@gmail.com"
};

// query.createUser(JSON.stringify(testUser));


// User.forge({
//   username: 'j99'
// }).fetch({withRelated: ['offers', 'wants']}).then(function (user) {
//   console.log(user.toJSON());
// });

// select all users from the db who have a skill of of yoga

// User.where({
//   username: 'j100'
// })
// .fetch()
// .then(function (user) {
//   console.log(user.;
// })

// User.where({username: 'justin101'}).fetch()
// .then(function (user) {
//   console.log(user.wants())
// })



buildUserObj(1).tap(console.log)
