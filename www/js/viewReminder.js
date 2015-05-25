$(document).ready(function() {
    var myParams = getParams();

    var eventID = myParams["eventID"];

    var url = "http://ericchee.com/neverforgotten/getReminders_Event.php";
    $.ajax(url, {
        dataType : "json",
        data : {
            'n' : eventID
        },
        success : getRemindersSuccess,
        error : ajaxError
    });
});

function getRemindersSuccess(data) {
    $("#alerts").empty();
    if (data.length > 0) {
        for (var i = 0; i < data.length; i++){
            var $newReminder = $("#alertTemplate .alertCard").clone();

            var eventName = data[i]["EventTitle"];
            var eventDateTime = data[i]["EventTime"];
            var eventDateTimeArr = datetimeFormat(eventDateTime);
            var eventDate  = eventDateTimeArr["date"];
            var eventDateFormatted = dateFormat(eventDate);
            var eventTime = eventDateTimeArr["time"];
            var eventTimeFormatted = timeFormat(eventTime);
            var reminderPerson = data[i]["PersonFName"];
            var reminderNum = data[i]["QuantityNum"];
            var reminderType = data[i]["ReminderType"];
            var reminderTime = reminderNum + " " + reminderType;


            $("div.reminder-title").html(eventName);
            $("#time").text(eventTimeFormatted);
            $("div.day").text(eventDateFormatted["day"]);
            $("div.month").text(eventDateFormatted["monthName"]);
            $newReminder.append(reminderTime + "<span class='light pull-right'>" + reminderPerson + "</span>");
            $("#alerts").prepend($newReminder);
        }
    }
}