'use strict';

angular.
module('services.blogEntry').
factory('BlogEntry', ['$resource',
function($resource) {
  return {
    search: $resource('/api/blogsearch/:search_text'),
    load: $resource('/api/blogentries/:direction/:last_entry_id/:limit/:sort_by')
  }
}
]);
