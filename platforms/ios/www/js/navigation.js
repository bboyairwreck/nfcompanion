$(document).ready(function() {
    checkPage();
});

window.addEventListener('push', checkPage);
var lastPage = "";

function checkPage() {

    var content = document.getElementsByClassName("content")[0];
    var pageName = content.id;

    if(pageName) {

        var jsFileName = "js/" + pageName + ".js";
        $.getScript(jsFileName)

        .done(function( pageName, textStatus ) {
           console.log( textStatus );
        })

        .fail(function( jqxhr, statusText, errorThrown ) {
            console.log(errorThrown);
            console.log(statusText);
            console.log(jqxhr);
        });

        var cssFileName = "css/" + pageName +".css";
        var fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", cssFileName);

        if (typeof fileref != "undefined") {
            document.getElementsByTagName("head")[0].appendChild(fileref);
        }
    }
}