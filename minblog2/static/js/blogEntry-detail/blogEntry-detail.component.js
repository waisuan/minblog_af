'use strict';

angular.
module('blogEntryDetail').
component('blogEntryDetail', {
  templateUrl: 'static/partials/blogEntry-detail/blogEntry-detail.template.html',
  controller: ['$scope', '$routeParams', 'BlogEntryDetail', '$sce', '$location',
  function BlogEntryDetailController($scope, $routeParams, BlogEntryDetail, $sce, $location) {
    var viewModel = this;

    /*Credits to: http://stackoverflow.com/questions/19069759/loading-state-button-in-bootstrap-3*/
    this.btnLoad = function () {
      var $btn = $('#blogEntryDetail-modal-delBtn');
      $btn.button('loading');
      // Then whatever you actually want to do i.e. submit form
      // After that has finished, reset the button state using
      setTimeout(function () {
        $btn.button('reset');
        $('.blogEntryDetail-deleteModal').modal('toggle');
        $('.blogEntryDetail-deleteModal').on('hidden.bs.modal', function () {
          viewModel.goBackHome();
        });
      }, 1000);
    }

    this.entry_id = $routeParams.id;
    this.detailedBlogEntry = BlogEntryDetail.get({'entry_id': this.entry_id});
    this.detailedBlogEntry.$promise.then(function (detailedBlogEntry) {
      detailedBlogEntry.entry_text = $sce.trustAsHtml(detailedBlogEntry.entry_text);
    });

    this.gotoEdit = function() {
      $location.path('/edit/' + this.entry_id);
    }

    this.gotoDelete = function() {
      this.btnLoad();

      BlogEntryDetail.remove({'entry_id': this.entry_id});
    }

    this.goBackHome = function () {
      $location.path('/').replace();
      $scope.$apply();
    }
  }
]
});
