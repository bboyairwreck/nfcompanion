var patientID = localStorage.getItem("patient");

!(function() {
    $(document).ready(function () {
        myFunction();
        populateSettings();
        document.querySelector("#addReminders").addEventListener('toggle', remindersButtonFunction);
        document.querySelector("#addCall").addEventListener('toggle', callButtonFunction);
        document.querySelector("#addSOS").addEventListener('toggle', sosButtonFunction);
        document.querySelector("#addArrows").addEventListener('toggle', scrollingArrowsFunction);
    });
    function myFunction() {
        $('h1').text("Settings");

        $("#welcomeTime").change(function () {

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
                $("#welcomeTime").val("00:00");
                timeString = "12:00 AM";
            }

            $('#welcomeTimeString').text(timeString);
        });

        $("select.optionClass").change(function() {
            var selected = $(this).children(":selected").text();
            $(this).prev().children(":first").text(selected);
            //var columnName = $(this).parent().prev().text();
            var columnName;
            if (selected == "Calendar") {
                columnName = "CalendarLayout";
                selected = 1;
                updateSettings("ListLayout", 0, false);
            } else if (selected == "List") {
                columnName = "ListLayout";
                selected = 1;
                updateSettings("CalendarLayout", 0, false);
            } else if (selected == "Keyboard") {
                columnName = "KeyboardInput";
                selected = 1;
                updateSettings("HandwritingInput", 0, false);
            } else if (selected == "Handwriting") {
                columnName = "HandwritingInput";
                selected = 1;
                updateSettings("KeyboardInput", 0, false);
            } else if (selected == "Medium") {
                columnName = "TextSize";
                selected = 0;
            } else if (selected == "Large") {
                columnName = "TextSize";
                selected = 1;
            } else if (selected == "X-Large") {
                columnName = "TextSize";
                selected = 2;
            }
            updateSettings(columnName, selected, true);
        });
    }

    function populateSettings() {
        var url = "http://ericchee.com/neverforgotten/getSettings_Patient.php";

        $.ajax(url, {
            dataType: "json",
            data: {
                'n': patientID
            },
            success: populateSuccess,
            error: ajaxError
        });
    }

    function populateSuccess(data) {
        // populate layout settings
        var layout = data["Layout"];
        $("#selectView").val(layout);
        //var selected = $("#selectView").children(":selected").text();
        $("#selectView").prev().children(":first").text(layout);

        // populate text size
        var sizeNum = data["TextSize"];
        $("#selectTextSize").val(sizeNum);
        var size = $("#selectTextSize").children(":selected").text();
        $("#selectTextSize").prev().children(":first").text(size);

        // populate input
        var input = data["Input"];
        $("#selectInput").val(input);
        //var inputText = $("#selectInput").children(":selected").text();
        $("#selectInput").prev().children(":first").text(input);

        // populate toggle settings
        if (data["CreateReminderButton"] == 1) {
            $("#addReminders").addClass('active');
        }
        if (data["CallButton"] == 1) {
            $("#addCall").addClass('active');
        }
        if (data["ScrollingArrows"] == 1) {
            $("#addArrows").addClass('active');
        }
    }

    function remindersButtonFunction() {
        if ($("#addReminders").hasClass('active')) {
            updateSettings('CreateReminderButton', 1, true);
        } else {
            updateSettings('CreateReminderButton', 0, true);
        }
    }

    function callButtonFunction() {
        if ($("#addCall").hasClass('active')) {
            updateSettings('CallButton', 1, true);
        } else {
            updateSettings('CallButton', 0, true);
        }
    }

    function sosButtonFunction() {
        if ($("#addSOS").hasClass('active')) {
            updateSettings('CreateReminderButton', 1, true);
        } else {
            updateSettings('CreateReminderButton', 0, true);
        }
    }

    function scrollingArrowsFunction() {
        if ($("#addArrows").hasClass('active')) {
            updateSettings('ScrollingArrows', 1, true);
        } else {
            updateSettings('ScrollingArrows', 0, true);
        }
    }

    function updateSettings(columnName, value, shouldFirebase) {
        var url = "http://ericchee.com/neverforgotten/updatePatientSettings.php";

        $.ajax(url, {
            dataType: "json",
            data: {
                'n': patientID,
                'col': columnName,
                'val': value
            },
            success : function(data){
                updateSuccess(data);

                if (shouldFirebase){
                    firebaseSettings(columnName, value);
                }
            },
            error : ajaxError
        });
    }

    function updateSuccess(data) {
        if (data["message"] == "success") {
            //alert("Settings updated!");
        } else {
            alert("Error: Settings was NOT updated");
        }
    }

    function ajaxError(xhr, status, errorThrown) {
        alert(errorThrown);
        console.log("Error: " + errorThrown);
        console.log("Status: " + status);
        console.dir(xhr);
    }

    function firebaseSettings(columnName, value) {
        var fire = new Firebase('https://neverforgotten.firebaseio.com/');

        // Get patient data
        var patID =  localStorage.getItem("patient");
        var patientFire = fire.child(patID + "/" + columnName);

        //var jsonData = {};
        //jsonData[key] = value;
        patientFire.set(value);
    }

}());
