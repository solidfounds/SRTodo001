/*
 * Title: jQuery Etalage plugin
 * Author: Berend de Jong, Frique
 * Author URI: http://www.frique.me/
 * Version: 1.3.4 (20130622.1)
 */

    jQuery(document).ready(function(){
		  "use strict";
        var width = jQuery('.product-view .product-img-box').width() * 0.80;
        var src_img_width = 80;
        var src_img_height = 100;
        var ratio_width = 550;
        var ratio_height = 670;
        
        src_img_width = 100 * ratio_width / ratio_height;
        var height = width * ratio_height / ratio_width;

        jQuery('#moreview').moreview({
            thumb_image_width: width,
            thumb_image_height: height,
            source_image_width: src_img_width,
            source_image_height: src_img_height,
            zoom_area_width: width,
            zoom_area_height: height,
            zoom_enable: false,
            smallthumb_hide_single: false,
            smallthumbs_position: 'left',
            show_icon: false,
            autoplay: false
        });
        jQuery(".product-img-box .moreview li.moreview_thumb").zoom();
        jQuery('.product-view .product-img-box .moreview-control a').css('right',((jQuery('.moreview_small_thumbs img').first().width())/2-3)+"px");
        if(jQuery('.moreview_small_thumbs').width() == 0)
            jQuery('.product-view .product-img-box .moreview-control a').css('right',((jQuery('.moreview_small_thumbs img').first().width())/2-3)+"px");
        jQuery(window).resize(function(e){
            var width = jQuery('.product-view .product-img-box').width() * 0.80;
            var height = width * ratio_height / ratio_width;
            zoom_enabled = false;
            if(jQuery(window).width()<300)
                zoom_enabled = false;
            jQuery('#moreview').moreview({
                thumb_image_width: width,
                thumb_image_height: height,
                source_image_width: src_img_width,
                source_image_height: src_img_height,
                zoom_area_width: width,
                zoom_area_height: height,
                zoom_enable: zoom_enabled,
                smallthumb_hide_single: false,
                smallthumbs_position: 'left',
                show_icon: true,
                autoplay: false
            });
            jQuery('.product-view .product-img-box .moreview-control a').css('right',((jQuery('.moreview_small_thumbs').width())/2)+"px");
        });
        jQuery('.moreview-prev').on('click', function(){
            moreview_previous();
        });

        jQuery('.moreview-next').on('click', function(){
            moreview_next();
        });
    });

