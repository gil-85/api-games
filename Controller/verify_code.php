<?php
session_start();

if ($_POST['typed_code'] == $_SESSION['send_code']) {
    $_SESSION['allow_code'] = true;
    header("Location: ../index.php");
    exit();
} else {
    echo "Invalid code";
}

