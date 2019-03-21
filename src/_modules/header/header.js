'use strict';

// Constructor
var Header = function() {
    var header = $('.header');
    var body = $('body');
    var menuOpen = $('.header__hamburguer');
    var url = window.location.pathname;
    var urlRegExp = new RegExp(url == '/' ? window.location.origin + '/?$' : url.replace(/\/$/,'') + '$');

    menuOpen.on('click', function(){
        header.toggleClass('-open');
        body.toggleClass('-hideOverflow');
    });

    $('.header__nav__link').each(function(){
        if(urlRegExp.test(this.href.replace(/\/$/,''))){
            $(this).addClass('-active');
        }
    });

    function detectLang() {
        var currentLang = $('html').attr('lang');
        var langClass = currentLang === 'es' ? '-esp' : '-eng';
        body.addClass(langClass);
    }

    detectLang();

    $('.header__nav__language__selector').on('click', function(e) {
        var selectedLang = $(this).data('lang');
        var url = selectedLang === 'esp' ? '/' : '/en';

        window.location.href = url;
    });
};

module.exports = Header;
