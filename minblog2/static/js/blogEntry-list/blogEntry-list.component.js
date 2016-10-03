'use strict';

angular.
module('blogEntryList').
component('blogEntryList', {
  templateUrl: 'static/partials/blogEntry-list/blogEntry-list.template.html',
  controller: ['BlogEntry', '$sce', '$scope',
  function BlogEntryListController(BlogEntry, $sce, $scope) {
    var viewModel = this;

    this.totalItems = 64;
    this.currentPage = 1;
    this.maxSize = 4;
    this.positionOfLastBlogEntry = 0;
    this.allBlogEntries = [];
    this.currBlogEntries = [];
    this.blogEntries = BlogEntry.query();
    // this.blogEntries.$promise.then(function (blogEntries) {
    //   for (var i = 0; i < blogEntries.length; ++i) {
    //     viewModel.allBlogEntries.push(blogEntries[i]);
    //   }
    //
    //   for (var i = 0; i < 5; ++i) {
    //     viewModel.currBlogEntries.push(blogEntries[i]);
    //   }
    //
    //   viewModel.positionOfLastBlogEntry = 5;
    // });

    this.pageChanged = function() {
      console.log('PageChanged');
    };

    // var win = $(window);
    // // Each time the user scrolls
    // win.scroll(function() {
    //   // End of the document reached?
    //   if ($(document).height() - win.height() == win.scrollTop()) {
    //     //$('#loading').show();
    //
    //     if (viewModel.positionOfLastBlogEntry >= viewModel.allBlogEntries.length) {
    //       return;
    //     }
    //
    //     for (var i = viewModel.positionOfLastBlogEntry;
    //              i < viewModel.positionOfLastBlogEntry + 5 && i < viewModel.allBlogEntries.length;
    //              ++i) {
    //       viewModel.currBlogEntries.push(viewModel.allBlogEntries[i]);
    //     }
    //
    //     viewModel.positionOfLastBlogEntry += 5;
    //
    //     $scope.$apply();
    //   }
    // });

    this.explicitlyTrustedHtml = function (untrusted_html) {
      return $sce.trustAsHtml(untrusted_html);
    }
  }
]
});
