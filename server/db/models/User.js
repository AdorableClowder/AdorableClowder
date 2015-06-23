var db = require('../config.js');
var bcrypt = require('bcrypt');

var User = db.Model.extend({

  tableName: 'users',

  //needed methods for authentication:
  //User.findUser
  //User.comparePasswords

  offers: function () {
    return this.belongsToMany(Offer);
  },

  wants: function () {
    return this.belongsToMany(Want, 'wants_users');
  },

  comparePasswords: function () {
    // add bcrypt things here
  }

});

module.exports = User;