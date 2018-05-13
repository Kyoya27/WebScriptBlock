$(document).ready(function(){
	getArticle();
});

function getArticle(){
	$.ajax({
		url: "http://localhost:8080/article",
		type: "GET",
		beforeSend: function(xhr){
			xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
			xhr.setRequestHeader("Content-type", "application/json");
		},
		dataType : 'json',
		success: function(data) {
			if(data != undefined){

				data.sort(function(a,b){
					return new Date(b.date_add) - new Date(a.date_add);
				})
				
				$("#article").html("");

				for(let i = 0; i < data.length; i++){
					if(data[i].available === 1){
						let content = "<div id=\"article_"+data[i].id+"\"class=\"article\">";
						content += "<div class=\"backgroundArticle\">";
						content += "<div style=\"text-align: right; margin-right: 15px;\"><span onclick=\"displayDel('"+data[i].subject+"',"+data[i].id+")\" class=\"close\">&times;</span><span onclick=\"displayMod("+data[i].id+")\"class=\"close\" style=\"font-size: 15px; margin-top: 8px;\">&#9998;</span></div>";
						content += "<div class=\"articleTitle\">"+data[i].subject+"</div>";
						content += "<div class=\"articleBody\">"+data[i].content+"</div>";
						content += "</div></div>";
						$(content).appendTo("#article");
					}
				}

			}
		}
	});
}

function closeMod() {
	var modal = document.getElementById('addModal');
    modal.style.display = "none";
}

function displayMod(id){
	var modal = document.getElementById('addModal');
	$("#addModaltitle").html("Update an Article");
	$("#addModalButton").html("<a href=\"#\" class=\"btn btn-primary addButton\" onclick=\"modArticle("+id+")\">Update Article</a>");
	$("#articleTitle").val($("#article_"+id+" .backgroundArticle .articleTitle").html());
	$("#articleContent").val($("#article_"+id+" .backgroundArticle .articleBody").html());
	 modal.style.display = "block";
}

function modArticle(id){
	console.log($("#articleContent").val());
	if($("#articleTitle").val() !== "" && $("#articleContent").val() !== "" ){
		$.ajax({
			url: "http://localhost:8080/article/update",
			type: "POST",
			data:JSON.stringify({
				"id": id,
				"subject" : $("#articleTitle").val(),
				"content" : $("#articleContent").val(),
				"id_user" : 1
			}),
			dataType:'json',
			async: false,
			beforeSend: function(xhr){
				xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
				xhr.setRequestHeader("Content-type", "application/json");
			},
			success: function() {
				$(".errorAdd").hide();
				console.log("Article Updates");
				getArticle();
				closeAdd();
			}
		});
	}else{
		$(".errorAdd").show();
	}
}

function delArticle(){
	var value = $("#ArticleId").html();
	$.ajax({
	    url: 'http://localhost:8080/article/remove/'+value,
	    type: 'DELETE',
	    success: function(result) {
			getArticle();
			closeDel();
	    }
	});
}

function closeDel() {
	var modal = document.getElementById('delModal');
    modal.style.display = "none";
}

function displayDel(title, id){
	var modal = document.getElementById('delModal');
	$("#delArticleTitle").html("Are you sure you want to delete '"+title+"' article from our site ?!")
	$("#ArticleId").html(id);
	modal.style.display = "block";
}

function closeAdd() {
	var modal = document.getElementById('addModal');
    modal.style.display = "none";
}

function displayAdd(){
	var modal = document.getElementById('addModal');
	$("#addModaltitle").html("Add an Article");
	$("#addModalButton").html("<a href=\"#\" class=\"btn btn-primary addButton\" onclick=\"addArticle()\">Add Article</a>");
	$("#articleTitle").val('');
	$("#articleContent").val('');
	modal.style.display = "block";
}

function addArticle(){
	if($("#articleTitle").val() !== "" || $("#articleContent").val() !== "" ){
		$.ajax({
			url: "http://localhost:8080/article/add",
			type: "POST",
			data:JSON.stringify({
				"subject" : $("#articleTitle").val(),
				"content" : $("#articleContent").val(),
				"id_user" : 1
			}),
			dataType:'json',
			async: false,
			beforeSend: function(xhr){
				xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
				xhr.setRequestHeader("Content-type", "application/json");
			},
			success: function() {
				$(".errorAdd").hide();
				console.log("Article Added");
				getArticle();
				closeAdd();
			}
		});
	}else{
		$(".errorAdd").show();
	}
}