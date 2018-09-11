'use strict';

// Constructor
var Areas = function() {
    var context = $('.areas');

    if (context) {
        var areaPages = $('[data-area-page]');
        var areaPageSelectors = $('[data-area-target]');
        var nextPage = $('.areas__page__nav--next');
        var prevPage = $('.areas__page__nav--prev');

        function pagesInit() {
            var activePage = $('.areas__page__wrapper.-active');
            var pages = activePage.find('.areas__page');

            pages.first().addClass('-active');
            setTimeout(wrapperResize, 300);
            prevPage.addClass('-disabled');
        }

        function wrapperResize() {
            var activePage = $('.areas__page__wrapper.-active');
            var activeContent = activePage.find('.areas__page.-active');
            var activeContentHeight = activeContent.height();

            activePage.css('height', activeContentHeight + 120);
        }

        nextPage.on('click', function(){
            var activeContentPage = $('.areas__page.-active');
            prevPage.removeClass('-disabled');
            $(this).addClass('-disabled');
            activeContentPage.removeClass('-active');
            activeContentPage.siblings('.areas__page').addClass('-active');
            wrapperResize();
        });

        prevPage.on('click', function(){
            var activeContentPage = $('.areas__page.-active');
            nextPage.removeClass('-disabled');
            $(this).addClass('-disabled');
            activeContentPage.removeClass('-active');
            activeContentPage.siblings('.areas__page').addClass('-active');
            wrapperResize();
        });

        areaPageSelectors.on('click', function() {
            var $this = $(this);
            var pageTarget = $this.data('area-target');

            areaPageSelectors.removeClass('-active');
            areaPages.removeClass('-active');
            $this.addClass('-active');

            areaPages.filter(function() {
                return $(this).data('area-page') === pageTarget;
            }).addClass('-active');

            pagesInit();
        });
    }
};

module.exports = Areas;
