angular.module('peopleCtrl', [])

.controller("peopleController", function (Users, $location){
  var vm = this;

  vm.showOffers = false;
  vm.user = {};
  vm.wants = [];
  vm.offers = [];

  vm.getUser = function () {
    //using Users factory from factories.js to do GET
    Users.getUser()
      .then(function (user) {
        vm.user = user;
        vm.wants = vm.user.want;
        vm.offers = vm.user.offer;
        console.log(vm.user);
      })
      .catch(function (err) {
        console.log(err);
        //if can't get user, redirect to login
        $location.path('/login');
      });
  };

  vm.getUser();

  vm.currentWant = {};
  vm.currentOffer = {};


  vm.isSelected = function(skill) {
    return skill.skill === vm.currentWant.skill ||  skill.skill === vm.currentOffer.skill;
  };

  vm.selectWant = function(want) {
    vm.currentWant = want;
    Users.getUsersBySkill(want, 'offer')
      .then(function(users) {
        vm.matchedOffers = users;
      })
      .catch(function (err) {
        console.log(err);
        //if can't get user, redirect to login
        $location.path('/login');
      });
  };

  vm.selectOffer = function(offer) {
    vm.currentOffer = offer;
    Users.getUsersBySkill(offer, 'want')
        .then(function(users) {
          vm.matchedWants = users;
        })
        .catch(function (err) {
          console.log(err);
          //if can't get user, redirect to login
          $location.path('/login');
        });
  };


  $("[name='switch-checkbox']").bootstrapSwitch();
});
