var patientID = 17;

$(document).ready(function() {

    var url = "http://ericchee.com/neverforgotten/getEvents_Patient.php";

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
    //alert(data[0]["EventTitle"]);

    for (var i = 0; i < 3; i++){
        var $newCard = $("#taskTemplate .reminderCard").clone();

        var evTitle = "EventTitle";
        var evTime = "00:00 PM";

        // inject any thing inside of $newTask;
        $eventTitle = $newCard.find(".eventTitle");
        $eventTitle.text("whatever the fuck i want");


        $("#reminderList").prepend($newCard);
    }

}

function ajaxError( xhr, status, errorThrown ) {
    alert( "Sorry, there was a problem!" );
    console.log( "Error: " + errorThrown );
    console.log( "Status: " + status );
    console.dir( xhr );
}