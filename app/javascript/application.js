const toggles = Array.from(document.querySelectorAll("[data-toggle]"));
const header = document.querySelector("header > div");
const nav = document.querySelector("nav");

const toggleClasses = (items, classes) =>
  [items].flat().forEach((l) => classes.forEach((c) => l.classList.toggle(c)));

const toggleMenu = () => {
  toggleClasses(header, ["bg-brand-dark", "bg-blue-100", "text-white"]);
  toggleClasses(nav, ["translate-y-0", "-translate-y-full"]);
  toggleClasses(toggles, ["hidden"]);
 }

toggles.forEach((toggle) => toggle.addEventListener("click", toggleMenu));
