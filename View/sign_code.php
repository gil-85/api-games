<?php
$signCodeJs = '../Asset/js/sign_code.js';

$title = 'NO PAGE';

include_once('Templates/header.php');

  

if ( ! isset($_SESSION['sent_code']) || ! isset($_POST['typed_code'])) {
  header("Location: ../index.php");
  exit();
}

if ($_POST['typed_code'] != $_SESSION['sent_code']) {
   $_SESSION['errorMessage'] = 'Code verification failed';
  header("Location: sign_in.php");
  exit();
}

//unset($_SESSION['sent_code']);   

  echo '<div id= "d-form_info">';
  echo '<br>';echo '<br>';echo '<br>';echo '<br>';echo '<br>';
  echo '<span id="spn-email">'. $_POST['email'] . '</span>';
  echo '<br>';
  echo '<span id="spn-logname">'. $_POST['logname'] . '</span>';
  echo '<br>';
  echo '<span id="spn-avatar">'. $_POST['avatar'] . '</span>';
  echo '<br>';
  echo '<span id="spn-password">'. $_POST['password'] . '</span>';
  echo '</div>';
?>
