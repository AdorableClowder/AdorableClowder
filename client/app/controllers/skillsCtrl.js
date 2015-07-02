angular.module('skillsCtrl', [])

.controller('skillsController', function (Users, $location, $window) {

  var vm = this;

  vm.user = {};

  vm.getUser = function () {

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
  vm.getUser();

// Removes or adds a want
  vm.toggleWant = function(want){
    var index = vm.user.want.indexOf(want);
    if(index > -1){
      vm.user.want.splice(index, 1);
    } else {
      vm.user.want.push(want);
    }
  };

  // Removes or adds an offer
   vm.toggleOffer = function(offer){
    console.log("toggleOffer called");
    var index = vm.user.offer.indexOf(offer);
    if(index > -1){
      vm.user.offer.splice(index, 1);
    } else {
      vm.user.offer.push(offer);
    }
  };

});