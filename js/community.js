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
				content += "<th onclick='sortTable(0)'>Category&#8597</th>>";
				content += "<th onclick='sortTable(1)'>Script Name&#8597</th>";
				content += "<th onclick='sortTable(2)'>Size&#8597</th>";
				content += "<th onclick='sortTable(3)'>Nb Download&#8597</th>";
				content += "<th>Link</th>";
				content += "<th>Report</th>";
				content += "</tr>";
				$(content).appendTo("#Scripts");

				for(let i = 0; i < data.length; i++){
					let content = "<tr>";
					content += "<td>"+data[i].category+"</td>";
					content += "<td>"+data[i].name+"</td>";
					content += "<td>"+data[i].size+" kb</td>";
					content += "<td>"+data[i].downloads_count+"</td>";
					content += "<td><a href=\"#\" onclick=\"displayDown("+data[i].id+")\">Download</a></td>";
					content += "<td><a href=\"#\" onclick=\"reportScript("+data[i].id+")\">Report</a></td>";
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

function reportScript(id){
	var script = 0;
	var report = 0;
	var download = 0;

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
				script = data;
				report = data[0].report;
				donwload = data[0].downloads_count;
			}
		}
	});

	if(download * 0.1 < (report+1)){
		$.ajax({
			url: "http://localhost:8080/script/update",
			type: "POST",
			data:JSON.stringify({
				"id": id,
				"category": "dangerous",
				"report" : report+1
			}),
			dataType:'json',
			async: false,
			beforeSend: function(xhr){
				xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
				xhr.setRequestHeader("Content-type", "application/json");
			},
			success: function() {
				getScript();
			}
		});
	}else{
		$.ajax({
			url: "http://localhost:8080/script/update",
			type: "POST",
			data:JSON.stringify({
				"id": id,
				"report" : report+1
			}),
			dataType:'json',
			async: false,
			beforeSend: function(xhr){
				xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
				xhr.setRequestHeader("Content-type", "application/json");
			},
			success: function() {
				getScript();
			}
		});
	}

	

	


}

function downScript(name, id){
	window.location.href = "./Scripts/"+name+"_"+id+".sm";
}

function displayUpload(){
	var modal = document.getElementById('uploadModal');
	 modal.style.display = "block";
}

function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("Scripts");
  switching = true;
  dir = "asc"; 
  while (switching) {
    switching = false;
    rows = table.getElementsByTagName("TR");
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch= true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++; 
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

function searchRefresh(){
	var input, filter, i;
	var table, rows, x = 0;
    input = document.getElementById('searchInp');
    filter = input.value.toUpperCase();

    table = document.getElementById("Scripts");
    rows = table.getElementsByTagName("TR");

    for (i = 1; i < rows.length; i++) {
      x = rows[i].getElementsByTagName("TD")[1];
      if (x.innerHTML.toUpperCase().indexOf(filter) > -1) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }

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