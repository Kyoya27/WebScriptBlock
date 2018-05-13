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
        let verif = 0;
        console.log(data);
        $("#errorr").html(data);
        if(data.localeCompare("error_pwd") === 0) {
          $("#password_signin1").addClass("is-invalid");
          $("#password_signin2").addClass("is-invalid");
          verif = 1;
        }
        
        if(data.localeCompare("error_login") === 0) {
          $("#username_signin").addClass("is-invalid");
          verif = 1;
        }
        
        if(verif === 0) closeConnect();
      }
    });
  }
}

function log_in() {
  let form = $("#connect_form");
  let validation = Array.prototype.filter.call(form, function(data) {
    data.addEventListener('submit', function(event) {
      if(data.checkValidity() === false) {
        event.preventDefault(),
        event.stopPropagation();
      }
    }, false);
  });
  
  let error = false;
  
  if($("#username_login").val().localeCompare("") === 0) {
    error = true;
  }
  if($("#password_login").val().localeCompare("") === 0) {
    error = true;
  }
  
  if(error === false) {
    $.ajax({
      url: "log_in.php",
      method: "POST",
      data: {
        login: $("#username_login").val(),
        pwd: $("#password_login").val(),
      },
      success: function(data) {
        let verif = 0;
        if(data.localeCompare("error") === 0) {
          $("#username_login").addClass("is-invalid");
          $("#password_login").addClass("is-invalid");
          verif = 1;
        }
        if(verif === 0) window.location.href = 'community.php'
      }
    });
  }
}

function closeModal(modalId, event){
	var modal = document.getElementById(modalId);
    if (event.target == modal) {
        modal.style.display = "none";
    }
}