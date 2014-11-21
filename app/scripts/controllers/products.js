'use strict';

angular.module('airCleanersWebApp')
.controller('ProductsCtrl', function ($scope, $http, $location) {

  var params = $location.search();

  $scope.isBestCycle = params.isBestCycle;

  $http.get('products', { params: params}).success(function(products) {
    $scope.products = products;
  });

});
