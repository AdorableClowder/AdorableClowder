angular.module('profileCtrl', [])

.controller('profileController', function (Users, $location, $window) {

  var vm = this;

  vm.user = {};

  vm.getProfile = function () {

    //using Users factory from factories.js to do GET
    Users.getUser()
      .then(function (user) {
        vm.user = user;
      })
      .catch(function (err) {
        console.log(err);
        //if can't get user, redirect to login
        $location.path('/login');
      });
  };
  vm.getProfile();

});
