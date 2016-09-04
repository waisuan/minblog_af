'use strict';

angular.
module('services.blogEntry').
factory('BlogEntry', ['$resource',
function($resource) {
  return $resource('/api/blogentries/:id');
  // return $resource('/api/blogentries', {}, {
  //   queryForAll: {
  //     method: 'GET',
  //     isArray: true
  //   },
  //   createNewBlogEntry : {
  //     method: 'POST'
  //   }
  // });
}
]);
