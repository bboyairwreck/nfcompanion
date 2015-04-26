var patientID = 17;

$(document).ready(function() {
});

$("#doneCreateReminder").click(function() {
    var url = "http://ericchee.com/neverforgotten/addEventReminder.php";

    $.ajax(url, {
        dataType : "json",
        data : {
            'n' : patientID
        },
        success : ajaxSuccess,
        error : ajaxError
    });
});

function ajaxSuccess(data) {

    alert("Created Reminder");

}

function ajaxError( xhr, status, errorThrown ) {
    alert( "Might've created a reminder...." );
    console.log( "Error: " + errorThrown );
    console.log( "Status: " + status );
    console.dir( xhr );
}