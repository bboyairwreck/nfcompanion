$(document).ready(function() {

    $("#createEvent").click(function(){
        var url = "http://ericchee.com/csaTally/csaTally.php";

        $.ajax(url, {
            dataType : "json",
            success : createSuccess,
            error : createError
        });
    });

});

function createSuccess(data) {
    alert("Event Created!");
}

function createError( xhr, status, errorThrown ) {
    alert( "Sorry, there was a problem!" );
    console.log( "Error: " + errorThrown );
    console.log( "Status: " + status );
    console.dir( xhr );
}