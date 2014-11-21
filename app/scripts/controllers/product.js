'use strict';

angular.module('airCleanersWebApp')
.controller('ProductCtrl', function ($scope, $http, $routeParams, 
      $location, $filter, $modal, ratingToSummary) {

  var params = $location.search();

  $scope.params.area = params.area;
  $scope.params.height = params.height;

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

  $scope.MfrTypeText = function(isProMfr) {
    return isProMfr ? '专业净化器厂商' : '家电厂商非专业净化器厂商';
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
  };

  $scope.recommendationWords = function() {
    return '看看哪些产品真正适合您';
  };

  $scope.summary = function() {
    return angular.isDefined($scope.avgCount) ?
      ratingToSummary[$scope.ratingOf($scope.avgCount)] : '';
  };

  $scope.open = function(url) {
    var modalInstance = $modal.open({
      templateUrl: 'dialog.html',
      controller: 'RedirectCtrl',
      size: 'lg',
      resolve: {
        url: function () {
          return url;
        }
      }
    });
  };

})
.controller('RedirectCtrl', function($scope, $modalInstance, url) {
  $scope.ok = function() {
    window.location.assign(url);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
