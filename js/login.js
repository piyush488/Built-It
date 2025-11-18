// Very simple demo auth. No server. Don't overthink it.
const form = document.getElementById("loginForm");
const emailEl = document.getElementById("email");
const passEl = document.getElementById("password");
const err = document.getElementById("loginError");

function validEmail(v) {
  // simple pattern is enough for class project
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  err.textContent = "";

  const email = emailEl.value.trim();
  const pwd = passEl.value;

  if (!validEmail(email)) {
    err.textContent = "Enter a valid email.";
    return;
  }
  if (pwd.length < 6) {
    err.textContent = "Password must be at least 6 characters.";
    return;
  }

  // store minimal session (demo only)
  localStorage.setItem("builtit_user", JSON.stringify({ email, ts: Date.now() }));

  // go to Home
  window.location.href = "index.html";
});
