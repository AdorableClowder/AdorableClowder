angular.module('signupCtrl', [])

.controller('signupController', function(Auth, $location, $window) {

  var vm = this;

  vm.user = {};
  console.log(vm.user.offer);

  vm.doSignup = function () {
    // storing offers and wants in an array form before sending POST
    vm.user.offer = [vm.offer1, vm.offer2, vm.offer3, vm.offer4, vm.offer5];
    vm.user.want = [vm.want1, vm.want2, vm.want3, vm.want4, vm.want5];
    console.log(vm.user);

    // using Auth factory from factories.js to do POST
    Auth.signup(vm.user)
      .then(function (token) {
        console.log('signup success');
        // redirect if succesful
        $location.path('/explore');
      })
      .catch(function (err) {
        console.log(err);
      });
  };

})
