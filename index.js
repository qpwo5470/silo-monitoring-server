
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
function rgb(r, g, b){
    r = Math.floor(r);
    g = Math.floor(g);
    b = Math.floor(b);
    return ["rgb(",r,",",g,",",b,")"].join("");
}

function map(src, srcMin, srcMax, dstMin, dstMax){
    let dst = (src-srcMin)/(srcMax-srcMin)*(dstMax-dstMin)+dstMin;
    return dst;
}

function constrain(src, min, max){
    return Math.max(Math.min(src, max), min);
}

function appendDevice(jsonData){
    let ul_list = $("#device_list");
    let data = JSON.parse(jsonData['data'].replace(/\\/, ''));

    let HTMLData = "<div class='common'><h1 class='device_name'>" + jsonData['device_name'] + "</h1>";
    HTMLData += "<h2 class='app'>" + data['app'] + "</h2>";
    let timePassed = Date.now()-Date.parse(jsonData['time'])
    let days,h,m,s;
    days = Math.floor(timePassed/1000/60/60/24);
    h = Math.floor(timePassed/1000/60/60 - days*24);
    m = Math.floor(timePassed/1000/60 - days*24*60 - h*60);
    s = Math.floor(timePassed/1000 - days*24*60*60 - h*60*60 - m*60);
    let stringTimePassed = "";
    if(days) stringTimePassed += days + "d  ";
    if(h) stringTimePassed += h + "h ";
    if(m) stringTimePassed += m + "min ";
    stringTimePassed += s + "s";

    let temp = map(timePassed, 5000, 120000, 0, 255);
    temp = constrain(temp, 0, 255);
    let color = rgb(temp, 255-temp, 0);

    HTMLData += "<h3 class='last_update' style=\"color:" + color + "\">Last Update : " + stringTimePassed + "</h3></div><div class='uncommon'>";

    $.each(data,function(key, value){
        if(key !== 'app'){
            HTMLData += "<h4 class='" + key + "'>" + key.toUpperCase() + " : " + value + "</h4>";
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