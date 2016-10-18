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
        if(service.listPizzas.length > 0) service.listPizzas = [];
        response.data.forEach(function(pizza) {
          service.listPizzas.push(pizza);
        });
      }, function errorCallback(response) {
        console.log(response);
        service.listPizzas = [];
      });
  };

  return service;
});
