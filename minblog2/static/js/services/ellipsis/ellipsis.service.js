'use strict';

angular.
module('services.ellipsis').
factory('Ellipsis', ['$sce', function($sce) {
  return {
    ellipsisfy: function(header, text) {

      this.isOverflowed = function (thisElement, useParent) {
        thisElement = useParent ? thisElement.parent() : thisElement;
        return thisElement[0].scrollHeight > thisElement[0].clientHeight;
      }

      this.getParentHeight = function (element) {
        var heightOfChildren = 0;
        angular.forEach(element.parent().children(), function(child) {
          if (child != element[0]) {
            heightOfChildren += child.clientHeight;
          }
        });
        console.log(heightOfChildren);
        console.log(element.parent()[0].clientHeight);
        console.log(element[0].clientHeight);
        return element.parent()[0].clientHeight - heightOfChildren;
      }

      var trustedHtml = $sce.getTrustedHtml(text);
      //console.log(trustedHtml);
      var ellipsisSymbol = '&hellip;';
      var parent = `<div class="blogEntry-entry">
                      <a class="blogEntry-header-anchor" href="#">
                        <h1 class="blogEntry-header">` + header + `</h1>
                      </a>
                    </div>`;
      var child = `<p class="blogEntry-text">` + text + ellipsisSymbol + `</p>`;
      //var binding = trustedHtml + ellipsisSymbol;
      // var bindingTokens = trustedHtml.split(' ');
      // var bindingTokensStartingLength = bindingTokens.length;
      // var initialMaxHeight = 150;
      //console.log(binding);
      //var element = $.parseHTML(binding);
      var parentElement = angular.element(parent);
      var childElement = angular.element(child);
      parentElement.append(childElement);
      console.log(parentElement.hasClass('blogEntry-entry'));
      console.log(childElement.hasClass('blogEntry-text'));

      $('#blogEntryDummySpan').css('display', '');
      $('#blogEntryDummySpan').css('visibility', 'hidden');
      console.log(this.isOverflowed($('#blogEntryDummyP'), false));
      console.log(this.getParentHeight($('#blogEntryDummyP')));

      // console.log(bindingTokens.length);
      // for (var i = 0; i < bindingTokensStartingLength; i++) {
      //   var current = bindingTokens.pop();
      //   console.log(current);
      //   // if (bindingTokens.length === 0) {
      //   //   bindingTokens[0] = current.substring(0, Math.min(current.length, 5));
      //   // }
      //   //
      //   // bindingTokens.join(' ') + ellipsisSymbol;
      // }
    }
  };
}]);
