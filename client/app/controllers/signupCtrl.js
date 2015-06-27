angular.module('signupCtrl', [])

.controller('signupController', function(Auth, $location, $window) {

  var vm = this;

  vm.user = {};
  console.log(vm.user.offer);

  vm.doSignup = function () {
    // storing offers and wants in an array form before sending POST
    //filters out form fields that are empty from wants/offers
    vm.user.offer = _.filter([vm.offer1, vm.offer2, vm.offer3, vm.offer4, vm.offer5],
      function(offer){
        return offer !== null && offer !==undefined;
      });
    vm.user.want = _.filter([vm.want1, vm.want2, vm.want3, vm.want4, vm.want5], 
      function(want){
        return want !==null && want !== undefined;
      });
    console.log(vm.user);
    // using Auth factory from factories.js to do POST
    Auth.signup(vm.user)
      .then(function (token) {
        console.log('signup success');
        $window.localStorage.setItem('karmakonnect', token);
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
