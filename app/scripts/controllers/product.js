'use strict';

angular.module('airCleanersWebApp')
.controller('ProductCtrl', function ($scope, $http, $routeParams, $filter) {

  $http.get('products/' + $routeParams.id).success(function(product) {
    $scope.product = product;

    if(angular.isDefined($scope.product.cadr_dust)) {
      var cadr = product.cadr_dust;
      $scope.maxCount = cadr/$scope.minVolume();
      $scope.minCount = cadr/$scope.maxVolume();
      $scope.avgCount = $filter('number')(($scope.minCount + $scope.maxCount)/2.0, 1);
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
    if(angular.isDefined($scope.avgCount)) {
      return $scope.avgCount;
    } else {
      return '';
    }
  };

  $scope.conclusion = function() {
    var text = '';

    var count = $scope.avgCount;
    if(count < 3) {
      text = '这台空气净化器放在您的房间，仅仅达到心理安慰的效果，在雾霾的天气无法保证室内空气的健康。';
    } else if(3 <= count && count < 4) {
      text = '这台空气净化器刚好满足您房间的空气净化需求，但是如果您还有预算，建议换台CADR值更高的产品。';
    } else if(4 <= count && count < 5) {
      text = $scope.params.reviewMode === '1' ? 
        '您的选择很明智，您的房间可以选择这台空气净化器' :
        '这台空气净化器非常适合您的房间，您真是空气净化器购买达人！';
    } else if(count >= 5) {
      text = $scope.params.reviewMode === '1' ? 
        '这台空气净化器适合您的房间，但是性价比并不高，建议选择CADR值在XX到XX的空气净化器。' :
        '这台空气净化器净化效果非常棒，但是对于您的房间显得绰绰有余。可以把这台空气净化器放到更大的房间去。换一个CADR在XX到XX的空气净化器放在此房间';
    }

    return text;
  };

});
