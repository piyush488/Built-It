// theme.js – persists theme and toggles [data-theme] on <html>
(function () {
  const root = document.documentElement;
  const btn = document.getElementById("themeToggle");
  const label = document.getElementById("themeLabel");

  // Read saved theme, else match system, default dark
  const saved = localStorage.getItem("builtit_theme");
  const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
  const initial = saved || (prefersLight ? "light" : "dark");
  apply(initial);

  if (btn) {
    btn.addEventListener("click", () => {
      const next = (root.getAttribute("data-theme") === "light") ? "dark" : "light";
      apply(next);
      try { localStorage.setItem("builtit_theme", next); } catch {}
    });
  }

  function apply(mode){
    if (mode === "light") {
      root.setAttribute("data-theme","light");
      if (label) label.textContent = "Light";
    } else {
      root.removeAttribute("data-theme"); // dark is default
      if (label) label.textContent = "Dark";
    }
  }
})();
