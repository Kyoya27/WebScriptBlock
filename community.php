<?php include 'header.php' ?>
<?php include 'navbar.php' ?>
<?php include 'uploadmodal.html' ?>
<?php include 'reportmodal.html' ?>
<?php include 'downloadmodal.html' ?>

<body class="backgroundIn">
	<div class="backgroundCenter">
		<div class="titleHome">Script::Blocks</div>
		<div class="entryText">Behold before the great Blocks Library where mortals sew the strings of the scripts infinity!</div>
	</div>
	<div class="articlePartTitle backgroundArticle">Blocks Library</div>
	<div class="article">
		<div class="tableBack">
			<div class="uploadButton">
				  <a href="#" id="button_upload" class="btn btn-primary addButton" onclick="displayUpload()">  Upload</a>
				<input type="text" class="searchInput" id="searchInp" onkeyup="searchRefresh()" placeholder="  Search for scripts..">
			</div>
			<br/>
			<table id="Scripts" class="tableCom">
				
			</table>
		</div>
	</div>
</body>
<div id="errorr"></div>

<script src="js/community.js"></script>
<script type="text/javascript">
window.onclick = function(event) {
	closeModal('downModal',event);
	closeModal('connectModal',event);
	closeModal('uploadModal',event);
} 
</script>
