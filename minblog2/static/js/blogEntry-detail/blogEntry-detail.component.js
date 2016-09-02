'use strict';

angular.
module('blogEntryDetail').
component('blogEntryDetail', {
    templateUrl: 'static/partials/blogEntry-detail/blogEntry-detail.template.html',
    controller: ['BlogEntry',
    function BlogEntryDetailController(BlogEntry) {
        this.comp = 'BlogEntryDetailController';
    }
]
});
