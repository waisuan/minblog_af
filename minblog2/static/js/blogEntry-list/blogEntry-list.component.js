'use strict';

angular.
  module('blogEntryList').
  component('blogEntryList', {
    templateUrl: 'static/partials/dummy.template.html',
    controller: ['BlogEntry',
      function BlogEntryListController(BlogEntry) {
        this.blogEntries = BlogEntry.queryForAll();
      }
    ]
  });
