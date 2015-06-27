var query = require('../queries.js');

var testUser = {
  "username": "justin6",
  "password": "1234",
  "offer": ["angularrr", "mmmeatloaferitto", "dodgeballlicious"],
  "want": ["javascripton", "bakingg cookiessrs", "wheat toastterton"],
  "email": "justin.thareja@gmail.com"
};

query.createUser(JSON.stringify(testUser));
