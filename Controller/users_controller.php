<?php
session_start();
require_once("../Model/users_model.php");


if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST["action"])) {

  $action = $_POST["action"];

  switch($action){

    case 'sendCode' : 
      //// USE OF PHP MAILER TO VERIFY EMAILS ADDRESS ////
      require_once("../mailer.php");
      $email = $_POST['email'];

      try {
        $subject= 'Verification code';
        $mess = '';
        for($i= 0; $i<6; $i++){
          $rand = mt_rand(0, 9);
          $mess.= strval($rand);
        }
       
        sendmail($email, $subject, $mess);
        $data = array('response' => $mess);
        echo json_encode($data);

      } catch (Exception $e) {
        $data = array('response' => 'Error: ' . $e->getMessage());
        echo json_encode($data);
      }

    break;  

    case 'signIn' : 

      $email = $_POST['email'];
      $logname = $_POST['logname'];
      $avatar = $_POST['avatar'];
      $password = $_POST['password'];

      //// INPUT SANITIZATION BEFORE WRITING IN THE DATABASE, THE $AVATAR VALUE DOES NOT COME FROM USERS INPUT ////
      $email = filter_var($email, FILTER_SANITIZE_EMAIL);
      $logname = htmlspecialchars($logname, ENT_QUOTES, 'UTF-8');
      $password = htmlspecialchars($password, ENT_QUOTES, 'UTF-8');

      try{
        $result = signIn($email, $logname, $password, $avatar);
        $data = array('response' => $result);
        echo json_encode($data); 
      }catch(Exception $e){
        $data = array('response' => 'Error: ' . $e->getMessage());
        echo json_encode($data); 
      }

    break;  

    case 'logIn' : 

      if(isset($_POST['email'])){
        $logId = $_POST['email'];
      }else{
        $logId = $_POST['emailogname'];
      }
      
      $password = $_POST['password'];
     
      try{
  
        $user = logIn($logId, $password);
  
        if($user){      
          $_SESSION['user_id'] = $user['user_id'];
          $_SESSION['email'] = $user['email'];
          $_SESSION['logname'] = $user['logname'];
          $_SESSION['avatar'] = $user['avatar'];
          $data = array('response' => true);
        }else{
          $data = array('response' => 'User not found');
        }
      
        echo json_encode($data); 
  
      }catch(Exception $e){
        $data = array('response' => 'Error: ' . $e->getMessage());
        echo json_encode($data); 
      }
    break;  

    case 'updateUser' : 

      $logname = $_POST['logname'];
      $avatar = $_POST['avatar'];

      //// INPUT SANITIZATION BEFORE WRITING IN THE DATABASE, THE $AVATAR VALUE DOES NOT COME FROM USERS INPUT ////
      $logname = htmlspecialchars($logname, ENT_QUOTES, 'UTF-8');

      try{
        $result = updateUser($logname, $avatar);
        if ($result){
          $_SESSION['logname'] = $logname;
          $_SESSION['avatar'] = $avatar ;  
        }
        $data = array('response' => $result);
        echo json_encode($data); 
      }catch(Exception $e){
        $data = array('response' => 'Error: ' . $e->getMessage());
        echo json_encode($data); 
      }
      
    break;   


//// CHECK IF A GAME IS FAVORIE TO SET THE TOGGLE BUTTON (ADD OR REMOVE)
    case 'checkIfFav' :
      
      $userId = $_POST['user_id'];
      $gameId = $_POST['game_id'];

      try{
        $result = checkIfFav($userId, $gameId);
        
        $data = array('response' => $result);
        echo json_encode($data); 
      }catch(Exception $e){
        $data = array('response' => 'Error: ' . $e->getMessage());
        echo json_encode($data); 
      }

    break;  

    case 'addFav' :

      $userId = $_POST['user_id'];
      $gameId = $_POST['game_id'];

      try{
        $result = addFav($userId, $gameId);
        
        $data = array('response' => $result);
        echo json_encode($data); 
      }catch(Exception $e){
        $data = array('response' => 'Error: ' . $e->getMessage());
        echo json_encode($data); 
      }


    break; 

    
    case 'removeFav' :

      $userId = $_POST['user_id'];
      $gameId = $_POST['game_id'];
     
      try{
        $result = removeFav($userId, $gameId);
        
        $data = array('response' => $result);
        echo json_encode($data); 
      }catch(Exception $e){
        $data = array('response' => 'Error: ' . $e->getMessage());
        echo json_encode($data); 
      }

    break; 

     //// SEARCH FOR FAVORITE(S) FOR THE LINK IN INDEX
    case 'searchFav' :

      $userId = $_POST['user_id'];
     
      try{
        $result = searchFav($userId);
        
        $data = array('response' => $result);
        echo json_encode($data); 
      }catch(Exception $e){
        $data = array('response' => 'Error: ' . $e->getMessage());
        echo json_encode($data); 
      }

    break; 


    

  }


} else {
  die("Wrong path");
}
