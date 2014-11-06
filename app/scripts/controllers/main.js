'use strict';

angular.module('airCleanersWebApp')
.controller('MainCtrl', function ($scope) {
  $scope.params = {
    area: '10:20',
    height: '2.5:2.8',
    cycle: '3.5:4.5',
    brand: '布鲁雅尔',
    productId: 'vNbGGv',
    reviewMode: '1'
  };

  $scope.minVolume = function() {
    var minAreaStr = $scope.params.area.split(':').shift();
    var minArea = parseFloat(minAreaStr);

    var minHeightStr = $scope.params.height.split(':').shift(); 
    var minHeight = parseFloat(minHeightStr);

    return minArea * minHeight;
  }

  $scope.maxVolume = function() {
    var maxAreaStr = $scope.params.area.split(':').pop();
    var maxArea = parseFloat(maxAreaStr);

    var maxHeightStr = $scope.params.height.split(':').pop(); 
    var maxHeight = parseFloat(maxHeightStr);

    return maxArea * maxHeight;
  }

  $scope.avgCycle = function() {
    var cycleStr = $scope.params.cycle.split(':');
    var minCycle = parseFloat(cycleStr[0]);
    var maxCycle = parseFloat(cycleStr[1]);
    return (minCycle + maxCycle) / 2;
  };

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

  $scope.cycleText = function(count) {
    if(angular.isDefined(count)) {
      if(count >= 4.5) {
        return '优秀';
      } else if(3.5 <= count && count < 4.5) {
        return '良好';
      } else if(2.5 <= count && count < 3.5) {
        return '一般';
      } else if(count < 2.5) {
        return '较差';
      }
    } else {
      return '';
    }
  }

});
