// make sure all the images have loaded before starting any animation
$(window).on('load', function() {

  // just adding a little delay at the start to extend the 'loading' to see what is shown before the plugin is activated
  TweenLite.delayedCall(1, function() {
    // activate animation on the animatedimage elements
    $('.animatedimage').animateimage(12, -1)
    // setup a click on the box to toggle the animation pause
    
      var image = $(this).children('.animatedimage');
      
      //the plugin saves the animation in the 'animation' property of the DOM element e.g. image[0].animation
      if (image.prop('animation').paused()) {
        image.prop('animation').resume();
        $(this).animate({
          'max-height': '1000px'
        })
      } else {
        $(this).animate({
          'max-height': '100px'
        })
        image.prop('animation').pause();
      }
    });

    $('.animatedimage').each(function () {
      $(this).prop('animation').pause();
    });

   
  
});



;(function($) {
  $.fn.animateimage = function(framerate, repeats) {
    return this.each(function() {

      var $this = $(this);
        
      framerate = Math.abs(framerate || 10);
      if (typeof repeats === 'undefined' || repeats < -1) repeats = -1;
      var duration = 1 / framerate;
      var spritecount = $this.data('spritecount');
      
      // grab all children of the target element - these should just be the image/s to animate
      var image = $this.children();
      

      if (spritecount) { // sprite sheet
        if (image.length === 1) { // image should be a single image containing the sprite sheet
          
          var horizontal = ($this.data('spritedirection') !== 'vertical');
          var spritesize = (horizontal ? image.width() : image.height()) / spritecount;
  
          TweenLite.set(image, { visibility: 'visible' });
          
          // attach a reference to the animation on the element, so it can be easily grabbed outside of the plugin and paused, reversed etc
          this.animation = new TimelineMax({ repeat: repeats });
  
          if (horizontal) {
            TweenLite.set(this, { width: spritesize });
            for (var i = 0; i < spritecount; i++) {
              this.animation.set(image, { left: "-" + (i*spritesize) + "px" }, i*duration);
            }
          } else {
            var clientWidth = this.clientWidth;
            var imgHeight = image.height() * this.clientWidth / image.width();
            spritesize = Math.ceil(imgHeight / spritecount);
            imgHeight = spritesize * spritecount;
            imgWidth = imgHeight * image.width() / image.height();
            TweenLite.set(image, { height: imgHeight, width: imgWidth });
            TweenLite.set(this, { height: spritesize });
            for (var i = 0; i < spritecount; i++) {
              this.animation.set(image, { top: "-" + (i*spritesize) + "px" }, i*duration);
            }
          }
          // add an 'empty' set after the last position change - this adds padding at the end of the timeline so the last frame is displayed for the correct duration before the repeat
          this.animation.set({}, {}, i*duration);
        }

      } else { // image sequence
        if (image.length > 1) { // image should only contain the images to be animated
          
          // styles for hidden and visible image in the sequcnce
          var hidden = { position: 'absolute', visibility: 'hidden' };
          var visible = { position: 'static', visibility: 'visible' };
    
          // in case the poster is not the first child, make sure its pre-animated state is disabled
          image.filter('.poster').css(hidden);
    
          var lastimage = image.last();
          
          // attach a reference to the animation on the element, so it can be easily grabbed outside of the plugin and paused, reversed etc
          this.animation = new TimelineMax({ repeat: repeats })
              // this first set is not strictly needed as lastimage is underneath all of the other images, but it certainly doesn't hurt
              .set(lastimage, hidden)
              // toggle images one by one between visible and hidden - at any one time, only one image will be visible, and its static positioning will set the size for the container
              .staggerTo(image, 0, visible, duration, 0)
              // hide all the elements except lastimage - it will be hidden on repeat if needed at the same time as first is shown
              .staggerTo(image.not(lastimage), 0, $.extend(hidden, { immediateRender: false }), duration, duration)
              // add an 'empty' set after lastimage is made visible - this adds padding at the end of the timeline so lastimage is displayed for the correct duration before the repeat
              .set({}, {}, "+="+duration);
        }
        
      }
    });
  };
}(jQuery));


bannerAnimation();

function bannerAnimation(){
  
   TweenMax.from('.logo', .5,  {css:{top: '-=20px', autoAlpha:0}, delay:1})
   TweenMax.from('.panel1 .text', .4,  {css:{left: '-=20px', autoAlpha:0}, delay:2, ease:Power1.easeOut})
   TweenMax.to('.panel1 .text', .4,  {css:{left: '-=20px', autoAlpha:0}, delay:4, ease:Power1.easeOut})
   TweenMax.from('.panel2 .text', .4,  {css:{left: '-=20px', autoAlpha:0}, delay:5, ease:Power1.easeOut})
   TweenMax.to('.panel2 .text', .4,  {css:{left: '-=20px', autoAlpha:0}, delay:7, ease:Power1.easeOut})
   TweenMax.from('.panel3 .text', .4,  {css:{left: '-=20px', autoAlpha:0}, delay:8, ease:Power1.easeOut})
   TweenMax.from('.panel3 .button1', .4,  {css:{left: '-=20px', autoAlpha:0}, delay:8.5, ease:Power1.easeOut})
   TweenMax.from('.panel3 .button2', .4,  {css:{left: '+=20px', autoAlpha:0}, delay:8.5, ease:Power1.easeOut})
};

