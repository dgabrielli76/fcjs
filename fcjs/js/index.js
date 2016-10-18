var app = angular.module('FC-JS', ['ngRoute']);

app.config(
  function($routeProvider) {
    /******************************************************************************
     * AngularJS routes handling.
     * Setup all the routes of the application. This is used to navigate in the
     * differents pages of the application.
     *****************************************************************************/
    $routeProvider.
    when('/home', {
      templateUrl: 'partials/home.html',
      controller: 'HomeCtrl'
    }).
    when('/orders', {
      templateUrl: 'partials/orders.html',
      controller: 'OrdersCtrl'
    }).
    otherwise({
      redirectTo: '/home'
    });
  }
);

app.controller('AppCtrl', function($rootScope, $scope, PizzAPI) {
  $scope.errorAPI = null;

  /* Listen to API errors */
  $rootScope.$on('errorAPI', function (event, args) {
    $scope.errorAPI = args.code;
  });
});
