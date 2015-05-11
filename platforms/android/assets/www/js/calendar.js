$(document).ready(function() {
    var today = new Date();
    var dd = today.getDate() + 1;
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = "0" + dd;
    }
    if (mm < 10) {
        mm = "0" + mm;
    }

    var todayDate = yyyy + "-" + mm + "-" + dd;
    getEvents(todayDate);

    var monthString = getMonthString(mm);
    var calTitle = monthString + " " + yyyy;
    $("#monthYear").text(calTitle);

    $("#cal td").click(function() {
        $("td.selected").removeClass("selected");
        $(this).addClass("selected");

        var monthYear = $("#monthYear").text();
        var monYrArr = monthYear.split(" ");
        var month = getMonthNum(monYrArr[0]);
        var day = $(this).text();
        if (parseInt(day) < 10) {
            day = "0" + day;
        }
        var year = monYrArr[1];
        var date = year + "-" + month + "-" + day;

        getEvents(date);
    });
});

function getEvents(checkDate) {
    var url = "http://ericchee.com/neverforgotten/getEvents_Day.php";
    $.ajax(url, {
        dataType : "json",
        data : {
            'n' : checkDate
        },
        success : ajaxSuccess,
        error : ajaxError
    });
}

function ajaxSuccess(data) {
    $("#taskTable").empty();
    if (data.length > 0) {
        for (var i = 0; i < data.length; i++){
            var $newTask = $("#taskTemplate .taskCard").clone();

            var taskName = data[i]["EventTitle"];
            var taskDateTime = data[i]["EventTime"];
            var taskDateTimeArr = datetimeFormat(taskDateTime);
            //var taskDate = taskDateTimeArr["date"];
            //var taskDateFormatted = dateFormat(taskDate);

            var taskTime = taskDateTimeArr["time"];
            var taskTimeFormatted = timeFormat(taskTime);

            // inject any thing inside of $newTask;
            $time = $newTask.find(".taskTime");
            $time.text(taskTimeFormatted);

            $name = $newTask.find(".taskName");
            $name.text(taskName);
            //  dateFormatArr["dayName"] + dateFormatArr["monthName"]

            $("#taskTable").prepend($newTask);
        }
    } else {
        var $noTask = "<tr><td class='noTask'>No Events Today</td></tr>";
        $("#taskTable").prepend($noTask);
    }

}


function ajaxError( xhr, status, errorThrown ) {
    alert( "Sorry, there was Ajax problem!" );
    console.log( "Error: " + errorThrown );
    console.log( "Status: " + status );
    console.dir( xhr );
}





//var dateObj = new Date("2015-04-24 9:00:00");
//
//dateObj.getMonth();




