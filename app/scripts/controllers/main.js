'use strict';

angular.module('airCleanersWebApp')
.controller('MainCtrl', function ($scope) {
  $scope.params = {
    area: '10:15',
    height: '2.5:2.8',
    cycle: 4
  };
});
