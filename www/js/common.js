// TODO pass in the correct parameters
if (localStorage.getItem("patient") === null) {     // local storage patient id
    localStorage.setItem("patient", 17);
}
if (localStorage.getItem("personPatient") === null) {      // local storage person id of patient
    localStorage.setItem("personPatient", 46);
}
if (localStorage.getItem("personCompanion") === null) {      // local storage person id of companion
    localStorage.setItem("personCompanion", 43);
}
if (localStorage.getItem("companion") === null) {     // local storage companion id
    localStorage.setItem("companion", 22);
}
if (localStorage.getItem("firstName") === null) {
    var urlPatient = "http://ericchee.com/neverforgotten/getPatient.php";
    $.ajax(urlPatient, {
        dataType : "json",
        data : {
            'n' : 17
        },
        success : setName,
        error : setNameError
    });
}

function setName(data) {
    localStorage.setItem("firstName", data["PersonFName"]);
    localStorage.setItem("lastName", data["PersonLName"]);
}

function setNameError( xhr, status, errorThrown ) {
    alert(errorThrown);
    console.log( "Error: " + errorThrown );
    console.log( "Status: " + status );
    console.dir( xhr );
}

function hideKeyboard() {
    document.activeElement.blur();
    $("input").blur();
};

function timeFormat(time) {
    var timeString = "";

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

    return timeString;
}

function datetimeFormat(datetime) {
    var datetimeArr = datetime.trim().split(" ");

    var result = [];
    result["date"] = datetimeArr[0];
    result["time"] = datetimeArr[1];

    return result;
}

var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var dayNames_abbrev = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

function dateFormat(dateString) {

    var dateObj = new Date(dateString);

    var year = dateObj.getFullYear();
    var month = dateObj.getMonth() + 1;
    var day = dateObj.getDate() + 1;
    var dayOfWeek = dateObj.getDay();

    var result = [];
    result["year"] = year;
    result["month"] = month;
    result["monthName"] = monthNames[month-1];
    result["day"] = day;
    result["dayName"] = dayNames[dayOfWeek];
    // dateLine ~ "April 12, 2015"
    result["dateLine"] = monthNames[month-1] + " " + day + ", " + year;

    return result;
}

function getMonthString(monthNum) {
    return monthNames[monthNum - 1];
}

function getMonthNum(monthString) {
    if($.inArray(monthString, monthNames)) {
        var day = monthNames.indexOf(monthString) + 1;
        if (day < 10) {
            return "0" + day.toString();
        } else {
            return day.toString();
        }
    } else {
        return null;
    }
}

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}