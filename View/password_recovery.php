<?php





$mainCss = '../Asset/css/main.css';
$connexionCss = '../Asset/css/connexion.css';

$mainJs = '../Asset/js/main.js';
$cryptoJS = 'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js';
$passwordRecovery = '../Asset/js/password_recovery.js';

$title = 'PASSWORD RECOVERY';


include_once('Templates/header.php');

if ( ! isset($_SESSION['allow_recovery'])) {

  header("Location: ../index.php");
  exit();
}
unset($_SESSION['allow_recovery']);

?>
  <h2>Log in</h2>
  <div class="content-primary" id="content">
    <form action="../index.php" id="display_column">
      <input type="password" placeholder="NEW PASSWORD" autocomplete="new_password" required>
      <input type="password" placeholder="CONFIRM NEW PASSWORD" autocomplete="new_password" required>
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