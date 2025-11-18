const input = document.getElementById("q");
const form = document.getElementById("searchForm");
const chips = document.querySelectorAll(".chip");

// fill query when clicking a suggested chip
chips.forEach(btn => {
  btn.addEventListener("click", () => {
    input.value = btn.dataset.topic;
  });
});

// submit → go to result page with ?q=
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const topic = (input.value || "").trim();
  if (!topic) return;
  window.location.href = `result.html?q=${encodeURIComponent(topic)}`;
});
