## PureJSImageGallery

A simple photo gallery with javaScript.

### Possible Configurations

The Dialog type

```bash

var gallery = PureJSImageGallery();

gallery.init({
    imageClass: '.gallery',
    loadingMessage = 'Now charging...',
    nextButtonLabel = 'Next',
    previousButtonLabel = 'Previous',
    closeButtonLabel = 'Close'
});

```

### Detailed parameters

- **imageClass** => Required, this is the css class that their small images should have.
- **loadingMessage** => Not required, default is "Loading...".
- **nextButtonLabel** => Not required, default is ">".
- **previousButtonLabel** => Not required, default is "<".
- **closeButtonLabel** => Not required, default is "X".

### Thumbnail configuration

Every small picture should have a reference to a bigger picture, it should be on a data-attribute "data-image-url".

```bash

<img src="/images/thumbs/linux.jpg" data-image-url="/images/linux.jpg" alt="" class="gallery">

```

### Cross-browser

Modern browsers and Internet Explorer 8.

### Licence

(The MIT Licence)

2016 - Cristiano Lopes de Freitas
