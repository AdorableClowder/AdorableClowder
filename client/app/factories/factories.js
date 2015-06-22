angular.module('karmaFactories', [])

// factory used for user authentication login/ signup
.factory('Auth', function ($http, $location, $window) {

  var authFactory = {};

  authFactory.login = function (user) {
    return $http({
      method: 'POST',
      url: '/login',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  return authFactory;
})
