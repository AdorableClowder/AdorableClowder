var db = require('../config.js');

var Want = db.Model.extend({

  tableName: 'wants',

  users: function () {
    return this.belongsToMany(User, 'wants_users');
  }


});

module.exports = Want;