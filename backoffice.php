<?php include 'header.php' ?>
<?php include 'navbar.php' ?>
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
			<table id="Users" class="tableCom">
				
			</table>
		</div>
	</div>
</body>