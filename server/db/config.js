var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    database: 'clowderdb',
    charset: 'utf8'
  }
});

var db = require('bookshelf')(knex);


db.knex.schema.hasTable('users').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (table) {
      table.increments('id').primary();
      table.string('username', 100).unique();
      table.string('password', 100);
      table.string('email', 100);
      table.timestamps();
    }).then(function (table) {
      console.log('Created USERS table');
    });
  }
});

db.knex.schema.hasTable('offers').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('offers', function (table) {
      table.increments('id').primary();
      table.string('skill', 255);
      table.timestamps();
    }).then(function (table) {
      console.log('Created OFFERS table');
    });
  }
});

db.knex.schema.hasTable('wants').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('wants', function (table) {
      table.increments('id').primary();
      table.string('skill', 255);
      table.timestamps();
    }).then(function (table) {
      console.log('Created WANTS table');
    });
  }
});

db.knex.schema.hasTable('users_offers').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('users_offers', function (table) {
      table.integer('offer_id').unsigned().references('offers.id');
      table.integer('user_id').unsigned().references('users.id');
    }).then(function (table) {
      console.log('Created USERS_OFFERS join table');
    });
  }
});

db.knex.schema.hasTable('users_wants').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('users_wants', function (table) {
      table.integer('want_id').unsigned().references('wants.id');
      table.integer('user_id').unsigned().references('users.id');
    }).then(function (table) {
      console.log('Created USERS_WANTS join table');
    });
  }
});

module.exports = db;
