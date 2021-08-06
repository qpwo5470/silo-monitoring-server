<?php
$device = $_POST['device_name'];

date_default_timezone_set("Asia/Seoul");

$time = time();


$conn = mysqli_connect(
    'localhost',
    'silo',
    'silo',
    'device_state');


$datetime = date('Y-m-d H:i:s', $time);
$prepend = "[{$datetime}]\tREBOOT\n";

$file = './logs/' . $device . '_log.txt';
$fileContents = file_get_contents($file);
file_put_contents($file, $prepend . $fileContents);


$sql = "UPDATE states SET reboot = 1 WHERE device_name = '$device'";

mysqli_query($conn, $sql);
mysqli_close($conn);