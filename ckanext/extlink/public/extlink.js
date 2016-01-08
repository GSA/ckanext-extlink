/* add tooltips to external links */

jQuery(function($){
    var ext_msg = extlink_popup_message;
    var urls = extlink_white_list;
    // add self domain to the array
    urls.push(window.location.hostname);

    // function to return true if link matches whitelist url
    var check_whitelist = function(link, url) {
        var parts = link.split(url);
        var result = false;
        if (
            // link ends with url
            link.indexOf(url, link.length - url.length) !== -1
            &&
            (
            // exclude scenario where www.abcd.com ends with cd.com
                url.indexOf('.') === 0 // url starts with '.' is ok. (.cd.com)
                ||
                url == link // cd.com == cd.com is ok
                ||
                parts[parts.length - 2].slice(-1) == '.' // ab.cd.com is ok
            )
        ) {
            result = true;
        }

        return result;
    };

    // go thru each link on the page, add disclaimer if it is external link
    $('a').each(function() {
        try { //IE might give nonsense error on invalid hostname
            var link = this.hostname;
        }
        catch(err) {
            var link = '';
        }
        if (!link) {
            // a fake a without href, or invalid. nothing to do
            return;
        };

        // go thru each white listed domain to match this.hostname
        for (i = 0; i < urls.length; i++) {
            var url = urls[i].toLowerCase();
            if (!url) continue;

            var result = check_whitelist(link, url)
            if (result) {
                return;
            };
        };

        // external link confirmed
        // place tooltip at top or bottom based on it is in header or not
        if ($(this).closest('header').length) {
            var placement_value = 'bottom'
        }
        else {
            var placement_value = 'top'
        }

        $(this).attr('title', ext_msg).tooltip({placement: placement_value});
    });
});
