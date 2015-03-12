# UFXD FH Slider

**UFXD FH Slider** is a Responsive Image Slider plugin for jQuery. Here FH means **FIXED HEIGHT**. As the name suggests, using this slider you are able to use any size of images in this slider without breaking any layout due to uneven image dimensions. It will automatically adapt within the content area of the slider.

Later we will see how we can use customize it and also use it as a fullscreen slider.

## Requirements
- jQuery 1.9+ : http://jquery.com/download/

## Why use UFXD FH Slider?
1. Super Fast Rendering, uses *hardware acceleration*.
2. Comes with many themes.
3. Very light weight / very small footprint.
4. Easy to implement and extend.
5. SEO Friendly

## How to use?
Here we will describe how easily you can implement UFXD FH Slider into your web application or website.

#### 1. Required inclusions
```html
<link rel="stylesheet" type="text/css" href="ufxd-fh-slider/ufxd-fh-slider.css" />

<script src="//code.jquery.com/jquery-1.11.2.min.js"></script>
<script src="ufxd-fh-slider/jquery.ufxd-fh-slider.js"></script>
```

#### 2. The Markup
Here is the snippet of the HTML you should use to 
```html
<div class="ufxd-fh-slider-wraper">
	<div class="ufxd-fh-slider-slides">
		<img src="images/image-01.jpg" data-thumb="images/image-thumb-01.jpg" />
		<img src="images/image-02.jpg" />
		<img src="images/image-03.jpg" />
		...
		...
	</div>
	<a class="ufxd-fh-trigger ufxd-fh-trigger-left" href="#">&laquo;</a>
	<a class="ufxd-fh-trigger ufxd-fh-trigger-right" href="#">&raquo;</a>
</div>
```
#### 3. Initialize Slider
```html
<script>
    $(document).ready(function(e) {
        $( '.ufxd-fh-slider-wraper' ).ufxd_fh_slider();
    });
</script>
```
It is as simple as that. By default the slider covers up the `width = parent element's width` and a fixed `height = 400px`. Next we will see how we can change the options to customize as per our need.

## Customization
UFXD FH Slider has a number of options which you can play with. It should be given at the time of initilization of the slider like the following.
```
<script>
    $(document).ready(function(e) {
        $( '.ufxd-fh-slider-wraper' ).ufxd_fh_slider({
            autoplay: false,
            slider_height: 600,
            image_size: 'cover'
        });
    });
</script>
```
#### Slider Options
|    Option    |    Values   |    Default    |    Description   |
|--------------|-------------|---------------|------------------|
| autoplay | `number`, `false` | `4000` | Determines the delay in `milliseconds` between two slide. Use `0` or `false` to disable autoplay. |
| image_size | `cover`, `contain` | `cover` | This represents how the image will be placed in the slider container. Using `cover` will crop image to best fit the image within the container. Whereas, `contain` will make sure no part of the image will be cropped keeping the image within the container. |
| loop | `boolean` | `true` | Loop the slider if reached end of the slides. **Example:** if you click next when the slider is at last slide it will return to first slide if `loop` is set to `true`. **Note:** If `autoplay` is enabled then `loop` is automatically set to `true`.  |
| slider_height | `number` | `400` | Height of the slider in `px`. This excludes the height of the thumbnails. |
| thumb_size | `number` | `64` | Height and Width of each thumbnail in `px`. |
| thumb_offset_x | `number` | `4` | Horizontal gap between each thumbnails in `px` |
| thumb_offset_y | `number` | `4` | Vertical gap between thumbnail and its container in `px` |