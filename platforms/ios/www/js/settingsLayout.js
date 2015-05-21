$(document).ready(function() {
    $("#calOption").click(function() {
        $("#calOption").html("Calendar View<span class='badge'><span class='icon icon-check'></span></span>");
        $("#listOption").html("List View");
    });

    $("#listOption").click(function() {
        $("#listOption").html("List View<span class='badge'><span class='icon icon-check'></span></span>");
        $("#calOption").html("Calendar View");
    });
});