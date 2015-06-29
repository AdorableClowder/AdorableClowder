describe('profileCtrl Test', function () {

  // arrange
  var mockScope;
  var controller;
  var backend;

  beforeEach(angular.mock.module('profileCtrl'));

  beforeEach(angular.mock.inject(function ($httpBackend) {
    backend = $httpBackend;
    backend.expect('GET', '/profile').respond(
      {
      "id": 4,
      "username": "michael",
      "offer": ["video games", "drinking scotch", "cooking"],
      "want": ["how to do things good", "how to not do things bad"],
      "email": "michael@gmail.com"});
  }));

  beforeEach(angular.mock.inject(function ($controller, $rootScope, $http){
    mockScope = $rootScope.$new();
    $controller('profileCtrl', {
      $scope: mockScope,
      $http: $http
    });
    backend.flush();
  }));

  it('Makes an ajax GET requests for /profile', function () {
    backend.verifyNoOutstandingExpectation();
  })

  it('processes the user data and have 5 properties on it', function () {
    expect(mockScope.user).toBeDefined();
    expect(Object.keys(mockScope.user).length.toEqual(5);
  });

  it('contain correct user data', function () {
    expect(mockScope.user.id).toEqual('4');
    expect(mockScope.user.username).toEqual('michael');
    expect(mockScope.user.email).toEqual('michael@gmail.com');
  });
})
