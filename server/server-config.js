var express = require('express');
var bodyParser = require('body-parser'); //body parser gives us access to req.body
var controller = require('./controller.js'); // all actual route handling logic will reside here

var app = express();

//parse req.body and serve static assets
app.use(bodyParser.json())
  .use(express.static(__dirname + '/../client'));

// Router (routes to controller)
// Express method chaining--calls methods in listed order
app.get('/explore', controller.checkAuth, controller.getMatchingUsers);
app.get('/profile', controller.checkAuth, controller.getCurrentUser);
app.post('/signup', controller.signup);
app.post('/login', controller.login);
// app.post('/profile', controller.checkAuth, controller.saveUserChanges);

module.exports = app;
