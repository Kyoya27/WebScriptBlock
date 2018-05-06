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
		<div class="article">
			<div class="backgroundArticle">
				<div class="articleTitle">Join the Blockers  !</div>
				<div class="articleBody">Scrip::Blocks has taken off, download the app now to join the Blockers in this Scripting journey!
				We are really happy that so many people contribute to this project and we are eager to see what this comunity will build with our app, for any feedback, questions or small talk with our team go on our twitter accounts !</div>
			</div>
		</div>
		<div class="article">
			<div class="backgroundArticle">
				<div class="articleTitle">The Blocks Rocket is soon taking off!</div>
				<div class="articleBody">Prepare yourself for a revolution in the way you were scripting before !</div>
			</div>
		</div>
	</div>
</body>

<div id="addModal" class="modal" style="text-align: center;">
	<div class="modal-content">
		<div style="text-align: right;">
			<span onclick="closeAdd()" class="close">&times;</span>
		<div>
		<div class="articleTitle"  style="text-align: center !important;">Add an Article</div>
		<div style="text-align: center;">
			<div>
				<input id="articleTitle" class="addInput" type="text" placeholder="Title :">
			</div>
			<div>
				<textarea id="articleContent" class="addInput" rows="4" cols="50" type="text" placeholder="Content:"></textarea>
			</div>
			<div style="display: none;" class="errorAdd">One Field is Empty !</div>
			<div><a href="#" class="btn btn-primary addButton" onclick="addArticle()">Add Article</a></div>
		</div>
	</div>
</div>

<script type="text/javascript">
window.onclick = function(event) {
	var modal = document.getElementById('addModa');
    if (event.target == modal) {
        modal.style.display = "none";
    }
} 
</script>