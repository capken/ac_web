'use strict';

angular.module('airCleanersWebApp')
.controller('ProductsCtrl', function ($scope, $http) {

  var params = [
    'area=' + $scope.params.area,
    'height=' + $scope.params.height,
    'cycle=' + $scope.params.cycle
  ].join('&');

  $http.get('products?' + params).success(function(products) {
    $scope.products = products;
  });

});
