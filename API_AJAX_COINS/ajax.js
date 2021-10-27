(function(){
 doRequest()
})()

function doRequest(){
const xhttp = new XMLHttpRequest();

//xhttp onload
//open
//send

xhttp.onload = function (data) {
    console.log(data)
}

xhttp.open("GET","/coins")

xhttp.send()

}