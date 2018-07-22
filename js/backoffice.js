$(document).ready(function(){
	getUsers();
	getReportedScripts();
	getBlocks();
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
					content += "<td id=\"name_"+data[i].id+"\">"+data[i].name+"</td>";
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

function deleteUser(id) {
  $.ajax({
    url: "http://localhost:8080/user/update",
    type: "POST",
    data:JSON.stringify({
      "id": id,
      "enabled" : 0
    }),
    dataType:'json',
    beforeSend: function(xhr){
      xhr.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem("token"));
      xhr.setRequestHeader("Content-type", "application/json");
    },
    success: function() {
      getUsers();
    }
  });
}

function displayUpdate(id){
	$("#name_"+id).html("<input id=\"newname_"+id+"\" class=\"userInput\" type=\"text\" value=\""+$("#name_"+id).html()+"\">");
	$("#admin_"+id).html("<input id=\"newadmin_"+id+"\" class=\"userInput\" type=\"text\" value=\""+$("#admin_"+id).html()+"\">");
	$("#enabled_"+id).html("<input id=\"newenabled_"+id+"\" class=\"userInput\" type=\"text\" value=\""+$("#enabled_"+id).html()+"\">");
	$("#link_"+id).html("<div style=\"cursor: pointer;\" onclick=\"confirmUpdate("+id+")\">&#10003;</div>");
	$("#link_"+id).append("<div style=\"cursor: pointer;\" onclick=\"deleteUser("+id+")\">&times;</div>");
}

function confirmUpdate(id){
	if($("#newname_"+id).val() !== "" && $("#newadmin_"+id).val() !== "" && $("#newenabled_"+id).val() !== ""){
		$.ajax({
			url: "http://localhost:8080/user/update",
			type: "POST",
			data:JSON.stringify({
        "id": id,
				"name" : $("#newname_"+id).val(),
				"admin" : $("#newadmin_"+id).val(),
				"enabled" : $("#newenabled_"+id).val()
			}),
			dataType:'json',
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
		content += "<th onclick='sortTable(1)'>Remove&</th>";
		content += "</tr>";
		$(content).appendTo("#Blocks");
		
		res.forEach((el) => {
			let content = "<tr>";
			content += "<td>"+el.name+"</td>"
			content += "<td><div class='float-left text-justify'>"+el.description+"</td></td>";
			content += "<td>"+el.type+"</td>";
			content += "<td><a style='cursor: pointer; color: skyblue' onclick='displayBlock("+el.id+")'>Details</a></td>";
			content += "<td><a style='cursor: pointer; color: skyblue;' onclick='removeBlock("+el.id+")'>X</a></td>";
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
    res = res[0]
    console.log("res")
		$("#bt").html("");
		$("#at").html("");
		$("#it").html("");
		$("#ot").html("");
		
		let content = "<tr class='tableTitle align-middle' style='font-size: 17px;'>";
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
      if(res[key].length === 0) {
        if(count === 1) { $("#at").html("No Arguments"); }
        else if(count === 2) { $("#it").html("No Arguments"); }
      } else {
        if(count === 1) { wh = "#at"; }
        else if(count === 2) { wh = "#it"; }
      }
      
      var ver = false;
			$(wh).append("<tr class='tableTitle align-middle' style='font-size: 17px;'></tr>");
			res[key].forEach((el) => {
        $(wh).append("<tr class='align-middle'></tr>");
				for(var k in el) {
					if(!el.hasOwnProperty(k)) continue;
					if(typeof el[k] === 'object') continue;
					if(k === "id") continue;
          if(!ver) $(wh+" > tr").first().append("<th>"+k+"</th>");
					$(wh+" > tr").last().append("<td class='pl-3 pr-3 pt-1 pb-1 col'>"+el[k]+"</td>");
				}
        ver = true;
			});
			count++;
		}
	})
}

function closeBlock() {
	var modal = document.getElementById('blockModal');
	modal.style.display = "none";
	getBlocks();
}

var resetAB;

function displayAddBlock() {
	var modal = document.getElementById('addblockModal');
  resetAB = $(modal).html();
	modal.style.display = "block";
}

function closeAddBlock() {
	var modal = document.getElementById('addblockModal');
	modal.style.display = "none";
  $("#addblockModal").html(resetAB)
	getBlocks();
}

function remove_arg_line(id) {
  id.remove();
}

function remove_inst_line(id) {
  id.remove();
}

function remove_opt_line(id) {
  id.remove();
}

function add_arg_row() {
  var last_id = $("#hr_inst").prev().get(0).id;
  $("#"+last_id+" .add_arg").addClass("bg-danger text-white").val("-").attr("onclick", "remove_arg_line("+last_id+")");
  
  $('<div class="form-row pb-2 pt-2 args_info" id="'+(last_id + 1)+'">'+
      '<div class="col-md-2 d-flex flex-row-reverse align-bottom">'+
        '<input type="button" value="+" class="btn add_arg" onclick="add_arg_row()">'+
      '</div>'+
      '<div class="col-md-2">'+
        '<input type="text" class="form-control" data-key="name" placeholder="Name">'+
      '</div>'+
      '<div class="col-md-3">'+
        '<input type="text" class="form-control" data-key="keyValue" placeholder="Key">'+
      '</div>'+
      '<div class="col-md-4">'+
        '<input type="text" class="form-control" data-key="description" placeholder="Description">'+
      '</div>'+
    '</div>').insertBefore("#hr_inst")
}

function add_inst_row() {
  var last_id = $("#hr_end").prev().get(0).id;
  $("#"+last_id+" .add_inst").addClass("bg-danger text-white").val("-").attr("onclick", "remove_inst_line("+last_id+")");
  
  $('<div class="form-row pb-2 pt-2 inst_infos" id="'+(last_id + 1)+'">'+
      '<div class=" col-md-2 d-flex flex-row-reverse align-bottom">'+
        '<input type="button" value="+" class="btn add_inst" onclick="add_inst_row()">'+
      '</div>'+
      '<div class="col-md-1">'+
        '<input type="text" class="form-control" data-key="name" placeholder="Name">'+
      '</div>'+
      '<div class="col-md-2">'+
        '<input type="text" class="form-control" data-key="syntax" placeholder="Syntax">'+
      '</div>'+
      '<div class="col-md-2">'+
        '<select class="custom-select" data-key="type">'+
          '<option value="blocs">blocs</option>'+
          '<option value="arguments">arguments</option>'+
          '<option value="text-only">text-only</option>'+
        '</select>'+
     ' </div>'+
      '<div class="col-md-2">'+
        '<select class="custom-select" data-key="platform">'+
          '<option value="Windows">Windows</option>'+
          '<option value="Unix">Unix</option>'+
        '</select>'+
      '</div>'+
      '<div class="col-md-1">'+
        '<select class="custom-select" data-key="chariot">'+
          '<option value="1">Input</option>'+
          '<option value="0">Nothing</option>'+
        '</select>'+
      '</div>'+
      '<div class="col-md-1">'+
        '<input type="number" class="form-control" data-key="pos">'+
      '</div>'+
    '</div>').insertBefore("#hr_end")
}

function addBlock() {
  var counter = 0;
  var block_obj = {};
  var args = [];
  var insts = [];
  var temp;
  
  $.each($("#add_block_form > .form-row").not(".titles"), function(key, value) {
    if($(value).hasClass("args_infos")) counter = 1;
    if($(value).hasClass("inst_infos")) counter = 2;
    temp = {}
    $(value).find(":input").not(".add_arg, .add_inst, .add_opt").each((k, v) => {
      temp[$(v).data("key")] = $(v).val();
    })
    
    var ok = true;
    for(var k in temp) {
      if(!temp.hasOwnProperty(k)) continue;
      if(temp[k] === "") {
        ok = false;
        break;
      }
    }
    
    if(ok) {
      switch(counter) {
        case 0:
          block_obj = temp;
          break;
        case 1:
          args.push(temp);
          break;
        case 2:
          insts.push(temp);
          break;
      }
    }
  })
  
  createBlock(block_obj, args, insts);
}

function createBlock(block_obj, args_arr, insts_arr, opts_arr) {
  
  if($.isEmptyObject(block_obj)) return;
  
  $.ajax({
    url: "http://localhost:8080/block/add",
    type: "POST",
    beforeSend: function(xhr){
			xhr.setRequestHeader("Content-type", "application/json");
			xhr.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem("token"));
		},
		data : JSON.stringify(block_obj)
  })
  .done((res) => {
    args_arr.forEach((el) => {
      el.id_block = res.id;
      $.ajax({
        url: "http://localhost:8080/argument/addToBlock",
        type: "POST",
        aync: false,
        beforeSend: function(xhr){
          xhr.setRequestHeader("Content-type", "application/json");
          xhr.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem("token"));
        },
        data : JSON.stringify(el)
      })
    })
    
    insts_arr.forEach((el) => {
      el.id_block = res.id;
      $.ajax({
        url: "http://localhost:8080/instruction/addToBlock",
        type: "POST",
        async: false,
        beforeSend: function(xhr){
          xhr.setRequestHeader("Content-type", "application/json");
          xhr.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem("token"));
        },
        data : JSON.stringify(el)
      })
    })
    closeAddBlock();
  })
  .fail((err) => {
    console.log(err.responseText);
  })
}

function activeOpt(item) {
  $(".opt").each((k, v) => {
    console.log(v)
    if($(v).hasClass("btn-success")) {
      console.log("ici")
      $(v).removeClass("btn-success");
    }
  });
  
  $(item).addClass("btn-success");
}

function removeBlock(id_block) {
  $.ajax({
    url: "http://localhost:8080/block/removeFull/"+id_block,
    type: "DELETE",
    beforeSend: (xhr) => {
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem("token"))
    }
  })
  .done((res) => {
    getBlocks();
  })
}

function editBlock() {
  var a = $("#blockModal").find("td");
  $(a).each((i, v) => {
    let h = $(v).html()
    $(v).html("<input type='text' value='"+h+"' class='form-control col'>")
  });
}