//this file creates connection to SQL db
//and tables IF they don't exist already

var knex;

//when working locally, run "$export NODE_ENV=development"
//in terminal to allow app to connect to local MySQL
console.log("CURRENT NODE ENVIRONMENT: ", process.env.NODE_ENV);

//set db connection based on environmental variable
//if no env var, treat as development
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined) {
  knex = require('knex')({
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      database: 'clowderdb',
      charset: 'utf8'
    }
  });
} else if (process.env.NODE_ENV === 'production') {
  knex = require('knex')({
    client: 'mysql',
    connection: process.env.DATABASE_URL
  });
}

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
      table.string('category', 100);
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
      table.string('category', 100);
      table.timestamps();
    }).then(function (table) {
      console.log('Created WANTS table');
    });
  }
});

//join tables:
//users to offers
db.knex.schema.hasTable('users_offers').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('users_offers', function (table) {
      table.integer('offer_id').unsigned().references('offers.id'); //must be unsigned because bookshelf :(
      table.integer('user_id').unsigned().references('users.id');
    }).then(function (table) {
      console.log('Created USERS_OFFERS join table');
    });
  }
});

//users to wants
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
