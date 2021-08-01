<?php
$device = $_POST['device_name'];
$data = $_POST['data'];

date_default_timezone_set("Asia/Seoul");

$time = time();


$conn = mysqli_connect(
    'localhost',
    'silo',
    'silo',
    'device_state');


$datetime = date('Y-m-d H:i:s', $time);
$prepend = "[{$datetime}]\t";
$json = json_decode($data, true);
foreach ($json as $key => $value) {
    $append = strtoupper($key) . " : " . $value . "\t";
    $prepend = $prepend . $append;
}
$prepend = $prepend . "\n";


$sql = "SELECT * FROM states WHERE device_name = '$device'";

$exists = mysqli_query($conn, $sql);
if (count(mysqli_fetch_row($exists))) {
    $test = json_encode(array('testmsg'=>'NW'));;
    $sql = "UPDATE states SET data = '$test', time = '$datetime' WHERE device_name = '$device'";
}
else {
    $test = json_encode(array('testmsg'=>'SW'));;
    $sql = "INSERT INTO states(device_name, data) VALUES ('$device', '$test')";
}
mysqli_query($conn, $sql);
mysqli_close($conn);

$file = './logs/' . $device . '_log.txt';
$fileContents = file_get_contents($file);
file_put_contents($file, $prepend . $fileContents);