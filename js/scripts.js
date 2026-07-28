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
  await loadComponent("footer", "footer.html");

  var toggle = document.getElementById("menuToggle");
  var closeBtn = document.getElementById("navClose");
  var overlay = document.getElementById("navOverlay");

  function openMenu() {
    overlay.classList.add("active");
    toggle.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    overlay.classList.remove("active");
    toggle.setAttribute("aria-expanded", "false");
  }

  if (toggle) toggle.addEventListener("click", openMenu);
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
}

init();
