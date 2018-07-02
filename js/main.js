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
	if(rgx.test(email) === false || email.localeCompare("") === 0) {
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
			sessionStorage.setItem("id", data.id);
			sessionStorage.setItem("token", data.token);
			console.log(data)
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