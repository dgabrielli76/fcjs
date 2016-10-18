angular.module('FC-JS').controller('HomeCtrl', function($scope, PizzAPI) {
  /* Get all pizzas */
  PizzAPI.getAllPizzas();
  $scope.pizzas = PizzAPI.listPizzas;

  $scope.formatPrice = function(price) {
    price = price / 100;
    return price.toFixed(2);
  };
});
