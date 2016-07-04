(function() {
    'use strict';

    window.onload = function() {
        var gallery = PureJSImageGallery();

        gallery.init({
            imageClass: '.gallery'
        });
    };

}());
