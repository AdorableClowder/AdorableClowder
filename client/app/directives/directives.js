angular.module('skillitDirectives', [])

.directive("peopleBox", function() {
  return {
    restrict: "E",
    scope: {
      person: '=',
      skill: '=',
      skilltype: '='
    },
    templateUrl: "app/partials/people-box.html"
  };
});
