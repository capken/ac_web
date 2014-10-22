'use strict';

angular.module('airCleanersWebApp')
.controller('ProductCtrl', function ($scope, $http, $routeParams, $filter) {

  $http.get('products/' + $routeParams.id).success(function(product) {
    $scope.product = product;
  });

  $scope.ahamText = function() {
    return $scope.product.aham_verified ? 
      '此数值通过美国AHAM官方认证，可信度很高' :
      '此数值来自于厂商官方网站，可信度一般';
  }

  $scope.cyclesCount = function() {
    if(angular.isDefined($scope.product) &&
        angular.isDefined($scope.product.cadr_dust)) {
      var cadr = $scope.product.cadr_dust;
      var maxCount = cadr / $scope.minVolume();
      var minCount = cadr / $scope.maxVolume();

      return '' + $filter('number')(minCount, 1) + ' - ' +
        $filter('number')(maxCount, 1);
    }

    return 'null';
  };

  $scope.conclusion = function() {
    return '=== 结论内容，稍后实现 ===';
  }

});
