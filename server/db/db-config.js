var Bookshelf = require('Bookshelf');
var path = require('path');


var db = Bookshelf.initialize({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: 'AdorableClowder',
    database: 'clowderDB',
    charset: 'utf8'


  }


})