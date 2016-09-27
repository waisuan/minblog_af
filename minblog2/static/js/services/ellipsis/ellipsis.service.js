'use strict';

angular.
module('services.ellipsis').
factory('Ellipsis', ['$sce', function($sce) {
  return {
    ellipsisfy: function(text) {

      this.isOverflowed = function (thisElement) {
        return thisElement[0].scrollHeight > thisElement[0].clientHeight;
      }

      console.log(text);

      var binding = text; //$sce.getTrustedHtml(text);
      var ellipsisSymbol = '&hellip;';
      var ellipsisSeparator = ' ';
      var bindArray = binding.split(ellipsisSeparator);

      var inviBlock = $('#blogEntryCreate-inviBlock');
      inviBlock.css('display', '');
      inviBlock.css('visibility', 'hidden');
      var element = $('#blogEntryCreate-inviBlockText');

      if (this.isOverflowed(element)) {
        var bindArrayStartingLength = bindArray.length,
          initialMaxHeight = element[0].clientHeight;

        element.html(binding + ellipsisSymbol);

        for (var i = 0; i < bindArrayStartingLength; i++) {
          var current = bindArray.pop();

          //if the last string still overflowed, then truncate the last string
          if (bindArray.length === 0) {
            bindArray[0] = current.substring(0, Math.min(current.length, 5));
          }

          element.html(bindArray.join(ellipsisSeparator) + ellipsisSymbol);

          if (element[0].scrollHeight < initialMaxHeight || this.isOverflowed(element) === false) {
            break;
          }
        }
      }

      //console.log(element.html());
      return element.html();
    }
  };
}]);
