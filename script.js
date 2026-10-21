// Toggle dark mode when the user clicks the button

const themeBtn = document.getElementById("themeBtn");

let isDarkMode = false;

themeBtn.addEventListener("click",
 function() {
    isDarkMode = !isDarkMode;

  if (isDarkMode) {
  document.body.classList.add("dark-mode");

                 themeBtn.textContent = "Light Mode";

  } else {

  document.body.classList.remove("dark-mode");
              themeBtn.textContent = "Dark Mode";

  }
  });

// Show or hide project details when the button is clicked

function myFunction() {
  let x = document.getElementById("myproj");
  let btn = document.getElementById("projectBtn");

  if (getComputedStyle(x).display === "none") {
    x.style.display = "block";
    btn.textContent = "Hide Project Details";
  } else {
    x.style.display = "none";
    btn.textContent = "Show Project Details";
  }
}