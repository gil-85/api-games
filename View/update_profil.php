<?php
    $mainCss = '../Asset/css/main.css';
    $connexionCss = '../Asset/css/connexion.css';

    $mainJs = '../Asset/js/main.js';
    $cryptoJS = 'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js';
    $profilJs = '../Asset/js/profil.js';
    $updateProfilJs = '../Asset/js/update_profil.js';

    $title = 'Update profil';

    include_once('Templates/header.php')
  ?>
  <div class="content-primary" id="content" enctype="multipart/form-data">
    <h2>Update profil</h2>
    <form action="../index.php" class="display_column">
     
      <?php  include_once('Templates/form.php')?>


    <input type="submit" value="ENTER">
    </form>


    <!-- to remove /////////////////////////////////////////-->
    <div class="a-btn above-footer">
      <p>Already an account : <a href="log_in.php">Log in</a>
      </p>
    </div>
       <!-- //////////////////////////////////////-->
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