'use strict';

angular.
module('blogEntryDetail').
component('blogEntryDetail', {
  templateUrl: 'static/partials/blogEntry-detail/blogEntry-detail.template.html',
  controller: ['$routeParams', 'BlogEntryDetail', '$sce', '$location',
  function BlogEntryDetailController($routeParams, BlogEntryDetail, $sce, $location) {
    this.id = $routeParams.id;
    this.detailedBlogEntry = BlogEntryDetail.get({'entryId': this.id});
    this.detailedBlogEntry.$promise.then(function (detailedBlogEntry) {
      detailedBlogEntry.entry_text = $sce.trustAsHtml(detailedBlogEntry.entry_text);
    });

    this.gotoEdit = function() {
      $location.path('/edit/' + this.id);
    }

    var viewModel = this;
  }
]
});
