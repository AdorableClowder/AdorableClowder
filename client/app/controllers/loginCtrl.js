angular.module('loginCtrl', [])

.controller('loginController', function (Auth, $location, $window) {

  var vm = this;

  vm.user = {};
  
  vm.setAction = function(){
    Auth.setAction('login');
  };

  vm.doLogin = function () {

    // using Auth factory from factories.js to do POST
    Auth.login(vm.user)
      .then(function (token) {
        console.log('login success!!');
        // store the token sent back from the server in local storage
        $window.localStorage.setItem('skillitToken', token);
        console.log(token);
        // redirect if succesful
        $location.path('/explore');
      })
      .catch(function (err) {
        console.log(err);
        //gets the error without the whole callstack (pretty hacky)
        vm.err = err.data.split('<br>')[0];
      });
  };

});
