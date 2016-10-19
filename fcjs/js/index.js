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

app.controller('AppCtrl', function($rootScope, $scope, PizzAPI, CircuitBreaker) {
  $scope.errorAPI = null;
  $scope.requestStatus = false;

  /* Listen to API errors */
  $rootScope.$on('errorAPI', function (event, args) {
    $scope.errorAPI = args.code;
  });

  /* Listen to request status */
  $rootScope.$on('request', function (event, args) {
    $scope.requestStatus = args.status;
  });

  /* Listen to circuit breaker status */
  $rootScope.$on('circuitBreaker', function (event, args) {
    if(args.enabled) {
      PizzAPI.getAllPizzas();
    }
  });
});
