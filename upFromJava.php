<?php
$uploads_dir = 'C:\wamp64\www\WEN_ANNUEL\WebScriptBlock\Scripts';
if(is_uploaded_file($_FILES['userfile']['tmp_name'])) {
$dest=  $_FILES['userfile'] ['name'];
move_uploaded_file ($_FILES['userfile'] ['tmp_name'], "$uploads_dir/$dest");
} else {
echo "Possible file upload attack: ";
echo "filename '". $_FILES['userfile']['tmp_name'] . "'.";
print_r($_FILES);
}