'use strict';

angular.
module('services.blogEntryDetail').
factory('BlogEntryDetail', ['$resource',
function($resource) {
  return $resource('/api/blogentrydetail/:entryId');
}
]);
