'use strict';

angular.module('airCleanersWebApp')
.controller('ProductsCtrl', function ($scope, $http) {

  $http.get('/data/products.json').success(function(products) {
    $scope.products = products;
  });

});
