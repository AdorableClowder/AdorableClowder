angular.module('signupCtrl', [])

.controller('signupController', function (Auth, $location, $window) {
  //vm stands for view model, will be signup in html
  var vm = this;

  vm.user = {};


  vm.setAction = function(){
    Auth.setAction('signup')
    .then(function(){
      console.log('action set');
    })
    .catch(function(err){
      console.log(err);
    });
  };
  
  vm.setToken = function(){
    Auth.setToken()
      .then(function(token){
        console.log('user----------------------', token);
        $window.localStorage.setItem('skillitToken', token);
        console.log('attempted choosesubjects');
        $location.path('/choosesubjects');
      });
  };

  vm.doSignup = function () {
   console.log('dosignup called');
    Auth.signup(vm.user)
      .then(function (token) {
        console.log('signup success');
        $window.localStorage.setItem('skillitToken', token);
        // redirect if succesful
        $location.path('/choosesubjects');
      })
      .catch(function (err) {
        console.log(err);
        //gets the error without the whole callstack (pretty hacky)
        vm.err = err.data.split('<br>')[0];
      });
  };
});
