angular.module('loginCtrl', [])

.controller('loginController', function(Auth, $location, $window) {

  var vm = this;

  vm.user = {};

  vm.doLogin = function () {
    console.log(vm.user);

    // using Auth factory from factories.js to do POST
    Auth.login(vm.user)
      .then(function (token) {
        console.log('login success');
        // store the token sent back from the server in local storage
        $window.localStorage.setItem('karmakonnect', token);
        // redirect if succesful
        $location.path('/explore');
      })
      .catch(function (err) {
        console.log(err);
      });
  };

})
