<?php
require 'header.php';
var_dump($_POST);
var_dump($_FILES);
if(!empty($_FILES['file'])){
  $data = $_FILES['file'];
  $fname = $_POST['name'] . '_' . $_POST['id'] . ".sm";
  $file = fopen("scripts/" . $fname, 'w');
	echo $data['name'];
	$dt = file_get_contents($data['tmp_name'], true);
	echo $dt;
	fwrite($file, $dt);
  fclose($file);
}