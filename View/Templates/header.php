<?php session_start(); ?>
<!-- Header -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <?php
  $cssFiles = [
      isset($indexMainCss) ? $indexMainCss : null,
      isset($mainCss) ? $mainCss : null,

      isset($listCss) ? $listCss : null,
      isset($detailCss) ? $detailCss : null,
      isset($connexionCss) ? $connexionCss : null,
      isset($researchCss) ? $researchCss : null
   ];

  $jsFiles = [
      isset($cryptoJS) ? $cryptoJS: null,
     
      isset($indexMainJs) ? $indexMainJs: null,
      isset($mainJs) ? $mainJs: null,

      isset($indexJs) ? $indexJs : null,
      isset($listJs) ? $listJs : null,
      isset($detailJs) ? $detailJs : null,
      isset($profilJs) ? $profilJs : null,
      isset($signInJs) ? $signInJs : null,
      isset($updateProfilJs) ? $updateProfilJs : null,
      isset($logInJs) ? $logInJs : null,
      isset($researchJs) ? $researchJs : null
  ];

  foreach ($cssFiles as $cssFile) {
    if ($cssFile) {
      echo '<link rel="stylesheet" href="' . $cssFile . '">
      <!-- Line break -->';
    }
  }

  foreach ($jsFiles as $jsFile) {
    if ($jsFile) {
      echo '<script src="' . $jsFile . '" defer></script>
      <!-- Line break -->';
    }
  }
  ?>

<title><?=$title?></title>
</head>
<body>
  <header>
    <div id="h1_link"><h1>Project Games api ☄️

    
    </h1></div>
    <?php
      if (isset($_SESSION['user_id'])) {
        echo '_id: <span id= "spn-user_id">' .  $_SESSION['user_id'] . '</span>';
        echo '&emsp; _email: ' . $_SESSION['email'];
        echo '&emsp; _logname: ' . $_SESSION['logname'];
        echo '&emsp;_avatar: <span id="header_avatar">'. $_SESSION['avatar'] . '</span>';
        echo '&emsp; <button type="button" id="edit_user">Edit</button>';
      } else {
        echo 'Not logged';
      }
    ?>
  </header>

