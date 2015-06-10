jQuery(function($){
var href;
var urls = extlink_white_list;

var $a = $('a');
   $a.each((function(i){
        return function(){
          for (href = 0; href < urls.length; href++) {
              if (this.href.indexOf(urls[href]) != -1) {

             $( this ).addClass( "non_ext" );

             }

          }

        }
    }(i)));
$("a:not([href^='http://'])").addClass("non_ext");
});
jQuery( document ).ready(function() {
jQuery('a').each(function(){


            if(!jQuery(this).hasClass("non_ext")){

            jQuery(this).addClass("ext_link");
            if (!jQuery(this).attr('title')) {
            jQuery(this).attr('title', 'This link will direct you to an external website that may have different content and privacy policies from catalog.Data.gov.')
                }
}
});


 });
