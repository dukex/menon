// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails

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

// toggles.forEach(function (t) {
//   t.addEventListener("click", function () {
//     toggleClasses(header, ["bg-brand-dark", "bg-blue-100", "text-white"]);
//     toggleClasses(nav, ["translate-y-0", "-translate-y-full"]);
//     toggleClasses(toggles, ["hidden"]);
//   });
// });

// menu.classList.remove("hidden");

// const close = document.querySelector("#close");

// close.addEventListener("click", function () {
//   const header = document.querySelector("header");
//   header.classList.toggle("bg-brand-dark");
//   header.classList.toggle("text-white");
//   close.classList.toggle("hidden");
//   document.querySelector("nav").classList.toggle("scale-0");
//   document.querySelector("nav").classList.toggle("scale-100");

//   menu.classList.toggle("hidden");
// });
