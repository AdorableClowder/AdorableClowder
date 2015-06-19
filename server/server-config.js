var express = require('express');
var helpers = require('./helpers.js'); // any handy utility function
var controller = require('./controller.js'); // all actual route handling logic will reside here

var app = express();

app.use(express.static(__dirname + '/client'));

// Router
// TODO: make sure to bounce users to signup if they're not logged in
app.get('/explore', controller.getMatchingUsers);
app.post('/signup', controller.createUser);
// app.post('/login', send token and user info); 
app.post('/logout', controller.logoutUser);


module.exports = app;


