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
    <form action="../index.php" class="display_column">
      <input type="text" placeholder="EMAIL OR LOGNAME" autocomplete="email" required>
      <input type="password" placeholder="PASSWORD" autocomplete="current-password" required>
      <input type="submit" value="ENTER">
      <!-- <button type="button" id="btn-forgot_password">FORGOT PASSWORD</button> -->
      <button id="btn-forgot_password" data-text="FORGOT PASSWORD">
        FORGOT PASSWORD
      </button>
         <!-- .-->

      <input type="number" placeholder="TYPE CODE SEND TO YOUR EMAIL ADDRESS" name="typed_code">
      <button type="button" id="btn-test_code">VERIFY</button>
       <!---->
    </form>


  

   
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