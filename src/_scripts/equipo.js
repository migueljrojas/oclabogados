'use strict';

// Constructor
var Equipo = function() {
    var context = $('.equipo');

    if (context) {
        var openLawyersSection = $('.equipo__nav__links--lawyers');
        var openAdminSection = $('.equipo__nav__links--admin');
        var lawyersSection = $('.equipo__section--lawyers');
        var adminSection = $('.equipo__section--admin');
        var profileTriggers = $('[data-person-id]');
        var profileSection = $('.equipo__profile');
        var closeProfile = $('.equipo__profile__close');

        openLawyersSection.on('click', function() {
            openAdminSection.addClass('-inactive');
            openAdminSection.removeClass('-active');
            adminSection.removeClass('-active');

            $(this).addClass('-active');
            lawyersSection.addClass('-active');
        });

        openAdminSection.on('click', function() {
            openLawyersSection.addClass('-inactive');
            openLawyersSection.removeClass('-active');
            lawyersSection.removeClass('-active');

            $(this).addClass('-active');
            adminSection.addClass('-active');
        });

        profileTriggers.on('click', function() {
            var $this = $(this);
            var target = $this.data('person-id');
            var profiles = $('[data-profile-id]');

            profileSection.addClass('-open');
            profiles.removeClass('-active');

            profiles.filter(function() {
                return $(this).data('profile-id') === target;
            }).addClass('-active');
        });

        closeProfile.on('click', function() {
            profileSection.removeClass('-open');
        });
    }
};

module.exports = Equipo;
