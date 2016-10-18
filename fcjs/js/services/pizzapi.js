angular.module('FC-JS').factory('PizzAPI', function($rootScope, $http) {
  var service = {};
  service.listPizzas = [];
  service.listOrders = [];
  service.delay = 2000;

  service.getAllPizzas = function() {
    $rootScope.$broadcast('errorAPI', {code: null});

    // Get all pizzas
    $http({
      method: 'GET',
      url: 'https://pizzapi.herokuapp.com/pizzas',
      headers: {'Authorization': 'fc->js'},
      timeout: service.delay
    }).then(function successCallback(response) {
        if(service.listPizzas.length > 0) service.listPizzas = [];
        response.data.forEach(function(pizza) {
          service.listPizzas.push(pizza);
        });
      }, function errorCallback(response) {
        $rootScope.$broadcast('errorAPI', {code: response.status});
        service.listPizzas = [];
      });
  };

  service.getAllOrders = function() {
    $rootScope.$broadcast('errorAPI', {code: null});

    // Get all orders
    $http({
      method: 'GET',
      url: 'https://pizzapi.herokuapp.com/orders',
      headers: {'Authorization': 'fc->js'},
      timeout: service.delay
    }).then(function successCallback(response) {
        if(service.listOrders.length > 0) service.listOrders = [];
        response.data.forEach(function(order) {
          service.listOrders.push(order);
        });
      }, function errorCallback(response) {
        $rootScope.$broadcast('errorAPI', {code: response.status});
        service.listOrders = [];
      });
  };

  service.createOrder = function(id) {
    $rootScope.$broadcast('errorAPI', {code: null});

    // Create an order
    $http.post(
      'https://pizzapi.herokuapp.com/orders',
      {id: id},
      {headers: {'Authorization': 'fc->js'}, timeout: service.delay}
    ).then(function successCallback(response) {
        $rootScope.$broadcast('orderStatus', {status: true});
      }, function errorCallback(response) {
        $rootScope.$broadcast('errorAPI', {code: response.status});
      });
  };

  return service;
});
