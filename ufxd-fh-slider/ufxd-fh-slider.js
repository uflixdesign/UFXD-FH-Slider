/**
* Plugin: UFXD Fixed-Height Slider ( Responsive )
* Version: 1.0
* Copyright 2015 UFLIX DESIGN ( http://uflixdesign.com )
* License: http://www.apache.org/licenses/LICENSE-2.0
*
* Requires: jQuery 1.9+
*/

function ufxd_fh_slider( element, slider_height, thumb_size, image_size ){
	var self	= this;
	self.$el			= $( element );
	self.$slides		= self.$el.find('.ufxd-fh-slider-slide-item');
	
	if( typeof( slider_height ) == 'undefined' ) slider_height = 400;
	self.slider_height	= slider_height;
	
	if( typeof( thumb_size ) == 'undefined' ) thumb_size = 64;
	self.thumb_size	= thumb_size;
	
	self.current_slide	= -1;
	self.slide_count	= self.$slides.length;
	
	if( typeof( image_size ) == 'undefined' ) image_size = 'cover';
	self.image_size		= image_size;
	
	self.next = function(){
		self.goto_slide( self.current_slide + 1 );
	};
	
	self.previous = function(){
		self.goto_slide( self.current_slide - 1 );
	};
	
	self.goto_slide = function( index ){
		
		if( !self.slide_count ) return;
		if( index == self.current_slide ) return;
		
		if( index >= self.slide_count ) index = 0;
		else if( index < 0 ) index = self.slide_count - 1;
		render( index );
		
	};
	
	function render( slide_to ){

		self.$slides.eq( self.current_slide ).removeClass( 'ufxd-fh-slider-slide-active');
		self.$slides.eq( slide_to ).addClass( 'ufxd-fh-slider-slide-active' );
		
		self.$thumbs.eq( self.current_slide ).removeClass( 'ufxd-fh-slider-thumb-active');
		self.$thumbs.eq( slide_to ).addClass( 'ufxd-fh-slider-thumb-active');
		
		if( ( slide_to + 2 ) * thumb_size > self.$thumbs_wraper.width() ){
			
			if( slide_to >= self.slide_count - 1 ) displacement = ( slide_to + 1 ) * thumb_size - self.$thumbs_wraper.width();
			else displacement = ( slide_to + 2 ) * thumb_size - self.$thumbs_wraper.width();
			
			self.$thumbs_inner.css('left', ( - displacement ) + 'px' );
		}else self.$thumbs_inner.css('left', '0px' );
		self.current_slide = slide_to;
	}
	
	function setup(){
		
		var html =	'<div class="ufxd-fh-slider-thumbs-wraper"><ul class="ufxd-fh-slider-thumbs-inner ufxd-fh-slider-clearfix">';
			self.$slides.each( function( index, element ){
				bg	= $(element).data('thumb');
				if( typeof( bg ) == 'undefined' ){
					bg = $(element).css('background-image');
					bg = bg.substring(5, bg.length - 2);
				}
				//alert(bg);
				html += '<li class="ufxd-fh-slider-thumb" style="background-image:url(' + bg + ');"></li>';
			});
			html += '</ul></div>';
			
			self.$el.append( html );
			
		setTimeout( function(){
			
			self.$thumbs_wraper	= self.$el.find('.ufxd-fh-slider-thumbs-wraper');
			self.$thumbs_inner	= self.$el.find('.ufxd-fh-slider-thumbs-inner');
			self.$thumbs		= self.$el.find('.ufxd-fh-slider-thumb');
			
			self.$el.find('.ufxd-fh-slider-slides').height( self.slider_height );
			
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
					if( $(this).height() < self.slider_height && $(this).height() < self.$el.find('.ufxd-fh-slider-slides').width() ){
						$( element ).css('background-size', 'auto');
					}
					$( this ).remove();
				});
				$('body').append( $img );
				$img.attr('src', url );
				$( element ).css('background-size', image_size);
			});
			
			self.$thumbs_inner.width( self.$thumbs.length * thumb_size );
			self.$thumbs_wraper.height( thumb_size );
			self.$thumbs.each( function( index, element ){
				$( element ).click(function(e) {
					self.goto_slide( index );
				}).width( thumb_size - 4 ).height( thumb_size - 4 ).css({ 'margin-right': '4px', 'margin-top': '4px' });
			});
			
			self.goto_slide( 0 );
			
		}, 10 );
	}
	
	setup();
	
}