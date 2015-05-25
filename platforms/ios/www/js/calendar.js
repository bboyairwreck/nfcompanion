var patientID = localStorage.getItem("patient");

$(document).ready(function() {
    // setup calendar for current month
    var today = new Date();
    calendar(today.getMonth() + 1, today.getFullYear());
});

function calendar(month, year) {
    var mm = month;
    if (month < 10) {
        mm = "0" + month;
    }
    $("#cal tr:not(.calHeader)").remove();
    var monthYear = year + "-" + mm;
    var first = monthYear + "-01";
    var firstDay = new Date(first);
    var dayNum = firstDay.getDay() + 1;
    var $weekNum = 0;
    var $dateNum = 1;
    var $daysInMonth = daysInMonth(mm, year);
    while ($dateNum <= $daysInMonth) {
        $weekNum++;
        var $tr = $("<tr>");
        $tr.addClass("week" + $weekNum);
        $("#cal").append($tr);
        // add dates
        for (var i = 0; i < 7; i++) {
            if ($dateNum > $daysInMonth || dayNum > 0) {
                $("tr.week" + $weekNum).append("<td class='notMonth'></td>");
                dayNum--;
                $dateNum--;
            } else {
                var $dateString = monthYear;
                if ($dateNum < 10) {
                    $dateString = $dateString + "-0" + $dateNum;
                } else {
                    $dateString = $dateString + "-" + $dateNum;
                }
                var $td = $("<td>");
                $td.attr('data-date', $dateString);
                $td.text($dateNum);
                $("tr.week" + $weekNum).append($td);
            }
            $dateNum++;
        }
    }

    // updates the calendar Title with month year
    var monthString = getMonthString(month);
    var calTitle = monthString + " " + year;
    $("#monthYear").html("<a class='navigate-left'></a>"+calTitle+"<a class='navigate-right'></a>");

    // adds class hasEvent
    setupCalendar(monthYear);

    // get today's date
    var today = new Date();
    var todayDay = today.getDate();
    var todayMonth = today.getMonth() + 1;
    var todayYear = today.getFullYear();
    if (todayDay < 10) {
        todayDay = "0" + todayDay;
    }
    if (todayMonth < 10) {
        todayMonth = "0" + todayMonth;
    }

    // adds the selected class and id=today for current date and returns reminders
    var todayDate = todayYear + "-" + todayMonth + "-" + todayDay;
    $("td[data-date='" + todayDate + "']").attr('id', 'today');
    $("td[data-date='" + todayDate + "']").addClass("selected");
    if (mm == todayMonth) {
        $("#monDay").html(getMonthString(month) + " " + today.getDate());
        getEvents(todayDate);
    }

    // navigation
    $("a.navigate-left").click(function() {
        $("#taskTable").empty();
        var $noTask = "<tr><td class='noTask'>No Events</td></tr>";
        $("#taskTable").prepend($noTask);
        if (month == 1) {
            month = 12;
            year = year - 1;
        } else {
            month = month - 1;
        }
        calendar(month, year);
    });
    $("a.navigate-right").click(function() {
        $("#taskTable").empty();
        var $noTask = "<tr><td class='noTask'>No Events</td></tr>";
        $("#taskTable").prepend($noTask);
        if (month == 12) {
            month = 1;
            year = year + 1;
        } else {
            month = month + 1;
        }
        calendar(month, year);
    });

    // date cell click function
    $("#cal td").on("touchstart", function() {
        $("td.selected").removeClass("selected");
        $(this).addClass("selected");
        var day = $(this).text();
        var monthStr = getMonthString(month);
        $("#monDay").html(monthStr + " " + day);
        var date = parseInt(day);
        if (date < 10) {
            date = "0" + date;
        }
        var currDate = monthYear + "-" + date;
        getEvents(currDate);
    });
}

function setupCalendar(monthYear) {
    var url = "http://ericchee.com/neverforgotten/getEventTime_Month.php";
    $.ajax(url, {
        dataType : "json",
        data : {
            'n' : patientID,
            'date' : monthYear
        },
        success : setupCalendarSuccess,
        error : ajaxError
    });
}

function setupCalendarSuccess(data) {
    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            var $date = data[i]["EventTime"];
            var $dateCell = $("td[data-date='" + $date + "']");
            $dateCell.addClass("hasEvent");
        }
    }
}

function getEvents(checkDate) {
    var url = "http://ericchee.com/neverforgotten/getEvents_Day.php";
    $.ajax(url, {
        dataType : "json",
        data : {
            'n' : patientID,
            'date' : checkDate
        },
        success : getEventsSuccess,
        error : ajaxError
    });
}

function getEventsSuccess(data) {
    $("#taskTable").empty();
    if (data.length > 0) {
        for (var i = 0; i < data.length; i++){
            var $newTask = $("#taskTemplate .taskCard").clone();
            var taskName = data[i]["EventTitle"];
            var taskDateTime = data[i]["EventTime"];
            var taskDateTimeArr = datetimeFormat(taskDateTime);
            var taskTime = taskDateTimeArr["time"];
            var taskTimeFormatted = timeFormat(taskTime);
            $time = $newTask.find(".taskTime");
            $time.text(taskTimeFormatted);
            $name = $newTask.find(".taskName");
            $name.html(taskName);
            $("#taskTable").prepend($newTask);
        }
    } else {
        var $noTask = "<tr><td class='noTask'>No Events</td></tr>";
        $("#taskTable").prepend($noTask);
    }
}




