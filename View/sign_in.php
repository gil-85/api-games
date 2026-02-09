<?php
    $mainCss = '../Asset/css/main.css';
    $connexionCss = '../Asset/css/connexion.css';

    $mainJs = '../Asset/js/main.js';
    $cryptoJS = 'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js';
    $profilJs = '../Asset/js/profil.js';
    $signInJs = '../Asset/js/sign_in.js';

    $title = 'SIGN IN';

    include_once('Templates/header.php')
  ?>
  <h2>Sign in</h2>
  <div class="content-primary" id="content" exportparts="multipart/form-data">
    <form action="../index.php" id="display_column">
       <input type="email" placeholder="EMAIL" value="duplissy.gil@gmail.com" autocomplete="email" required>
      <?php  include_once('Templates/form.php')?>
      <input type="password" placeholder="PASSWORD" autocomplete="new-password" value="gilpass" required>
      <input type="password" placeholder="CONFIRM PASSWORD" autocomplete="new-password" value="gilpass" required>

      <input type="submit" value="ENTER">
    </form>
    <div class="a-btn above-footer">
      <p>Already an account : <a href="log_in.php">Log in</a>
      </p>
    </div>
    <p id="p-error_message"></p> 
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