document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady(){
    $("h1").text("jQuery Works!");
}

function bar() {
    console.log("Hello");
}