'use strict';

angular.
module('blogEntryList').
component('blogEntryList', {
  templateUrl: 'static/partials/blogEntry-list/blogEntry-list.template.html',
  controller: ['BlogEntry', '$sce', '$scope',
  function BlogEntryListController(BlogEntry, $sce, $scope) {
    var viewModel = this;

    this.first_entry_id = '000000000000000000000000';
    this.last_entry_id = '000000000000000000000000';
    this.totalItems = 0;
    this.itemsPerPage = 10;
    this.currentPage = 1;
    this.prevPage = 1;
    this.maxSize = 4;

    this.queryHandler = function (blogEntries) {
      if (blogEntries.count <= 0) {
        return;
      }

      viewModel.first_entry_id = blogEntries.entries[0].entry_id;
      viewModel.last_entry_id = blogEntries.entries[blogEntries.entries.length - 1].entry_id;
      viewModel.totalItems = blogEntries.count;
    }

    this.blogEntries = BlogEntry.get({'direction': '+', 'last_entry_id': this.last_entry_id, 'limit': this.itemsPerPage});
    this.blogEntries.$promise.then(function (blogEntries) {
      viewModel.queryHandler(blogEntries);
    });

    this.pageChanged = function() {
      var direction;
      var entry_id;
      if (viewModel.currentPage > viewModel.prevPage) {
        direction = '-'; // Default sort order is newest-oldest.
        entry_id = viewModel.last_entry_id;
      } else {
        direction = '+';
        entry_id = viewModel.first_entry_id;
      }
      viewModel.prevPage = viewModel.currentPage;

      console.log(direction);
      console.log(entry_id);
      this.blogEntries = BlogEntry.get({'direction': direction, 'last_entry_id': entry_id, 'limit': viewModel.itemsPerPage});
      this.blogEntries.$promise.then(function (blogEntries) {
        viewModel.queryHandler(blogEntries);
      });
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
