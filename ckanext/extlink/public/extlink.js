jQuery(function($){
var href;
var urls = extlink_white_list;

var $a = $('a');
   $a.each(function(){
        return function(){
          for (href = 0; href < urls.length; href++) {
              if (this.href.indexOf(urls[href]) != -1) {

             $( this ).addClass( "non_ext" );

             }

          }

        }
    });
$("a:not([href^='http://'])").addClass("non_ext");
});
jQuery( document ).ready(function() {
jQuery('a').each(function(){
var ext_msg= extlink_popup_message;
    if(ext_msg == "" || ext_msg == " " || ext_msg.length == 0 ){

        ext_msg='This link will direct you to an external website that may have different content and privacy policies from Data.gov.'
    }

            if(!jQuery(this).hasClass("non_ext")){

            jQuery(this).addClass("ext_link");
            if (!jQuery(this).attr('title')) {
            jQuery(this).attr('title', ext_msg);
                }
}
});


 });
$(function() {

    $( '.ext_link' ).tooltip();

});
