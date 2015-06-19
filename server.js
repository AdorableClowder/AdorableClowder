var app = require('./server/server-config.js');

var port = process.env.PORT || 1337;

app.listen(port);

console.log('server listening on port: ', port);

