$(document).ready(function(){
	getScript();
  if(sessionStorage.getItem("token")) {
    $("#button_upload").removeClass("disabled")
  } else {
    $("#button_upload").addClass("disabled")
  }
});

function getScript(){
	$.ajax({
		url: "http://localhost:8080/script",
		type: "GET",
		beforeSend: function(xhr){
			xhr.setRequestHeader("Content-type", "application/json");
		},
		dataType : 'json',
		success: function(data) {
			if(data != undefined){
				data.sort(function(a,b){
					return new Date(b.downloads_count) - new Date(a.downloads_count);
				});
				
				$("#Scripts").html("");

				let content = "<tr class=\"tableTitle\">";
				content += "<th onclick='sortTable(0)'>Category&#8597</th>>";
				content += "<th onclick='sortTable(1)'>Script Name&#8597</th>";
				content += "<th onclick='sortTable(2)'>Size&#8597</th>";
				content += "<th onclick='sortTable(3)'>Nb Download&#8597</th>";
				content += "<th>Link</th>";
        if(sessionStorage.getItem("token")) {
				  content += "<th>Report</th>";
        }
				content += "</tr>";
				$(content).appendTo("#Scripts");

				for(let i = 0; i < data.length; i++){
					if(data[i].available === 1) {
						let content = "<tr>";
						content += "<td>"+data[i].category+"</td>";
						content += "<td>"+data[i].name+"</td>";
						content += "<td>"+data[i].size+" o</td>";
						content += "<td>"+data[i].downloads_count+"</td>";
						content += "<td><a href=\"#\" onclick=\"displayDown("+data[i].id+")\">Download</a></td>";
						if(sessionStorage.getItem("token")) {
							content += "<td><a href=\"#\" onclick=\"displayReport('"+data[i].name+"', "+data[i].id+", "+data[i].downloads_count+")\">Report</a></td>";
						}
						content += "</tr>";
						
						$(content).appendTo("#Scripts");
					}
				}

			}
		}
	});
}

function update_dlc(id) {
  $.ajax({
    url: 'http://localhost:8080/script/updateDLC/'+id,
    type: 'PUT'
  })
  .done(function(data) {
    getScript();
  })
  .fail(function(err) {
    console.log(err.responseText)
    closeDown();
  })
}

function closeDown() {
	var modal = document.getElementById('downModal');
    modal.style.display = "none";
}

function displayDown(id_script, dl_count){
	$("#sendCmt").data("id", id_script);
	var modal = document.getElementById('downModal');
	$.ajax({
		url: "http://localhost:8080/script?id="+id_script,
		type: "GET",
		beforeSend: function(xhr){
			xhr.setRequestHeader("Content-type", "application/json");
		},
		dataType : 'json',
		success: function(data) {
			if(data != undefined){
				$(".downTitle").html("<div class='offset-md-1'>"+data[0].name+"</div>");
				$(".downDesc").html("<div class='text-justify offset-md-1 col-md-10'>"+data[0].description+"</div>");
				$(".downModalButton").html("<a href=\"Scripts/"+data[0].name+"_"+id_script+".sm\" class=\"btn btn-primary addButton\" onclick=\"update_dlc("+id_script+"); closeDown()\">Download Script</a>");
				modal.style.display = "block";
			}
		}
	});
	
	dispComments(id_script);
}

function dispComments(id_script) {
	$.ajax({
		url: "http://localhost:8080/script/getComments/"+id_script,
		type: "GET",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Content-type", "application/json");
		}
	})
		.done((res) => {
		if(res !== undefined) {
			$("#commentsDisplayDownload").html("");
			res.forEach((el) => {
				let content = "<hr align='center' width='50%' class='mt-3 mb-4 bg-white'>"; 
				content += "<div class='text-justify offset-md-3 col-md-6'>"+el.comment+"</div>";
				content += "<div class='offset-md-5'>- "+el.User.name+"</div>";
				$("#commentsDisplayDownload").append(content);
			})
		}
	})
}

