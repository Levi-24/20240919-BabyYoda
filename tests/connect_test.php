<?php
require '../connect.php';

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
    echo "Connected successfully";
}

if (!$conn->set_charset("utf8")) {
    error_log($conn->error);
    die("Error loading character set utf8");
} else {
    echo "Character set loaded successfully";
}
