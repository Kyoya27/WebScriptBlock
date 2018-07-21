$(document).ready(function(){
	getUsers();
	getReportedScripts();
	getBlocks();
	displayAddBlock();
});

function getUsers(){
	$.ajax({
		url: "http://localhost:8080/user",
		type: "GET",
		beforeSend: function(xhr){
			xhr.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem("token"));
			xhr.setRequestHeader("Content-type", "application/json");
		},
		dataType : 'json',
		success: function(data) {
			console.log(data);
			if(data != undefined){
				data.sort(function(a,b){
					return new Date(a.id) - new Date(b.id);
				})
				
				$("#Users").html("");

				let content = "<tr class=\"tableTitle\" style=\"font-size: 17px;\">";
				content += "<th onclick='sortTable(0)'>ID&#8597</th>>";
				content += "<th onclick='sortTable(1)'>NAME&#8597</th>";
				content += "<th onclick='sortTable(2)'>EMAIL&#8597</th>";
				content += "<th onclick='sortTable(3)'>INSCRIPTION&#8597</th>";
				content += "<th style=\"width: 1%;\" onclick='sortTable(4)'>ADMIN&#8597</th>";
				content += "<th style=\"width: 1%;\" onclick='sortTable(6)'>ENABLED&#8597</th>";
				content += "<th>Link</th>";
				content += "</tr>";
				$(content).appendTo("#Users");

				for(let i = 0; i < data.length; i++){
					let content = "<tr>";
					content += "<td>"+data[i].id+"</td>"
					content += "<td>"+data[i].name+"</td>";
					content += "<td>"+data[i].email+"</td>";
					content += "<td>"+data[i].date_insc+"</td>";
					content += "<td id=\"admin_"+data[i].id+"\">"+data[i].admin+"</td>";
					content += "<td id=\"enabled_"+data[i].id+"\">"+data[i].enabled+"</td>";
					content += "<td id=\"link_"+data[i].id+"\"><div style=\"cursor: pointer;\" onclick=\"displayUpdate("+data[i].id+")\">&#9998;</div></td>";
					content += "</tr>";
					$(content).appendTo("#Users");
				}

			}
		}
	});
}

function displayUpdate(id){

	$("#admin_"+id).html("<input id=\"newadmin_"+id+"\" class=\"userInput\" type=\"text\" value=\""+$("#admin_"+id).html()+"\">");
	$("#active_"+id).html("<input id=\"newactive_"+id+"\" class=\"userInput\" type=\"text\" value=\""+$("#active_"+id).html()+"\">");
	$("#enabled_"+id).html("<input id=\"newenabled_"+id+"\" class=\"userInput\" type=\"text\" value=\""+$("#enabled_"+id).html()+"\">");
	$("#link_"+id).html("<div style=\"cursor: pointer;\" onclick=\"confirmUpdate("+id+")\">&#10003;</div> &times; ");

}

