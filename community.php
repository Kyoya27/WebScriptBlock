<?php include 'header.php' ?>
<?php include 'navbar.php' ?>
<?php include 'uploadmodal.html' ?>

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
			<table id="Scripts" class="tableCom">
				
			</table>
		</div>
	</div>
	<div id="downModal" class="modal" style="text-align: center;">
	<div class="modal-content">
		<div style="text-align: right;">
			<span onclick="closeDown()" class="close">&times;</span>
		</div>
		<div class="articleTitle" style="text-align: center !important;">Download</div>
		<div style="text-align: center;">
			<div id="downTitle" class="articleTitle">
			</div>
			<div id="downDesc" class="articleBody">
			</div>
			<div id="downModalButton"></div>
		</div>
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
