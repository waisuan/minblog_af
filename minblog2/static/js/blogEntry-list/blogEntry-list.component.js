'use strict';

angular.
module('blogEntryList')
.filter('search', ['BlogEntry', function(BlogEntry) {
  return _.memoize(function(blogEntries, searchText) {
    if(searchText == '' || searchText == null || searchText.length < 2) {
      return blogEntries;
    }
    console.log(blogEntries.length);
    console.log(searchText);
    var filteredEntries = [];
    var searchResult = BlogEntry.search.get({'search_text': searchText});
    searchResult.$promise.then(function (searchResult) {
      console.log(searchResult.entries.length);
      for (var i = 0; i < searchResult.entries.length; ++i) {
        filteredEntries.push(searchResult.entries[i]);
      }
    });
    return filteredEntries;
  }, function (blogEntries, searchText) {
    return blogEntries + searchText;
  });
}])
.component('blogEntryList', {
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
    this.sortBySelected = 'newest';
    this.sortBy = -1;

    this.blogEntries = BlogEntry.load.get({'direction': '+', 'last_entry_id': this.last_entry_id, 'limit': this.itemsPerPage, 'sort_by': this.sortBy});
    this.blogEntries.$promise.then(function (blogEntries) {
      viewModel.queryHandler(blogEntries);
    });

    this.sortByHandler = function () {
      if (viewModel.sortBySelected == 'oldest') {
        viewModel.sortBy = 1; // oldest->newest
      } else if (viewModel.sortBySelected == 'newest') {
        viewModel.sortBy = -1; //newest->oldest
      }

      viewModel.first_entry_id = '000000000000000000000000';
      viewModel.last_entry_id = '000000000000000000000000';
      viewModel.blogEntries = BlogEntry.load.get({'direction': '+', 'last_entry_id': viewModel.last_entry_id, 'limit': viewModel.itemsPerPage, 'sort_by': viewModel.sortBy});
      viewModel.blogEntries.$promise.then(function (blogEntries) {
        viewModel.queryHandler(blogEntries);
      });
      viewModel.currentPage = 1;
      viewModel.prevPage = 1;
    }

    this.queryHandler = function (blogEntries) {
      if (blogEntries.count <= 0) {
        return;
      }

      viewModel.first_entry_id = blogEntries.entries[0].entry_id;
      viewModel.last_entry_id = blogEntries.entries[blogEntries.entries.length - 1].entry_id;
      viewModel.totalItems = blogEntries.count;
    }

    this.pageChanged = function() {
      var direction;
      var entry_id;
      if (viewModel.currentPage > viewModel.prevPage) {
        // Default sort order is newest-oldest.
        // - ==> going backward || less-than first entry in the list
        // + ==> going forward || more-than last entry in the list
        direction = viewModel.sortBySelected == 'newest' ? '-' : '+';
        entry_id = viewModel.last_entry_id;
      } else {
        direction = viewModel.sortBySelected == 'newest' ? '+' : '-';;
        entry_id = viewModel.first_entry_id;
      }

      viewModel.prevPage = viewModel.currentPage;
      viewModel.blogEntries = BlogEntry.load.get({'direction': direction, 'last_entry_id': entry_id, 'limit': viewModel.itemsPerPage, 'sort_by': viewModel.sortBy});
      viewModel.blogEntries.$promise.then(function (blogEntries) {
        viewModel.queryHandler(blogEntries);
      });
    };

    this.explicitlyTrustedHtml = function (untrusted_html) {
      return $sce.trustAsHtml(untrusted_html);
    }

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
  }
]
});
