
function loadSQL() {
    let dataObj = {};
    $.ajax({
        type: 'POST',
        url: 'monitor.php',
        data: dataObj,
        success: function (result) {
            response = result;
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
}

function setup() {
    createCanvas(10, 10);
}

function draw() {
    write();
}