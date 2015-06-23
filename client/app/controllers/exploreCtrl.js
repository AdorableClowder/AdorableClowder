angular.module('exploreCtrl', [])

.controller('exploreController', function(Users, $location) {

  var vm = this;

  vm.getSkills = function () {

    // using Users factory from factories.js to do GET
    Users.getOtherUsers(vm.user)
      .then(function (data) {
        vm.userArray = data;
        vm.filterSkills(vm.userArray);
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  vm.filterSkills = function(array){
    var allOffers =[];
    _.each(array, function(item){
      allOffers.push(item.offer);
    });
    allOffers = _.flatten(allOffers);
    vm.userSkills = _.uniq(allOffers);
  };
  vm.getSkills();
});
