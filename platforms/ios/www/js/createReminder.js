var personID = localStorage.getItem("personCompanion"); // Person ID of Companion - Eric
var patientID = localStorage.getItem("patient");        // Patient ID of related Patient - Margie

$(document).ready(function() {

    $("select.selectRepeat").change(function() {
        var remNot = $("select.selectNot option:selected").text();
        $(".notifications").text(remNot);
        var repeat = $("select.repeat option:selected").text();
        $(".repeatText").text(repeat);
    });

    $("#doneCreateReminder").click(function() {
        var name = $("input[name='reminderTitle']").val();
        var date = $("input[name='reminderDate']").val();
        var time = $("input[name='reminderDateTime']").val();
        var datetime = date + " " + time;
        var reminder = $(".notifications").text();
        var reminderArr = reminder.split(" ");
        var num = reminderArr[0];
        var type = reminderArr[1];
        var url = "http://ericchee.com/neverforgotten/addEventReminder.php";

        //alert(name + " " + datetime + " " + num + " " + type);
        $.ajax(url, {
            dataType : "json",
            data : {
                'name': name,
                'time': datetime,
                'num': num,
                'type': type,
                'id' : personID,
                'patID' : patientID
            },
            success : createSuccess,
            error : ajaxError
        });
    });
});


function createSuccess(data) {
    if (data["message"] == "success") {
        alert("Reminder was created!");
    } else {
        alert("Error: Reminder was NOT created");
    }

}