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
					content += "<td><a href=\"#\" onclick=\"displayDown("+data[i].id+")\">Download</a></td>";
					content += "</tr>";
					$(content).appendTo("#Scripts");
				}

			}
		}
	});
}

function closeDown() {
	var modal = document.getElementById('downModal');
    modal.style.display = "none";
}

function displayDown(id){
	var modal = document.getElementById('downModal');
	$.ajax({
		url: "http://localhost:8080/script?id="+id,
		type: "GET",
		beforeSend: function(xhr){
			xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
			xhr.setRequestHeader("Content-type", "application/json");
		},
		dataType : 'json',
		success: function(data) {
			if(data != undefined){
				$("#downTitle").html(data[0].name);
				$("#downDesc").html(data[0].description);
				$("#downModalButton").html("<a href=\"Scripts/"+data[0].name+"_"+id+".sm\" class=\"btn btn-primary addButton\" onclick=\"closeDown()\">Download Script</a>");
				modal.style.display = "block";
			}
		}
	});
}

function downScript(name, id){
	window.location.href = "./Scripts/"+name+"_"+id+".sm";
}

function displayUpload(){
	var modal = document.getElementById('uploadModal');
	 modal.style.display = "block";
}

function closeUpload() {
	var modal = document.getElementById('uploadModal');
    modal.style.display = "none";
}
