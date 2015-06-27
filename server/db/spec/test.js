// var query = require('../queries.js');
var Models = require('../models.js');
var User = Models.User;

var testUser = {
  "username": "justin6",
  "password": "1234",
  "offer": ["angularrr", "mmmeatloaferitto", "dodgeballlicious"],
  "want": ["javascripton", "bakingg cookiessrs", "wheat toastterton"],
  "email": "justin.thareja@gmail.com"
};

// query.createUser(JSON.stringify(testUser));


User.forge({
  username: 'j99'
}).fetch({withRelated: ['offers', 'wants']}).then(function (user) {
  console.log(user.toJSON());
});