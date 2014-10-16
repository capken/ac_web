'use strict';

angular.module('airCleanersWebApp')
.controller('RecommendCtrl', function ($scope) {
  $scope.listOfRoomArea = [
    { label: '小于10', value: '<10' },
    { label: '10 - 15', value: '10:15' },
    { label: '15 - 20', value: '15:20' },
    { label: '20 - 25', value: '20:25' },
    { label: '25 - 30', value: '25:30' },
    { label: '30 - 40', value: '30:40' },
    { label: '40 - 50', value: '40:50' },
    { label: '50 - 60', value: '50:60' },
    { label: '大于60', value: '>60' }
  ];

  $scope.selectArea = function(area) {
    $scope.params.area = area.value;
  }

  $scope.classOfAreaButton = function(area) {
    return area.value === $scope.params.area ? 'btn-primary' : 'btn-default';
  }

  $scope.listOfRoomHeight = [
    { label: '2.5－2.8米（如普通住宅）', value: '2.5:2.8' },
    { label: '2.8－3.8米（(如办公楼层）', value: '2.8:3.8' },
    { label: '3.8－4.8米（(如别墅首层或复式住宅）', value: '3.8:4.8' }
  ];

  $scope.selectHeight = function(height) {
    $scope.params.height = height.value;
  }

  $scope.classOfHeightItem = function(height) {
    return height.value === $scope.params.height ? 'active' : '';
  }

  $scope.listOfCycle = [
    { label: '“优秀” - 洁净空气的换气量为5次/小时', value: 5 },
    { label: '“良好” - 洁净空气的换气量为4次/小时', value: 4 },
    { label: '“一般” - 洁净空气的换气量为3次/小时', value: 3 }
  ];

  $scope.selectCycle = function(cycle) {
    $scope.params.cycle = cycle.value;
  }

  $scope.classOfCycleItem = function(cycle) {
    return cycle.value === $scope.params.cycle ? 'active' : '';
  }
});
