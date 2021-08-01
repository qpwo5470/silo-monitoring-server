
function loadSQL() {
    let dataObj = {};
    $.ajax({
        type: 'POST',
        url: 'monitor.php',
        data: dataObj,
        success: function (result) {
            response = result.replace(/\\/g, '').split('\n');
        },
        error: function () {
        }
    }).done(function () {
    });
}

let response = '';

function write() {
    loadSQL();
    document.getElementById("p1").innerHTML = response;
    for(let line in response) {
        data = JSON.parse(line)
        print(data['device_name'])
    }
}

function setup() {
    createCanvas(10, 10);
}

function draw() {
    write();
}