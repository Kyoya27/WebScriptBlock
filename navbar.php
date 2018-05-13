<div class="dropdown">
  <button class="dropbtn">Menu</button>
  <div class="dropdown-content">
    <a href="homepage.php">Home</a>
    <a href="community.php">Community</a>
    <?php
    if(isset($_SESSION['email'])) {
      echo '<a href="destroy_session.php">Disconnect</a>';
    } else {
      echo '<a href="#" onclick="displayConnect()">Connect/Register</a>';
    }
    if(isset($_SESSION['rank']) && $_SESSION['rank'] == 1) {
      echo '<a href="#" onclick="displayAdd()">Add Article</a>';
    }
     ?>
  </div>
</div>