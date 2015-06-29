angular.module('exploreCtrl', [])

.controller('exploreController', function (Users, $location, filterFilter) {

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
        //redirect to login if unsuccessful
        $location.path('/login');
      });
  };
  // get skills from all users, make one big array and remove
  //duplicates before displaying html
  vm.filterSkills = function (array) {
    var allOffers = _.map(array, function (item) {
      return item.offer;
    });
    allOffers = _.flatten(allOffers);
    vm.userSkills = _.uniq(allOffers);
    //if there are no skills available, display error message
    if (vm.userSkills.length === 0) {
      vm.err = "Sorry, no users are currently looking for your skills.";
    }
  };

  //shows list of skills by default, or people with certain skill when clicked
  vm.shouldShow = true;
  vm.toggleView = function () {
    vm.shouldShow = !vm.shouldShow;
  };
  //filters users into array if they have the skill user is looking for
  vm.showUsers = function (skill) {
    vm.toggleView();
    vm.usersWithSkill = filterFilter(vm.userArray, {
      offer: skill
    });
  };
  vm.getSkills();
});
