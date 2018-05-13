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
				content += "<th onclick='sortTable(0)'>Category</th>>";
				content += "<th onclick='sortTable(1)'>Script Name</th>";
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
      url: 'save_script.php',
      type: 'POST',
      data: { file: file, name: file.name },
      success: function(data) {
        console.log(data);
      }
    })
  }
}

function closeUpload() {
	var modal = document.getElementById('uploadModal');
    modal.style.display = "none";
}