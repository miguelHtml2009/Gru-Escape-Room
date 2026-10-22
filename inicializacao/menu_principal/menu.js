var modal = document.getElementById("modal");

var bot = document.getElementById("configb");

var span = document.getElementsByClassName("fecha")[0];

bot.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}