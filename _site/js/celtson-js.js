
Zepto(function($) {
    // Make page transition smoothly after page load.
    $(window).bind("load", function() {
      $("body").removeClass('fade-out');
    })

    // ============= Home Page =============== //
    // =============           =============== //

    var verse_button = $('.verse-button');
    var icons_button = $('.social-button');

    var verse_popup = $('.pop-up.verse');
    var icons_popup = $('.pop-up.social-icons');

    // Makes sure Zepto adds class, so functoin only works if Zepto exists.
    // "hide" class is so that div does not show up on page load.
    $('.pop-up').addClass('hide');
    $('.pop-up').addClass('active-jq');

    // Make sure remove hide class so transition occurs after page load
    setTimeout(function(){
      $('.pop-up').removeClass('hide');
    }, 1000);

    $('.close').on('click', function(e) {
        $('.pop-up').addClass('active-jq');

        // Make sure to close the correct pop up
        if ($(this).parent().hasClass('verse')) {
            verse_button.removeClass('active');
        } else if ($(this).parent().hasClass('social-icons')) {
            icons_button.removeClass('active');
        }
    })

    // Touch Move event is so that it works on first click for Safari in iPhones/iPads.
    verse_button.on('click touchmove', function(e) {
        // Hide the icon's pop up if they are open
        icons_popup.addClass('active-jq');
        icons_button.removeClass('active');

        verse_popup.removeClass('hide');
        verse_popup.toggleClass('active-jq');
        $(this).toggleClass('active');
    })

    icons_button.on('click touchmove', function(e) {
        // Hide the verse pop up if is open
        verse_popup.addClass('active-jq');
        verse_button.removeClass('active');

        icons_popup.removeClass('hide');
        icons_popup.toggleClass('active-jq');
        $(this).toggleClass('active');
    })

})
