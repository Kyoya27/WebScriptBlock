<?php
require 'header.php';
var_dump($_POST);
if(!empty($_POST['file'])){
  $data = $_POST['file'];
  $fname = $_POST['name'] . '_' . $_POST['id'] . ".sm";
  
  $file = fopen("scripts/" . $fname, 'w');//creates new file
  fwrite($file, $data);
  fclose($file);
}