'use strict';

angular.module('airCleanersWebApp', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {

  $routeProvider
    .when('/nav', {
      templateUrl: 'views/nav.html'
    })
    .when('/recommend', {
      templateUrl: 'views/recommend.html'
    })
    .when('/select/:id', {
      templateUrl: 'views/select.html'
    })
    .when('/products', {
      templateUrl: 'views/products.html'
    })
    .when('/product/:id/review', {
      templateUrl: 'views/product_review.html'
    })
    .when('/product/:id/detail', {
      templateUrl: 'views/product_detail.html'
    })
    .otherwise({
      redirectTo: '/nav'}
    );
}]);
