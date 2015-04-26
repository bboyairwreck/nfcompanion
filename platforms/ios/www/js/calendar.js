/**
 * Created by wendykung on 4/25/15.
 */
$(document).ready(function() {
    $("#cal td").click(function() {
        $("td.selected").removeClass("selected");
        $(this).addClass("selected");
    });

});





//var dateObj = new Date("2015-04-24 9:00:00");
//
//dateObj.getMonth();




