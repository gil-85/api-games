<?php
function  signIn($email, $logname, $password, $avatar){
   require_once("dbh.php");
   $query = "INSERT INTO users (email, logname, password, avatar) VALUES (?,?,?,?);";
   $stmt = $pdo->prepare($query);
   $result = $stmt->execute([$email, $logname, $password, $avatar]);
   $pdo = null;
   $stmt = null;
   return $result;
}
 

function logIn($emailogname, $password){
   require_once("dbh.php");
   $query = "SELECT user_id, email, logname, avatar FROM users WHERE (email = ? OR logname = ?) AND password = ?;";
   $stmt = $pdo->prepare($query);
   $stmt->execute([$emailogname, $emailogname, $password]);
   $user = $stmt->fetch(PDO::FETCH_ASSOC);
   $pdo = null;
   $stmt = null;
   return $user;
}

function updateUser($logname, $avatar) {
   require_once("dbh.php");
   $id = $_SESSION['user_id'];

   $query = "UPDATE users SET logname=?, avatar=? WHERE user_id=?";
   $stmt = $pdo->prepare($query);

   //// CHECK IF THE QUERY WAS EXECUTED SUCCESSFULLY
   $result = $stmt->execute([$logname, $avatar, $id]);

   //// CLOSE THE CONNECTON AND STATEMENT
   $pdo = null;
   $stmt = null;

   //// RETURN SUCCESS OR FAILURE
   return $result;
}




function checkIfFav($userId, $gameId){
   require_once("dbh.php");
   $query = "SELECT EXISTS (SELECT 1 FROM favorite WHERE user_id = ? AND game_id = ?) AS fav_exists";
   $stmt = $pdo->prepare($query);
   $stmt->execute([$userId, $gameId]);
   $exists = (bool) $stmt->fetchColumn();
   return $exists;
}


function addFav($userId, $gameId){
   require_once("dbh.php");
  
   $query = "INSERT INTO favorite (user_id, game_id) VALUES (?,?);";
   
   $stmt = $pdo->prepare($query);

   $result = $stmt->execute([$userId, $gameId]);
   $pdo = null;
   $stmt = null;

   return $result;
}


function removeFav($userId, $gameId){
   require_once("dbh.php");
  
   $query = "DELETE FROM favorite WHERE user_id = ? AND game_id = ?;";
   
   $stmt = $pdo->prepare($query);

   $stmt->execute([$userId, $gameId]);
   $deletedRows = $stmt->rowCount();

   $pdo = null;
   $stmt = null;
   
   return $deletedRows > 0;
}
   
function searchFav($userId){
   require_once("dbh.php");

   $query = "SELECT game_id FROM favorite WHERE user_id = ?;";
   $stmt = $pdo->prepare($query);
   $stmt->execute([$userId]);

   $games = $stmt->fetchAll(PDO::FETCH_COLUMN);

   $stmt = null;
   $pdo = null;

   return $games;
}


function updatePassword($newPass, $email): bool {
   require_once("dbh.php");
   $query = "UPDATE users SET password= ? WHERE email= ?";
   $stmt = $pdo->prepare($query);
   $stmt->execute([$newPass, $email]);
   $pdo = null;
   return $stmt->rowCount() > 0;
}



