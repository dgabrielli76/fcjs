angular.module('FC-JS').factory('PizzAPI', function($http) {
  var service = {};
  service.listPizzas = [];

  service.getAllPizzas = function() {
    // Get all pizzas
    $http({
      method: 'GET',
      url: 'https://pizzapi.herokuapp.com/pizzas',
      headers: {'Authorization': 'fc->js'}
    }).then(function successCallback(response) {
        service.listPizzas = response.data;
      }, function errorCallback(response) {
        console.log(response);
        service.listPizzas = [];
      });
  };

  return service;
});
