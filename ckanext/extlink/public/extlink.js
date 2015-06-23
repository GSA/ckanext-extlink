/* function to check white list domain */

jQuery(function($){
    var href;
    var urls = extlink_white_list;
    var i;
    var $a = $('a');
    $a.each(function(i){
        return function(){
            for (href = 0; href < urls.length; href++) {

                var domains = this.href.split( '/' );
                var d = domains[2];

                if (d == null || d == ""){

                    $( this ).addClass( "non_ext" );
                }
                else if(d.indexOf(urls[href]) != -1) {
                    // console.log(("twitter.com").indexOf(urls[href]));

                    $( this ).addClass( "non_ext" );
                }
            }
        }
    }(i));
    $("a:not([href^='http://']):not([href^='https://'])").addClass("non_ext");

});
jQuery( document ).ready(function() {
    jQuery('a').each(function(){
        var ext_msg= extlink_popup_message;
        //if(ext_msg == "" || ext_msg == " " || ext_msg.length == 0 ){

        // ext_msg='This link will direct you to an external website that may have different content and privacy policies from Data.gov.'
        //}
        if(jQuery(this).hasClass("ext_link")){
            if (!jQuery(this).attr('title')) {
                jQuery(this).attr('title', ext_msg);
            }
        }

        if(!jQuery(this).hasClass("non_ext")){

            jQuery(this).addClass("ext_link");
            if (!jQuery(this).attr('title')) {
                jQuery(this).attr('title', ext_msg);
            }
        }
    });

    jQuery( ".ext_link" ).mouseover(function() {

        jQuery( ".dataset-item").css( "overflow","visible" );

    })

        .mouseout(function() {

            jQuery( ".dataset-item").css( "overflow","hidden" );

        });
});
jQuery(function() {

    jQuery( '.ext_link' ).tooltip();

});
