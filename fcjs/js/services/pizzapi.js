angular.module('FC-JS').factory('PizzAPI', function($rootScope, $http) {
  var service = {};
  service.listPizzas = [];
  service.listOrders = [];
  service.delay = 2000;

  service.getAllPizzas = function() {
    $rootScope.$broadcast('errorAPI', {code: null});
    $rootScope.$broadcast('request', {status: true});

    // Get all pizzas
    $http({
      method: 'GET',
      url: 'https://fcjs-pizzapi.herokuapp.com/pizzas',
      headers: {'Authorization': 'fc->js'},
      timeout: service.delay
    }).then(function successCallback(response) {
        if(service.listPizzas.length > 0) service.listPizzas = [];
        response.data.forEach(function(pizza) {
          service.listPizzas.push(pizza);
        });
        $rootScope.$broadcast('request', {status: false});
      }, function errorCallback(response) {
        $rootScope.$broadcast('errorAPI', {code: response.status});
        service.listPizzas = [];
        $rootScope.$broadcast('request', {status: false});
      });
  };

  service.getAllOrders = function() {
    $rootScope.$broadcast('errorAPI', {code: null});
    $rootScope.$broadcast('request', {status: true});

    // Get all orders
    $http({
      method: 'GET',
      url: 'https://fcjs-pizzapi.herokuapp.com/orders',
      headers: {'Authorization': 'fc->js'},
      timeout: service.delay
    }).then(function successCallback(response) {
        if(service.listOrders.length > 0) service.listOrders = [];
        response.data.forEach(function(order) {
          service.listOrders.push(order);
        });
        $rootScope.$broadcast('request', {status: false});
      }, function errorCallback(response) {
        $rootScope.$broadcast('errorAPI', {code: response.status});
        service.listOrders = [];
        $rootScope.$broadcast('request', {status: false});
      });
  };

  service.createOrder = function(id) {
    $rootScope.$broadcast('errorAPI', {code: null});
    $rootScope.$broadcast('request', {status: true});

    // Create an order
    $http.post(
      'https://fcjs-pizzapi.herokuapp.com/pizzas',
      {id: id},
      {headers: {'Authorization': 'fc->js'}, timeout: service.delay}
    ).then(function successCallback(response) {
        $rootScope.$broadcast('orderStatus', {status: true});
        $rootScope.$broadcast('request', {status: false});
      }, function errorCallback(response) {
        $rootScope.$broadcast('errorAPI', {code: response.status});
        $rootScope.$broadcast('request', {status: false});
      });
  };

  return service;
});
