async function loadComponent(id, file) {
  const response = await fetch(file);

  if (!response.ok) {
    throw new Error(`Failed to load ${file}`);
  }

  const html = await response.text();
  document.getElementById(id).innerHTML = html;
}

(function () {})();

async function init() {
  await loadComponent("header", "header.html");

  var toggle = document.getElementById("menuToggle");
  var closeBtn = document.getElementById("navClose");
  var overlay = document.getElementById("navOverlay");

  function openMenu() {
    overlay.classList.add("active");
  }

  function closeMenu() {
    overlay.classList.remove("active");
  }

  toggle.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);
}

init();
