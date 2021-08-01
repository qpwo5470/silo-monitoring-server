
function loadSQL() {
    $.ajax({
        type: 'GET',
        url: 'monitor.php',
        success: function (result) {
            response = result.split(/\r?\n/);
        },
        error: function () {
        }
    }).done(function () {
    });
}

function appendDevice(jsonData){
    let ul_list = $("#device_list");
    let data = JSON.parse(jsonData['data'].replace(/\\/, ''));

    let HTMLData = "<div><h1 id='device_name'>" + jsonData['device_name'] + "</h1>";
    HTMLData += "<h2 id='app'>" + data['app'] + "</h2>";
    let timePassed = Date.now()-Date.parse(jsonData['time'])
    console.log(Date.now())
    console.log(Date.parse(jsonData['time']))
    console.log('')
    HTMLData += "<h3 id='last_data'>Last Data : " + timePassed.toString() + "</h3></div><div>";

    $.each(data,function(key, value){
        if(key !== 'app'){
            HTMLData += "<h4 id='" + key + "'>" + key.toUpperCase() + " : " + value + "</h4>";
        }
    });
    HTMLData += "</div>";

    let li = $("#"+jsonData['device_name']);
    if (li.length){
        li.html(HTMLData);
    }
    else {
        ul_list.append("<li id=\"" + jsonData['device_name'] + "\">" + HTMLData + "</li>");
    }
}

let response = '';

function write() {
    loadSQL();
    for(let line in response) {
        if(response[line].length>0) {
            let json = JSON.parse(response[line]);
            appendDevice(json);
        }
    }
}

setInterval(write, 1000);