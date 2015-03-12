/**
 * Plugin Name: UFXD Fixed-Height Slider ( Responsive )
 * Version: 1.0
 * Copyright 2015 UFLIX DESIGN ( http://uflixdesign.com )
 * License: http://www.apache.org/licenses/LICENSE-2.0
 * Requires: jQuery 1.9+
 */

(function ( $ ) {
    $.fn.ufxd_fh_slider = function( options ){

        // Default Options ==============
        var settings = $.extend({
            loop: true,
            slider_height: 400,
            thumb_size: 64,
            thumb_offset_x: 4,
            thumb_offset_y: 4,
            image_size: 'cover',
            autoplay: 4000
        }, options );

        return this.each(function(index, element) {
            new ufxd_fh_slider( element, settings.slider_height, settings.thumb_size, settings.image_size );
        });

        function ufxd_fh_slider( element, slider_height, thumb_size, image_size ){
            var self	= this;
            self.$el			= $( element );
            self.$slides_wrap   = self.$el.find('.ufxd-fh-slider-slides');

            // Temporarily Setup Slides to Images
            self.$slides		= self.$slides_wrap.find('img');

            if( typeof( slider_height ) == 'undefined' ) slider_height = 400;
            self.slider_height	= slider_height;

            if( typeof( thumb_size ) == 'undefined' ) thumb_size = 64;
            self.thumb_size	= thumb_size;

            self.current_slide	= -1;
            self.slide_count	= self.$slides.length;

            if( typeof( image_size ) == 'undefined' ) image_size = 'cover';
            self.image_size	= image_size;

            self.next = function(){
                self.goto_slide( self.current_slide + 1 );
            };

            self.previous = function(){
                self.goto_slide( self.current_slide - 1 );
            };

            self.goto_slide = function( index ){

                if( !self.slide_count ) return;
                if( index == self.current_slide ) return;

                if( index >= self.slide_count ) index = settings.loop ? 0 : self.slide_count - 1;
                else if( index < 0 ) index = settings.loop ? self.slide_count - 1 : 0;

                /*
                if( typeof( self.autoplay_timer ) != 'undefined'){
                    clearTimeout( self.autoplay_timer );
                }
                if( settings.autoplay ){
                    self.play();
                    //console.log( self.autoplay_timer );
                }*/

                render( index );

            };

            function render( slide_to ){

                self.$slides.eq( self.current_slide ).removeClass( 'ufxd-fh-slider-slide-active');
                self.$slides.eq( slide_to ).addClass( 'ufxd-fh-slider-slide-active' );

                self.$thumbs.eq( self.current_slide ).removeClass( 'ufxd-fh-slider-thumb-active');
                self.$thumbs.eq( slide_to ).addClass( 'ufxd-fh-slider-thumb-active');

                //console.log("SLIDES:", self.slide_count, slide_to );

                if( ( slide_to + 2 ) * ( thumb_size + settings.thumb_offset_x ) > self.$thumbs_wraper.width() ){

                    if( slide_to >= self.slide_count - 1 ){
                        displacement = ( slide_to + 1 ) * ( thumb_size + settings.thumb_offset_x ) - self.$thumbs_wraper.width();
                    } else{
                        displacement = ( slide_to + 2 ) * ( thumb_size + settings.thumb_offset_x ) - self.$thumbs_wraper.width();
                    }
                    self.$thumbs_inner.css('left', ( - displacement ) + 'px' );
                }else self.$thumbs_inner.css('left', ( settings.thumb_offset_x ) + 'px' );
                self.current_slide = slide_to;
            }

            function setup(){

                var slides_html     = '';
                var thumb_html      = '<div class="ufxd-fh-slider-thumbs-wraper"><ul class="ufxd-fh-slider-thumbs-inner ufxd-fh-slider-clearfix">';
                self.$slides.each( function( index, element ){

                    var img_src = $(element).attr('src');
                    var bg	= $(element).data('thumb');
                    if( typeof( bg ) == 'undefined' ) bg = img_src;

                    slides_html += '<div class="ufxd-fh-slider-slide-item" style="background-image:url(' + img_src + ');"></div>';
                    thumb_html  += '<li class="ufxd-fh-slider-thumb" style="background-image:url(' + bg + ');"></li>';
                });
                thumb_html += '</ul></div>';

                self.$el.append( thumb_html );
                self.$slides_wrap.html( slides_html );

                setTimeout( function(){

                    // Finally Setup Slides to Background Images
                    self.$slides		= self.$slides_wrap.find('.ufxd-fh-slider-slide-item');

                    self.$thumbs_wraper	= self.$el.find('.ufxd-fh-slider-thumbs-wraper');
                    self.$thumbs_inner	= self.$el.find('.ufxd-fh-slider-thumbs-inner');
                    self.$thumbs		= self.$el.find('.ufxd-fh-slider-thumb');

                    self.$slides_wrap.height( self.slider_height );

                    self.$el.find('.ufxd-fh-trigger-left').click(function(e){
                        e.preventDefault();
                        self.previous();
                    });
                    self.$el.find('.ufxd-fh-trigger-right').click(function(e){
                        e.preventDefault();
                        self.next();
                    });

                    self.$slides.each(function( index, element ){
                        var url = $( element ).css('background-image').replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];
                        var $img = $('<img />');
                        $img.bind( 'load', function( e ){
                            if( $(this).height() < self.slider_height && $(this).height() < self.$slides_wrap.width() ){
                                $( element ).css('background-size', 'auto');
                            }
                            $( this ).remove();
                        });
                        $('body').append( $img );
                        $img.attr('src', url );
                        $( element ).css('background-size', image_size);
                    });

                    self.$thumbs_inner.width( self.$thumbs.length * ( thumb_size + settings.thumb_offset_x ) );
                    self.$thumbs_wraper.height( thumb_size + ( settings.thumb_offset_y * 2 ) );
                    self.$thumbs.each( function( index, element ){
                        $( element ).click(function(e) {
                            self.goto_slide( index );
                        }).width( thumb_size ).height( thumb_size ).css({ 'margin-right': settings.thumb_offset_x + 'px', 'margin-top': settings.thumb_offset_y + 'px' });
                    });

                    self.goto_slide( 0 );
                    if( settings.autoplay ){
                        settings.loop = true;
                        self.play();
                    }

                }, 10 );
            }

            self.play = function(){
                self.autoplay_timer = setTimeout( function(){
                    self.next();
                    self.play();
                }, settings.autoplay );
            }

            setup();
        }

    };
})(jQuery);