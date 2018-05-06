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
						let content = "<div class=\"article\">";
						content += "<div class=\"backgroundArticle\">";
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


function closeAdd() {
	var modal = document.getElementById('addModal');
    modal.style.display = "none";
}

function displayAdd(){
	var modal = document.getElementById('addModal');
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