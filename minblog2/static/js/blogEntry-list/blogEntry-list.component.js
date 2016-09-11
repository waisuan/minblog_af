'use strict';

angular.
module('blogEntryList').
component('blogEntryList', {
  templateUrl: 'static/partials/blogEntry-list/blogEntry-list.template.html',
  controller: ['BlogEntry', '$sce',
  function BlogEntryListController(BlogEntry, $sce) {
    this.blogEntries = BlogEntry.query();

    this.explicitlyTrustedHtml = function (untrusted_html) {
      return $sce.trustAsHtml(untrusted_html);
    }

    var viewModel = this;
  }
]
});
