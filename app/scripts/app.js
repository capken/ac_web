'use strict';

angular.module('airCleanersWebApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap'])
.config(['$routeProvider', function($routeProvider) {

  $routeProvider
    .when('/notice', {
      templateUrl: 'views/notice.html'
    })
    .when('/nav', {
      templateUrl: 'views/nav.html'
    })
    .when('/recommend', {
      templateUrl: 'views/recommend.html',
      controller: 'RecommendCtrl'
    })
    .when('/select/:selection', {
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
      redirectTo: '/notice'}
    );
}])
.constant('listOfRoomArea', [
  { label: '小于10', value: '5:10'  },
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
  { label: '良好 - 洁净空气的换气次数为3.5~4.5 次/小时', value: '3.5:4.5' },
  { label: '优秀 - 洁净空气的换气次数为4.5~5.5 次/小时', value: '4.5:5.5' },
  { label: '一般 - 洁净空气的换气次数为2.5~3.5 次/小时', value: '2.5:3.5' },
  { label: '过度 - 洁净空气的换气次数大于5.5 次/小时', value: '5.5:99' },
  { label: '心里安慰 - 洁净空气的换气次数小于2.5 次/小时', value: '0.0:2.5' },
])
.constant('ratingToText', {
  'I'   : '较差',
  'II'  : '一般',
  'III' : '良好',
  'IV'  : '优秀',
  'V'   : '过度'
})
.constant('ratingToSummary', {
  'I'   : '亲，雾霾天气里，身体健康比心理安慰更重要啊！换个换个，重新选一台能给您带来真正的健康空气的净化器！',
  'II'  : '亲，这款净化器基本满足您房间的需求，如果还有预算，小清新建议增加点预算，大幅度提升房间净化效率。',
  'III' : '亲，这款空气净化器非常适合您的房间。您即将和小清新一起变成“空净达人” ！',
  'IV'  : '亲，如果价格您可以接受，这款空气净化器是很不错的选择；如果在净化效率上您愿意做合理的让步，就可以节省一笔开支。',
  'V'   : '亲，水至清则无鱼啊！您对空气质量的要求太苛刻了。您钱多，还是用在其他地方吧！'
})
.constant('bestCycle', '3.5:4.5');
