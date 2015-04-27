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

    for (var i = 0; i < data.length; i++){
        var $newCard = $("#taskTemplate .reminderCard").clone();

        var evTitle = data[i]["EventTitle"];
        var evDatetime = data[i]["EventTime"];
        var evDatetimeArr = datetimeFormat(evDatetime);
        var evDate = evDatetimeArr["date"];


        var evTime = evDatetimeArr["time"];
        var evTimeFormatted = timeFormat(evTime);

        var dateFormatArr = dateFormat(evDate);

        // inject any thing inside of $newTask;
        $eventTitle = $newCard.find(".eventTitle");
        $eventTitle.text(evTitle);

        $eventTime = $newCard.find(".reminderTime");
        $eventTime.text(evTimeFormatted);

        //  dateFormatArr["dayName"] + dateFormatArr["monthName"]


        $("#reminderList").prepend($newCard);
    }

}

function ajaxError( xhr, status, errorThrown ) {
    alert( "Sorry, there was an Ajax problem!" );
    console.log( "Error: " + errorThrown );
    console.log( "Status: " + status );
    console.dir( xhr );
}