//////////////////////////////////////
//
//         Hamburger Menu 
//
//////////////////////////////////////


/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function toggleHamburger() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  function toggleHamburgerHome() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav" || x.className === "topnav home") {
      x.className += " responsive";
    } else {
      x.className = "topnav home";
    }
  }

//////////////////////////////////////
//
//         Accordian Divs 
//
//////////////////////////////////////

  // Toggle accordian displays
  var acc = document.getElementsByClassName("accordion-header");
  var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
      panel.parentElement.scrollIntoView({behavior: 'smooth', block: 'start'})
    }
  });
}






