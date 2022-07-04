// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
const menu = document.querySelector("#menu");

menu.classList.remove("hidden");

menu.addEventListener("click", function () {
  const header = document.querySelector("header");
  header.classList.toggle("bg-brand-dark");
  header.classList.toggle("text-white");
  document.querySelector("nav").classList.toggle("hidden");
});