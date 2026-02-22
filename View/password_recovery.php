<?php
$mainCss = '../Asset/css/main.css';
$connexionCss = '../Asset/css/connexion.css';

$passwordRecoveryJs = '../Asset/js/password_recovery.js';
$mainJs = '../Asset/js/main.js';
$cryptoJS = 'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js';


$title = 'PASSWORD RECOVERY';

include_once('Templates/header.php');

if ( ! isset($_SESSION['sent_code']) || ! isset($_POST['typed_code'])) {
  header("Location: ../index.php");
  exit();
}

if ($_POST['typed_code'] != $_SESSION['sent_code']) {
  header("Location: ../index.php");
  exit();
}

  unset($_SESSION['sent_code']);   


 
  echo '<span id="spn-email">'. $_POST['email'] . '</span>';
 
 
?>
  <h2>Password recovery</h2>
  <div class="content-primary" id="content">
    <form action="../index.php" class="display_column">
      <input type="password" placeholder="NEW PASSWORD" autocomplete="new_password" id="new_password" required>
      <input type="password" placeholder="CONFIRM NEW PASSWORD" autocomplete="new_password" id="confirm_new_password" required>
      <input type="submit" value="ENTER">
    </form>
    <p id="p-error_message"></p>
  </div>
  <!-- footer -->
  <?php
    include_once('Templates/footer.php')
  ?>
</body>
</html>