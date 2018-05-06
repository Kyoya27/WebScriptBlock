function connect_modal() {
  $.get("modals/connection.php", function(data) {
    $("#body_display").html(data);
  })
  
  $('#modal').modal('show');
}

function upload_modal() {
  $.get("modals/upload.php", function(data) {
    $("#body_display").html(data);
  })
  
  $('#modal').modal('show');
}