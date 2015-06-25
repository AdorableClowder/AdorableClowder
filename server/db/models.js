var db = require('./config.js');
var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt'));
// var bcrypt = require('bcrypt');
//to allow return of promisified bcrypt callbacks


// Need to define all models in the same file or else a deadlock is created when using join tables
// ^^weird shit but it works now!

var User = exports.User = db.Model.extend({

  tableName: 'users',

  hashPassword: function (password) {
    var user = this;

    return bcrypt.hashAsync(password, 10)
      .then(function (hash, err) {
        if (err) {
          console.log("ERROR: ", err);
          next(new Error(err));
        } else {
          console.log("password: ", password)
          console.log('generating hashed pass: ', hash);
          user.set('password', hash);
          console.log('user after salt and hash set: ', user);
          user.save();
          return user;
        }
      }).catch(function (err) {
        console.log("ERROR: ", err);
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
    var savedPassword = this.get('password');

    return new Promise(function (fulfill, reject) { //TODO: switch to promisify-Alled version
      bcrypt.compare(candidatePassword, savedPassword, function (error, content) {
        if (error) {
          reject(error);
        } else {
          fulfill(content);
        }
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
