var companionID = localStorage.getItem("companion");

$(document).ready(function(){
    $(".icon-bars").on("touchend", function(){
        $("#slideOutMenuWrap").addClass("slideOutMenuAnimOpen");
    });

    $("#exitMenuArea").on("touchend", function(){
        $("#slideOutMenuWrap").removeClass("slideOutMenuAnimOpen");
    });



    if ($("#profList").hasClass("fetchedProfiles") == false) {
        $.ajax({
            crossDomain: true,
            contentType: "application/json; charset=utf-8",
            url: "http://ericchee.com/neverforgotten/relatedCompanions.php",
            data: { n: companionID },
            dataType : "json",
            success : menuSuccess,
            error : ajaxError
        });
    }

    $("#addPatient").on("touchend", function(){             // TODO need an add patient functionality
        alert("TODO: need to create this functionality");
    });

});

function menuSuccess(data) {
    var colors = ["45B372", "4891BF", "E59E3A"];
    var colorIndex = 0;

    for (var i = 0; i < data.length; i++) {
        var $newProfile = $("#profTemp li.profileWrap").clone();
        var $name = $newProfile.find("div.profName");
        var $patientName = data[i]["PatientFName"] + " " + data[i]["PatientLName"];
        var $personID = data[i]["PersonID"];
        var $patientID = data[i]["PatientID"];
        $name.text($patientName);
        $newProfile.attr('data-personID', $personID);
        $newProfile.attr('data-patientID', $patientID);
        $("#profList").prepend($newProfile);

        var $circleProfile = $newProfile.find(".circleProfile");
        $circleProfile.text($patientName.charAt(0));

        $circleProfile.css("background-color", "#" + colors[colorIndex]);
        colorIndex++;
        if (colorIndex > colors.length-1) {
            colorIndex = 0;
        }

        $newProfile.on("touchend", function(){
            $("#slideOutMenuWrap").removeClass("slideOutMenuAnimOpen");
        });
    }

    $("#profList").addClass("fetchedProfiles");
}