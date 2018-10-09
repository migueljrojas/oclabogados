'use strict';

// Constructor
var Slider = function() {
    var slider = $('._slider');
    if (slider) {
        slider.each(function(){
            $(this).slick({
                dots: true,
                fade: true,
                arrows:  false,
                autoplay: true,
                speed: 2000
            });
        });
    }
};

module.exports = Slider;
