'use strict';

angular.module('airCleanersWebApp')
.controller('ProductCtrl', function ($scope, $http, $routeParams, $filter, ratingToSummary) {

  $scope.params.cycle = '3.5:4.5';

  $http.get('products/' + $routeParams.id).success(function(product) {
    $scope.product = product;

    if(angular.isDefined($scope.product.cadr_dust)) {
      $scope.avgCount = $filter('number')(
        2.0*product.cadr_dust /
        ($scope.minVolume() + $scope.maxVolume()), 1);
    }

  });

  $scope.navTitle = function(subTitle) {
    if($scope.product) {
      return $scope.product.brand + ' - ' + $scope.product.model +
        (angular.isDefined(subTitle) ? ' ' + subTitle : '');
    } else {
      return '';
    }
  };

  $scope.ahamText = function() {
    if($scope.product) {
      return $scope.product.aham_verified ? 
        '此数值通过美国AHAM官方认证，可信度很高' :
        '此数值来自于厂商官方网站，可信度一般';
    } else {
      return '';
    }
  };

  $scope.cyclesCountRange = function() {
    return angular.isDefined($scope.avgCount) ?
      $scope.avgCount : '';
  };

  $scope.isCycleAcceptable = function() {
    return angular.isDefined($scope.avgCount) ?
      ($scope.ratingOf($scope.avgCount) === 'III') : true;
  }

  $scope.recommendationWords = function() {
    return '看看哪些产品真正适合您吧！';
  }

  $scope.summary = function() {
    return angular.isDefined($scope.avgCount) ?
      ratingToSummary[$scope.ratingOf($scope.avgCount)] : '';
  };

});
