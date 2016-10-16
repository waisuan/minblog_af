'use strict';

angular.
module('services.blogEntry').
factory('BlogEntry', ['$resource',
function($resource) {
  return $resource('/api/blogentries/:direction/:last_entry_id/:limit');
}
]);
