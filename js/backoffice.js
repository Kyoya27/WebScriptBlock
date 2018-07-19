$(document).ready(function(){
	getUsers();
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
				content += "<th onclick='sortTable(0)'>ID &#8597</th>>";
				content += "<th onclick='sortTable(1)'>NAME &#8597</th>";
				content += "<th onclick='sortTable(2)'>EMAIL &#8597</th>";
				content += "<th onclick='sortTable(3)'>INSCRIPTION&#8597</th>";
				content += "<th style=\"width: 1%;\" onclick='sortTable(4)'>ADMIN&#8597</th>";
				content += "<th style=\"width: 1%;\" onclick='sortTable(5)'>ACTIVE&#8597</th>";
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
					content += "<td id=\"active_"+data[i].id+"\">"+data[i].active+"</td>";
					content += "<td id=\"enabled_"+data[i].id+"\">"+data[i].enabled+"</td>"
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
				"id": id,
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