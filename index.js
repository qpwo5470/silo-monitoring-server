
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

    let HTMLData = "<h1 id='device_name'>" + jsonData['device_name'] + "</h1>";
    HTMLData += "<h2 id='app'>" + data['app'] + "</h2>";
    HTMLData += "<h3 id='last_data'>Last Data : " + jsonData['time'] + "</h3>";

    let li = $("#"+jsonData['device_name']);
    if (li.length){
        $("#"+jsonData['device_name']).innerHTML = HTMLData;
        print(HTMLData);
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

function setup() {
    createCanvas(10, 10);
    frameRate(1)
}

function draw() {
    write();
}