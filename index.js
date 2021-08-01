
function loadSQL() {
    let dataObj = {};
    $.ajax({
        type: 'POST',
        url: 'monitor.php',
        data: dataObj,
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

    let HTMLData = "<h1>" + jsonData['device_name'] + "</h1>";
    HTMLData += "<h2>" + data['app'] + "</h2>";
    HTMLData += "<h3>Last Data : " + jsonData['time'] + "</h3>";

    let li = $("#"+jsonData['device_name']);
    if (li.length){
        li.value = HTMLData;
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
    let devices = document.getElementById("devices");
}

function draw() {
    write();
}