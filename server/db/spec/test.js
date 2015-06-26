var query = require('./queries.js');

var testUser = {
  "username": "justin5",
  "password": 1234,
  "offer": ["angularr", "mmmeatloaf", "dodgeballl"],
  "want": ["javascript", "bakingg cookiess", "wheat toastt"],
  "email": "justin.thareja@gmail.com"
};

query.createUser(JSON.stringify(testUser));
