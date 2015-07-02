angular.module('peopleCtrl', [])

.controller("peopleController", function (Users, $location){
  var vm = this;

  vm.showOffers = false;



  $("[name='switch-checkbox']").bootstrapSwitch();
});
