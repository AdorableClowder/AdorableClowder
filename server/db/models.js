var db = require('./config.js');
var Promise = require('bluebird');
//to allow return of promisified bcrypt callbacks--to use promisified versions of bcrypt native functions,
//append them with "Async", e.g.: promisified version of bcrypt.hash is bcrypt.hashAsync
var bcrypt = Promise.promisifyAll(require('bcrypt'));

// Need to define all models in the same file or else a require deadlock is created when using join tables

var User = exports.User = db.Model.extend({

  tableName: 'users',

  hashPassword: function (password, next) {
    var user = this;

    //hash and salt password
    //hashAsync created by PromisifyAll,
    //automagically salts the hash, "10" refers to the computational complexity of resultant salt
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
    //promisified version of brypt.compare--automatically retrieves salt and dehashes passwords before comparing
    return bcrypt.compareAsync(candidatePassword, this.get('password')); //this.get retrieves pw from bookshelf user model
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
