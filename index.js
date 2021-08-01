
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


    let li = $("#"+jsonData['device_name']);
    if (li.length){
        li.children('#device_name').textContent = jsonData['device_name']
        li.children('#app').textContent = jsonData['app']
        li.children('#last_data').textContent = jsonData['time']
    }
    else {
        let HTMLData = "<h1 id='device_name'>" + jsonData['device_name'] + "</h1>";
        HTMLData += "<h2 id='app'>" + data['app'] + "</h2>";
        HTMLData += "<h3 id='last_data'>Last Data : " + jsonData['time'] + "</h3>";
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
}

function draw() {
    write();
}