(function () {
    if (typeof jagif_pg_params === 'undefined') {
        return false;
    }

    jQuery(document).ready(function () {
        'use strict';
        if ( ! jQuery('.jagif-popup-gift-wrap').length ) {
            jQuery('.jagif-popup-gift-icon-wrap.jagif-popup-is-product-gift').remove();
        }
        if (jQuery('.jagif-popup-gift-wrap:not(.jagif-popup-gift-wrap-init)').length) {
            jQuery('.jagif-popup-gift-wrap:not(.jagif-popup-gift-wrap-init)').addClass('jagif-popup-gift-wrap-init');
            jagif_popup_gift_init();
        }
    });
    jQuery(window).on('load', function () {
        'use strict';
        if ( ! jQuery('.jagif-popup-gift-wrap').length ) {
            jQuery('.jagif-popup-gift-icon-wrap.jagif-popup-is-product-gift').remove();
        }
        if (jQuery('.jagif-popup-gift-wrap:not(.jagif-popup-gift-wrap-init)').length) {
            jQuery('.jagif-popup-gift-wrap:not(.jagif-popup-gift-wrap-init)').addClass('jagif-popup-gift-wrap-init');
            jagif_popup_gift_init();
        }
    });
    jQuery(window).on('resize', function () {
        'use strict';
        jagif_pg_design(jQuery('.jagif-popup-gift-content-wrap'));
    });


})();

function jagif_popup_gift_init() {
    let icon_popup = jQuery('.jagif-popup-gift-icon-wrap');
    if (icon_popup.hasClass('jagif-popup-auto-show-enable') && icon_popup.hasClass('jagif-popup-is-product-gift')) {
        jagif_pg_toggle('show');
    }
    jQuery(document).on('mouseenter', '.jagif-popup-gift-icon-wrap', function () {
        if (jQuery(this).hasClass('jagif-popup-gift-icon-wrap-click')) {
            jQuery(this).removeClass('jagif-popup-gift-icon-wrap-mouseleave').addClass('jagif-popup-gift-icon-wrap-mouseenter');
        } else {
            jagif_pg_toggle('show');
        }
    }).on('mouseleave', '.jagif-popup-gift-icon-wrap', function () {
        if (jQuery(this).hasClass('jagif-popup-gift-icon-wrap-mouseenter')) {
            jQuery(this).removeClass('jagif-popup-gift-icon-wrap-mouseenter').addClass('jagif-popup-gift-icon-wrap-mouseleave');
        }
    }).on('click', '.jagif-popup-gift-icon-wrap', function () {
        if (jQuery(this).hasClass('jagif-popup-gift-icon-wrap-click')) {
            jagif_pg_toggle('show');
        }
    });

    jQuery(document).on('click', '.jagif-popup-gift-overlay, .jagif-popup-gift-close-wrap, .jagif-free-gift-popup-close', function () {
        if (!jQuery(this).hasClass('jagif-not-hidden')) {
            jagif_pg_toggle('hide');
        }
    });
    jQuery(document).on('click', '.jagif-gift_icon-clear-button', function () {
        if (!jQuery(this).hasClass('jagif-not-hidden')) {
            jagif_pg_toggle('hide');
        }
    });
    jQuery(document).on('click', '.jagif-slide-left', function () {
        let items = jQuery('.jagif-popup-slide_wrap #jagif-free_gift_wrap');
        if (items.length) {
            let number = items.length,
                slide = parseInt(jQuery(this).closest('.jagif-popup-slide_wrap').data('slide'));
            if (slide !== '' && slide > 0) {
                jQuery(this).closest('.jagif-popup-slide_wrap').data('slide', slide - 1);
                jQuery.each(items, function (index, value) {
                    if (index != slide - 1) {
                        jagifSlideLeft(jQuery(this), 400, 0, parseFloat(jQuery(this).width()) * (slide - 1));
                    } else {
                        jagifSlideLeft(jQuery(this), 400, 1, parseFloat(jQuery(this).width()) * (slide - 1));
                    }
                })
            }
        }
    });
    jQuery(document).on('click', '.jagif-slide-right', function () {
        let items = jQuery('.jagif-popup-slide_wrap #jagif-free_gift_wrap');
        if (items.length) {
            let number = items.length,
                slide = parseInt(jQuery(this).closest('.jagif-popup-slide_wrap').data('slide'));
            if (slide !== '' && slide < number-1) {
                jQuery(this).closest('.jagif-popup-slide_wrap').data('slide', slide + 1);
                jQuery.each(items, function (index, value) {
                    if (index != slide + 1) {
                        jagifSlideRight(jQuery(this), 400, 0, parseFloat(jQuery(this).width()) * (slide + 1));
                    } else {
                        jagifSlideRight(jQuery(this), 400, 1, parseFloat(jQuery(this).width()) * (slide + 1));
                    }
                })
            }
        }
    });

}

