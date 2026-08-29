const CITY_DATA = {
  calgary:  { label: "Calgary",        accentVar: "--accent-calgary" },
  nyc:      { label: "New York City",  accentVar: "--accent-nyc" },
  waterloo: { label: "Waterloo",       accentVar: "--accent-waterloo" },
};

const CITY_KEYS = Object.keys(CITY_DATA);
let currentCity = CITY_KEYS[Math.floor(Math.random() * CITY_KEYS.length)];

function currentTheme() {
  return document.body.dataset.theme === "night" ? "night" : "day";
}

function activeImageKey() {
  return `${currentCity}_${currentTheme()}`;
}

function updateScene() {
  const key = activeImageKey();
  document.querySelectorAll(".scene img").forEach((img) => {
    img.classList.toggle("active", img.dataset.key === key);
  });
}

function applyCity(cityKey) {
  currentCity = cityKey;
  const city = CITY_DATA[cityKey];
  document.body.dataset.city = cityKey;
  document.documentElement.style.setProperty("--city-accent", `var(${city.accentVar})`);
  document.getElementById("cityLabel").textContent = city.label;
  document.querySelectorAll(".city-dot").forEach((dot) => {
    dot.classList.toggle("active", dot.dataset.city === cityKey);
  });
  updateScene();
}

document.addEventListener("DOMContentLoaded", () => {
  applyCity(currentCity);

  document.querySelectorAll(".city-dot").forEach((dot) => {
    dot.addEventListener("click", () => {
      if (dot.dataset.city === currentCity) return;
      applyCity(dot.dataset.city);
    });
  });

  const themeToggle = document.getElementById("themeToggle");
  themeToggle.addEventListener("click", () => {
    const next = currentTheme() === "night" ? "day" : "night";
    document.body.dataset.theme = next;
    themeToggle.textContent = next === "night" ? "☀️" : "🌙";
    updateScene();
  });

  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
      document.querySelectorAll(".panel-view").forEach((v) => v.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(`view-${tab.dataset.view}`).classList.add("active");
    });
  });

  document.querySelectorAll(".subtab").forEach((sub) => {
    sub.addEventListener("click", () => {
      document.querySelectorAll(".subtab").forEach((s) => s.classList.remove("active"));
      document.querySelectorAll(".project-list").forEach((l) => l.classList.remove("active"));
      sub.classList.add("active");
      document.getElementById(`sub-${sub.dataset.sub}`).classList.add("active");
    });
  });
});