<?php
require "header.php";

$login = $_POST['login'];
$pwd2 = $_POST['pwd'];
$error = false;

try {
  $pdo = new PDO("mysql:dbname=script_block;host=localhost", "root", "");
} catch(Exception $e) {
  die('Erreur : '.$e->getMessage());
  echo "error_bdd";
  $error = true;
}

if($error === false) {
  $query = $pdo->prepare("SELECT id, email, password FROM user WHERE name = :login");
  $query->execute(array(
    'login' => $login
  ));
  
  $res = $query->fetch();
  if(!empty($res)) {
    if(password_verify($_POST["pwd"], $res["password"])) {
      $_SESSION["email"] = $res['email'];
      $_SESSION["id"] = $res['id'];
      $_SESSION["accesstoken"] = bin2hex($res['email']);
    } else {
        echo "error";
    }
  } else {
    echo "error";
  }
}