<?php include 'header.php' ?>
<?php include 'navbar.php' ?>
<?php include 'detailedreportmodal.html' ?>
<?php include 'blockmodal.html' ?>
<?php include 'addBlockmodal.html' ?>
<script src="js/backoffice.js"></script>

<body class="backgroundIn">
	<div class="backgroundCenter">
		<div class="titleHome">BackOffice</div>
	</div>
	<div class="articlePartTitle backgroundArticle">Blocks Users</div>
	<div class="article">
		<div class="tableBack">
			<div class="searchUser uploadButton">
				<input type="text" class="searchInput" id="searchInp" onkeyup="searchRefresh()" placeholder="    Search a User">
			</div>
			<br/>
			<table id="Users" class="tableCom">
				
			</table>
		</div>
	</div>
	
	<div class="articlePartTitle backgroundArticle">Reports</div>
	<div class="article">
		<div class="tableBack">
			<div class="searchUser uploadButton">
				<input type="text" class="searchInput" id="searchScriptReport" onkeyup="searchRefresh()" placeholder="    Search a script">
			</div>
			<br/>
			<table id="Reports" class="tableCom">

			</table>
		</div>
	</div>

	<div class="articlePartTitle backgroundArticle">Blocks</div>
	<div class="article">
		<div class="tableBack">
			<div class="searchUser uploadButton">
				<input type="text" class="searchInput" id="searchBlock" onkeyup="searchRefresh()" placeholder="    Search a block">
			</div>
			<br/>
			<table id="Blocks" class="tableCom">

			</table>
		</div>
		<br/>
	</div>
  <button type="button" class="col-md-4 btn btn-darkblue text-white" onclick="displayAddBlock()">Create block</button>
</body>