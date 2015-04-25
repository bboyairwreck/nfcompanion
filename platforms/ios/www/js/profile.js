/**
 * Created by wendykung on 4/25/15.
 */
$(document).ready(function() {
    // grab local variable - personID to get companionID (22)
    //$id = localStorage.getItem("user_personID");

    $.ajax({
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: "http://ericchee.com/neverforgotten/relatedCompanions.php",
        data: { n: 22 },
        dataType : "json",
        success : ajaxSuccess,
        error : ajaxError
    });
});

function ajaxSuccess(data) {
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
    }
}

function ajaxError( xhr, status, errorThrown ) {
    alert( "Sorry, there was an ajax problem!" );
    console.log( "Error: " + errorThrown );
    console.log( "Status: " + status );
    console.dir( xhr );
}