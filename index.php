<?php
    $indexMainCss = 'Asset/css/main.css';
    
    $indexMainJs = 'Asset/js/main.js';
    $indexJs = 'Asset/js/index.js';

    $title = 'HOME';

    include_once('View/Templates/header.php')
  ?>
  <h2>Home</h2>
  <div class="content-primary" id="content"> 
    <nav id="display_column">
      <a href="View/research.php">RESEARCH</a>
      <button id="btn-mode">LIGHT THEME</button> 
      <?php
      if( ! isset($_SESSION['logname'])){
        echo '
        <a href="View/sign_in.php" class="link-connexion">SIGN IN</a>
        <a href="View/log_in.php" class="link-connexion">LOG IN</a>
        ';
      }
      // else{
      //   echo '
      //   <a href="View/list.php" id="link_favories">FAVORIES</a> 
      //   <button id="btn-disconnect">LOG OUT</button>
      //   ';
      // }
      ?>
    </nav>
  </div>
  <!-- footer -->
  <?php
    include_once('View/Templates/footer.php')
  ?>

</body>
</html>