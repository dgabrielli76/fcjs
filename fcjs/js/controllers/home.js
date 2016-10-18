angular.module('FC-JS').controller('HomeCtrl', function($scope, PizzAPI) {
  /* Get all pizzas */
  PizzAPI.getAllPizzas();
  $scope.pizzas = PizzAPI.listPizzas;
  $scope.successOrder = false;

  /* Format price */
  $scope.formatPrice = function(price) {
    price = price / 100;
    return price.toFixed(2);
  };

  /* Create order */
  $scope.createOrder = function(id) {
    PizzAPI.createOrder(id);
    $scope.successOrder = true;
  }
});
