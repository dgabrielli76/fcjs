angular.module('FC-JS').factory('PizzAPI', function($rootScope, $http, $location, CircuitBreaker) {
  var service = {};
  service.url = 'https://pizzapi.herokuapp.com/';
  service.listPizzas = [];
  service.listOrders = [];
  service.delay = 2000;

  service.getAllPizzas = function() {
    $rootScope.$broadcast('errorAPI', {code: null});

    if(CircuitBreaker.enabled) {
      service.listPizzas = CircuitBreaker.getCachedListPizzas();
      return;
    }

    $rootScope.$broadcast('request', {status: true});

    // Get all pizzas
    $http({
      method: 'GET',
      url: service.url + 'pizzas',
      headers: {'Authorization': 'fc->js'},
      timeout: service.delay
    }).then(function successCallback(response) {
        if(service.listPizzas.length > 0) service.listPizzas = [];
        response.data.forEach(function(pizza) {
          service.listPizzas.push(pizza);
        });
        CircuitBreaker.cacheListPizzas(service.listPizzas);
        $rootScope.$broadcast('request', {status: false});
      }, function errorCallback(response) {
        $rootScope.$broadcast('errorAPI', {code: response.status});
        service.listPizzas = [];
        $rootScope.$broadcast('request', {status: false});
        CircuitBreaker.newError();
      });
  };

  service.getAllOrders = function() {
    $rootScope.$broadcast('errorAPI', {code: null});

    if(CircuitBreaker.enabled) {
      service.listOrders = CircuitBreaker.getCachedListOrders();
      return;
    }

    $rootScope.$broadcast('request', {status: true});

    // Get all orders
    $http({
      method: 'GET',
      url: service.url + 'orders',
      headers: {'Authorization': 'fc->js'},
      timeout: service.delay
    }).then(function successCallback(response) {
        if(service.listOrders.length > 0) service.listOrders = [];
        response.data.forEach(function(order) {
          service.listOrders.push(order);
        });
        CircuitBreaker.cacheListOrders(service.listOrders);
        $rootScope.$broadcast('request', {status: false});
      }, function errorCallback(response) {
        $rootScope.$broadcast('errorAPI', {code: response.status});
        service.listOrders = [];
        $rootScope.$broadcast('request', {status: false});
        CircuitBreaker.newError();
      });
  };

  service.createOrder = function(id) {
    $rootScope.$broadcast('errorAPI', {code: null});

    if(CircuitBreaker.enabled) return;

    $rootScope.$broadcast('request', {status: true});

    // Create an order
    $http.post(
      service.url + 'pizzas',
      {id: id},
      {headers: {'Authorization': 'fc->js'}, timeout: service.delay}
    ).then(function successCallback(response) {
        $rootScope.$broadcast('orderStatus', {status: true});
        $rootScope.$broadcast('request', {status: false});
      }, function errorCallback(response) {
        $rootScope.$broadcast('errorAPI', {code: response.status});
        $rootScope.$broadcast('request', {status: false});
        CircuitBreaker.newError();
      });
  };

  return service;
});
