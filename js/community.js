$(document).ready(function(){
	getScript();
});

function getScript(){
	$.ajax({
		url: "http://localhost:8080/script",
		type: "GET",
		beforeSend: function(xhr){
			xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
			xhr.setRequestHeader("Content-type", "application/json");
		},
		dataType : 'json',
		success: function(data) {
			if(data != undefined){

				data.sort(function(a,b){
					return new Date(b.downloads_count) - new Date(a.downloads_count);
				})
				
				$("#Scripts").html("");

				let content = "<tr class=\"tableTitle\">";
				content += "<th>Category</th>>";
				content += "<th>Script Name</th>";
				content += "<th>Size</th>";
				content += "<th>Nb Download</th>";
				content += "<th>Link</th>";
				content += "</tr>";
				$(content).appendTo("#Scripts");

				for(let i = 0; i < data.length; i++){
					let content = "<tr>";
					content += "<td>"+data[i].category+"</td>";
					content += "<td>"+data[i].name+"</td>";
					content += "<td>"+data[i].size+" kb</td>";
					content += "<td>"+data[i].downloads_count+"</td>";
					content += "<td><a href=\"#\" onclick=\"displayDownload("+data[i].id+")\">Download</a></td>";
					content += "</tr>";
					$(content).appendTo("#Scripts");
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

function upload_script() {
  let file = $("#input_file")[0].files[0];
  console.log(file);
  if(file === undefined || file.name.split('.').pop().localeCompare('sm') !== 0) {
    $("#input_file_error").removeClass('text-hide');
  } else {
    $.ajax({
      url: 'save_script.php',
      type: 'POST',
      data: { file: file, name: file.name },
      success: function(data) {
        console.log(data);
      }
    })
  }
}