jQuery(document.body).on('jagif-popup-gift-toggle', function (e, action, new_effect = '') {
    let wrap = jQuery('.jagif-popup-gift-content-wrap'),
        position = jQuery('.jagif-popup-gift').data('position'),
        effect = jQuery('.jagif-popup-gift').data('effect');
    if (action === 'hide' && wrap.hasClass('jagif-popup-gift-content-close')) {
        return false;
    }
    if (action === 'show' && wrap.hasClass('jagif-popup-gift-content-open')) {
        return false;
    }
    jagif_pg_design(wrap);
    let type = (position === 'top_left' || position === 'bottom_left') ? 'left' : 'right';
    if (action === 'start' && new_effect) {
        if (wrap.hasClass('jagif-popup-gift-content-close')) {
            wrap.removeClass('jagif-popup-gift-content-open jagif-popup-gift-content-open-' + effect + '-' + type);
            wrap.addClass('jagif-popup-gift-content-close jagif-popup-gift-content-close-' + new_effect + '-' + type);
        } else {
            wrap.addClass('jagif-popup-gift-content-open jagif-popup-gift-content-open-' + new_effect + '-' + type);
            wrap.removeClass('jagif-popup-gift-content-close jagif-popup-gift-content-close-' + effect + '-' + type);
        }
        jQuery('.jagif-popup-gift').data('effect', new_effect);
        return false;
    }
    new_effect = new_effect ? new_effect : effect;
    let old_position = jQuery('.jagif-popup-gift').data('old_position') || '';
    let old_type = old_position ? ((old_position === 'top_left' || old_position === 'bottom_left') ? 'left' : 'right') : type;
    let class_open = 'jagif-popup-gift-content-open jagif-popup-gift-content-open-' + new_effect + '-' + type,
        class_close = 'jagif-popup-gift-content-close jagif-popup-gift-content-close-' + new_effect + '-' + type,
        class_open_old = 'jagif-popup-gift-content-open jagif-popup-gift-content-open-' + effect + '-' + old_type,
        class_close_old = 'jagif-popup-gift-content-close jagif-popup-gift-content-close-' + effect + '-' + old_type + ' jagif-popup-gift-content-close-' + effect + '-' + type;
    if (wrap.hasClass('jagif-popup-gift-content-close')) {
        wrap.addClass(class_open).removeClass(class_close).removeClass(class_close_old);
        jQuery('html').addClass('jagif-html-non-scroll');
        jQuery('.jagif-popup-gift-overlay').removeClass('jagif-disabled');
        jQuery('.jagif-popup-gift').data('effect', new_effect);
        jagif_pg_icon_toggle();
    } else {
        wrap.addClass(class_close).removeClass(class_open).removeClass(class_open_old);
        jQuery('.jagif-popup-gift-overlay').addClass('jagif-disabled');
        jQuery('html').removeClass('jagif-html-non-scroll');
        jagif_pg_icon_toggle(true);
    }
    jQuery('.jagif-popup-gift').data('effect', new_effect);
});

