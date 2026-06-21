// To add more photos to the gallery: drop new resized images into img/gallery/
// named NN-sm.jpg (thumbnail) and NN-lg.jpg (full size), then increase this number.
var GALLERY_PHOTO_COUNT = 8;

$(document).ready(function () {

    /***************** Build Gallery ******************/
    var galleryHtml = '';
    for (var i = 1; i <= GALLERY_PHOTO_COUNT; i++) {
        var num = i < 10 ? '0' + i : i;
        galleryHtml +=
            '<div class="col-md-3 col-sm-3 col-xs-6">' +
                '<a class="fancybox" rel="group" href="img/gallery/' + num + '-lg.jpg">' +
                    '<div class="img-wrap">' +
                        '<div class="overlay"><i class="fa fa-search"></i></div>' +
                        '<img src="img/gallery/' + num + '-sm.jpg" alt="Photo ' + i + '"/>' +
                    '</div>' +
                '</a>' +
            '</div>';
    }
    $('#gallery-grid').html(galleryHtml);

    /***************** Background Music ******************/
    var bgMusic = document.getElementById('bg-music');
    var musicBtn = $('#music-toggle');

    function tryStartMusic() {
        if (!bgMusic.paused) return;
        bgMusic.play().then(function () {
            musicBtn.addClass('playing');
            $(document).off('click touchend pointerdown keydown', tryStartMusic);
        }).catch(function () {
            // blocked — will retry on the next real interaction
        });
    }

    // Try to autoplay immediately (works on some browsers/visits).
    tryStartMusic();

    // Browsers only allow audio-with-sound after a genuine user gesture —
    // a "click"/"tap" counts, but scrolling does NOT. Keep listening (not
    // just once) until one of these actually succeeds in starting playback.
    $(document).on('click touchend pointerdown keydown', tryStartMusic);

    musicBtn.click(function () {
        if (bgMusic.paused) {
            tryStartMusic();
        } else {
            bgMusic.pause();
            musicBtn.removeClass('playing');
        }
    });

    /***************** Countdown Timer ******************/
    function updateCountdown() {
        var weddingDate = new Date('October 4, 2026 14:30:00');
        var now = new Date();
        var diff = weddingDate - now;

        if (diff <= 0) {
            $('#cd-days').text('0');
            $('#cd-hours').text('00');
            $('#cd-minutes').text('00');
            $('#cd-seconds').text('00');
            return;
        }

        var days    = Math.floor(diff / (1000 * 60 * 60 * 24));
        var hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((diff % (1000 * 60)) / 1000);

        $('#cd-days').text(days);
        $('#cd-hours').text(hours < 10 ? '0' + hours : hours);
        $('#cd-minutes').text(minutes < 10 ? '0' + minutes : minutes);
        $('#cd-seconds').text(seconds < 10 ? '0' + seconds : seconds);
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    /***************** Waypoints ******************/
    $('.wp1').waypoint(function () { $('.wp1').addClass('animated fadeInLeft'); }, { offset: '75%' });
    $('.wp2').waypoint(function () { $('.wp2').addClass('animated fadeInRight'); }, { offset: '75%' });
    $('.wp3').waypoint(function () { $('.wp3').addClass('animated fadeInLeft'); }, { offset: '75%' });
    $('.wp4').waypoint(function () { $('.wp4').addClass('animated fadeInRight'); }, { offset: '75%' });
    $('.wp5').waypoint(function () { $('.wp5').addClass('animated fadeInLeft'); }, { offset: '75%' });
    $('.wp6').waypoint(function () { $('.wp6').addClass('animated fadeInRight'); }, { offset: '75%' });
    $('.wp7').waypoint(function () { $('.wp7').addClass('animated fadeInUp'); }, { offset: '75%' });
    $('.wp8').waypoint(function () { $('.wp8').addClass('animated fadeInLeft'); }, { offset: '75%' });
    $('.wp9').waypoint(function () { $('.wp9').addClass('animated fadeInRight'); }, { offset: '75%' });

    /***************** Fancybox Gallery ******************/
    $('.fancybox').fancybox({ padding: 4, width: 1000, height: 800 });

    /***************** Tooltips ******************/
    $('[data-toggle="tooltip"]').tooltip();

    /***************** Nav Toggle ******************/
    $('.nav-toggle').click(function () {
        $(this).toggleClass('active');
        $('.header-nav').toggleClass('open');
        event.preventDefault();
    });
    $('.header-nav li a').click(function () {
        $('.nav-toggle').toggleClass('active');
        $('.header-nav').toggleClass('open');
    });

    /***************** Header Scroll Effect ******************/
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll >= 20) {
            $('section.navigation').addClass('fixed');
            $('header').css({ "border-bottom": "none", "padding": "35px 0" });
            $('header .member-actions').css({ "top": "26px" });
            $('header .navicon').css({ "top": "34px" });
        } else {
            $('section.navigation').removeClass('fixed');
            $('header').css({ "border-bottom": "solid 1px rgba(255, 255, 255, 0.2)", "padding": "50px 0" });
            $('header .member-actions').css({ "top": "41px" });
            $('header .navicon').css({ "top": "48px" });
        }
    });

    /***************** Smooth Scrolling ******************/
    $('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({ scrollTop: target.offset().top - 90 }, 2000);
                return false;
            }
        }
    });

});
