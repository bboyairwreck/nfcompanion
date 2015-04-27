var personID = 46;

$(document).ready(function() {


    $("#doneCreateReminder").click(function() {
        var name = $("input[name='reminderTitle']").val();
        var date = $("input[name='reminderDate']").val();
        var time = $("input[name='reminderDateTime']").val();
        var datetime = date + " " + time;
        var reminder = $("input[name='reminderType']").val();
        var reminderArr = reminder.split(" ");
        var num = reminderArr[0];
        var type = reminderArr[1];
        var url = "http://ericchee.com/neverforgotten/addEventReminder.php";

        $.ajax(url, {
            dataType : "json",
            data : {
                'name': name,
                'time': datetime,
                'num': num,
                'type': type,
                'id' : personID
            },
            success : ajaxSuccess,
            error : ajaxError
        });
    });
});



function ajaxSuccess(data) {
    alert(data["message"]);
}

function ajaxError( xhr, status, errorThrown ) {
    alert(errorThrown);
    console.log( "Error: " + errorThrown );
    console.log( "Status: " + status );
    console.dir( xhr );
}