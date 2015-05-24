var patientID = localStorage.getItem("patient");
var companionID = localStorage.getItem("companion");

$(document).ready(function() {
    myFunction();
    alert(patientID);
    alert(companionID);
    document.querySelector("#addReminders").addEventListener('toggle', remindersButtonFunction);
    document.querySelector("#addCall").addEventListener('toggle', callButtonFunction);
    document.querySelector("#addSOS").addEventListener('toggle', sosButtonFunction);
});

function myFunction() {
    $('h1').text("Settings");

    var i = 0;

    $("#welcomeTime").change(function() {

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

    $("select.optionClass").change(function() {
        var selected = $(this).children(":selected").text();
        $(this).prev().children(":first").text(selected);
        var columnName = $(this).parent().prev().text();
        //updateSettings(patientID, columnName, selected);
    });
}

function remindersButtonFunction() {
    //var patientID = localStorage.getItem("patient");
    //alert(patientID);
    if ($("#addReminders").hasClass('active')) {
        updateSettings(patientID, 'CreateReminderButton', 1);
    } else {
        updateSettings(patientID, 'CreateReminderButton', 0);
    }
}

function callButtonFunction() {
    //var patientID = localStorage.getItem("patient");
    //alert(patientID);
    if ($("#addCall").hasClass('active')) {
        updateSettings(patientID, 'CallButton', 1);
    } else {
        updateSettings(patientID, 'CallButton', 0);
    }
}

function sosButtonFunction() {
    var patientID = localStorage.getItem("patient");
    if ($("#addSOS").hasClass('active')) {
        updateSettings(patientID, 'CreateReminderButton', 1);
    } else {
        updateSettings(patientID, 'CreateReminderButton', 0);
    }
}

function updateSettings(patient, columnName, value) {
    var url = "http://ericchee.com/neverforgotten/updatePatientSettings.php";

    $.ajax(url, {
        dataType : "json",
        data : {
            'n' : patient,
            'col' : columnName,
            'val' : value
        },
        success : ajaxSuccess,
        error : ajaxError
    });
}

function ajaxSuccess(data) {
    if (data["message"] == "success") {
        alert("Settings updated!");
    } else {
        alert("Error: Settings was NOT updated");
    }

}

function ajaxError( xhr, status, errorThrown ) {
    alert(errorThrown);
    console.log( "Error: " + errorThrown );
    console.log( "Status: " + status );
    console.dir( xhr );
}