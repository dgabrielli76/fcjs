angular.module('FC-JS').factory('CircuitBreaker', function($rootScope, $http) {
  var service = {};

  service.ERROR_LIMIT = 2;
  service.DATE_CACHE_PIZZAS_KEY = 'dateCachePizzas';
  service.DATE_CACHE_ORDERS_KEY = 'dateCacheOrders';
  service.LIST_PIZZAS_KEY = 'listPizzas';
  service.LIST_ORDERS_KEY = 'listOrders';
  service.localStorage = window.localStorage;
  service.errorAPICounter = 0;
  service.enabled = false;

  service.newError = function() {
    service.errorAPICounter++;
    if(service.errorAPICounter == service.ERROR_LIMIT) {
      service.enabled = true;
      $rootScope.$broadcast('circuitBreaker', {enabled: true});
    }
  };

  service.cacheListPizzas = function(listPizzas) {
    service.localStorage.setItem(service.DATE_CACHE_PIZZAS_KEY, JSON.stringify(new Date()));
    service.localStorage.setItem(service.LIST_PIZZAS_KEY, JSON.stringify(listPizzas));
  };

  service.getCachedListPizzas = function() {
    return JSON.parse(service.localStorage.getItem(service.LIST_PIZZAS_KEY));
  };

  service.getCachedListPizzasDate = function() {
    return JSON.parse(service.localStorage.getItem(service.DATE_CACHE_PIZZAS_KEY));
  };

  service.cacheListOrders = function(listOrders) {
    service.localStorage.setItem(service.DATE_CACHE_ORDERS_KEY, JSON.stringify(new Date()));
    service.localStorage.setItem(service.LIST_ORDERS_KEY, JSON.stringify(listOrders));
  };

  service.getCachedListOrders = function() {
    return JSON.parse(service.localStorage.getItem(service.LIST_ORDERS_KEY));
  };

  service.getCachedListOrdersDate = function() {
    return JSON.parse(service.localStorage.getItem(service.DATE_CACHE_ORDERS_KEY));
  };

  return service;
});
