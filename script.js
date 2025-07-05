// Toggle Side Menu
const hamburger = document.getElementById('hamburger');
const sideMenu = document.getElementById('sideMenu');

hamburger.addEventListener('click', () => {
  sideMenu.classList.toggle('show');
});

// Dark Mode Handling
if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark");
}

const darkModeToggle = document.getElementById('darkModeToggle');
if (darkModeToggle) {
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    saveDarkModeState();
  });
}

const sideDarkModeToggle = document.getElementById('sideDarkModeToggle');
if (sideDarkModeToggle) {
  sideDarkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    saveDarkModeState();
  });
}

function saveDarkModeState() {
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("darkMode", "enabled");
  } else {
    localStorage.setItem("darkMode", "disabled");
  }
}

// Close menu on outside click
document.addEventListener('click', function (event) {
  if (
    sideMenu.classList.contains('show') &&
    !sideMenu.contains(event.target) &&
    !hamburger.contains(event.target)
  ) {
    sideMenu.classList.remove('show');
  }
});




