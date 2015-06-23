angular.module('exploreCtrl', [])

.controller('exploreController', function(Users, $location) {

  var vm = this;

  vm.user = {};

  vm.getSkills = function () {

    // using Users factory from factories.js to do GET
    Users.getOtherUsers(vm.user)
      .then(function (data) {
        // redirect if succesful
        console.log(data);
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  vm.getSkills();

});
