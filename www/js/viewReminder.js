$(document).ready(function() {
    var myParams = getParams();

    var eventID = myParams["eventID"];
    $(".reminder-title").text("EventID " + eventID);
});