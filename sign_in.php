<?php
//echo $_POST['login'];
//echo $_POST['email'];
//echo $_POST['pwd1'];
//echo $_POST['pwd2'];

$login = $_POST['login'];
$email = $_POST['email'];
$pwd1 = $_POST['pwd1'];
$pwd2 = $_POST['pwd2'];
$error = false;

$pdo = new PDO("mysql:host=localhost;dbname:script_block", "root", "");

if($pwd1 !== $pwd2) {
  echo "error_pwd";
  $error = true;
}

if($error === false) {
  $hash_pwd = password_hash($pwd1, PASSWORD_DEFAULT);
  $req = $pdo->prepare('INSERT INTO user(name, email, password) VALUES(:login, :email, :pwd)');
  $req->execute(array(
    'login' => $login,
    'email' => $email,
    'pwd' => $pwd1
  ));
}