$( document ).ready(function() {
    var current_href = window.location.href;
    var current_href_tokens = current_href.split("/")
    var current_href_loc = current_href_tokens[current_href_tokens.length-1];
    var current_href_loc_2 = current_href_tokens[current_href_tokens.length-2];
    if(!current_href_loc || current_href_loc_2 == "detail" || current_href_loc_2 == "edit") {
        $("#main-home").parent().addClass("active");
    } else {
        $("#main-" + current_href_loc).parent().addClass("active");
    }

    $(".main-nav").click(function() {
        // var clicked_id = $(this).attr('id')
        $("ul.nav li").removeClass("active");
        $(this).parent().addClass("active");
    });
});
