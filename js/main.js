function closeConnect() {
	var modal = document.getElementById('connectModal');
    modal.style.display = "none";
}

function displayConnect(){
	var modal = document.getElementById('connectModal');
	 modal.style.display = "block";
}

function displayUpload(){
	var modal = document.getElementById('uploadModal');
	 modal.style.display = "block";
}

function closeUpload() {
	var modal = document.getElementById('uploadModal');
    modal.style.display = "none";
}

function sign_up() {
  let form = $("#signin_form");
  let validation = Array.prototype.filter.call(form, function(data) {
    data.addEventListener('submit', function(event) {
      if(data.checkValidity() === false) {
        event.preventDefault(),
        event.stopPropagation();
      }
    }, false);
  });
  
  let error = false;
  var rgx = RegExp(".*@.*\\..*");
  if($("#username_signin").val().localeCompare("") === 0) {
    error = true;
  }
  if($("#email_signin").val().localeCompare("") === 0) {
    error = true;
  }
  if(rgx.test($("#email_signin").val()) === false) {
    error = true;
  }
  if($("#password_signin1").val().localeCompare("") === 0) {
    error = true;
  }
  if($("#password_signin2").val().localeCompare("") === 0) {
    error = true;
  }
  
  if(error === false) {
    $.ajax({
      url: "sign_in.php",
      method: "POST",
      data: {
        login: $("#username_signin").val(),
        email: $("#email_signin").val(),
        pwd1: $("#password_signin1").val(),
        pwd2: $("#password_signin2").val()
      },
      success: function(data) {
        console.log(data);
        $("#errorr").html(data);
        if(data.localeCompare("error_pwd") === 0) {
          console.log("ici");
          $("#password_signin1").addClass("is-invalid");
          $("#password_signin2").addClass("is-invalid");
        }
      }
    }) 
  }
}