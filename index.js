var moon = document.getElementById("myMoon");

moon.addEventListener("change", function() {
  document.body.classList.toggle("dark-theme");

  var moon1 = document.getElementById("moon1");
  if (document.body.classList.contains("dark-theme")) {
    moon1.src = "images/moon2.png";
  } else {
    moon1.src = "images/moon1.png";
  }
  }
)