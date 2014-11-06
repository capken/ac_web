'use strict';

angular.module('airCleanersWebApp', ['ngRoute', 'ngAnimate'])
.config(['$routeProvider', function($routeProvider) {

  $routeProvider
    .when('/notice', {
      templateUrl: 'views/notice.html'
    })
    .when('/nav', {
      templateUrl: 'views/nav.html'
    })
    .when('/recommend/step/:step', {
      templateUrl: 'views/recommend.html',
      controller: 'RecommendCtrl'
    })
    .when('/select/:selection/step/:step', {
      templateUrl: 'views/select.html',
      controller: 'SelectCtrl'
    })
    .when('/products', {
      templateUrl: 'views/products.html',
      controller: 'ProductsCtrl'
    })
    .when('/products/:id/review', {
      templateUrl: 'views/product_review.html',
      controller: 'ProductCtrl'
    })
    .when('/products/:id/detail', {
      templateUrl: 'views/product_detail.html',
      controller: 'ProductCtrl'
    })
    .otherwise({
      redirectTo: '/nav'}
    );
}])
.constant('listOfRoomArea', [
  { label: '小于10', value: '2:10'  },
  { label: '10~20',  value: '10:20' },
  { label: '20~30',  value: '20:30' },
  { label: '30~40',  value: '30:40' },
  { label: '40~50',  value: '40:50' },
  { label: '大于50', value: '50:99' }
])
.constant('listOfRoomHeight', [
  { label: '2.5~2.8 m（如普通住宅）', value: '2.5:2.8' },
  { label: '2.8~3.8 m（如办公楼层）', value: '2.8:3.8' },
  { label: '3.8~4.8 m（如别墅首层或复式住宅）', value: '3.8:4.8' }
])
.constant('listOfCycle', [
  { label: '“优秀” - 洁净空气的换气量为 4.5~5.5 次/小时', value: '4.5:5.5' },
  { label: '“良好” - 洁净空气的换气量为 3.5~4.5 次/小时', value: '3.5:4.5' },
  { label: '“一般” - 洁净空气的换气量为 2.5~3.5 次/小时', value: '2.5:3.5' }
]);
