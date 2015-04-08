document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady(){
    alert();
    $("h1").text("jQuery Works!");
}

function bar() {
    console.log("Hello");
}