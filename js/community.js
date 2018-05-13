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
				$("#downModalButton").html("<a href=\"scripts/"+data[0].name+"_"+id+".sm\" class=\"btn btn-primary addButton\" onclick=\"closeDown()\">Download Script</a>");
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

function upload_script() {
  let file = $("#input_file")[0].files[0];
  console.log(file);
  if(file === undefined || file.name.split('.').pop().localeCompare('sm') !== 0) {
    $("#input_file_error").removeClass('text-hide');
  } else {    
    $.ajax({
      url: "http://localhost:8080/script/add",
      type: "POST",
      data: JSON.stringify({
        name: $("#title_upload").val(),
        description: $("#description_upload").val(),
        size: file.size,
        id_user: $("#id_user_upload").text()
      }),
      async: false,
      beforeSend: function(xhr){
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhr.setRequestHeader("Content-type", "application/json");
      },
      success: function(data) {
        let form = new FormData();
        form.append("file", $("#input_file")[0]);
        form.append("name",  $("#title_upload").val());
        form.append("id",  data.id);
        console.log("id = " + data.id);
        console.log("form = " + form);
        
        $.ajax({
          url: 'save_script.php',
          type: 'POST',
          processData: false,
          contentType: false,
          data: form,
          success: function(data) {
            $("#errorr").html(data);
            console.log(data);
          }
        });
      }
    });
    
    closeUpload();
    getScript();
  }
}

function closeUpload() {
	var modal = document.getElementById('uploadModal');
    modal.style.display = "none";
}