function jagif_pg_toggle(action = '', new_effect = '') {
    let wrap = jQuery('.jagif-popup-gift-content-wrap'),
        position = jQuery('.jagif-popup-gift').data('position'),
        effect = jQuery('.jagif-popup-gift').data('effect');
    if (action === 'hide' && wrap.hasClass('jagif-popup-gift-content-close')) {
        return false;
    }
    if (action === 'show' && wrap.hasClass('jagif-popup-gift-content-open')) {
        return false;
    }
    jagif_pg_design(wrap);
    let type = (position === 'top_left' || position === 'bottom_left') ? 'left' : 'right';
    if (action === 'start' && new_effect) {
        if (wrap.hasClass('jagif-popup-gift-content-close')) {
            wrap.removeClass('jagif-popup-gift-content-open jagif-popup-gift-content-open-' + effect + '-' + type);
            wrap.addClass('jagif-popup-gift-content-close jagif-popup-gift-content-close-' + new_effect + '-' + type);
        } else {
            wrap.addClass('jagif-popup-gift-content-open jagif-popup-gift-content-open-' + new_effect + '-' + type);
            wrap.removeClass('jagif-popup-gift-content-close jagif-popup-gift-content-close-' + effect + '-' + type);
        }
        jQuery('.jagif-popup-gift').data('effect', new_effect);
        return false;
    }
    new_effect = new_effect ? new_effect : effect;
    let old_position = jQuery('.jagif-popup-gift').data('old_position') || '';
    let old_type = old_position ? ((old_position === 'top_left' || old_position === 'bottom_left') ? 'left' : 'right') : type;
    let class_open = 'jagif-popup-gift-content-open jagif-popup-gift-content-open-' + new_effect + '-' + type,
        class_close = 'jagif-popup-gift-content-close jagif-popup-gift-content-close-' + new_effect + '-' + type,
        class_open_old = 'jagif-popup-gift-content-open jagif-popup-gift-content-open-' + effect + '-' + old_type,
        class_close_old = 'jagif-popup-gift-content-close jagif-popup-gift-content-close-' + effect + '-' + old_type + ' jagif-popup-gift-content-close-' + effect + '-' + type;
    if (wrap.hasClass('jagif-popup-gift-content-close')) {
        wrap.addClass(class_open).removeClass(class_close).removeClass(class_close_old);
        jQuery('html').addClass('jagif-html-non-scroll');
        jQuery('.jagif-popup-gift-overlay').removeClass('jagif-disabled');
        jQuery('.jagif-popup-gift').data('effect', new_effect);
        jagif_pg_icon_toggle();
    } else {
        wrap.addClass(class_close).removeClass(class_open).removeClass(class_open_old);
        jQuery('.jagif-popup-gift-overlay').addClass('jagif-disabled');
        jQuery('html').removeClass('jagif-html-non-scroll');
        jagif_pg_icon_toggle(true);
    }
    jQuery('.jagif-popup-gift').data('effect', new_effect);
}

function jagif_pg_icon_toggle(show = false, added_to_cart = false) {
    if (show) {
        if (!added_to_cart && !jQuery('.jagif-popup-gift-wrap').data('empty_enable') && !jQuery('.jagif-popup-gift-wrap').find('.jagif-popup-gift-pd-wrap').length) {
            return false;
        }
        jQuery('.jagif-popup-gift-icon-wrap').removeClass('jagif-disabled jagif-popup-gift-icon-wrap-close jagif-popup-gift-icon-wrap-mouseenter jagif-popup-gift-icon-wrap-mouseleave');
        jQuery('.jagif-popup-gift-icon-wrap').addClass('jagif-popup-gift-icon-wrap-open');
    } else {
        jQuery('.jagif-popup-gift-icon-wrap').addClass('jagif-popup-gift-icon-wrap-close');
        jQuery('.jagif-popup-gift-icon-wrap').removeClass('jagif-popup-gift-icon-wrap-open jagif-popup-gift-icon-wrap-mouseenter jagif-popup-gift-icon-wrap-mouseleave');
    }
}

function jagif_pg_design(wrap) {
    wrap = jQuery(wrap);
    if (window.innerWidth < 782) {
        wrap.css({maxHeight: window.innerHeight});
    }
}

function jagifSlideLeft(item, speed, opacity, right) {
    if (opacity === 0) jQuery(item).css('visibility', 'hidden'); else jQuery(item).css('visibility', 'visible');
    jQuery(item).animate({
        'opacity': opacity,
        'left': -right + 'px'
    }, speed || 400);
}

function jagifSlideRight(item, speed, opacity, right) {
    if (opacity === 0) jQuery(item).css('visibility', 'hidden'); else jQuery(item).css('visibility', 'visible');
    jQuery(item).animate({
        'opacity': opacity,
        'left': -right + 'px'
    }, speed || 400);
}