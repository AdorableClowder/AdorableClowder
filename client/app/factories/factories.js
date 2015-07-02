angular.module('skillitFactories', [])

// factory used for user authentication login/ signup
.factory('Auth', function ($http, $location, $window) {

  var authFactory = {};
  
  authFactory.setAction = function(action){
    return $http({
      method: 'POST',
      url: '/setaction',
      data: {action: action}
    })
    .then(function(resp){
      return resp;
    });
  };

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

  authFactory.signup = function (user) {
    return $http({
        method: 'POST',
        url: '/signup',
        data: user
      })
      .then(function (resp) {
        return resp.data.token;
        // return resp.status;
      });
  };

  authFactory.setToken = function(){
    return $http({
      method: 'GET',
      url: '/linkedinsuccess',
      data: authFactory.action
    })
    .then(function(resp){
      return resp.data;
    });
  };

  return authFactory;
})
  .factory('Users', function ($http, $location, $window) {
    var userFactory = {};
    userFactory.getOtherUsers = function () {
      return $http({
          method: 'GET',
          url: '/explore',
          headers: {
            'x-access-token': $window.localStorage.getItem('skillitToken')
          }
        })
        .then(function (resp) {
          return resp.data;
        });
    };
    // this method is called to get logged in user data on profile, retrieved from token
    userFactory.getUser = function () {
      return $http({
          method: 'GET',
          url: '/profile',
          headers: {
            'x-access-token': $window.localStorage.getItem('skillitToken')
          }
        })
        .then(function (resp) {
          return resp.data;
        });
    };

    userFactory.saveChanges = function(user){
      console.log("Factories", user);
      return $http({
        method: 'POST',
        url: '/profile',
        data: user,
        headers: {
          'x-access-token': $window.localStorage.getItem('skillitToken')
        }
      }).then(function (resp) {
        return resp.data.token;
      });
    };
    return userFactory;
  });
