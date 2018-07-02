<?php include 'header.php' ?>
<?php include 'navbar.php' ?>
<script src="js/homepage.js"></script>

<body class="backgroundIn">
	<div class="backgroundCenter">
		<div class="titleHome">Script::Blocks</div>
		<div class="entryText">Welcome to the Blockers Community, if you want to script easily and not bother with OS you made the right choice coming here!</div>
		<div class="entrySub">Have a sit and a cookie, the cruise start now !</div>
		<div><a href="image/front.jpg" class="btn btn-primary downloadButton" download>Download Script::Blocks</a></div>
	</div>
	<div class="articlePartTitle backgroundArticle">Blockers  News</div>
	<div id="article">
	</div>
</body>

<div id="addModal" class="modal" style="text-align: center;">
	<div class="modal-content">
		<div style="text-align: right;">
			<span onclick="closeAdd()" class="close">&times;</span>
		</div>
		<div id="addModaltitle" class="articleTitle"  style="text-align: center !important;">Add an Article</div>
		<div style="text-align: center;">
			<div>
				<input id="articleTitle" class="addInput" type="text" placeholder="Title :">
			</div>
			<div>
				<textarea id="articleContent" class="addInput" rows="4" cols="50" type="text" placeholder="Content:"></textarea>
			</div>
			<div style="display: none;" class="errorAdd">One Field is Empty !</div>
			<div id="addModalButton"></div>
		</div>
	</div>
</div>

<div id="delModal" class="modal" style="text-align: center;">
	<div class="modal-content">
		<div style="text-align: right;">
			<span onclick="closeDel()" class="close">&times;</span>
			<div id="ArticleId" style="display:none;"></div>
			<div id="delArticleTitle" class="articleTitle"  style="text-align: center !important; text-decoration: none !important;"></div>
			<div style="text-align: center;">
				<a href="#" class="btn btn-primary addButton" onclick="delArticle()">Yes...</a>
				<a href="#" class="btn btn-primary addButton" onclick="closeDel()">NO!</a>
			</div>
		</div>
	</div>
</div>

<script type="text/javascript">
window.onclick = function(event) {
	closeModal('addModal',event);
	closeModal('connectModal',event);
	closeModal('delModal',event);
} 
$(document).ready(function(){
  getArticle(parseInt(sessionStorage.getItem("isAdmin")));
});
</script>