function confirmUpdate(id){
	if($("#newadmin_"+id).val() !== "" && $("#newactive_"+id).val() !== "" && $("#newenabled_"+id).val() !== ""){
		$.ajax({
			url: "http://localhost:8080/user/update",
			type: "POST",
			data:JSON.stringify({
				"admin" : $("#newadmin_"+id).val(),
				"active" : $("#newactive_"+id).val(),
				"enabled" : $("#newenabled_"+id).val()
			}),
			dataType:'json',
			async: false,
			beforeSend: function(xhr){
				xhr.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem("token"));
				xhr.setRequestHeader("Content-type", "application/json");
			},
			success: function() {
				getUsers();
			}
		});
	}else{
		console.log("HERE");
	}
}

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
		if(res !== undefined) {
			$("#Reports").html("");

			let content = "<tr class=\"tableTitle\" style=\"font-size: 17px;\">";
			content += "<th onclick='sortTable(0)'>SCRIPT NAME&#8597</th>>";
			content += "<th onclick='sortTable(1)'>USER NAME&#8597</th>";
			content += "<th onclick='sortTable(2)'>REPORTS COUNTER&#8597</th>";
			content += "<th onclick='sortTable(3)'>COMMENTS COUNTER&#8597</th>";
			content += "<th onclick='sortTable(4)'>DISPLAY&#8597</th>";
			content += "<th style=\"width: 1%;\" onclick='sortTable(4)'>SHOW&#8597</th>";
			content += "</tr>";
			$(content).appendTo("#Reports");

			res.forEach((el)=> {	
				let content = "<tr>";
				content += "<td>"+el.Script.name+"</td>"
				content += "<td>"+el.Script.User.name+"</td>";
				content += "<td>"+el.count_scripts+"</td>";
				content += "<td>"+el.count_comments+"</td>";
				if(el.Script.available === 1) {
					content += "<td>Shown</td>";
				} else {
					content += "<td>Hidden</td>";
				}
				content += "<td><a onclick='displayDetailedReport("+el.id_script+", "+el.count_scripts+")' style='cursor: pointer; color: skyblue'>details</a></td>";
				content += "</tr>";
				$(content).appendTo("#Reports");
			});
		}
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
		$("#commentsDisplay").html("");
		if(res !== undefined) {
			res.forEach((el) => {
				let content = "<hr align='center' width='100%' class='mt-3 mb-4 bg-white'>"; 
				content += "<div class='text-justify col-md-12'>"+el.comment+"</div>";
				content += "<div class='offset-md-5'>- "+el.User.name+" ("+el.User.id+")</div>";
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
				$("#type_script").data("val", 1);
				$("#type_script").data("id", res[0].id);
			} else {
				$("#type_script").html("Hide");
				$("#type_script").data("val", 0);
				$("#type_script").data("id", res[0].id);
			}

			$(".downModalButton").html("<a href=\"scripts/"+res[0].name+"_"+id_script+".sm\" class=\"btn btn-primary addButton\">Download Script</a>");
			modal.style.display = "block";
		}
	})

	commentsDisplay(id_script);
}

function resetDiv() {
	var val = $("#type_script").data("val");
	var id_script = $("#type_script").data("id");
	scriptAvailable(id_script, val);
	if(val === 1) {
		$("#type_script").html("Hide");
		$("#type_script").data("val", 0);
	} else {
		$("#type_script").html("Show");
		$("#type_script").data("val", 1);
	}
}

function closeDetailedReport() {
	var modal = document.getElementById('detailedReportModal');
	modal.style.display = "none";
	getReportedScripts();
}

function scriptAvailable(id, value) {
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
}


function getBlocks() {
	$.ajax({
		url: 'http://localhost:8080/block/',
		type: 'GET',
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Content-type", "application/json");
		}
	})
	.done((res) => {
		$("#Blocks").html("");
		
		let content = "<tr class=\"tableTitle\" style=\"font-size: 17px;\">";
		content += "<th onclick='sortTable(0)'>Block name&#8597</th>>";
		content += "<th onclick='sortTable(1)'>Description&#8597</th>";
		content += "<th onclick='sortTable(1)'>Type&#8597</th>";
		content += "<th onclick='sortTable(1)'>Show&#8597</th>";
		content += "</tr>";
		$(content).appendTo("#Blocks");
		
		res.forEach((el) => {
			let content = "<tr>";
			content += "<td>"+el.name+"</td>"
			content += "<td><div class='float-left text-justify'>"+el.description+"</td></td>";
			content += "<td>"+el.type+"</td>";
			content += "<td><a style='cursor: pointer; color: skyblue' onclick='displayBlock("+el.id+")'>Details</a></td>";
			$("#Blocks").append(content);
		});
	})
}

