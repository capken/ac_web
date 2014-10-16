'use strict';

angular.module('airCleanersWebApp')
.controller('ProductsCtrl', function ($scope, $http) {

  console.log($scope.params);
  $http.get('/data/products.json').success(function(products) {
    $scope.products = products;
  });

  $scope.areaRangeText = function() {
    var matches = null;
    if(matches = $scope.params.area.match(/<(\d+)/)) {
      return '小于' + matches[1];
    } else if(matches = $scope.params.area.match(/(\d+):(\d+)/)) {
      return matches[1] + ' - ' + matches[2];
    } else if(matches = $scope.params.area.match(/>(\d+)/)) {
      return '大于' + matches[1];
    }

    return $scope.params.area;
  }

  $scope.heightRangeText = function() {
    var matches = null;
    if(matches = $scope.params.height.match(/([\d.]+):([\d\.]+)/)) {
      return matches[1] + ' - ' + matches[2];
    }
    
    return $scope.params.height;
  }

  $scope.cycleText = function() {
    if($scope.params.cycle == 5) {
      return '优秀';
    } else if($scope.params.cycle == 4) {
      return '良好';
    } else if($scope.params.cycle == 3) {
      return '一般';
    }
  }
});
