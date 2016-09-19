'use strict';

// angular.module('minblog').
// config(['$interpolateProvider', function($interpolateProvider) {
//   $interpolateProvider.startSymbol('{a');
//   $interpolateProvider.endSymbol('a}');
// }]);

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
  when('/detail/:id', {
    template: '<blog-entry-detail></blog-entry-detail>'
  }).
  when('/edit/:id', {
    template: '<blog-entry-edit></blog-entry-edit>'
  }).
  otherwise('/');

  // use the HTML5 History API
  $locationProvider.html5Mode(true);
}]);
