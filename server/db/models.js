var db = require('./config.js');
var Promise = require('bluebird');
// var bcrypt = Promise.promisifyAll(require('bcrypt'));
var bcrypt = require('bcrypt');
//to allow return of promisified bcrypt callbacks


// Need to define all models in the same file or else a deadlock is created when using join tables
// ^^weird shit but it works now!

var User = exports.User = db.Model.extend({

  tableName: 'users',

  offers: function () {
    return this.belongsToMany(Offer, 'users_offers');
  },

  wants: function () {
    return this.belongsToMany(Want, 'users_wants');
  },

  comparePasswords: function (candidatePassword) {
    var savedPassword = this.password;

    return new Promise(function (fulfill, reject) {
      bcrypt.compare(candidatePassword, savedPassword, function (error, content) {
        if (error) reject(error);
        else fulfill(content);
      });
    });

  }

});

var Offer = exports.Offer = db.Model.extend({

  tableName: 'offers',

  users: function () {
    return this.belongsToMany(User, 'users_offers');
  }

});

var Want = exports.Want = db.Model.extend({

  tableName: 'wants',

  users: function () {
    return this.belongsToMany(User, 'users_wants');
  }

});
