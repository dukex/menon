//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require bootstrap-sprockets
//= require blazy
//= require_tree .

var handleEvent = function(eventName, handler) {
  document.addEventListener(eventName, handler, false);
};

handleEvent("turbolinks:load", function loadPage() {
  var blazy = new Blazy({
    success: function blazySuccess () {
      var height = $(".course-wrapper .course")
                    .map(function returnsHeight(){
                      return this.offsetHeight+40
                    });
      var maxHeight = Math.max.apply(0, height);
      $('.course-wrapper').css('height', maxHeight);
    }
  });

  var progress = $('.course-progress').text();
  $('.course-progress .bar').css("width", progress);

  $('#languages button').on('click', function(e) {
    var target = $(e.target);
    document.cookie = "locale=" + target.data('lang');
    Turbolinks.visit();
  });
});
