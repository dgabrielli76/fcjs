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
    otherwise({
      redirectTo: '/home'
    });
  }
);

app.controller('AppCtrl', function($scope) {

});
