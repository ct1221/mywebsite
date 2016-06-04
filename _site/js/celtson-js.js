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
    setTimeout(function() {
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


    // ============= About Page =============== //
    // =============           =============== //

    // 1. Add image class from the div that was clicked to the current active image div
    // 2. Remove current image class from the div that has an active class
    // 3. Remove active class
    // 4. Remove image class from the clicked div
    // 5. Add active class to the clicked div.

    $('.image-container').on("click", function(e) {

        var index = $(this).attr('class').split("-")[2];
        var index_active = $('.slideshow .image-container.active').index() + 1;

        $('.slideshow .image-container.active').removeClass('image-' + index_active);
        $('.slideshow .image-container.active').addClass('image-' + index);

        $('.image-container').removeClass('active');
        $(this).removeClass('image-' + index);
        $(this).addClass('active');
    })

    $('.image-container .image').on("click", function (e) {
      $('.image-container .image').removeClass('active');
      $(this).addClass('active');
    })

    // Code help from: https://gist.github.com/benjamincharity/6058688
    function smoothScroll(el, to, duration) {
        if (duration < 0) {
            return;
        }
        var difference = to - $(window).scrollTop();
        var perTick = difference / duration * 10;
        this.scrollToTimerCache = setTimeout(function() {
            if (!isNaN(parseInt(perTick, 10))) {
                window.scrollTo(0, $(window).scrollTop() + perTick);
                smoothScroll(el, to, duration - 10);
            }
        }.bind(this), 10);
    }

    // Scroll to specific div using zepto. (It will still scroll even without javascript)
    // Help from: https://css-tricks.com/snippets/jquery/smooth-scrolling/
    $('a[href*="#"]:not([href="#"])').on("click", function(e) {
        e.preventDefault();
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
              smoothScroll($(window), target.offset().top, 500);
            }
        }
    })

})
