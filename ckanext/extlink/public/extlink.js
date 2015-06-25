/* add tooltips to external links */

jQuery(function($){
    var ext_msg = extlink_popup_message;
    var urls = extlink_white_list;
    // add self domain to the array
    urls.push(window.location.host);

    $('a').each(function(){
        if (!this.host) {
            // a fake a without href, nothing to do
            return;
        };

        // go thru each white listed domain to match this.host
        for (i = 0; i < urls.length; i++) {
            url = urls[i].toLowerCase();
            if (!url) continue;

            parts = this.host.split(url);
            if (
                // ...if endswith white listed url
                this.host.indexOf(url, this.host.length - url.length) !== -1
                &&
                (
                // ...www.abcd.com endswith cd.com but not to be white listed
                    url.indexOf('.') === 0 // .cd.com starting with '.' is ok
                    ||
                    url == this.host // cd.com == cd.com is ok
                    ||
                    parts[parts.length - 2].slice(-1) == '.' // ab.cd.com is ok
                )
            ) {
                // white list matched. nothing to do
                return
            };
        };

        // external link confirmed
        $(this).attr('title', ext_msg).tooltip();
    });
});
