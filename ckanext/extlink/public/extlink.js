jQuery(function($){
var href;
var urls = [
"performance.gov",
"usa.gov",
"whitehouse.gov",
"www.data.gov",
"data.gov",
"catalog.data.gov",
"ars-grin.gov",
"mrlc.gov",
"epa.gov",
"whitehouse.gov",
"bison.usgs.ornl.gov",
"2014.spaceappschallenge.org",
"stateofthecoast.noaa.gov",
"csc.noaa.gov",
"www.csc.noaa.gov",
"edg.epa.gov",
"www.marinecadastre.gov",
"marineprotectedareas.noaa.gov",
"geoplatform.gov",
"catalog.data.gov",
"ridb.recreation.gov",
"dev-datagov.reisys.com",
"qa-datagov.reisys.com",
"uat-datagov.reisys.com",
".gov/",
".mil",
".gov"
];

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
$( document ).ready(function() {
jQuery('a').each(function(){


            if(!jQuery(this).hasClass("non_ext")){

            jQuery(this).addClass("ext_link");
            if (!jQuery(this).attr('title')) {
            jQuery(this).attr('title', 'This link will direct you to an external website that may have different content and privacy policies from catalog.Data.gov.')
                }
}



        });
