'use strict';

function toggleSubmitBtn (current_content) {
  if (current_content && $("#blogEntryCreate-submitBtn").hasClass("disabled")) {
    $("#blogEntryCreate-submitBtn").removeClass("disabled");
  } else if (!current_content && !$("#blogEntryCreate-submitBtn").hasClass("disabled")) {
    $("#blogEntryCreate-submitBtn").addClass("disabled");
  }
}

angular.
module('blogEntryCreate').
component('blogEntryCreate', {
  templateUrl: 'static/partials/blogEntry-create/blogEntry-create.template.html',
  controller: ['BlogEntry',
  function BlogEntryCreateController(BlogEntry) {
    this.createNewEntryTitle = "";
    this.createNewEntryText = "";
    this.createNewEntryFunc = function () {
      if (!this.createNewEntryText) {
        return;
      }
      console.log(this.createNewEntryText);

      var newBlogEntry = new BlogEntry();
      newBlogEntry.title = this.createNewEntryTitle;
      newBlogEntry.text = this.createNewEntryText;
      newBlogEntry.$save();
      this.createNewEntryTitle = "";
      this.createNewEntryText = "";
      toggleSubmitBtn(this.createNewEntryText);
      // BlogEntry.save({val: this.createNewEntryText}).$promise.then(function(data) {
      //   console.log('OK' + data);
      // }, function(error) {
      //   console.log(error);
      // });
    }

    this.keyUpHandler = function() {
    }

    var viewModel = this;

    this.tinymceOptions = {
      setup: function (editor) {
        editor.on('keyup', function (e) {
          var current_content = editor.getContent();
          toggleSubmitBtn(current_content);
        });
      },
      height: '450',
      browser_spellcheck: true,
      plugins: [
        'advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker',
        'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
        'save table contextmenu directionality emoticons template paste textcolor'
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
      toolbar: 'forecolor fontselect fontsizeselect | bullist numlist outdent indent '
    };
  }
]
});
