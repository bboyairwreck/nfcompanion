$(document).ready(function() {
    checkPage();
});

window.addEventListener('push', checkPage);


function checkPage() {

    var content = document.getElementsByClassName("content")[0];
    var script = content.id;

    if(script) {

        $.getScript("js/" + content.id + ".js")

        .done(function( script, textStatus ) {
           console.log( textStatus );
        })

        .fail(function( jqxhr, statusText, errorThrown ) {
            console.log(errorThrown);
            console.log(statusText);
            console.log(jqxhr);
        });
    }

}