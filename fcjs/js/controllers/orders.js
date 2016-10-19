angular.module('FC-JS').controller('OrdersCtrl', function($scope, PizzAPI, CircuitBreaker) {
  /* Get all orders */
  PizzAPI.getAllOrders();
  $scope.orders = PizzAPI.listOrders;
  $scope.circuitBreaker = CircuitBreaker;

  $scope.formatPrice = function(price) {
    price = price / 100;
    return price.toFixed(2);
  };

  $scope.formatDate =  function(date) {
     return moment(date).format('DD-MM-YYYY HH:mm:ss');
  };
});
