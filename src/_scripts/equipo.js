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
        var profiles = $('[data-profile-id]');
        var closeProfile = $('.equipo__profile__close');
        var prevProfile = $('.equipo__profile__pager--prev');
        var nextProfile = $('.equipo__profile__pager--next');

        function isActive(element) {
            return element.className.includes('-active');
        }

        nextProfile.on('click', function() {
            var profilesArray = $.makeArray(profiles);
            var activeProfileIndex = profilesArray.findIndex(isActive);

            setNextProfile(activeProfileIndex);
        });

        prevProfile.on('click', function() {
            var profilesArray = $.makeArray(profiles);
            var activeProfileIndex = profilesArray.findIndex(isActive);

            setPrevProfile(activeProfileIndex);
        });

        var touchstartX = 0;
        var touchstartY = 0;
        var touchendX = 0;
        var touchendY = 0;

        $('.equipo__profile__person').on('touchstart', function(event) {
            console.log(event.touches[0].pageX);
            touchstartX = event.touches[0].pageX;
            touchstartY = event.touches[0].pageY;
        });

        $('.equipo__profile__person').on('touchend', function(event) {
            console.log(event);
            touchendX = event.originalEvent.changedTouches[0].pageX;
            touchendY = event.originalEvent.changedTouches[0].pageY;
            handleSwipe();
        });

        function handleSwipe() {
            var swiped = 'swiped: ';
            console.log('touchendX', touchendX);
            if (touchendX < touchstartX) {
                console.log('next');
                // next
                var profilesArray = $.makeArray(profiles);
                var activeProfileIndex = profilesArray.findIndex(isActive);

                setNextProfile(activeProfileIndex);
            }
            if (touchendX > touchstartX) {
                console.log('prev');
                // prev
                var profilesArray = $.makeArray(profiles);
                var activeProfileIndex = profilesArray.findIndex(isActive);

                setPrevProfile(activeProfileIndex);
            }
        }

        function setNextProfile(index) {
            var limit = profiles.length - 1;
            var newIndex = index < limit ? index + 1 : 0;

            profiles.removeClass('-active');

            $(profiles.get(newIndex)).addClass('-active');
            checkProfileType();
        }

        function setPrevProfile(index) {
            var limit = profiles.length - 1;
            var newIndex = index > 0 ? index - 1 : limit;

            profiles.removeClass('-active');

            $(profiles.get(newIndex)).addClass('-active');
            checkProfileType();
        }

        openLawyersSection.on('click', function() {
            $(this).removeClass('-inactive');
            openAdminSection.addClass('-inactive');
            openAdminSection.removeClass('-active');
            adminSection.removeClass('-active');

            $(this).addClass('-active');
            lawyersSection.addClass('-active');
        });

        openAdminSection.on('click', function() {
            $(this).removeClass('-inactive');
            openLawyersSection.addClass('-inactive');
            openLawyersSection.removeClass('-active');
            lawyersSection.removeClass('-active');

            $(this).addClass('-active');
            adminSection.addClass('-active');
        });

        profileTriggers.on('click', function() {
            var $this = $(this);
            var target = $this.data('person-id');

            profileSection.addClass('-open');
            profiles.removeClass('-active');

            profiles.filter(function() {
                return $(this).data('profile-id') === target;
            }).addClass('-active');

            checkProfileType();
        });

        function setActiveProfileType(type) {
            var profileTypeSelectors = $('.equipo__profile__types li');

            if (type === 'abogado') {
                profileTypeSelectors.last().removeClass('-active');
                profileTypeSelectors.first().addClass('-active');
            } else {
                profileTypeSelectors.first().removeClass('-active');
                profileTypeSelectors.last().addClass('-active');
            }
        }

        function checkProfileType() {
            var activeProfile = $('.equipo__profile__person.-active');
            var profileType = activeProfile.data('profile-type');
            var profileTypeSelectors = $('.equipo__profile__types li');

            if (activeProfile) {
                setActiveProfileType(profileType);
            } else {
                profileTypeSelectors.first().removeClass('-active');
                profileTypeSelectors.last().removeClass('-active');
            }
        }

        closeProfile.on('click', function() {
            profileSection.removeClass('-open');
            setTimeout(function(){
                profiles.removeClass('-active');
                checkProfileType();
            }, 300);
        });
    }
};

module.exports = Equipo;
