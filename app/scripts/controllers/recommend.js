'use strict';

angular.module('airCleanersWebApp')
.controller('RecommendCtrl', function ($scope, $routeParams,
      listOfRoomArea, listOfRoomHeight, listOfCycle) {

  $scope.currentStep = $routeParams.step;

  $scope.listOfRoomArea = listOfRoomArea;
  $scope.listOfRoomHeight = listOfRoomHeight;
  $scope.listOfCycle = listOfCycle;

  $scope.selectArea = function(area) {
    $scope.params.area = area.value;
  }

  $scope.classOfAreaButton = function(area) {
    return area.value === $scope.params.area ? 'btn-primary' : 'btn-default';
  }

  $scope.selectHeight = function(height) {
    $scope.params.height = height.value;
  }

  $scope.classOfHeightItem = function(height) {
    return height.value === $scope.params.height ? 'active' : '';
  }

  $scope.selectCycle = function(cycle) {
    $scope.params.cycle = cycle.value;
  }

  $scope.classOfCycleItem = function(cycle) {
    return cycle.value === $scope.params.cycle ? 'active' : '';
  }
});
