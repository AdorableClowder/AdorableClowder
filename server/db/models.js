var db = require('./config.js');
var Promise = require('bluebird');
//to allow return of promisified bcrypt callbacks
var bcrypt = Promise.promisifyAll(require('bcrypt'));
var compare = Promise.promisify(require('bcrypt').compare);


// Need to define all models in the same file or else a deadlock is created when using join tables

var User = exports.User = db.Model.extend({

  tableName: 'users',

  hashPassword: function (password) {
    var user = this;

    return bcrypt.hashAsync(password, 10)
      .then(function (hash, err) {
        if (err) {
          console.log("ERROR: ", err);
          throw new Error(err);
        }
        console.log("password: ", password);
        console.log('generating hashed pass: ', hash);
        user.set('password', hash);
        console.log('user after salt and hash set: ', user);
        user.save();
      })
      .then(function () {
        console.log('about to return user: ', user);
        return user;
      });
    // .catch(function (err) {
    //   console.log("ERROR: ", err);
    //   next(new Error(err));
    // });
  },

  offers: function () {
    return this.belongsToMany(Offer, 'users_offers');
  },

  wants: function () {
    return this.belongsToMany(Want, 'users_wants');
  },

  comparePasswords: function (candidatePassword) {
    return compare(candidatePassword, this.get('password'));
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



