$(document).ready(function () {

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

    /***************** Add to Calendar ******************/
    var myCalendar = createCalendar({
        options: { class: '', id: '' },
        data: {
            title: "David & Kristy's Wedding",
            start: new Date('Oct 4, 2026 14:30'),
            end: new Date('Oct 4, 2026 23:00'),
            address: 'Hong Kong Baptist University Chapel, Kowloon Tong, Hong Kong',
            description: "We can't wait to celebrate with you on our special day!"
        }
    });
    $('#add-to-cal').html(myCalendar);

    /***************** RSVP Form ******************/
    // IMPORTANT: Replace the URL below with your own Google Apps Script URL.
    // See the setup guide provided separately.
    var RSVP_ENDPOINT = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

    $('#rsvp-form').on('submit', function (e) {
        e.preventDefault();

        if (RSVP_ENDPOINT === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
            $('#alert-wrapper').html(alert_markup('warning',
                '<strong>Coming soon!</strong> The RSVP form is not yet connected. Please contact us directly for now.'));
            return;
        }

        var data = $(this).serialize();
        $('#alert-wrapper').html(alert_markup('info', '<strong>Just a sec!</strong> We are saving your details.'));

        $.post(RSVP_ENDPOINT, data)
            .done(function (data) {
                if (data.result === 'error') {
                    $('#alert-wrapper').html(alert_markup('danger', data.message));
                } else {
                    $('#alert-wrapper').html('');
                    $('#rsvp-modal').modal('show');
                }
            })
            .fail(function () {
                $('#alert-wrapper').html(alert_markup('danger',
                    '<strong>Sorry!</strong> There was a problem submitting your RSVP. Please try again later.'));
            });
    });
});

/***************** Helpers ******************/
function alert_markup(alert_type, msg) {
    return '<div class="alert alert-' + alert_type + '" role="alert">' + msg +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span>&times;</span></button></div>';
}
