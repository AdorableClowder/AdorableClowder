//run this in terminal to drop all local tables for testing purposes.
//No functionality

db = require('../config.js');

db.knex.schema.dropTable('users_wants').then(function () {
  console.log('users_wants DROPPED');
});
db.knex.schema.dropTable('users_offers').then(function () {
  console.log('users_offers DROPPED');
});
db.knex.schema.dropTable('offers').then(function () {
  console.log('offers DROPPED');
});
db.knex.schema.dropTable('users').then(function () {
  console.log('users DROPPED');
});
db.knex.schema.dropTable('wants').then(function () {
  console.log('wants DROPPED');
});
