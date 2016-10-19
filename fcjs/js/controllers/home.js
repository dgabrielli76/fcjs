angular.module('FC-JS').controller('HomeCtrl', function($rootScope, $scope, PizzAPI, CircuitBreaker) {
  /* Get all pizzas */
  PizzAPI.getAllPizzas();
  $scope.pizzas = PizzAPI.listPizzas;
  $scope.orderStatus = null;
  $scope.circuitBreaker = CircuitBreaker;

  /* Format price */
  $scope.formatPrice = function(price) {
    price = price / 100;
    return price.toFixed(2);
  };

  /* Create order */
  $scope.createOrder = function(id) {
    PizzAPI.createOrder(id);
  };

  $scope.formatDate =  function(date) {
     return moment(date).format('DD-MM-YYYY HH:mm:ss');
  };
  
  /* Listen to order status updates */
  $rootScope.$on('orderStatus', function (event, args) {
    $scope.orderStatus = args.status;
  });
});
