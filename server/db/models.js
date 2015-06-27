var db = require('./config.js');
var Promise = require('bluebird');
//to allow return of promisified bcrypt callbacks
var bcrypt = Promise.promisifyAll(require('bcrypt'));

// Need to define all models in the same file or else a deadlock is created when using join tables

var User = exports.User = db.Model.extend({

  tableName: 'users',

  hashPassword: function (password, next) {
    var user = this;

    return bcrypt.hashAsync(password, 10)
      .then(function (hash, err) {
        if (err) {
          throw new Error(err);
        }
        user.set('password', hash);
        user.save();
      })
      .then(function () {
        return user;
      })
      .catch(function (err) {
        next(new Error(err));
      });
  },

  offers: function () {
    return this.belongsToMany(Offer, 'users_offers');
  },

  wants: function () {
    return this.belongsToMany(Want, 'users_wants');
  },

  comparePasswords: function (candidatePassword) {
    return bcrypt.compareAsync(candidatePassword, this.get('password'));
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
