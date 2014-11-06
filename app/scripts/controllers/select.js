'use strict';

angular.module('airCleanersWebApp')
.controller('SelectCtrl', function ($scope, $http, $routeParams,
      listOfRoomArea, listOfRoomHeight, listOfCycle) {

  $scope.params.reviewMode = $routeParams.selection;
  $scope.currentStep = $routeParams.step;

  $scope.listOfRoomArea = listOfRoomArea;
  $scope.listOfRoomHeight = listOfRoomHeight;
  $scope.listOfCycle = listOfCycle;

  $scope.label = {
    area: '您打算放置空气净化器的房间面积',
    height: '您打算放置空气净化器的房间高度'
  };

  if($scope.params.reviewMode === '1') {
    $scope.label.model = '您打算购买的空气净化器的品牌及型号';
    $scope.label.submit = '预测下空气净化效果如何';
  } else {
    $scope.label.model = '您已购买的空气净化器的品牌及型号';
    $scope.label.submit = '看看净化效果如何';
  }

  $scope.pageTitle = function() {
    if($scope.params.reviewMode === '1') {
      return '求解惑';
    } else if($scope.params.reviewMode === '2') {
      return '求鉴定';
    }
  };

  $scope.selectArea = function(area) {
    $scope.params.area = area.value;
  };

  $scope.classOfAreaButton = function(area) {
    return area.value === $scope.params.area ? 'btn-primary' : 'btn-default';
  };

  $scope.selectHeight = function(height) {
    $scope.params.height = height.value;
  };

  $scope.classOfHeightItem = function(height) {
    return height.value === $scope.params.height ? 'active' : '';
  };

  $scope.allBrandsModels = [];
  $scope.brands = [];
  $scope.models = [];

  $scope.filterModels = function() {
    $scope.models = [];
    angular.forEach($scope.allBrandsModels, function(item, index) {
      if(item.brand === $scope.params.brand) {
        $scope.models.push(item);
      }
    });

    if($scope.models.length > 0) {
      $scope.params.productId = $scope.models[0].hash_id;
    }
  }

  $http.get('all_brands_models').success(function(allBrandsModels) {
    $scope.allBrandsModels = allBrandsModels;

    angular.forEach(allBrandsModels, function(item, index) {
      if($scope.brands.indexOf(item.brand) < 0) {
        $scope.brands.push(item.brand);
      }
    });

    $scope.filterModels();
  });
});
