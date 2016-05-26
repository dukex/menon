//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require bootstrap-sprockets
//= require_tree .


$(document).on('ready page:load', function(event) {
  var height = $(".course-wrapper").map(function() { return this.offsetHeight });
  var maxHeight = Math.max.apply(0, height);

  $('.course-wrapper').css('height', maxHeight);

  var progress = $('.course-progress').text();
  $('.course-progress .bar').css("width", progress);
});
