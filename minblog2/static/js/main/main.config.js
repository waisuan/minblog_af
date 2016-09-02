'use strict';

angular.module('minblog').
config(['$interpolateProvider', function($interpolateProvider) {
    $interpolateProvider.startSymbol('{a');
    $interpolateProvider.endSymbol('a}');
}]);

angular.
module('minblog').
config(['$locationProvider' ,'$routeProvider',
function config($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.
    when('/', {
        template: '<blog-entry-list></blog-entry-list>'
    }).
    when('/create', {
        template: '<blog-entry-create></blog-entry-create>'
    }).
    otherwise('/');
}
]);
