'use strict';

angular.module('airCleanersWebApp', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {

  $routeProvider
    .when('/nav', {
      templateUrl: 'views/nav.html'
    })
    .when('/recommend', {
      templateUrl: 'views/recommend.html',
      controller: 'RecommendCtrl'
    })
    .when('/select/:id', {
      templateUrl: 'views/select.html'
    })
    .when('/products', {
      templateUrl: 'views/products.html',
      controller: 'ProductsCtrl'
    })
    .when('/product/:id/review', {
      templateUrl: 'views/product_review.html',
      controller: 'ProductCtrl'
    })
    .when('/product/:id/detail', {
      templateUrl: 'views/product_detail.html',
      controller: 'ProductCtrl'
    })
    .otherwise({
      redirectTo: '/nav'}
    );
}]);
