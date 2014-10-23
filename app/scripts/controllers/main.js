'use strict';

angular.module('airCleanersWebApp')
.controller('MainCtrl', function ($scope) {
  $scope.params = {
    area: '10:15',
    height: '2.5:2.8',
    cycle: 4,
    brand: '布鲁雅尔',
    productId: 1365,
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
      if(count >= 5) {
        return '优秀';
      } else if(4 <= count && count < 5) {
        return '良好';
      } else if(3 <= count && count < 4) {
        return '一般';
      } else if(count < 3) {
        return '较差';
      }
    } else {
      return '';
    }
  }

});