(function(jQuery){
	
    jQuery.fn.moreview = function(options){

        // OPTION DEFAULTS
        var o = jQuery.extend({
            align: 'left',                        // Align of the moreview container. The zoom area will appear on the opposite side ('left'/'right')
                    // Width of the zoomed image frame (including borders, padding) (value in pixels)
            zoom_area_height: 'justify',        // Height of the zoomed image frame (including borders, padding) (value in pixels / 'justify' = height of large thumb + small thumbs)
            zoom_area_distance: 10,                // Distance between the zoom area and thumbnail (value in pixels)
            zoom_easing: true,                    // Ease the animation while moving the zoomed image (true/false)
            click_to_zoom: false,                // Will start zooming when image is clicked instead of when hovering (when true, click-callback functions are disabled) (true/false)
            zoom_element: 'auto',                // Supply your custom zoom area element as a CSS type selector ('auto'/'#selector'/'.selector')
            zoom_enable: true,
            show_descriptions: true,            // Shows the description area if a title attribute is given to the source image (true/false)
            description_location: 'bottom',        // Location of the description area ('top'/'bottom')
            description_opacity: 0.7,            // Opacity of the description area (except for IE) (number between or equal to 0-1)
            small_thumbs: 4,                    // How many small thumbnails will be visible underneath the large thumbnail (minimum of 3) (number)
            smallthumb_inactive_opacity: 0.4,    // Opacity of the inactive small thumbnails (number between or equal to 0-1)
            smallthumb_hide_single: true,        // Don't show the small thumb when there is only 1 image (true/false)
            smallthumb_select_on_hover: false,    // This will scroll through the small thumbnails when hovering them, instead of clicking them (true/false)
            smallthumbs_position: 'bottom',        // Where to position the row of small thumbnails ('top' / 'bottom' / 'left' / 'right')
            show_begin_end_smallthumb: true,    // Whether to show extra thumbnails at the beginning and the end that navigate back to the end or beginning (true/false)
            magnifier_opacity: 0.5,                // Opacity of the magnifier area (does not apply if magnifier_invert is true) (number between or equal to 0-1)
            magnifier_invert: true,                // Make the large thumbnail clear through the magnifier, opaque around it (opacity is the value of magnifier_opacity) (true/false)
            show_icon: true,                    // Shows the icon image in the middle of the magnifier (only if magnifier_invert is false) and left-bottom of large thumb (true/false)
            icon_offset: 20,                    // The icon's offset to the left-bottom corner (value in pixels)
            hide_cursor: false,                    // Hides the cursor when hovering the large thumbnail (only works in some browsers) (true/false)
            show_hint: false,                    // Show "hint" until image is zoomed for the first time (true/false)
            hint_offset: 15,                    // The hint's offset to the right-top corner (value in pixels)
            speed: 600,                            // All animation speeds are based on this setting (value in ms)
            autoplay: true,                        // Makes the thumbs switch automatically when not interacting (at each autoplay_interval below) (true/false)
            autoplay_interval: 6000,            // Time showing each image if autoplay is on (value in ms)
            keyboard: true,                        // Left/right arrow keys to navigate (true/false)
            right_to_left: false,                // Makes the thumbnails slide from right to left and the caption texts RTL (true/false)
            // Callback functions:                // These functions are automatically run when certain events trigger. Assign your own behaviour as a plugin option:
            click_callback: function(){            // Provide your own callback for the click event (function). Takes 2 arguments: image_anchor, instance_id
                return true;
            },
            change_callback: function(){        // Provide your own callback for the change event (thumb switching) (function). Takes 2 arguments: image_anchor, instance_id
                return true;
            }
        }, options);

        jQuery.each(this, function(){
            var jQuerycontainer = jQuery(this);

            // Verify if this is a UL, has atleast 1 LI and 1 source image
            if(jQuerycontainer.is('ul') && jQuerycontainer.children('li').length && jQuerycontainer.find('img.moreview_source_image').length){

                var i, j, src, thumb_id, magnifier_opacity, autotimer, description, container_outerwidth, smallthumbs_overflow, css,
                    instance_id = jQuerycontainer.attr('id'),
                    faster = Math.floor(o.speed*0.7),
                    zoom_follow_speed = Math.round(o.speed/100),
                    st_moving = false,
                    st_steps = 0,
                    ie6 = false,
                    preview = true,
                    clicked_to_zoom = false,
                    zoom_move_timer = 0,
                    cur_zoomx = 0,
                    cur_zoomy = 0,
                    new_zoomx = 0,
                    new_zoomy = 0,
                    smallthumbs_align = 'hori';

                if(typeof instance_id==='undefined' || !instance_id){
                    instance_id = '[no id]';
                }

                if(o.smallthumbs_position==='left' || o.smallthumbs_position==='right'){
                    smallthumbs_align = 'vert';
                }

                // IE specifics
                if(typeof jQuery.browser==='object' && jQuery.browser.msie){
                    if(jQuery.browser.version < 9){
                        preview = false;
                        if(jQuery.browser.version < 7){
                            ie6 = true;
                        }
                    }
                }

// NEW ELEMENTS & CACHE
                jQuerycontainer.addClass('moreview').show();
                var jQuerythumbs;
                if(jQuerycontainer.children('li').first().hasClass('moreview_thumb')){
                    jQuerythumbs = jQuerycontainer.children('li.moreview_thumb');
                }else{
                    jQuerythumbs = jQuerycontainer.children('li').addClass('moreview_thumb');
                }
                jQuerycontainer.children('li.moreview_thumb_active').hide().removeClass('moreview_thumb_active');
                jQuerythumbs.first().show().addClass('moreview_thumb_active').css('opacity', 1);

                var images = jQuerythumbs.length,
                    autoplay = o.autoplay;
                if(images < 2){
                    autoplay = false;
                }

                if(o.align==='right'){
                    jQuerycontainer.addClass('moreview_right');
                }

                // Add/generate large thumbs (& check for existing thumb/source images)
                jQuery.each(jQuerythumbs, function(i){
                    i += 1;
                    var jQueryt = jQuery(this),
                        jQueryt_thumb = jQueryt.find('.moreview_thumb_image').removeAttr('alt').show(),
                        jQueryt_source = jQueryt.find('.moreview_source_image'),
                        jQueryt_anchor = jQueryt.find('a');
                    jQueryt.data('id', i).addClass('thumb_'+i);
                    // No thumb, but source
                    if(!jQueryt_thumb.length && jQueryt_source.length){
                        jQueryt.prepend('<img class="moreview_thumb_image" src="'+jQueryt_source.attr('src')+'" />');
                    }
                    // No thumb and no source
                    else if(!jQueryt_thumb.length && !jQueryt_source.length){
                        jQueryt.remove();
                    }
                    // Add anchor data to large thumbnail
                    if(jQueryt_anchor.length){
                        jQueryt.find('.moreview_thumb_image').data('anchor', jQueryt_anchor.attr('href'));
                    }
                });
                var jQuerythumb_images = jQuerythumbs.find('.moreview_thumb_image').css({ width:o.thumb_image_width, height:o.thumb_image_height }).show();
                jQuery.each(jQuerythumb_images, function(){
                    jQuery(this).data('src', this.src);
                });

                // Add magnifier
                var jQuerymagnifier;
                jQuerycontainer.children('li.moreview_magnifier').remove();
                jQuerymagnifier = jQuery('<li class="moreview_magnifier"><div><img /></div></li>').appendTo(jQuerycontainer);
                var jQuerymagnifier_img_area = jQuerymagnifier.children('div');
                var jQuerymagnifier_img = jQuerymagnifier_img_area.children('img');

                // Add zoom icon
                var jQueryicon;
                jQuerycontainer.children('li.moreview_icon').remove;
                jQueryicon  = jQuery('<li class="moreview_icon">&nbsp;</li>').appendTo(jQuerycontainer);
                if(o.show_icon){
                    jQueryicon.show();
                }

                // Add hint
                var jQueryhint;
                if(o.show_hint){
                    jQuerycontainer.children('li.moreview_hint').remove();
                    jQueryhint = jQuery('<li class="moreview_hint">&nbsp;</li>').appendTo(jQuerycontainer).show();
                }

                // Add zoom area
                var jQueryzoom,
                    zoom_element = o.zoom_element;
                if(zoom_element!=='auto' && zoom_element && jQuery(zoom_element).length){
                    jQueryzoom = jQuery(zoom_element)
                        .addClass('moreview_zoom_area')
                        .html('<div><img class="moreview_zoom_img" /></div>');
                }else{
                    zoom_element = 'auto';
                    jQuerycontainer.children('li.moreview_zoom_area').remove();
                    jQueryzoom = jQuery('<li class="moreview_zoom_area"><div><img class="moreview_zoom_img" /></div></li>').appendTo(jQuerycontainer);
                }
                var jQueryzoom_img_area = jQueryzoom.children('div'),
                    jQueryzoom_preview;
                if(preview){
                    jQueryzoom_preview = jQuery('<img class="moreview_zoom_preview" />').css({ width:o.source_image_width, height:o.source_image_height, opacity:0.3 }).prependTo(jQueryzoom_img_area).show();
                }
                var jQueryzoom_img = jQueryzoom_img_area.children('.moreview_zoom_img').css({ width:o.source_image_width, height:o.source_image_height });

                // Add description area
                var jQuerydescription;
                if(o.show_descriptions){
                    jQuerydescription = jQuery('<div class="moreview_description'+ ((o.right_to_left)?' rtl':'') +'"></div>').prependTo(jQueryzoom);
                }

                // Add/generate smallthumbs
                var jQuerysmallthumbs,
                    jQuerysmallthumbs_ul,
                    jQuerysmallthumb,
                    jQuerysmallthumb_images,
                    smallthumbs,
                    small_thumbs = o.small_thumbs;
                if(images > 1 || !o.smallthumb_hide_single){
                    jQuerycontainer.children('li.moreview_small_thumbs').remove();
                    jQuerysmallthumbs = jQuery('<li class="moreview_small_thumbs"><ul></ul></li>').appendTo(jQuerycontainer);
                    
                    jQuerysmallthumbs_ul = jQuerysmallthumbs.children('ul');
                    jQuery.each(jQuerythumb_images, function(){
                        var jQueryt = jQuery(this);
                        src = jQueryt.data('src');
                        thumb_id = jQueryt.parents('.moreview_thumb').data('id');
                        jQuery('<li><img class="moreview_small_thumb" src="'+src+'" /></li>').data('thumb_id', thumb_id).appendTo(jQuerysmallthumbs_ul);
                    });
                    jQuerysmallthumb = jQuerysmallthumbs_ul.children('li').css({ opacity:o.smallthumb_inactive_opacity });
                    if(small_thumbs < 3){
                        small_thumbs = 3;
                    }
                    // If more smallthumbs than visible
                    if(images > small_thumbs){
                        // Add extra thumb on each side
                        if(o.show_begin_end_smallthumb){
                            src = jQuerythumb_images.eq(images-1).data('src');
                            thumb_id = jQuerythumbs.eq(images-1).data('id');
                            jQuery('<li class="moreview_smallthumb_first moreview_smallthumb_navtoend"><img class="moreview_small_thumb" src="'+src+'" /></li>')
                                .data('src', src)
                                .data('thumb_id', thumb_id)
                                .css({ opacity:o.smallthumb_inactive_opacity })
                                .prependTo(jQuerysmallthumbs_ul);
                            src = jQuerythumb_images.eq(0).data('src');
                            thumb_id = jQuerythumbs.eq(0).data('id');
                            jQuery('<li class="moreview_smallthumb_navtostart"><img class="moreview_small_thumb" src="'+src+'" /></li>')
                                .data('src', src)
                                .data('thumb_id', thumb_id)
                                .css({ opacity:o.smallthumb_inactive_opacity })
                                .appendTo(jQuerysmallthumbs_ul);
                            jQuerysmallthumb = jQuerysmallthumbs_ul.children('li');

                            // Set first active smallthumb
                            jQuerysmallthumb.eq(1).addClass('moreview_smallthumb_active').css({ opacity:1 });
                        }else{
                            // Set first active smallthumb
                            jQuerysmallthumb.eq(0).addClass('moreview_smallthumb_first moreview_smallthumb_active').css({ opacity:1 });
                        }
                        // Prepare for moving them left/right / up/down
                        jQuerysmallthumb.eq(small_thumbs-1).addClass('moreview_smallthumb_last');
                    }
                    // Smallthumbs are within boundries
                    else{
                        // Set first active smallthumb
                        jQuerysmallthumb.eq(0).addClass('moreview_smallthumb_active').css({ opacity:1 });
                    }
                    // Apply id
                    jQuery.each(jQuerysmallthumb, function(i){
                        jQuery(this).data('id', (i+1));
                    });
                    jQuerysmallthumb_images = jQuerysmallthumb.children('img');
                    smallthumbs = jQuerysmallthumb.length;
                    // Vertical
                    if(smallthumbs_align==='vert'){
                        jQuerysmallthumb.addClass('vertical');
                    }
                }

// PREPARE
                // Magnifier invert option
                if(o.magnifier_invert){
                    magnifier_opacity = 1;
                }else{
                    magnifier_opacity = o.magnifier_opacity;
                }

                // Determine (generated) dimensions
                var thumb_border = parseInt(jQuerythumbs.css('borderLeftWidth'), 10) + parseInt(jQuerythumbs.css('borderRightWidth'), 10) + parseInt(jQuerythumb_images.css('borderLeftWidth'), 10) + parseInt(jQuerythumb_images.css('borderRightWidth'), 10),
                    thumb_margin = parseInt(jQuerythumbs.css('marginLeft'), 10) + parseInt(jQuerythumbs.css('marginRight'), 10),
                    thumb_padding = parseInt(jQuerythumbs.css('paddingLeft'), 10) + parseInt(jQuerythumbs.css('paddingRight'), 10) + parseInt(jQuerythumb_images.css('marginLeft'), 10) + parseInt(jQuerythumb_images.css('marginRight'), 10) + parseInt(jQuerythumb_images.css('paddingLeft'), 10) + parseInt(jQuerythumb_images.css('paddingRight'), 10),
                    thumb_outerwidth = o.thumb_image_width+thumb_border+thumb_margin+thumb_padding,
                    thumb_outerheight = o.thumb_image_height+thumb_border+thumb_margin+thumb_padding,
                    smallthumb_border = 0,
                    smallthumb_margin = 0,
                    smallthumb_padding = 0,
                    smallthumb_width = 0,
                    smallthumb_height = 0,
                    smallthumb_outerwidth = 0,
                    smallthumb_outerheight = 0;
                if(images > 1 || !o.smallthumb_hide_single){
                    smallthumb_border = parseInt(jQuerysmallthumb.css('borderLeftWidth'), 10) + parseInt(jQuerysmallthumb.css('borderRightWidth'), 10) + parseInt(jQuerysmallthumb_images.css('borderLeftWidth'), 10) + parseInt(jQuerysmallthumb_images.css('borderRightWidth'), 10);
                    smallthumb_margin = parseInt(jQuerysmallthumb.css('marginTop'), 10);
                    smallthumb_padding = parseInt(jQuerysmallthumb.css('paddingLeft'), 10) + parseInt(jQuerysmallthumb.css('paddingRight'), 10) + parseInt(jQuerysmallthumb_images.css('marginLeft'), 10) + parseInt(jQuerysmallthumb_images.css('marginRight'), 10) + parseInt(jQuerysmallthumb_images.css('paddingLeft'), 10) + parseInt(jQuerysmallthumb_images.css('paddingRight'), 10);
                    if(smallthumbs_align==='vert'){
                        smallthumb_height = Math.round((thumb_outerheight-((small_thumbs-1)*smallthumb_margin))/small_thumbs) - (smallthumb_border+smallthumb_padding);
                        smallthumb_width = Math.round((o.thumb_image_width * smallthumb_height) / o.thumb_image_height);
                        smallthumb_outerwidth = smallthumb_width+smallthumb_border+smallthumb_padding;
                        smallthumb_outerheight = smallthumb_height+smallthumb_border+smallthumb_padding;
                    }else{
                        smallthumb_width = Math.round((thumb_outerwidth-((small_thumbs-1)*smallthumb_margin))/small_thumbs) - (smallthumb_border+smallthumb_padding);
                        smallthumb_height = Math.round((o.thumb_image_height * smallthumb_width) / o.thumb_image_width);
                        smallthumb_outerwidth = smallthumb_width+smallthumb_border+smallthumb_padding;
                        smallthumb_outerheight = smallthumb_height+smallthumb_border+smallthumb_padding;
                    }
                }

                var zoom_border = parseInt(jQueryzoom.css('borderTopWidth'), 10),
                    zoom_margin = parseInt(o.zoom_area_distance, 10),
                    zoom_padding = parseInt(jQueryzoom.css('paddingTop'), 10),
                    zoom_area_width,
                    zoom_area_height;
                // If source image width is smaller than zoom area
                if((o.zoom_area_width - (zoom_border*2) - (zoom_padding*2)) > o.source_image_width){
                    zoom_area_width = o.source_image_width;
                }else{
                    zoom_area_width = o.zoom_area_width - (zoom_border*2) - (zoom_padding*2);
                }
                if(o.zoom_area_height==='justify'){
                    zoom_area_height = (thumb_outerheight+smallthumb_margin+smallthumb_outerheight) - (zoom_border*2) - (zoom_padding*2);
                }else{
                    zoom_area_height = o.zoom_area_height - (zoom_border*2) - (zoom_padding*2);
                }
                // If source image height is smaller than zoom area
                if(zoom_area_height > o.source_image_height){
                    zoom_area_height = o.source_image_height;
                }
                var description_border,
                    description_margin,
                    description_padding,
                    description_width;
                if(o.show_descriptions){
                    description_border = parseInt(jQuerydescription.css('borderLeftWidth'), 10) + parseInt(jQuerydescription.css('borderRightWidth'), 10);
                    description_margin = parseInt(jQuerydescription.css('marginLeft'), 10) + parseInt(jQuerydescription.css('marginRight'), 10);
                    description_padding = parseInt(jQuerydescription.css('paddingLeft'), 10) + parseInt(jQuerydescription.css('paddingRight'), 10);
                    description_width = zoom_area_width - description_border - description_margin - description_padding;
                }
                // Add iframe underlay to resolve IE6 <select> tag bug
                var jQueryie6_iframe_fix;
                if(ie6){
                    jQueryie6_iframe_fix = jQuery('<iframe marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="javascript:\'<html></html>\'"></iframe>')
                        .css({ position:'absolute', zIndex:1 })
                        .prependTo(jQueryzoom);
                }

                var magnifier_border = parseInt(jQuerymagnifier.css('borderTopWidth'), 10),
                    magnifier_top = parseInt(jQuerythumbs.css('borderTopWidth'), 10) +
                        parseInt(jQuerythumbs.css('marginTop'), 10) +
                        parseInt(jQuerythumbs.css('paddingTop'), 10) +
                        parseInt(jQuerythumb_images.css('borderTopWidth'), 10) +
                        parseInt(jQuerythumb_images.css('marginTop'), 10) -
                        magnifier_border,
                    magnifier_left = jQuerythumb_images.offset().left - jQuerycontainer.offset().left - magnifier_border;
                if(o.smallthumbs_position==='left'){
                    magnifier_left = magnifier_left + smallthumb_outerwidth + smallthumb_margin;
                }else if(o.smallthumbs_position==='top'){
                    magnifier_top = magnifier_top + smallthumb_outerheight + smallthumb_margin;
                }
                var magnifier_width = Math.round(zoom_area_width*(o.thumb_image_width / o.source_image_width)),
                    magnifier_height = Math.round(zoom_area_height*(o.thumb_image_height / o.source_image_height)),
                    magnifier_bottom = magnifier_top + o.thumb_image_height - magnifier_height,
                    magnifier_right = magnifier_left + o.thumb_image_width - magnifier_width,
                    magnifier_center_x = Math.round(magnifier_width/2),
                    magnifier_center_y = Math.round(magnifier_height/2),
                    hint_top,
                    hint_right;
                if(o.show_hint){
                    hint_top = parseInt(o.hint_offset, 10) + parseInt(jQueryhint.css('marginTop'), 10);
                    hint_right = parseInt(o.hint_offset, 10) + parseInt(jQueryhint.css('marginRight'), 10);
                    if(o.smallthumbs_position==='right'){
                        hint_right = hint_right-smallthumb_outerwidth-smallthumb_margin;
                    }
                }

// RESIZE AND REPOSITION ELEMENTS
                // Container
                if(smallthumbs_align==='vert'){
                    container_outerwidth = thumb_outerwidth+smallthumb_margin+smallthumb_outerwidth;
                    jQuerycontainer.css({ width:container_outerwidth, height:thumb_outerheight });
                }else{
                    container_outerwidth = thumb_outerwidth;
                    jQuerycontainer.css({ width:container_outerwidth, height:thumb_outerheight+smallthumb_margin+smallthumb_outerheight });
                }
                // Icon
                if(o.show_icon){
                    css = { top:thumb_outerheight - jQueryicon.outerHeight(true) - parseInt(o.icon_offset, 10), left:parseInt(o.icon_offset, 10) };
                    if(o.smallthumbs_position==='left'){
                        css.left = smallthumb_outerwidth + smallthumb_margin + parseInt(o.icon_offset, 10);
                    }else if(o.smallthumbs_position==='top'){
                        css.top += smallthumb_outerheight + smallthumb_margin;
                    }
                    jQueryicon.css(css);
                }
                // Hint
                if(o.show_hint){
                    jQueryhint.css({ margin:0, top:-hint_top, right:-hint_right });
                }
                // Magnifier
                jQuerymagnifier_img.css({ margin:0, padding:0, width:o.thumb_image_width, height:o.thumb_image_height });
                jQuerymagnifier_img_area.css({ margin:0, padding:0, width:magnifier_width, height:magnifier_height });
                css = { margin:0, padding:0, left:(magnifier_right-magnifier_left)/2, top:(magnifier_bottom-magnifier_top)/2 };
                if(o.smallthumbs_position==='left'){
                    css.left = '+=' + smallthumb_outerwidth + smallthumb_margin;
                }else if(o.smallthumbs_position==='top'){
                    css.top = '+=' + smallthumb_outerheight + smallthumb_margin;
                }
                jQuerymagnifier.css(css).hide();
                // Zoom area
                jQueryzoom_img_area.css({ width:zoom_area_width, height:zoom_area_height });
                css = { margin:0, opacity:0 };
                if(o.align==='right' && zoom_element==='auto'){
                    css.left = -(zoom_area_width + (zoom_border*2) + (zoom_padding*2) + zoom_margin);
                }else if(zoom_element==='auto'){
                    css.left = container_outerwidth + zoom_margin;
                }
                jQueryzoom.css(css).hide();
                // Descriptions
                if(o.show_descriptions){
                    css = { width:description_width, bottom:zoom_padding, left:zoom_padding, opacity:o.description_opacity };
                    if(o.description_location==='top'){
                        css.top = zoom_padding;
                        css.bottom = 'auto';
                    }
                    jQuerydescription.css(css).hide();
                }
                // Small thumbs
                if(images > 1 || !o.smallthumb_hide_single){
                    if(smallthumbs_align==='vert'){
                        css = { top:0, height:thumb_outerheight };
                        if(o.smallthumbs_position==='left'){
                            jQuerythumbs.css({ left:smallthumb_outerwidth+smallthumb_margin });
                        }else{
                            css.marginLeft = thumb_outerwidth + smallthumb_margin;
                        }
                        jQuerysmallthumbs.css(css);
                        jQuerysmallthumbs_ul.css({ height:(smallthumb_outerheight*smallthumbs) + (smallthumbs*smallthumb_margin) + 100 }); //100 = some extra to prevent a browser zoom glitch fix
                        jQuerysmallthumb_images.css({ width:smallthumb_width, height:smallthumb_height }).attr('height', smallthumb_height);
                        jQuerysmallthumb.css({ margin:0, marginBottom:smallthumb_margin });
                    }else{
                        css = { width:thumb_outerwidth };
                        if(o.smallthumbs_position==='top'){
                            jQuerythumbs.css({ top:smallthumb_outerheight+smallthumb_margin });
                        }else{
                            css.top = thumb_outerheight + smallthumb_margin;
                        }
                        jQuerysmallthumbs.css(css);
                        jQuerysmallthumbs_ul.css({ width:(smallthumb_outerwidth*smallthumbs) + (smallthumbs*smallthumb_margin) + 100 }); //100 = some extra to prevent a browser zoom glitch fix
                        jQuerysmallthumb_images.css({ width:smallthumb_width, height:smallthumb_height }).attr('width', smallthumb_width);
                        jQuerysmallthumb.css({ margin:0, marginRight:smallthumb_margin });
                    }

                    // Smallthumbs overflow fix for unmatching space (width/height of visible smallthumbs + their margins is more than the container width/height:
                    if(smallthumbs_align==='vert'){
                        smallthumbs_overflow = ((smallthumb_outerheight*small_thumbs) + ((small_thumbs-1)*smallthumb_margin)) - thumb_outerheight;
                    }else{
                        smallthumbs_overflow = ((smallthumb_outerwidth*small_thumbs) + ((small_thumbs-1)*smallthumb_margin)) - thumb_outerwidth;
                    }
                    // Overflow*1px decrease
                    if(smallthumbs_overflow > 0){
                        // Each set
                        for(i=1; i<=(smallthumbs-1); i=i+(small_thumbs-1)){
                            j=1;
                            // Each smallthumb
                            for(j; j<=smallthumbs_overflow; j+=1){
                                if(smallthumbs_align==='vert'){
                                    jQuerysmallthumb.eq(i+j-1).css({ marginBottom:(smallthumb_margin-1) });
                                }else{
                                    jQuerysmallthumb.eq(i+j-1).css({ marginRight:(smallthumb_margin-1) });
                                }
                            }
                        }
                    }
                    // Overflow*1px increase
                    else if(smallthumbs_overflow < 0){
                        for(i=1; i<=(smallthumbs-1); i=i+(small_thumbs-1)){
                            j=1;
                            // Each smallthumb
                            for(j; j<=(-smallthumbs_overflow); j+=1){
                                if(smallthumbs_align==='vert'){
                                    jQuerysmallthumb.eq(i+j-1).css({ marginBottom:(smallthumb_margin+1) });
                                    jQuerysmallthumbs_ul.css({ height:parseInt(jQuerysmallthumbs_ul.css('height'), 10)+1 });
                                }else{
                                    jQuerysmallthumb.eq(i+j-1).css({ marginRight:(smallthumb_margin+1) });
                                    jQuerysmallthumbs_ul.css({ width:parseInt(jQuerysmallthumbs_ul.css('width'), 10)+1 });
                                }
                            }
                        }
                    }
                }

                if(o.show_icon && !o.magnifier_invert){
                    jQuerymagnifier.css({ background:jQuerymagnifier.css('background-color')+' '+jQueryicon.css('background-image')+' center no-repeat' });
                }
                if(o.hide_cursor){
                    jQuerymagnifier.add(jQueryicon).css({ cursor:'none' });
                }
                if(ie6){
                    jQueryie6_iframe_fix.css({ width:jQueryzoom_img_area.css('width'), height:jQueryzoom_img_area.css('height') });
                }

// INITIATE FIRST RUN

                var jQuerycurrent_thumb = jQuerythumbs.first().find('.moreview_thumb_image'),
                    jQuerycurrent_source = jQuerythumbs.first().find('.moreview_source_image');
                if(o.magnifier_invert){
                    jQuerymagnifier_img.attr('src', jQuerycurrent_thumb.data('src')).show();
                }
                if(preview){
                    jQueryzoom_preview.attr('src', jQuerycurrent_thumb.data('src'));
                }
                jQueryzoom_img.attr('src', jQuerycurrent_source.attr('src'));
                if(o.show_descriptions){
                    description = jQuerycurrent_source.attr('title');
                    if(description){
                        jQuerydescription.html(description).show();
                    }
                }

// FUNCTIONS

                // Autoplay
                var stopAutoplay = function(){
                    if(autotimer){
                        clearInterval(autotimer);
                        autotimer = false;
                    }
                };
                var startAutoplay = function(){
                    if(autotimer){
                        stopAutoplay();
                    }
                    autotimer = setInterval(function(){
                        next();
                    }, o.autoplay_interval);
                };

                // Start zooming
                var start_zoom = function(){
                    if(o.zoom_enable == true){
                        jQuerymagnifier.stop().fadeTo(faster, magnifier_opacity);
                        jQueryicon.stop().animate({ opacity:0 }, faster);
                        jQueryzoom.stop().show().animate({ opacity:1 }, faster);
                        // Magnifier invert option
                        if(o.magnifier_invert){
                            jQuerycurrent_thumb.stop().animate({ opacity:o.magnifier_opacity }, faster);
                        }
                        // Pause autoplay
                        if(autoplay){
                            stopAutoplay();
                        }
                    }
                };

                // Stop zooming
                var stop_zoom = function(){
                    jQuerymagnifier.stop().fadeOut(o.speed);
                    jQueryicon.stop().animate({ opacity:1 }, o.speed);
                    jQueryzoom.stop().animate({ opacity:0 }, o.speed, function(){
                        jQuery(this).hide();
                    });
                    // Magnifier invert option
                    if(o.magnifier_invert){
                        jQuerycurrent_thumb.stop().animate({ opacity:1 }, o.speed, function(){
                            if(o.click_to_zoom){
                                clicked_to_zoom = false;
                            }
                        });
                    }
                    clearTimeout(zoom_move_timer);
                    // Restart autoplay
                    if(autoplay){
                        startAutoplay();
                    }
                };

                // Switch active thumb
                var st_click = function(jQuerynext_active, moved){
                    var jQuerynext_thumb,
                        image_number,
                        jQueryactive = jQuerycontainer.find('.moreview_smallthumb_active').removeClass('moreview_smallthumb_active');
                    jQuerynext_active.addClass('moreview_smallthumb_active');
                    // Make sure the magnifier is hidden
                    jQuerymagnifier.stop().hide();
                    // Make sure the zoom area is hidden
                    jQueryzoom.stop().hide();
                    // Switch small thumb
                    if(!moved){
                        st_moving = true;
                        jQueryactive.stop(true,true).animate({ opacity:o.smallthumb_inactive_opacity }, faster);
                        jQuerynext_active.stop(true,true).animate({ opacity:1 }, faster, function(){
                            st_moving = false;
                        });
                    }
                    // Switch large thumb
                    jQuerycontainer.find('.moreview_thumb_active').removeClass('moreview_thumb_active').stop().animate({ opacity:0 }, o.speed, function(){
                        jQuery(this).hide();
                    });
                    jQuerynext_thumb = jQuerythumbs.filter('.thumb_'+jQuerynext_active.data('thumb_id')).addClass('moreview_thumb_active').show().stop().css({ opacity:0 }).animate({ opacity:1 }, o.speed);
                    jQuerycurrent_thumb = jQuerynext_thumb.find('.moreview_thumb_image');
                    jQuerycurrent_source = jQuerynext_thumb.find('.moreview_source_image');
                    // Switch magnifier
                    if(o.magnifier_invert){
                        jQuerymagnifier_img.attr('src', jQuerycurrent_thumb.data('src'));
                    }
                    // Switch zoom image
                    if(preview){
                        jQueryzoom_preview.attr('src', jQuerycurrent_thumb.data('src'));
                    }
                    jQueryzoom_img.attr('src', jQuerycurrent_source.attr('src'));
                    // Switch/hide/show description
                    if(o.show_descriptions){
                        description = jQuerycurrent_source.attr('title');
                        if(description){
                            jQuerydescription.html(description).show();
                        }else{
                            jQuerydescription.hide();
                        }
                    }
                    // Reset autoplay
                    if(autoplay){
                        stopAutoplay();
                        startAutoplay();
                    }
                    // Trigger change-callback
                    image_number = jQuerynext_active.data('id');
                    if(images >= small_thumbs){
                        image_number--;
                    }
                    change_callback(image_number);
                };

                // Smallthumbs sliding
                var st_move = function(distance, jQuerynext_first, jQuerynext_last, jQuerynext_active){
                    jQuery.each(jQuerysmallthumb, function(){
                        var jQuerythis = jQuery(this),
                            animation = {
                            opacity: o.smallthumb_inactive_opacity
                        };
                        if(jQuerythis.data('id') === jQuerynext_active.data('id')){
                            animation.opacity = 1;
                        }
                        if(smallthumbs_align==='vert'){
                            animation.top = '-='+distance;
                        }else{
                            animation.left = '-='+distance;
                        }
                        jQuerythis.animate(animation, faster, 'swing', function(){
                            if(st_moving){
                                jQuerynext_active.addClass('moreview_smallthumb_active');
                                st_moving = false;
                            }
                        });
                    });
                    // Switch thumb
                    st_click(jQuerynext_active, true);
                };

                // Moving the zoomed image
                var zoom_move = function(){
                    var diff_x = new_zoomx - cur_zoomx,
                        diff_y = new_zoomy - cur_zoomy,
                        movethismuchnow_x = -diff_x / zoom_follow_speed,
                        movethismuchnow_y = -diff_y / zoom_follow_speed;
                    cur_zoomx = cur_zoomx - movethismuchnow_x;
                    cur_zoomy = cur_zoomy - movethismuchnow_y;
                    if(diff_x < 1 && diff_x > -1){
                        cur_zoomx = new_zoomx;
                    }
                    if(diff_y < 1 && diff_y > -1){
                        cur_zoomy = new_zoomy;
                    }
                    // Move a bit
                    jQueryzoom_img.css({ left:cur_zoomx, top:cur_zoomy });
                    if(preview){
                        jQueryzoom_preview.css({ left:cur_zoomx, top:cur_zoomy });
                    }
                    // Repeat
                    if(diff_x > 1 || diff_y > 1 || diff_x < 1 || diff_y < 1){
                        zoom_move_timer = setTimeout(function(){
                            zoom_move();
                        }, 25);
                    }
                };

                // Navigate to previous image
                var prev = function(){
                    var jQueryprev;
                    if(o.magnifier_invert){
                        jQuerycontainer.find('.moreview_thumb_active').mouseleave();
                    }
                    if(!o.right_to_left){
                        jQueryprev = jQuerycontainer.find('.moreview_smallthumb_active').prev();
                        if(!jQueryprev.length){
                            if(images > small_thumbs){
                                st_slide_to_end();
                            }else{
                                jQuerysmallthumb.last().trigger('click');
                            }
                            return true;
                        }
                    }else{
                        jQueryprev = jQuerycontainer.find('.moreview_smallthumb_active').next();
                        if(!jQueryprev.length){
                            if(images > small_thumbs){
                                st_slide_to_start();
                            }else{
                                jQuerysmallthumb.first().trigger('click');
                            }
                            return true;
                        }
                    }
                    jQueryprev.trigger('click');
                };

                // Navigate to next image
                var next = function(){
                    var jQuerynext;
                    if(o.magnifier_invert){
                        jQuerycontainer.find('.moreview_thumb_active').mouseleave();
                    }
                    if(!o.right_to_left){
                        jQuerynext = jQuerycontainer.find('.moreview_smallthumb_active').next();
                        if(!jQuerynext.length){
                            if(images > small_thumbs){
                                st_slide_to_start();
                            }else{
                                jQuerysmallthumb.first().trigger('click');
                            }
                            return true;
                        }
                    }else{
                        jQuerynext = jQuerycontainer.find('.moreview_smallthumb_active').prev();
                        if(!jQuerynext.length){
                            if(images > small_thumbs){
                                st_slide_to_end();
                            }else{
                                jQuerysmallthumb.last().trigger('click');
                            }
                            return true;
                        }
                    }
                    jQuerynext.trigger('click');
                };

                // Navigate to specific image
                var show = function(number){
                    if(images <= small_thumbs || !o.show_begin_end_smallthumb){
                        number = number-1;
                    }
                    var jQuerynumber = jQuerysmallthumb.eq(number);
                    if(jQuerynumber.length && !st_moving){
                        var jQueryactive = jQuerycontainer.find('.moreview_smallthumb_active'),
                            active = jQueryactive.data('id')-1,
                            difference;
                        // Move backward
                        if(active > number){
                            st_steps = active - number;
                            var jQueryfirst = jQuerycontainer.find('.moreview_smallthumb_first'),
                                firstid = jQueryfirst.data('id');
                            if(number < firstid){
                                difference = active - firstid;
                                st_steps = st_steps - difference;
                                jQueryfirst.trigger('click');
                            }else{
                                st_click(jQuerynumber, false);
                            }
                        }
                        // Move forward
                        else if(active < number){
                            st_steps = number - active;
                            var jQuerylast = jQuerycontainer.find('.moreview_smallthumb_last'),
                                lastid = jQuerylast.data('id')-1;
                            if(number >= lastid){
                                difference = lastid - active - 1;
                                st_steps = st_steps - difference;
                                jQuerylast.trigger('click');
                            }else{
                                st_click(jQuerynumber, false);
                            }
                        }
                    }
                };

// EXTERNAL FUNCTIONS

                // Navigate to previous image
                window[instance_id+'_previous'] = function(){
                    prev();
                };

                // Navigate to next image
                window[instance_id+'_next'] = function(){
                    next();
                };

                // Navigate to specific image
                window[instance_id+'_show'] = function(number){
                    show(number);
                };

// CALLBACK FUNCTIONS

                // Thumb click callback
                // Return false === do not trigger regular click event
                var click_callback = function(image_anchor){
                    // Plugin option callback
                    if(!o.click_callback(image_anchor, instance_id)){
                        return false;
                    }
                    // Legacy support
                    if(typeof moreview_click_callback === 'function'){
                        moreview_click_callback(image_anchor, instance_id);
                        return false;
                    }
                    return true;
                };

                // Thumb switched callback
                var change_callback = function(image_number){
                    // Plugin option callback
                    if(o.change_callback(image_number, instance_id)){
                        // Legacy support
                        if(typeof moreview_change_callback === 'function'){
                            moreview_change_callback(image_number, instance_id);
                        }
                    }
                };

// ACTIONS

                // Thumb hover
                
                jQuerythumbs.add(jQuerymagnifier).add(jQueryicon).mouseenter(function(){
                    // Hide hint
                    if(o.show_hint){
                        jQueryhint.hide();
                    }
                    // Start zooming
                    if(!o.click_to_zoom || clicked_to_zoom){
                        start_zoom();
                    }
                }).mouseleave(function(){
                    stop_zoom();
                });

                // Magnifier movement
                var max_zoomx = -(o.source_image_width-zoom_area_width),
                    max_zoomy = -(o.source_image_height-zoom_area_height);
                jQuerythumbs.add(jQuerymagnifier).add(jQueryicon).mousemove(function(e){
                    var mouse_x = Math.round( e.pageX - jQuerycurrent_thumb.offset().left + magnifier_left ),
                        mouse_y = Math.round( e.pageY - jQuerycurrent_thumb.offset().top + magnifier_top );

                    // Magnifier location
                    var new_x = (mouse_x-magnifier_center_x),
                        new_y = (mouse_y-magnifier_center_y);
                    if(new_x < magnifier_left){ new_x = magnifier_left; }
                    if(new_x > magnifier_right){ new_x = magnifier_right; }
                    if(new_y < magnifier_top){ new_y = magnifier_top; }
                    if(new_y > magnifier_bottom){ new_y = magnifier_bottom; }
                    jQuerymagnifier.css({ left:new_x, top:new_y });

                    // Magnifier invert option
                    if(o.magnifier_invert){
                        var invert_x = new_x-magnifier_left,
                            invert_y = new_y-magnifier_top;
                        jQuerymagnifier_img.css({ left:-invert_x, top:-invert_y });
                    }

                    // Zoomed area scrolling
                    new_zoomx = -( (new_x-magnifier_left) * (1/(o.thumb_image_width/o.source_image_width)) );
                    new_zoomy = -( (new_y-magnifier_top) * (1/(o.thumb_image_height/o.source_image_height)) );
                    if(new_zoomx < max_zoomx){ new_zoomx = max_zoomx; }
                    if(new_zoomy < max_zoomy){ new_zoomy = max_zoomy; }
                    if(o.zoom_easing){
                        clearTimeout(zoom_move_timer);
                        zoom_move();
                    }
                    else{
                        if(preview){
                            jQueryzoom_preview.css({ left:new_zoomx, top:new_zoomy });
                        }
                        jQueryzoom_img.css({ left:new_zoomx, top:new_zoomy });
                    }
                });

function st_shift_1(direction){
    st_steps = (st_steps) ? st_steps-1 : 0;
    st_moving = true;
    var jQueryfirst = jQuerycontainer.find('.moreview_smallthumb_first').removeClass('moreview_smallthumb_first');
    var jQuerylast = jQuerycontainer.find('.moreview_smallthumb_last').removeClass('moreview_smallthumb_last');
    var jQuerynext_first, jQuerynext_last, jQuerynext_active, distance;
    if(direction === 'left'){
        jQuerynext_first = jQueryfirst.prev().addClass('moreview_smallthumb_first');
        jQuerynext_last = jQuerylast.prev().addClass('moreview_smallthumb_last');
        jQuerynext_active = jQueryfirst;
    }else{
        jQuerynext_first = jQueryfirst.next().addClass('moreview_smallthumb_first');
        jQuerynext_last = jQuerylast.next().addClass('moreview_smallthumb_last');
        jQuerynext_active = jQuerylast;
    }
    // If more steps
    if(st_steps){
        if(direction==='left'){
            jQuerynext_first.trigger('click');
        }else{
            jQuerynext_last.trigger('click');
        }
    }
    // Move & select new thumb
    else{
        // Get position
        distance = (smallthumbs_align==='vert') ? jQuerynext_first.position().top : jQuerynext_first.position().left;
        st_move(distance, jQuerynext_first, jQuerynext_last, jQuerynext_active);
    }
}
function st_slide_to_startend(to){
    st_moving = true;
    var jQueryfirst = jQuerycontainer.find('.moreview_smallthumb_first').removeClass('moreview_smallthumb_first');
    var jQuerylast = jQuerycontainer.find('.moreview_smallthumb_last').removeClass('moreview_smallthumb_last');
    var jQuerynext_first, jQuerynext_last, jQuerynext_active;
    if(to==='end'){
        jQuerynext_first = jQuerysmallthumb.eq(smallthumbs-small_thumbs).addClass('moreview_smallthumb_first');
        jQuerynext_last = jQuerysmallthumb.eq(smallthumbs-1).addClass('moreview_smallthumb_last');
        jQuerynext_active = jQuerynext_last;
        if(jQuerynext_last.hasClass('moreview_smallthumb_navtostart')){
            jQuerynext_active = jQuerynext_last.prev();
        }
    }else{
        jQuerynext_first = jQuerysmallthumb.eq(0).addClass('moreview_smallthumb_first');
        jQuerynext_last = jQuerysmallthumb.eq(small_thumbs-1).addClass('moreview_smallthumb_last');
        jQuerynext_active = jQuerynext_first;
        if(jQuerynext_first.hasClass('moreview_smallthumb_navtoend')){
            jQuerynext_active = jQuerynext_first.next();
        }
    }
    // Get position
    var distance = (smallthumbs_align==='vert') ? jQuerynext_first.position().top : jQuerynext_first.position().left;
    // Move & select new thumb
    st_move(distance, jQuerynext_first, jQuerynext_last, jQuerynext_active);
}
function st_slide_to_start(){
    st_slide_to_startend('start');
}
function st_slide_to_end(){
    st_slide_to_startend('end');
}

                // Smallthumb behaviour
                if(images > 1 || !o.smallthumb_hide_single){
                    // Smallthumb click event
                    jQuerysmallthumb.click(function(){
                        var jQuerythis = jQuery(this),
                            i,
                            distance = 0,
                            dont_move = false,
                            jQueryfirst,
                            jQuerylast,
                            jQuerynext_first,
                            jQuerynext_last,
                            jQuerynext_active;
                        // If not active thumb & not already moving
                        if(!jQuerythis.hasClass('moreview_smallthumb_active') && (!st_moving || st_steps)){

                            // Slide left / up
                            if(jQuerythis.hasClass('moreview_smallthumb_first') && jQuerythis.prev().length){
                                st_shift_1('left');
                            }
                            // Shift to end
                            else if(jQuerythis.hasClass('moreview_smallthumb_navtoend')){
                                st_slide_to_end();
                            }

                            // Slide right / down
                            else if(jQuerythis.hasClass('moreview_smallthumb_last') && jQuerythis.next().length){
                                st_shift_1('right');
                            }
                            // Shift to beginning
                            else if(jQuerythis.hasClass('moreview_smallthumb_navtostart')){
                                st_slide_to_start();
                            }

                            // Regular click without moving smallthumbs
                            else{
                                // If still stepping and this is the last
                                if(st_steps && !jQuery(this).next().length){

                                    st_slide_to_end();
                                    return true;
                                }
                                // If still stepping and this is the first
                                else if(st_steps && !jQuery(this).prev().length){
                                    st_slide_to_start();
                                    return true;
                                }
                                st_click(jQuerythis, false);
                            }

                        }
                    });

                    // Smallthumb hover
                    if(o.smallthumb_select_on_hover){
                        jQuerysmallthumb.mouseenter(function(){
                            jQuery(this).trigger('click');
                        });
                    }

                }

                // Large thumbnail click to zoom
                if(o.click_to_zoom){
                    jQuerythumbs.click(function(){
                        clicked_to_zoom = true;
                        start_zoom();
                    });
                }
                // Large thumbnail click callback
                else{
                    jQuerymagnifier.click(function(){
                        var image_anchor = jQuerycurrent_thumb.data('anchor');
                        if(image_anchor){
                            // Click callback function
                            if(click_callback(image_anchor)){
                                // Regular href action
                                window.location = image_anchor;
                            }
                        }
                    });
                }

                if(images > 1 && o.keyboard){
                    // Keystrokes
                    jQuery(document).keydown(function(e){
                        // Right arrow = move right / down
                        if(e.keyCode===39 || e.keyCode==='39'){
                            if(!o.right_to_left){
                                next();
                            }else{
                                prev();
                            }
                        }
                        // Left arrow = move left / up
                        if(e.keyCode===37 || e.keyCode==='37'){
                            if(!o.right_to_left){
                                prev();
                            }else{
                                next();
                            }
                        }
                    });
                }

                // Remove loading gifs when full page is loaded
                jQuery(window).bind('load', function(){
                    // Large thumbnail background image
                    jQuerythumbs.css({ 'background-image':'none' });
                    // Zoom background image
                    jQueryzoom.css({ 'background-image':'none' });
                    // Remove zoom preview
                    if(preview){
                        preview = false;
                        jQueryzoom_preview.remove();
                    }
                });

                // Initiate first autoplay
                if(autoplay){
                    startAutoplay();
                }

            }
        });
        return this;
    };
})(jQuery);
		
		/*!
	Zoom v1.7.11 - 2013-11-12
	Enlarge images on click or mouseover.
	(c) 2013 Jack Moore - http://www.jacklmoore.com/zoom
	license: http://www.opensource.org/licenses/mit-license.php
*/
(function(o){var t={url:!1,callback:!1,target:!1,duration:120,on:"mouseover",touch:!0,onZoomIn:!1,onZoomOut:!1,magnify:1};o.zoom=function(t,n,e,i){var u,c,a,m,r,l,s,f=o(t).css("position");return o(t).css({position:/(absolute|fixed)/.test(f)?f:"relative",overflow:"hidden"}),e.style.width=e.style.height="",o(e).addClass("zoomImg").css({position:"absolute",top:0,left:0,opacity:0,width:e.width*i,height:e.height*i,border:"none",maxWidth:"none"}).appendTo(t),{init:function(){c=o(t).outerWidth(),u=o(t).outerHeight(),n===t?(m=c,a=u):(m=o(n).outerWidth(),a=o(n).outerHeight()),r=(e.width-c)/m,l=(e.height-u)/a,s=o(n).offset()},move:function(o){var t=o.pageX-s.left,n=o.pageY-s.top;n=Math.max(Math.min(n,a),0),t=Math.max(Math.min(t,m),0),e.style.left=t*-r+"px",e.style.top=n*-l+"px"}}},o.fn.zoom=function(n){return this.each(function(){var e,i=o.extend({},t,n||{}),u=i.target||this,c=this,a=document.createElement("img"),m=o(a),r="mousemove.zoom",l=!1,s=!1;(i.url||(e=o(c).find("img"),e[0]&&(i.url=e.data("src")||e.attr("src")),i.url))&&(a.onload=function(){function t(t){e.init(),e.move(t),m.stop().fadeTo(o.support.opacity?i.duration:0,1,o.isFunction(i.onZoomIn)?i.onZoomIn.call(a):!1)}function n(){m.stop().fadeTo(i.duration,0,o.isFunction(i.onZoomOut)?i.onZoomOut.call(a):!1)}var e=o.zoom(u,c,a,i.magnify);"grab"===i.on?o(c).on("mousedown.zoom",function(i){1===i.which&&(o(document).one("mouseup.zoom",function(){n(),o(document).off(r,e.move)}),t(i),o(document).on(r,e.move),i.preventDefault())}):"click"===i.on?o(c).on("click.zoom",function(i){return l?void 0:(l=!0,t(i),o(document).on(r,e.move),o(document).one("click.zoom",function(){n(),l=!1,o(document).off(r,e.move)}),!1)}):"toggle"===i.on?o(c).on("click.zoom",function(o){l?n():t(o),l=!l}):"mouseover"===i.on&&(e.init(),o(c).on("mouseenter.zoom",t).on("mouseleave.zoom",n).on(r,e.move)),i.touch&&o(c).on("touchstart.zoom",function(o){o.preventDefault(),s?(s=!1,n()):(s=!0,t(o.originalEvent.touches[0]||o.originalEvent.changedTouches[0]))}).on("touchmove.zoom",function(o){o.preventDefault(),e.move(o.originalEvent.touches[0]||o.originalEvent.changedTouches[0])}),o.isFunction(i.callback)&&i.callback.call(a)},a.src=i.url,o(c).one("zoom.destroy",function(){o(c).off(".zoom"),m.remove()}))})},o.fn.zoom.defaults=t})(window.jQuery);