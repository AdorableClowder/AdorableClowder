var express = require('express');
var bodyParser = require('body-parser'); //body parser gives us access to req.body
var helpers = require('./helpers.js'); // any handy utility function
var controller = require('./controller.js'); // all actual route handling logic will reside here

var app = express();

//LOG ALL REQUESTS TO SERVER, for testing
var logger = function (req, res, next) {
  console.log("GOT REQUEST: ");
  console.log(req.body);
  next(); // Passing the request to the next handler in the stack.
};

//parse req.body and serve static assets
app.use(bodyParser.json())
  .use(express.static(__dirname + '/../client'));

// Router
// TODO: make sure to bounce users to signup if they're not logged in
app.get('/explore', controller.checkAuth, controller.getMatchingUsers);
app.post('/signup', controller.signup);
app.post('/login', controller.login);
app.get('/profile', controller.checkAuth, controller.getCurrentUser);


module.exports = app;
