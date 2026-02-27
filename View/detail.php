<?php
  $mainCss = '../Asset/css/main.css';
  $detailCss = '../Asset/css/detail.css';
  $mainJs = '../Asset/js/main.js';
  $detailJs = '../Asset/js/detail.js';
  $title = 'DETAIL';
  
  include_once('Templates/header.php')
  ?>
  <div id="loading">LOADING</div>
  <h2></h2>
  <div class="content-primary" id="content">
  </div>
  <div class="a-btn">
    <button id="btn-load_more">More content</button>
  </div>
  <div id="content-screenshots"></div>
  <div class="a-btn ghost">
    <button id="btn-more_screenshots">More screenshots</button>
  </div>
  <div id="content-movies"></div>
  <div id="content-series"></div>
  <div class="a-btn ghost">
    <button id="btn-more_series">More series</button>
  </div>
  <div id="content-dlc"></div>
  <div class="a-btn ghost">
    <button id="btn-more_dlc">More dlc</button>
  </div>
  <div class="a-btn above-footer ninja">
    <button id="btn-load_series-dlc">From the same serie and additions</button>
  </div>
  <!-- footer -->
  <?php
    include_once('Templates/footer.php')
  ?>
</body>
</html>