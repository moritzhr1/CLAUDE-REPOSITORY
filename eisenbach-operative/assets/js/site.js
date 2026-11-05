// Keeps the copyright year current. This is the site's only script.
document.querySelectorAll("[data-year]").forEach(function (el) {
  el.textContent = String(new Date().getFullYear());
});
