$(document).ready(function() {
  if(sessionStorage.getItem("token")) {
    $("a#authent").on("click", function() {
      sessionStorage.clear();
      window.location = 'index.php';
    });
    $("a#authent").html("Disconnect");
  } else {
    $("a#authent").on("click", displayConnect)
    $("a#authent").html("Connect/Register");;
  }
  $("a#authent").css("cursor", "pointer");
  
  if(sessionStorage.getItem("isAdmin") === "1" && sessionStorage.getItem("token")) {

		$("div#menuNav").append('<a id="backoffice_btn" href="backoffice.php">Back Office <span class="caret"></span></a>');
    $("a#backoffice_btn").removeClass("invisible");
    $("a#backoffice_btn").css("cursor", "pointer");

		$("div#menuNav").append('<a id="report_btn" href="report.php">Report Office <span class="caret"></span></a>');
		$("a#backoffice_btn").removeClass("invisible");
		$("a#backoffice_btn").css("cursor", "pointer");
		
    var lastpart = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
    if(lastpart === "homepage.php" || lastpart === "homepage.php?" || lastpart === "homepage.php#") {

			$("div#menuNav").append('<a id="article_btn">Add Article</a>');
      $("a#article_btn").removeClass("invisible");
      $("a#article_btn").on("click", displayAdd);
      $("a#article_btn").css("cursor", "pointer");

    }
  }
  
  let searchParams = new URLSearchParams(window.location.search);
  if(searchParams.has("reco")) {
    if(searchParams.get("reco") === "yes") {
      setTimeout(displayConnect(), 500);
    }
  }
});

$('#backoffice_btn').on("click", function(e){
	console.log("nani")
	$("#bo_dropdown").toggle();
	e.stopPropagation();
	e.preventDefault();
});

function closeConnect() {
	var modal = document.getElementById('connectModal');
    modal.style.display = "none";
}

function displayConnect(){
	var modal = document.getElementById('connectModal');
	 modal.style.display = "block";
}

function sign_up() {
  let form = $("#signin_form");
	
	let name = form.find("input[id='username_signin']").val();
	let email = form.find("input[id='email_signin']").val();
	let pwd1 = form.find("input[id='password_signin1']").val();
	let pwd2 = form.find("input[id='password_signin2']").val();
	
  let error = false;
  var rgx = RegExp(".*@.*\\..*");
  if(name === "") {
    error = true;
  }
	if(rgx.test(email) === false || email === "") {
    error = true;
  }
  if(pwd1 === "") {
    error = true;
  }
  if(pwd2 === "") {
    error = true;
  }
  
  if(error === false) {
		$.ajax({
			url: "http://localhost:8080/user/register",
			data: JSON.stringify({
				name: name,
				email: email,
				password1: pwd1,
				password2: pwd2
			}),		
			method: "POST",
			beforeSend: function(xhr){
				xhr.setRequestHeader("Content-type", "application/json");
			}
		})
		.done(function(data) {
			console.log(data);
		})
		.fail(function(err) {
			console.log(err.responseJSON)
		});
	}
}

function log_in() {
  let form = $("#connect_form");
  
	let email = form.find("input[id='email_login']").val();
	let pwd = form.find("input[id='password_login']").val();
	
  let error = false;
  
	if(email === "") {
    error = true;
  }
  if(pwd === "") {
    error = true;
  }
  
  if(error === false) {
		$.ajax({
			url: "http://localhost:8080/user/login",
			method: "POST",
			data: JSON.stringify({
				email: email,
				password: pwd
			}),
			beforeSend: function(xhr){
				xhr.setRequestHeader("Content-type", "application/json");
			}			
		})
		.done(function(data) {
			console.log(data);
      Object.keys(data).forEach(function(key) {
      	sessionStorage.setItem(key, data[key]);
     	});
      
      window.location = "homepage.php";
		})
		.fail(function(err){
			console.log(err.responseJSON)
		});
  }
}

function closeModal(modalId, event){
	var modal = document.getElementById(modalId);
    if (event.target == modal) {
        modal.style.display = "none";
    }
}