<?php
require 'header.php';

if(!empty($_POST['file'])){
  file = $_POST['file'];
  $fname = $_POST['name'] . '_' . $_SESSION['id'] . ".sm";
                  
  $file = fopen("scripts/" . $fname, 'w');//creates new file
  fwrite($file, $data);
  fclose($file);
}