function sendComment() {
	const comment = $("#commentArea").val();
	const id_script = $("#sendCmt").data("id");
	
	$.ajax({
		url: "http://localhost:8080/script/addComment",
		type: "POST",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Content-type", "application/json");
			xhr.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem("token"));
		},
		data: JSON.stringify({
			id_script: id_script,
			comment: comment
		})
	})
	.done((res) => {
		dispComments(id_script);
		$("#commentArea").val("");
	})
	.catch((err) => {
		console.log(err.responseText);
	})
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
  var file = $("#input_file")[0].files[0];
	
  if(file === undefined) {
		$("#upload_error").html("You must provide a script").removeClass('d-none');
	} else if(file.name.split('.').pop().localeCompare('sm') !== 0) {
		$("#upload_error").html("Script format is  not valid").removeClass('d-none');
  } else {    
		var name = $("#title_upload").val() === "" ? undefined : $("#title_upload").val();
		var desc = $("#description_upload").val() === "" ? undefined : $("#description_upload").val();
    $.ajax({
      url: "http://localhost:8080/script/add",
      type: "POST",
      data: JSON.stringify([{
        name: name,
        description: desc,
        size: file.size
      }]),
      beforeSend: function(xhr){
        xhr.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem("token"));
        xhr.setRequestHeader("Content-type", "application/json");
      }
    })
    .done(function(data) {
			console.log(file)
			console.log(data);
      var formData = new FormData();
      formData.append('file', file);
      formData.append('id', data[0].id);
      formData.append('name', data[0].name);
      closeUpload();

      $.ajax({
        url: 'save_script.php',
        type: 'POST',
        processData: false,
        contentType: false,
        data: formData
      })
      .done(function(data) {
				getScript();
				closeUpload();
      })
			.fail((err) => {
				$.ajax({
					url: "http://localhost:8080/script/remove/"+data.id,
					type: "DELETE",
					beforeSend: function(xhr){
						xhr.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem("token"));
						xhr.setRequestHeader("Content-type", "application/json");
					}
				})
				.done((res) => {
					$("#script_display_error").html("<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>Error uploading the script").removeClass("d-none");
				})
			})
    })
    .fail(function(err) {
//      sessionStorage.clear();
//      window.location = "homepage.php?reco=yes"
			$("#upload_error").html(err.responseJSON.error).removeClass('d-none');
		});
  }
}

function closeUpload() {
	var modal = document.getElementById('uploadModal');
	modal.style.display = "none";
	$("#upload_error").html("").addClass('d-none');
}

function displayReport(name, id, dl) {
	console.log(displayReport);
	$("#reportTitle").html("Report " + name);
	$("#reportTitle").attr("data-id", id);
	$("#reportTitle").attr("data-dl", dl);
	$("#reportModal").css("display", "block");
}

function closeReport() {
	$("#reportModal").css("display", "none");
	$("#report_comment").val("");
}

function reportScript() {
	const id_script = parseInt($("#reportTitle").data("id"));
	const comment =	$("#report_comment").val() === "" ? undefined : $("#report_comment").val();
	const dl = parseInt($("#reportTitle").data("dl"));
	
	$.ajax({
		url: "http://localhost:8080/report/countReports/"+id_script,
		type: "GET",
		beforeSend: function(xhr){
			xhr.setRequestHeader("Content-type", "application/json");
		}
	})
	.done((nb_reports) => {
		var category = "clean";
		if(dl * 0.1 < (nb_reports+1)){
			category = "dangerous"
		}
		
		$.ajax({
			url: "http://localhost:8080/script/update",
			type: "POST",
			data: JSON.stringify({
				id: id_script,
				category: category
			}),
			beforeSend: function(xhr){
				xhr.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem("token"));
				xhr.setRequestHeader("Content-type", "application/json");
			}
		})
		.done((res) => {
			$.ajax({
				url: "http://localhost:8080/report/add",
				type: "POST",
				beforeSend: function(xhr){
					xhr.setRequestHeader("Content-type", "application/json");
					xhr.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem("token"));
				},
				data: JSON.stringify({
					id_script: id_script,
					comment: comment
				})
			})
			.done((res) => {
				getScript();
				closeReport();
			})
		})
	})
}