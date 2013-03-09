'use strict';

var service_module = angular.module('meterific.services', []);

// Declare app level module which depends on filters, and services
angular.module('meterific', ['meterific.filters', 'meterific.constants', 'meterific.services', 'meterific.directives', 'ui.bootstrap', 'ui', '$strap']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/apis', 		{templateUrl: 'templates/index.html', 		controller: HomeController});
//    $routeProvider.otherwise({redirectTo: '/'});
  }]);
