/* function to check white list domain */

jQuery(function($){
    var urls = extlink_white_list;
    // add self domain to the array
    urls.push(window.location.host)
    $('a').each(function(){
        if (!this.host) { // exit if it is a fake a without href
            $( this ).addClass( "non_ext" );
            return;
        };
        for (i = 0; i < urls.length; i++) {
            if (!urls[i]) continue;
            parts = this.host.split(urls[i])
            // add non_ext...
            if (
                // ...if endswith white listed url
                this.host.indexOf(urls[i],this.host.length - urls[i].length) !== -1
                &&
                (
                // ...white listed cd.com should not cover www.abcd.com
                    urls[i].indexOf('.') === 0
                    ||
                    urls[i] == this.host
                    ||
                    parts[parts.length - 2].slice(-1) == '.'
                )
            ) {
                $( this ).addClass( "non_ext" );
                break;
            }
        }
    });
});

jQuery( document ).ready(function() {
    jQuery('a').each(function(){
        var ext_msg= extlink_popup_message;
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
});

jQuery(function() {

    jQuery( '.ext_link' ).tooltip();

});
