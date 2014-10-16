angular.module('cleanAirApp', [])
.controller('suggestCtrl', function($scope, $http) {
  $scope.mode = 'form';

  $scope.area = 15;
  $scope.height = 2.8;
  $scope.cycles = 4;

  $scope.products = [];

  $scope.setCycles = function(value) {
    $scope.cycles = value;
  }

  $scope.cyclesLevel = function() {
    if($scope.cycles == 5) {
      return '优秀';
    } else if($scope.cycles == 4) {
      return '良好';
    } else if($scope.cycles == 3) {
      return '一般';
    }
  }

  $scope.search = function() {
    var baseUrl = '/products?mode=suggest';
    baseUrl += '&room_area=' + $scope.area;
    baseUrl += '&air_refresh_count=' + $scope.cycles;
    baseUrl += '&room_height=' + $scope.height;

    console.log(baseUrl);
    $http.get(baseUrl).success(function(data) {
      $scope.mode = 'results';
      $scope.products = data;
    });
  }
})
.controller('searchCtrl', function($scope, $http) {
  $scope.mode = 'form';
  $scope.area = 15;
  $scope.height = 2.8;
  $scope.modelId = 1365;

  $scope.models = [];

  $http.get('/all_brands_models').success(function(data) {
    $scope.models = data;
  });

  $scope.search = function() {
    var baseUrl = '/products/' + $scope.modelId;
    $http.get(baseUrl).success(function(data) {
      $scope.mode = 'review';
      $scope.product = data;
      var cadr = data.cadr_dust ? data.cadr_dust : 0
      $scope.cycles = cadr / ($scope.area * $scope.height);
    });
  }

  $scope.cyclesLevel = function() {
    if($scope.cycles > 5) {
      return '优秀';
    } else if($scope.cycles >= 4 && $scope.cycles <= 5) {
      return '良好';
    } else if($scope.cycles >= 3 && $scope.cycles < 4) {
      return '一般';
    } else if($scope.cycles < 3) {
      return '较差';
    }
  }

  $scope.conclusion = function() {
    if($scope.cycles > 5) {
      return '这台空气净化器适合您的房间，但是性价比并不高，建议选择CADR值在XX到XX的空气净化器。';
    } else if($scope.cycles >= 4 && $scope.cycles <= 5) {
      return '您的选择很明智，您的房间可以选择这台空气净化器。';
    } else if($scope.cycles >= 3 && $scope.cycles < 4) {
      return '如果您还有预算，建议换台CADR值大于XX的产品。';
    } else if($scope.cycles < 3) {
      return '这台空气净化器放在您的房间，仅仅达到心理安慰的效果，在雾霾的天气无法保证室内空气的健康。';
    }
  }

  //您的选择很明智，您的房间可以选择这台空气净化器。
})
.controller('productCtrl', function($scope, $http) {
  $scope.product = {}

  var baseUrl = '/products/' + location.search.split('id=')[1];
  $http.get(baseUrl).success(function(data) {
    $scope.product = data;
  });
})
