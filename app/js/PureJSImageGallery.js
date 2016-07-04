var PureJSImageGallery = function() {
    'use strict';

    function getAddEventMode() {
        return document.body.addEventListener ? 'addEventListener' : 'attachEvent';
    }

    function getEventPrefix() {
        return document.body.addEventListener ? '' : 'on';
    }

    function Gallery() {
        this.imageClass = '.gallery';
        this.loadingMessage = 'Loading...';
        this.nextButtonLabel = '>';
        this.previousButtonLabel = '<';
        this.closeButtonLabel = 'X';
    }

    Gallery.prototype = {
        constructor: Gallery,
        currentElement: null,
        init: function( settings ) {
            this.imageClass = settings.imageClass ? settings.imageClass : this.imageClass;
            this.loadingMessage = settings.loadingMessage ? settings.loadingMessage : this.loadingMessage;
            this.nextButtonLabel = settings.nextButtonLabel ? settings.nextButtonLabel : this.nextButtonLabel;
            this.previousButtonLabel = settings.previousButtonLabel ? settings.previousButtonLabel : this.previousButtonLabel;
            this.closeButtonLabel = settings.closeButtonLabel ? settings.closeButtonLabel : this.closeButtonLabel;

            this.addImagesClick();
        },
        addImagesClick: function() {
            var images = document.querySelectorAll( this.imageClass ),
                length = images.length;

            for ( var i = 0; i < length; i++ ) {
                this.addEvent( images[ i ], this.openGallery );
            }
        },
        createGallery: function() {
            var imageGallery = document.createElement( 'div' ),
                imageGalleryPhotoWrapper = document.createElement( 'div' ),
                imageGalleryNext = document.createElement( 'span' ),
                imageGalleryPrevious = document.createElement( 'span' ),
                imageGalleryClose = document.createElement( 'span' );

            imageGalleryNext.setAttribute( 'class', 'pure-js-image-gallery__next' );
            imageGalleryPrevious.setAttribute( 'class', 'pure-js-image-gallery__previous' );
            imageGalleryClose.setAttribute( 'class', 'pure-js-image-gallery__close' );
            imageGallery.setAttribute( 'class', 'pure-js-image-gallery' );
            imageGalleryPhotoWrapper.setAttribute( 'class', 'pure-js-image-gallery__image-wrapper' );

            imageGalleryNext.appendChild( document.createTextNode( this.nextButtonLabel ) );
            imageGalleryPrevious.appendChild( document.createTextNode( this.previousButtonLabel ) );
            imageGalleryClose.appendChild( document.createTextNode( this.closeButtonLabel ) );

            imageGalleryPhotoWrapper.appendChild( this.getLoadingElement() );
            imageGallery.appendChild( imageGalleryPhotoWrapper );
            imageGallery.appendChild( imageGalleryNext );
            imageGallery.appendChild( imageGalleryPrevious );
            imageGallery.appendChild( imageGalleryClose );

            return imageGallery;
        },
        openGallery: function( element ) {
            var target = this.getCurrentTarget( element );

            this.closeGallery();

            document.body.appendChild( this.createGallery() );

            this.setCurrentElement( target );
            this.imageCreate( target );

            this.activeDiretionalButtons();
            this.activeCloseButton();
        },
        activeDiretionalButtons: function() {
            var nextButton = document.querySelector( '.pure-js-image-gallery__next' ),
                previousButton = document.querySelector( '.pure-js-image-gallery__previous' );

            this.addEvent( nextButton, this.imageChange );
            this.addEvent( previousButton, this.imageChange );
        },
        imageChange: function( e ) {
            var buttonClass = this.getCurrentTarget( e ).getAttribute( 'class' ),
                newElement = buttonClass === 'pure-js-image-gallery__next' ? this.getNext() : this.getPrevious();

            if ( newElement ) {
                this.setCurrentElement( newElement );
                this.imageCreate( newElement );
            }
        },
        activeCloseButton: function() {
            var element = document.querySelector( '.pure-js-image-gallery__close' );

            this.addEvent( element, this.closeGallery );
        },
        closeGallery: function() {
            var imageGallery = document.querySelector( '.pure-js-image-gallery' );

            if ( imageGallery ) {
                document.body.removeChild( imageGallery );
            }
        },
        imageCreate: function( target ) {
            var image = new Image(),
                imageURL = target.getAttribute( 'data-image-url' );

            if ( imageURL ) {
                image.src = imageURL;
                image.setAttribute( 'class', 'pure-js-image-gallery__photo' );

                this.imageLoading( image );
            }
        },
        imageLoading: function( image ) {
            var interval = null,
                showImage = this.showImage.bind( this );

            this.removeImage();

            interval = setInterval(function() {
                if ( image.complete ) {
                    clearInterval( interval );
                    showImage( image );
                }
            }, 1 );
        },
        getLoadingElement: function() {
            var loadingElement = document.createElement( 'strong' ),
                loadingText = document.createTextNode( this.loadingMessage );

            loadingElement.setAttribute( 'class', 'pure-js-image-gallery__loading' );
            loadingElement.appendChild( loadingText );

            return loadingElement;
        },
        removeImage: function() {
            var imageGalleryPhotoWrapper = document.querySelector( '.pure-js-image-gallery__image-wrapper' ),
                imageGalleryPhoto = imageGalleryPhotoWrapper.querySelector( '.pure-js-image-gallery__photo' );

            if ( imageGalleryPhoto ) {
                imageGalleryPhotoWrapper.removeChild( imageGalleryPhoto );
                imageGalleryPhotoWrapper.appendChild( this.getLoadingElement() );
            }
        },
        showImage: function( image ) {
            var container = document.querySelector( '.pure-js-image-gallery__image-wrapper' ),
                loading = container.querySelector( '.pure-js-image-gallery__loading' );

            if ( loading ) {
                container.removeChild( loading );
            }

            container.appendChild( image );
        },
        setCurrentElement: function( element ) {
            this.currentElement = element;
        },
        getNext: function() {
            return this.getElement( 'nextSibling' );
        },
        getPrevious: function() {
            return this.getElement( 'previousSibling' );
        },
        getElement: function( direction ) {
            var element = this.currentElement.parentNode[ direction ];

            while ( element && element.nodeType !== 1 ) {
                element = element[ direction ];
            }

            return element ? element.querySelector( this.imageClass ) : null;
        },
        getCurrentTarget: function( e ) {
            return e.target ? e.target : e.srcElement;
        },
        addEvent: function( element, fn ) {
            var bindedFunction = fn.bind( this );

            element[ getAddEventMode() ]( getEventPrefix() + 'click', function( e ) {
                bindedFunction( e );
            });
        }
    };

    return new Gallery();
};
