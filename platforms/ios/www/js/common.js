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