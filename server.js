var express = require('express');
// var morgan = require('morgan');

var app = express();
var port = process.env.PORT || 1337;

// Configuration for all environments -- will probably need to separate between dev & prod later
app.use(express.static(__dirname + '/client'));

app.listen(port);

console.log('server listening on port: ', port);

module.export = app;