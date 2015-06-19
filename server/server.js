var express = require('express');

var app = express();
var port = process.env.PORT || 1337;

// Configuration for all environments -- will probably need to separate between dev & prod later
app.configure(function() {
  app.use(express.static(__dirname + '/client'));
});

app.listen(port);

console.log('server listening on port: ', port);

modules.export = app;