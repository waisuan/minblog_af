'use strict';

angular.
module('blogEntryCreate').
component('blogEntryCreate', {
  templateUrl: 'static/partials/blogEntry-create/blogEntry-create.template.html',
  controller: ['BlogEntry',
  function BlogEntryCreateController(BlogEntry) {

    var viewModel = this;

    this.toggleSubmitBtn = function (current_title, current_content, wordCount) {
      if (current_title && current_content
        && $("#blogEntryCreate-submitBtn").hasClass("disabled")
        && wordCount >= 180) {
          $("#blogEntryCreate-submitBtn").removeClass("disabled");
        } else if ((!current_title || !current_content || wordCount < 180)
        && !$("#blogEntryCreate-submitBtn").hasClass("disabled")) {
          $("#blogEntryCreate-submitBtn").addClass("disabled");
        }
      }

      /*Credits to: http://stackoverflow.com/questions/19069759/loading-state-button-in-bootstrap-3*/
      this.btnLoad = function () {
        var $btn = $('#blogEntryCreate-submitBtn');
        $btn.button('loading');
        // Then whatever you actually want to do i.e. submit form
        // After that has finished, reset the button state using
        setTimeout(function () {
          $btn.button('reset');
          setTimeout(function() {
            $btn.addClass('disabled'); // will work, but it's UGLY!
          }, 0);
          viewModel.alertSuccess();
        }, 1000);
      }

      this.ableToProceed = function () {
        if ($("#blogEntryCreate-submitBtn").hasClass("disabled")) {
          return false;
        }

        return true;
      }

      /*Credits to: http://fiddle.jshell.net/sunnypmody/XDaEk/*/
      this.alertSuccess = function () {
        $( "#blogEntryCreate-successAlert" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
      }

      this.newBlogEntryTitle = "";
      this.newBlogEntryText = "";
      this.createNewBlogEntryFunc = function () {
        if (!this.ableToProceed()) {
          return;
        }

        this.btnLoad();

        var newBlogEntry = new BlogEntry();
        newBlogEntry.title = this.newBlogEntryTitle;
        newBlogEntry.text = this.newBlogEntryText;
        newBlogEntry.$save();

        this.newBlogEntryTitle = "";
        this.newBlogEntryText = "";
        // this.toggleSubmitBtn(this.newBlogEntryTitle, this.newBlogEntryText, 0);
      }

      this.wordCount = 0;

      this.keyUpHandler = function() {
        this.toggleSubmitBtn(this.newBlogEntryTitle,
          this.newBlogEntryText,
          this.wordCount);
        }

        this.tinymceOptions = {
          setup: function (editor) {
            editor.on('keyup', function (e) {
              var current_content = editor.getContent();

              // From: http://archive.tinymce.com/wiki.php/TinyMCE3x:How_to_limit_number_of_characters/words
              var body = editor.getBody();
              var text = tinymce.trim(body.innerText || body.textContent);
              var wordCount = text.split(/[\w\u2019\'-]+/).length - 1; // Why -1 ? IDK.
              viewModel.wordCount = wordCount;

              viewModel.toggleSubmitBtn(viewModel.newBlogEntryTitle, current_content, wordCount);
            });
          },
          height: '450',
          browser_spellcheck: true,
          plugins: [
            'advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker',
            'searchreplace visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
            'save table contextmenu directionality emoticons template paste textcolor wordcount'
          ],
          style_formats: [
            {
              title: 'Headers', items: [
                {title: 'Header 1', format: 'h1'},
                {title: 'Header 2', format: 'h2'},
                {title: 'Header 3', format: 'h3'},
                {title: 'Header 4', format: 'h4'},
                {title: 'Header 5', format: 'h5'},
                {title: 'Header 6', format: 'h6'}
              ]
            },
            {
              title: 'Blocks', items: [
                {title: 'Paragraph', format: 'p'},
                {title: 'Blockquote', format: 'blockquote'},
                {title: 'Div', format: 'div'},
                {title: 'Pre', format: 'pre'}
              ]
            },
            {
              title: 'Alignment', items: [
                {title: 'Left', icon: 'alignleft', format: 'alignleft'},
                {title: 'Center', icon: 'aligncenter', format: 'aligncenter'},
                {title: 'Right', icon: 'alignright', format: 'alignright'},
                {title: 'Justify', icon: 'alignjustify', format: 'alignjustify'}
              ]
            }
          ],
          menu: {
            edit: {title: 'Edit', items: 'undo redo | cut copy paste pastetext | selectall | searchreplace'},
            insert: {title: 'Insert', items: 'link | charmap'},
            view: {title: 'View', items: 'visualaid | preview fullscreen'},
            format: {
              title: 'Format',
              items: 'bold italic underline strikethrough superscript subscript | formats | removeformat'
            },
            table: {title: 'Table', items: 'inserttable tableprops deletetable | cell row column'},
            tools: {title: 'Tools', items: 'code'}
          },
          /*menubar: 'edit insert view format table tools',*/
          /*fontselect fontsizeselect */
          toolbar: 'forecolor | bullist numlist outdent indent '
        };
      }
    ]
  });
