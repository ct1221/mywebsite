// Home Page //

Zepto(function($){

  var verse_button = $('.verse .button');
  // Makes sure Zepto adds class, so functoin only works if Zepto exists.
  // "hide" class is so that div does not show up on page load.
  $('.pop-up').addClass('hide');
  $('.pop-up').addClass('active-jq');
  $('.close').on('click', function (e) {
    $('.pop-up').addClass('active-jq');
    verse_button.removeClass('active');
  })

  $(document).on('click', '.verse .button', function (e) {
    $('.pop-up').removeClass('hide');
    $('.pop-up').toggleClass('active-jq');
    $(this).toggleClass('active');
  })
  $('.verse .button').on('click', function() {});
})
