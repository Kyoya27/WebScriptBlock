$(document).ready(function() {
	getReportedScripts();
});

function getReportedScripts() {
	$.ajax({
		url: "http://localhost:8080/report/reports_infos",
		type: "GET",
		beforeSend: function(xhr){
			xhr.setRequestHeader("Content-type", "application/json");
			xhr.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem("token"));
		}
	})
	.done(function(res) {
		console.log(res);
		if(res !== undefined) {
			$("#Reports").html("");

			let content = "<tr class=\"tableTitle\" style=\"font-size: 17px;\">";
			content += "<th onclick='sortTable(0)'>SCRIPT NAME &#8597</th>>";
			content += "<th onclick='sortTable(1)'>USER NAME &#8597</th>";
			content += "<th onclick='sortTable(2)'>REPORTS COUNTER &#8597</th>";
			content += "<th onclick='sortTable(3)'>COMMENTS COUNTER&#8597</th>";
			content += "<th style=\"width: 1%;\" onclick='sortTable(4)'>SHOW&#8597</th>";
			content += "</tr>";
			$(content).appendTo("#Reports");

			res.forEach((el)=> {	
				let content = "<tr>";
				content += "<td>"+el.Script.name+"</td>"
				content += "<td>"+el.Script.User.name+"</td>";
				content += "<td>"+el.count_scripts+"</td>";
				content += "<td>"+el.count_comments+"</td>";
				content += "<td><a onclick='displayDetailedReport("+el.id_script+", "+el.count_scripts+")' style='cursor: pointer; color: skyblue'>details</a></td>";
				content += "</tr>";
				$(content).appendTo("#Reports");
			});
		}
	})
	.fail(function(err) {
		console.log(err.responseText);
	})
}

function commentsDisplay(id_script) {
	$.ajax({
		url: "http://localhost:8080/report/getComments/"+id_script,
		type: "GET",
		beforeSend: function(xhr){
			xhr.setRequestHeader("Content-type", "application/json");
			xhr.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem("token"));
		}
	})
	.done((res) => {
		console.log(res)
		if(res !== undefined) {
			
			let content = "<tr class=\"tableTitle\" style=\"font-size: 17px;\">";
			content += "<th style='width: 16.66%'>User name</th>";
			content += "<th>Comment</th>";
			content += "</tr>";
			$("#commentsDisplay").html(content);
			
			res.forEach((el) => {
				let content = "<tr>";
				content += "<td>"+el.User.name+" ( "+el.User.id+" )"+"</td>";
				content += "<td class='text-justify'>"+el.comment+"</td>";
				content += "</tr>";
				$("#commentsDisplay").append(content);
			})
		}
	})
	.fail((err) => {
		console.log(err.responseText);
	});
}

function displayDetailedReport(id_script, rp) {
	var modal = document.getElementById('detailedReportModal');
	modal.style.display = "block";
	
	$.ajax({
		url: "http://localhost:8080/script?id="+id_script,
		type: "GET",
		beforeSend: function(xhr){
			xhr.setRequestHeader("Content-type", "application/json");
		},
		dataType : 'json'
	})
	.done((res) => {
		if(res != undefined){
			$(".downTitle").html("Title : " + res[0].name);
			$("#dls").html("DL : "+ res[0].downloads_count);
			$("#rpts").html("RP : "+ rp);
			$(".downDesc").html(res[0].description);
			if(parseInt(res[0].available) === 0) {
				$("#type_script").html("Show");
				$("#type_script").data("id", 1);
				$("#type_script").on("click", function() {
					scriptAvailable(res[0].id, $(this).data("id"));
				});
			} else {
				$("#type_script").html("Hide");
				$("#type_script").data("id", 0);
				$("#type_script").on("click", function() {
					scriptAvailable(res[0].id, $(this).data("id"));
				});
			}
			
			$(".downModalButton").html("<a href=\"scripts/"+res[0].name+"_"+id_script+".sm\" class=\"btn btn-primary addButton\" onclick=\"update_dlc("+id_script+"); closeDown()\">Download Script</a>");
			modal.style.display = "block";
		}
	})
	.fail((err) =>  {
		console.log(err.responseText)
	})
	
	commentsDisplay(id_script);
}

function closeDetailedReport() {
	var modal = document.getElementById('detailedReportModal');
	modal.style.display = "none";
}

function scriptAvailable(id, value) {
	console.log("id " + id)
	console.log("value " + value)
	$.ajax({
		url: "http://localhost:8080/script/update",
		type: "POST",
		beforeSend: function(xhr){
			xhr.setRequestHeader("Content-type", "application/json");
			xhr.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem("token"));
		},
		data : JSON.stringify({
			id: id,
			available: value
		})
	})
	.done((res) =>  {
		console.log(res);
	})
}