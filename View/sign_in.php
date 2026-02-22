<?php
    $mainCss = '../Asset/css/main.css';
    $connexionCss = '../Asset/css/connexion.css';

    $mainJs = '../Asset/js/main.js';
    $cryptoJS = 'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js';
    $profilJs = '../Asset/js/profil.js';
    $signInJs = '../Asset/js/sign_in.js';

    $title = 'SIGN IN';

    $lognameValue = '';
    $avatarValue = '( -_- )';

    if (isset($_SESSION['email'])) {
      $lognameValue = $_SESSION['logname'];
      $avatarValue = $_SESSION['avatar'];
      $avatarValue = preg_replace('/\d.*$/', '', $avatarValue);
    }

    include_once('Templates/header.php');
  ?>
  <h2>Sign in</h2>
  <div class="content-primary" id="content" exportparts="multipart/form-data">
    <form action="" class="display_column" id="form_credentials">
      <input type="email" placeholder="EMAIL" value="" autocomplete="email" required>
      
      <input type="text" placeholder="LOG NAME" autocomplete="logname" maxlength="16" name="logname" value="<?= $lognameValue ?>" required>
      <button type="button" id="avatar">AVATAR<span class="avatarSet"><?=$avatarValue?></span></button>
      
      <input type="password" placeholder="PASSWORD" autocomplete="new-password" value="" required>
      <input type="password" placeholder="CONFIRM PASSWORD" autocomplete="new-password" value="" required>
      
      <input type="submit" value="ENTER">
    
    </form>
    <!---->
    <form action="sign_code.php" method="POST" class="display_column" id="form_code">
      <!-- TO GET THE EMAIL FROM THE FORM ABOVE  need to add the other values-->
      <input type="hidden" name="email" id="hidden_email">
      <input type="hidden" name="logname" id="hidden_logname">
      <input type="hidden" name="avatar" id="hidden_avatar">
      <input type="hidden" name="password" id="hidden_password">
      <!---->
      <input type="number" placeholder="CHECK YOUR EMAIL AND ENTER THE CODE" value="10" name="typed_code">
      <button type="submit" id="btn-test_code">VERIFY</button>

    </form>
    <!---->

    <div class="a-btn above-footer">
      <p>Already an account : <a href="log_in.php">Log in</a>
      </p>
    </div>
   <p id="p-error_message"></p>
<!-- CASE IF THE CODE SENT AND THE TYPED CODE DON'T MATCH -->
    <?php if (isset($_SESSION['errorMessage'])): ?>
    <script>
        document.getElementById("p-error_message").textContent = 
            <?php echo json_encode($_SESSION['errorMessage']); ?>;
    </script>
    <?php unset($_SESSION['errorMessage']); ?>
    <?php endif; ?>
    
  </div>

     

  <?php
    include_once('Templates/avatar_selection.php')
  ?>


  <!-- footer -->
  <?php
    include_once('Templates/footer.php')
  ?>
</body>
</html>