'use strict';

angular.
module('blogEntryDetail').
component('blogEntryDetail', {
    templateUrl: 'static/partials/blogEntry-detail/blogEntry-detail.template.html',
    controller: ['$routeParams', 'BlogEntryDetail', '$sce',
    function BlogEntryDetailController($routeParams, BlogEntryDetail, $sce) {
      this.id = $routeParams.id;
      BlogEntryDetail.get({'entryId': this.id});
    }
]
});
