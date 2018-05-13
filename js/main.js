function closeConnect() {
	var modal = document.getElementById('connectModal');
    modal.style.display = "none";
}

function displayConnect(){
	var modal = document.getElementById('connectModal');
	 modal.style.display = "block";
}

function upload_modal() {
  $.get("modals/upload.php", function(data) {
    $("#body_display").html(data);
  })
  
  $('#modal').modal('show');
}

function closeModal(modalId,event){
	var modal = document.getElementById(modalId);
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
	