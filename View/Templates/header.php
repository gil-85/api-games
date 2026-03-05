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
     
      isset($indexMainJs) ? $indexMainJs: null,  // ???
      isset($mainJs) ? $mainJs: null,

      isset($indexJs) ? $indexJs : null,
      isset($listJs) ? $listJs : null,
      isset($detailJs) ? $detailJs : null,
      isset($profilJs) ? $profilJs : null,
      isset($signInJs) ? $signInJs : null,
      isset($updateProfilJs) ? $updateProfilJs : null,
      isset($logInJs) ? $logInJs : null,
      isset($researchJs) ? $researchJs : null,
      isset($passwordRecoveryJs) ? $passwordRecoveryJs : null,
      isset($signCodeJs) ? $signCodeJs : null
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
    }// ☄️
  }
  ?>

<title><?=$title?></title>
</head>
<body>
  <header>
    <div id="h1_link"><h1>GAMER CRUISE</h1></div>
    <?php
    ### DISPLAY THE USER LOGNAME AND AVATAR WHEN CONNECTED (CLICKABLE TO EDIT)
      if (isset($_SESSION['user_id'])) {
        echo '<span class= ghost id= "spn-user_id">' .  $_SESSION['user_id'] . '</span>';
        echo '<div id="d-edit_user">';
        echo '<span id="spn-header_avatar">'. $_SESSION['avatar'] . '</span>';
        echo '<p>' . $_SESSION['logname'] . '</p>';
        echo '</div>';
      } else {
        echo '<p>Not logged</p>';
      }
    ?>
  </header>

