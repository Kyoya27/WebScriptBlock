<?php include 'header.php' ?>
<?php include 'navbar.php' ?>
<?php include 'detailedreportmodal.html' ?>
<script src="js/report.js"></script>

<body class="backgroundIn">
	<div class="backgroundCenter">
		<div class="titleHome">Report administration</div>
	</div>
	<div class="articlePartTitle backgroundArticle">Reports</div>
	<div class="article">
		<div class="tableBack">
			<div class="searchUser uploadButton">
				<input type="text" class="searchInput" id="searchScriptReport" onkeyup="searchRefresh()" placeholder="    Search a script">
			</div>
<!--			<div id="report_list" class="row col-md-12">
			
			</div>-->
			<br/>
			<table id="Reports" class="tableCom">

			</table>
		</div>
	</div>
</body>