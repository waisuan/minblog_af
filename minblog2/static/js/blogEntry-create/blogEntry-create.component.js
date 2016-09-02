'use strict';

angular.
module('blogEntryCreate').
component('blogEntryCreate', {
    templateUrl: 'static/partials/blogEntry-create/blogEntry-create.template.html',
    controller: ['BlogEntry',
    function BlogEntryCreateController(BlogEntry) {
        this.comp = 'BlogEntryCreateController';
    }
]
});
