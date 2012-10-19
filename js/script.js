/* Author: Guy Halford-Thompson */


$(function() {

    $('a').smoothScroll({offset: -200});


    /*
     * Setup round robin
     */

    var COLOR_ANIMS = {
        'twitter'  : '#00acab',
        'linkedin' : '#5ba8cf',
        'geeklist' : '#8cc63f',
        'github'   : '#72302d',
        'email'    : '#54b275'
    };

    // Constants
    var ICON_RADIUS = 25,
        ROUND_ROBIN_RADIUS = 150,
        ROUND_ROBIN_WIDTH = 500,
        ROUND_ROBIN_HEIGHT = 500,
        BASE_COLOR = '#40414A';

    var rr = $('#round_robin'),
        items = $('#round_robin li'),
        r = ROUND_ROBIN_RADIUS,
        I = (360 / items.length) * (Math.PI/180),
        i=0, x,y,
        X0 = ROUND_ROBIN_WIDTH / 2,
        Y0 = ROUND_ROBIN_HEIGHT / 2,
        S = [], O = [];

    for(i=0;i<items.length;i++) {
        x = r * Math.sin(I * i);
        y = r * Math.cos(I * i);

        $(items[i]).css('top', Y0 - y);
        $(items[i]).css('left', X0 - x);

        O[i] = [$(items[i]).offset().left + ICON_RADIUS, $(items[i]).offset().top + ICON_RADIUS];
        S[i] = [X0 - x, Y0 - y];

        // Setup color animations
        $(items[i]).mouseenter(function() {
            $(this).find('div').animate({backgroundColor : COLOR_ANIMS[$(this).find('div').attr('class')]});
        });

        $(items[i]).mouseleave(function() {
            $(this).find('div').stop(true).animate({backgroundColor : BASE_COLOR});
        });
    }

    $(window).mousemove(function(e) {
        var i=0,
            x,y, G, d, dy, dx,
            mx, my, p, sx, sy;

        mx = e.pageX;
        my = e.pageY;

        for(i=0;i<items.length;i++) {

            sx = O[i][0];
            sy = O[i][1];

            dx = mx - sx;
            dy = my - sy;

            d = Math.sqrt((dx*dx) + (dy*dy));

            G = (1/(d*d*d)) * 100000;

            if(G>1) {
                G = 1;
            }

            $(items[i]).css('top', S[i][1] + (dy * G));
            $(items[i]).css('left', S[i][0] + (dx * G));

        }
    });

    /*
     * Show and hide the top bar
     */
    $(window).scroll(function() {
        if($(window).scrollTop() > 1000) {
            $('.topbar').slideDown();
        } else {
            $('.topbar').slideUp();
        }
    });


    /*
     * Fade links
     */
    $('a').each(function() {
        $(this).mouseenter(function() {
            $(this).animate({color : '#28283B'}, 300);
        });
        $(this).mouseleave(function() {
            $(this).stop(true).animate({color : BASE_COLOR}, 300);
        });
    });


});


