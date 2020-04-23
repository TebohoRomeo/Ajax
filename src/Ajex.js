function start() {
    var xmlhttp;
    if (window.XMLHttpRequest) {
    
        xmlhttp = new XMLHttpRequest(); //creationg an XMLHttpRequest object
        
        console.log("I've started.")    //test purposes
        
        xmlhttp.open("POST","/addNewVisitor",true);    //"Instantiating the object"

        xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8"); //"Setting the body"
        
        var visitorName = document.getElementById('visitorName')
        var assistentName = document.getElementById('assistentName')
        var visitorAge = document.getElementById('visitorAge')
        var visitDate = document.getElementById('visitDate')
        var visitTime = document.getElementById('visitTime')
        var comments = document.getElementById('comments')


        xmlhttp.send(`visitorName=${visitorName.value}&assistentName=${assistentName.value}&visitorAge=${visitorAge.value}&visitDate=${visitDate.value}&visitTime=${visitTime.value}&comments=${comments.value}`);    //"Sending the XMLHttpRequest"
    
    } else {
        xmlhttp = false;
        console.log("I couldn't start.")    //test purposes
    }
}

window.addEventListener("load", function() {
    var btn = document.getElementById("SumitButton");
    btn.addEventListener("click", start);
});