<?php
    $mainCss = '../Asset/css/main.css';
    $connexionCss = '../Asset/css/connexion.css';

    $mainJs = '../Asset/js/main.js';
    $cryptoJS = 'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js';
    $logInJs = '../Asset/js/log_in.js';

    $title = 'LOG IN';

    include_once('Templates/header.php')
  ?>
  <h2>Log in</h2>
  <div class="content-primary" id="content">
    <form action="../index.php" class="display_column" id="form_credentials">
      
    <input type="text" placeholder="EMAIL OR LOGNAME" autocomplete="email" id="email_logname" required>
      <input type="password" placeholder="PASSWORD" autocomplete="current-password" required>
      <input type="submit" value="ENTER">
      <!-- <button type="button" id="btn-forgot_password">FORGOT PASSWORD</button> -->
      <button type="button" id="btn-forgot_password" data-text="FORGOT PASSWORD">
        FORGOT PASSWORD
      </button>
        
    </form>

     <!---->
    <form action="" class="display_column" id="form_email_to_code">
      <input type="text" placeholder="ENTER YOUR EMAIL TO RECEIVE A CODE" autocomplete="email" id="email" required>
      <input type="submit" value="ENTER">
    </form>
    <!---->

    <!---->
    <form action="password_recovery.php" method="POST" class="display_column" id="form_code">
      <!-- TO GET THE EMAIL FROM THE FORM ABOV E-->
      <input type="hidden" name="email" id="hidden_email">
      <!---->
      <input type="number" placeholder="CHECK YOUR EMAIL AND ENTER THE CODE" name="typed_code">
      <button type="submit" id="btn-test_code">VERIFY</button>
    </form>
    <!---->
  

   
    <div class="a-btn above-footer">
      <p>No account yet : <a href="sign_in.php">Sign in</a>
      </p>
    </div>
    <p id="p-error_message"></p>
  </div>
  <!-- footer -->
  <?php
    include_once('Templates/footer.php')
  ?>
</body>
</html>