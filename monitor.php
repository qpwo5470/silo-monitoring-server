<?php
$conn = mysqli_connect(
    'localhost',
    'silo',
    'silo',
    'device_state');

$sql = "SELECT * FROM states";

$data = mysqli_query($conn, $sql);

while ($datum = mysqli_fetch_array($data)) {
    echo $datum;
}
?>