'use strict';

angular.module('airCleanersWebApp')
.controller('MainCtrl', function ($scope, $location, ratingToText, bestCycle) {
  $scope.params = {
    area: '10:20',
    height: '2.5:2.8',
    cycle: '3.5:4.5',
    brand: '布鲁雅尔/Blueair',
    productId: 'wb9W7q',
    reviewMode: '1'
  };

  $scope.minVolume = function() {
    var minAreaStr = $scope.params.area.split(':').shift();
    var minArea = parseFloat(minAreaStr);

    var minHeightStr = $scope.params.height.split(':').shift(); 
    var minHeight = parseFloat(minHeightStr);

    return minArea * minHeight;
  };

  $scope.maxVolume = function() {
    var maxAreaStr = $scope.params.area.split(':').pop();
    var maxArea = parseFloat(maxAreaStr);

    var maxHeightStr = $scope.params.height.split(':').pop(); 
    var maxHeight = parseFloat(maxHeightStr);

    return maxArea * maxHeight;
  };

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
  };

  $scope.heightRangeText = function() {
    var matches = null;
    if(matches = $scope.params.height.match(/([\d.]+):([\d\.]+)/)) {
      return matches[1] + ' - ' + matches[2];
    }
    
    return $scope.params.height;
  };

  $scope.ratingText = function(count) {
    return angular.isDefined(count) ?
      ratingToText[$scope.ratingOf(count)] : '';
  };

  $scope.ratingOf = function(cycles) {
    var rating = '';

    if(cycles < 2.5) {
      rating = 'I';
    } else if(2.5 <= cycles && cycles < 3.5) {
      rating = 'II';
    } else if(3.5 <= cycles && cycles < 4.5) {
      rating = 'III';
    } else if(4.5 <= cycles && cycles < 5.5) {
      rating = 'IV';
    } else if(cycles >= 5.5) {
      rating = 'V';
    }

    return rating;
  };

  $scope.navToProducts = function(cycle) {
    var paramsPair = {
      area: $scope.params.area,
      height: $scope.params.height
    };

    if(angular.isUndefined(cycle)) {
      paramsPair.cycle = bestCycle;
      paramsPair.isBestCycle = "true";
    } else {
      paramsPair.cycle = cycle;
    }

    $location.path('/products').search(paramsPair);
  }

  $scope.navToProduct = function() {
    $location.path('/products/' + 
      $scope.params.productId + '/review'
    ).search({
      area: $scope.params.area,
      height: $scope.params.height
    });
  }

});
