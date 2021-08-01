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


$sql = "SELECT * FROM states WHERE device_name = $device";

$exists = mysqli_query($conn, $sql);
if (mysqli_fetch_array($exists)) {
    $sql = "UPDATE status SET data = '$data' WHERE device_name = '$device'";
}
else {
    $sql = "INSERT INTO states(device_name, data) VALUES ('$device', '$data')";
}
mysqli_query($conn, $sql);
mysqli_close($conn);

$file = './logs/' . $device . '_log.txt';
$fileContents = file_get_contents($file);
file_put_contents($file, $prepend . $fileContents);