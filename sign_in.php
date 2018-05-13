<?php

$login = $_POST['login'];
$email = $_POST['email'];
$pwd1 = $_POST['pwd1'];
$pwd2 = $_POST['pwd2'];
$error = false;

try {
  $pdo = new PDO("mysql:dbname=script_block;host=localhost", "root", "");
} catch(Exception $e) {
  die('Erreur : '.$e->getMessage());
  echo "erreur";
  $error = true;
}

if($pwd1 !== $pwd2) {
  echo "error_pwd";
  $error = true;
}

if($error === false) {
  $query = $pdo->prepare("SELECT * FROM user WHERE name = :login");
  $query->execute(array(
    'login' => $login
  ));
  $res = $query->fetchAll();
  if(empty($res)) {
    $hash_pwd = password_hash($pwd1, PASSWORD_DEFAULT);

    $req = $pdo->prepare('INSERT INTO user(name, email, password) VALUES(:login, :email, :pwd)');
    $req->execute(array(
      'login' => $login,
      'email' => $email,
      'pwd' => $hash_pwd
    ));
  } else {
    echo "error_login";
  }
}