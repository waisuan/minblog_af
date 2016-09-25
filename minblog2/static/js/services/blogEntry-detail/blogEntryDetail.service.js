'use strict';

angular.
module('services.blogEntryDetail').
factory('BlogEntryDetail', ['$resource',
function($resource) {
  return $resource('/api/blogentrydetail/:entry_id', null, {
    'update': { method: 'PUT' }
  });
}
]);
