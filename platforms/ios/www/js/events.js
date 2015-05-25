$(document).ready(function() {

    $("#createEvent").click(function(){
        var url = "http://ericchee.com/csaTally/csaTally.php";

        $.ajax(url, {
            dataType : "json",
            success : createSuccess,
            error : ajaxError
        });
    });

});

function createSuccess(data) {
    alert("Event Created!");
}