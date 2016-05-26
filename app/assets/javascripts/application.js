//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require bootstrap-sprockets
//= require_tree .

window.handleEvent = function(eventName, handler) {
  document.addEventListener(eventName, handler, false);
};

handleEvent("turbolinks:load", function loadPage() {
  var height = $(".course-wrapper").map(function returnsHeight(){
    return this.offsetHeight
  });
  var maxHeight = Math.max.apply(0, height);

  $('.course-wrapper').css('height', maxHeight);

  var progress = $('.course-progress').text();
  $('.course-progress .bar').css("width", progress);
});
