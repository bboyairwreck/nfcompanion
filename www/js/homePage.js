$(document).ready(function() {
    myFunction();
});

function myFunction() {
    $('h1').text("Home Page");

    var i = 0;

    $("#welcomeTime").change(function() {
        console.log("changed");
        var time = $("#welcomeTime").val();

        var timeString;
        if (time) {
            var arrTime = time.split(":");

            var hours = arrTime[0];
            var mins = arrTime[1];
            var AMorPM = " AM";
            if (hours >= 12) {
                AMorPM = " PM";
            }

            hours = hours % 12;
            if (hours == 0) {
                hours = 12;
            }

            timeString = hours + ":" + mins + AMorPM;
        } else {
            var time = $("#welcomeTime").val("00:00");
            timeString = "12:00 AM";
        }

        $('#welcomeTimeString').text(timeString);
    });
}