var db = require('../config.js');

var Offer = db.Model.extend({

  tableName: 'offers',
  
  users: function () {
    return this.belongsToMany(User);
  }


});

module.exports = Offer;