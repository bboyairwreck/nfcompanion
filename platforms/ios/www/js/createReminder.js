//var personID = 43; // Person ID of Companion - Eric
//var patientID = 17;

!(function() {
    $(document).ready(function() {
        var personID = localStorage.getItem("personCompanion");
        var patientID = localStorage.getItem("patient");

        // set current time and date - value and span text
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();

        var monthName = getMonthString(mm);
        var day = dd;

        var todayString = monthName + " " + day + ", " + yyyy;
        alert(todayString);

        $("#remDateString").text(todayString);

        if (dd < 10) {
            dd = "0" + dd;
        }
        if (mm < 10) {
            mm = "0" + mm;
        }
        var curDate = yyyy + "-" + mm + "-" + dd;
        alert(curDate);

        $("#remDate").val(curDate);

        var hour = today.getHours();
        var min = today.getMinutes();
        var amPM = "AM";

        if (min < 10) {
            min = "0" + min;
        }
        if (hour > 12) {
            hour = hour % 12;
            amPM = "PM";
        }

        var timeString = hour + ":" + min + " " + amPM;
        $("#remTimeString").text(timeString);

        if (hour < 10) {
            hour = "0" + hour;
        }

        var curTime = hour + ":" + min;
        $("#remTime").val(curTime);

        updateSpan();

        //$("select.selectRepeat").change(function() {
        //    var remNot = $("select.selectNot option:selected").text();
        //    $(".notifications").text(remNot);
        //    var repeat = $("select.repeat option:selected").text();
        //    $(".repeatText").text(repeat);
        //});

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

            alert(name + " " + datetime + " " + num + " " + type);
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
                success : ajaxSuccess,
                error : ajaxError
            });
        });
    });

    function updateSpan() {
        $("#remTime").change(function () {

            var time = $("#remTime").val();

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
                $("#remTime").val("00:00");
                timeString = "12:00 AM";
            }

            $('#remTimeString').text(timeString);
        });

        $("#remDate").change(function() {
            var date = $("#remDate").val();

            if (date) {
                var dateArr = date.split("-");

                var year = dateArr[0];
                var month = dateArr[1];
                var day = dateArr[2];

                if (month.charAt(0) == "0") {
                    month = month.charAt(1);
                }

                if (day.charAt(0) == "0") {
                    day = day.charAt(1);
                }

                var monthString = getMonthString(month);
            }

            var dateString = monthString + " " + day + ", " + year;
            $("#remDateString").text(dateString);

            //var date = $("#remDate").val();
            //alert(date);
        });

        $("select.optionClass").change(function() {
            var selected = $(this).children(":selected").text();
            $(this).prev().children(":first").text(selected);
        });
    }

    function ajaxSuccess(data) {
        if (data["message"] == "success") {
            alert("Reminder was created!");
        } else {
            alert("Error: Reminder was NOT created");
        }

    }

    function ajaxError( xhr, status, errorThrown ) {
        alert(errorThrown);
        console.log( "Error: " + errorThrown );
        console.log( "Status: " + status );
        console.dir( xhr );
    }
}());


