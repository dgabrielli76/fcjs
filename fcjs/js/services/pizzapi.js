angular.module('FC-JS').factory('PizzAPI', function($http) {
  var service = {};
  service.listPizzas = [];
  service.listOrders = [];

  service.getAllPizzas = function() {
    // Get all pizzas
    $http({
      method: 'GET',
      url: 'https://pizzapi.herokuapp.com/pizzas',
      headers: {'Authorization': 'fc->js'}
    }).then(function successCallback(response) {
        if(service.listPizzas.length > 0) service.listPizzas = [];
        response.data.forEach(function(pizza) {
          service.listPizzas.push(pizza);
        });
      }, function errorCallback(response) {
        console.log(response);
        service.listPizzas = [];
      });
  };

  service.getAllOrders = function() {
    // Get all orders
    $http({
      method: 'GET',
      url: 'https://pizzapi.herokuapp.com/orders',
      headers: {'Authorization': 'fc->js'}
    }).then(function successCallback(response) {
        if(service.listOrders.length > 0) service.listOrders = [];
        response.data.forEach(function(order) {
          service.listOrders.push(order);
        });
      }, function errorCallback(response) {
        console.log(response);
        service.listOrders = [];
      });
  };

  var config = {
    headers: {
      'Authorization': 'fc->js',
    }
  };

  service.createOrder = function(id) {
    // Create an order
    $http.post(
      'https://pizzapi.herokuapp.com/orders',
      {id: id},
      config
    ).then(function successCallback(response) {
        console.log(response);
      }, function errorCallback(response) {
        console.log(response);
      });
  };

  return service;
});
