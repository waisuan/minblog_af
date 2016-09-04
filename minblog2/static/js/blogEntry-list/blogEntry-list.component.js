'use strict';

angular.
module('blogEntryList').
component('blogEntryList', {
    templateUrl: 'static/partials/blogEntry-list/blogEntry-list.template.html',
    controller: ['BlogEntry',
    function BlogEntryListController(BlogEntry) {
        this.comp = 'BlogEntryListController';
        this.blogEntries = [];

        var viewModel = this;

        BlogEntry.query().$promise.then(function(data) {
          viewModel.blogEntries = data;
        }, function(error) {
          console.log(error);
        });
    }
]
});
