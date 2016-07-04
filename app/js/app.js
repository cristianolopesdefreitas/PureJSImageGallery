(function() {
    'use strict';

    window.onload = function() {
        var gallery = PureJSImageGallery();

        gallery.init({
            imageClass: '.gallery',
            nextButtonLabel: 'Next',
            previousButtonLabel: 'Previous',
            closeButtonLabel: 'Close'
        });
    };

}());
