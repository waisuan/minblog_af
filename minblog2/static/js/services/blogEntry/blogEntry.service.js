'use strict';

angular.
module('services.blogEntry').
factory('BlogEntry', ['$resource',
function($resource) {
    return $resource('/api/blogentry', {}, {
        queryForAll: {
            method: 'GET'
        }
    });
}
]);