function displayBlock(id_block) {
	var modal = document.getElementById('blockModal');
	modal.style.display = "block";

	$.ajax({
		url: 'http://localhost:8080/block/infos/'+id_block,
		type: 'GET',
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Content-type", "application/json");
		}
	})
	.done((res) => {
		console.log(res)
		$("#bt").html("");
		$("#at").html("");
		$("#it").html("");
		$("#ot").html("");
		
		let content = "<tr class=\"tableTitle align-middle\" style=\"font-size: 17px;\">";
		content += "<th>Name</th>";
		content += "<th class='col-md-6'>Description</th>";
		content += "<th class='col-md-3'>Type</th>";
		content += "</tr>";
		$("#bt").append(content);
		// ----------------
		content = "<tr class='align-middle'>";
		content += "<td class='pl-3 pr-3 pt-1 pb-1'>"+res.name+"</td>";
		content += "<td class='text-justify pl-3 pr-3 pt-1 pb-1'>"+res.description+"</td>";
		content += "<td class='pl-3 pr-3 pt-1 pb-1'>"+res.type+"</td>";
		content += "</tr>";
		$("#bt").append(content);
		
		var count = 1;
		for(var key in res) {
			if(!res.hasOwnProperty(key)) continue;
			if(!Array.isArray(res[key])) continue;
			var wh;
			switch(count) {
				case 1:
					wh = "#at";
					break;
				case 2:
					wh = "#it";
					break;
				case 3:
					wh = "#ot";
					break;
			}
			$(wh).append("<tr class=\"tableTitle align-middle\" style=\"font-size: 17px;\"></tr>");
			$(wh).append("<tr class='align-middle'></tr>");
			res[key].forEach((el) => {
				for(var k in el) {
					if(!el.hasOwnProperty(k)) continue;
					if(typeof el[k] === 'object') continue;
					if(k === "id") continue;
					$(wh+" tr").first().append("<th>"+k+"</th>");
					$(wh+" tr").last().append("<td class='pl-3 pr-3 pt-1 pb-1'>"+el[k]+"</td>");
				}
			});
			count++;
		}
//		
//		if(res.Arguments.length !== 0) {
//			content = "<tr class=\"tableTitle align-middle\" style=\"font-size: 13px;\">";
//			content += "<th>Name</th>";
//			content += "<th>Description</th>";
//			content += "<th>Key value</th>";
//			content += "</tr>";
//			$("#at").append(content);
//
//			res.Arguments.forEach((el) => {
//				content = "<tr class='align-middle'>";
//				content += "<td class='pl-3 pr-3 pt-1 pb-1'>"+el.name+"</td>";
//				content += "<td class='text-justify pl-3 pr-3 pt-1 pb-1 col-md-5'>"+el.description+"</td>";
//				content += "<td class='pl-3 pr-3 pt-1 pb-1'>"+el.keyValue+"</td>";
//				content += "</tr>";
//				$("#at").append(content);
//			});
//		}
//		
//		if(res.Instructions.length !== 0) {
//			content = "<tr class=\"tableTitle align-middle\" style=\"font-size: 13px;\">";
//			content += "<th>Name</th>";
//			content += "<th>Syntax</th>";
//			content += "<th>Platform</th>";
//			content += "<th>Type</th>";
//			content += "</tr>";
//
//			res.Instructions.forEach((el) => {
//				content = "<tr class='align-middle'>";
//				content += "<td class='pl-3 pr-3 pt-1 pb-1'>"+el.name+"</td>";
//				content += "<td class='text-justify pl-3 pr-3 pt-1 pb-1 col-md-5'>"+el.syntax+"</td>";
//				content += "<td class='pl-3 pr-3 pt-1 pb-1'>"+el.platform+"</td>";
//				content += "<td class='pl-3 pr-3 pt-1 pb-1'>"+el.type+"</td>";
//				content += "</tr>";
//				$("#it").append(content);
//			});
//		}
//		
//		if(res.Options.length !== 0) {
//			content = "<tr class=\"tableTitle align-middle\" style=\"font-size: 13px;\">";
//			content += "<th>Name</th>";
//			content += "<th>Syntax</th>";
//			content += "<th>Platform</th>";
//			content += "<th>Type</th>";
//			content += "</tr>";
//
//			res.Instructions.forEach((el) => {
//				content = "<tr class='align-middle'>";
//				content += "<td class='pl-3 pr-3 pt-1 pb-1'>"+el.name+"</td>";
//				content += "<td class='text-justify pl-3 pr-3 pt-1 pb-1 col-md-5'>"+el.syntax+"</td>";
//				content += "<td class='pl-3 pr-3 pt-1 pb-1'>"+el.platform+"</td>";
//				content += "<td class='pl-3 pr-3 pt-1 pb-1'>"+el.type+"</td>";
//				content += "</tr>";
//				$("#ot").append(content);
//			});
//		}
	})
	.fail((err) => {
		
	})
}

function closeBlock() {
	var modal = document.getElementById('blockModal');
	modal.style.display = "none";
	getBlocks();
}

function displayAddBlock() {
	var modal = document.getElementById('addblockModal');
	modal.style.display = "block";
}

function closeAddBlock() {
	var modal = document.getElementById('addblockModal');
	modal.style.display = "none";
	getBlocks();
}