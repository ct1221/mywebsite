// Home Page //

Zepto(function($) {

    var verse_button = $('.verse .button');
    // Makes sure Zepto adds class, so functoin only works if Zepto exists.
    // "hide" class is so that div does not show up on page load.
    $('.pop-up').addClass('hide');
    $('.pop-up').addClass('active-jq');
    $('.close').on('click', function(e) {
        $('.pop-up').addClass('active-jq');
        verse_button.removeClass('active');
    })

    verse_button.on('click touchmove', function(e) {
        $('.pop-up').removeClass('hide');
        $('.pop-up').removeClass('active-jq');
        $(this).addClass('active');
    })
})
