angular.module('signupCtrl', [])

.controller('signupController', function (Auth, $location, $window) {
  //vm stands for view model, will be signup in html
  var vm = this;

  vm.user = {};

  vm.dooAuth = function(){
    Auth.oAuth()
      .then(function(response){
        console.log(response);
      })
      .catch(function(err){
        console.log('error in sending FE oAuth response', err);
      })
  };

  vm.doSignup = function () {
    // storing offers and wants in an array form before sending POST
    //filters out form fields that are empty from wants/offers
    // vm.user.offer = _.filter([vm.offer1, vm.offer2, vm.offer3, vm.offer4, vm.offer5],
    //   function (offer) {
    //     return offer !== null && offer !== undefined;
    //   });
    // vm.user.want = _.filter([vm.want1, vm.want2, vm.want3, vm.want4, vm.want5],
    //   function (want) {
    //     return want !== null && want !== undefined;
    //   });
    // //throw error if fields are empty
    // if (vm.user.offer.length === 0 || vm.user.want.length === 0 ||
    //   vm.user.username === undefined || vm.user.password === undefined || vm.user.email === undefined) {
    //   vm.err = 'Please fill out required fields';
    // } else {
      // using Auth factory from factories.js to do POST
      Auth.signup(vm.user)
        .then(function (token) {
          console.log('signup success');
          $window.localStorage.setItem('skillitToken', token);
          // redirect if succesful
          $location.path('/explore');
        })
        .catch(function (err) {
          console.log(err);
          //gets the error without the whole callstack (pretty hacky)
          vm.err = err.data.split('<br>')[0];
        });
    // }
  };

});
