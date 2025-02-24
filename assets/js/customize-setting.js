jQuery(document).ready(function () {
    'use strict';
    jagif_design_init();
    jagif_customize_init();
    jagif_customize_pg_design();
});

function jagif_design_init() {
    jQuery('.jagif-customize-range').each(function () {
        let range_wrap = jQuery(this),
            range = jQuery(this).find('.jagif-customize-range1');
        let min = range.attr('min') || 0,
            max = range.attr('max') || 0,
            start = range.data('start');
        range.range({
            min: min,
            max: max,
            start: start,
            input: range_wrap.find('.jagif-customize-range-value'),
            onChange: function (val) {
                let setting = range_wrap.find('.jagif-customize-range-value').attr('data-customize-setting-link');
                wp.customize(setting, function (e) {
                    e.set(val);
                });
            }
        });
        range_wrap.next('.jagif-customize-range-min-max').find('.jagif-customize-range-min').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            range.range('set value', min);
            let setting = range_wrap.find('.jagif-customize-range-value').attr('data-customize-setting-link');
            wp.customize(setting, function (e) {
                e.set(min);
            });
        });
        range_wrap.next('.jagif-customize-range-min-max').find('.jagif-customize-range-max').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            range.range('set value', max);
            let setting = range_wrap.find('.jagif-customize-range-value').attr('data-customize-setting-link');
            wp.customize(setting, function (e) {
                e.set(max);
            });
        });
        range_wrap.find('.jagif-customize-range-value').on('change', function () {
            let setting = jQuery(this).attr('data-customize-setting-link'),
                val = parseInt(jQuery(this).val() || 0);
            if (val > parseInt(max)) {
                val = max
            } else if (val < parseInt(min)) {
                val = min;
            }
            range.range('set value', val);
            wp.customize(setting, function (e) {
                e.set(val);
            });
        });
    });
    jQuery('.jagif-customize-radio').each(function () {
        jQuery(this).buttonset();
        jQuery(this).find('input:radio').on('change', function () {
            let setting = jQuery(this).attr('data-customize-setting-link'),
                val = parseInt(jQuery(this).val() || 0);
            wp.customize(setting, function (e) {
                e.set(val);
            });
        });
    });
    jQuery('.jagif-customize-checkbox').each(function () {
        jQuery(this).checkbox();
        jQuery(this).on('change', function () {
            let input = jQuery(this).parent().find('input[type="hidden"]');
            if (jQuery(this).prop('checked')) {
                input.val('1');
            } else {
                input.val('');
            }
            let setting = input.attr('data-customize-setting-link');
            wp.customize(setting).set(input.val());
        });
    });
}

function jagif_customize_init() {

    wp.customize.section('jagif_design_single_product', function (section) {
        section.expanded.bind(function (isExpanded) {
            let check_type = wp.customize('jagif_woo_free_gift_params[gb_display_style]').get();
            if (isExpanded && check_type === '4') {
                wp.customize.previewer.send('jagif_pg_toggle', 'show', '');
            } else if ( isExpanded ) {
                wp.customize.previewer.send('jagif_pg_toggle', 'hide', '');
            }
        });
    });
    wp.customize.previewer.bind('jagif_update_url', function (url) {
        wp.customize.previewer.previewUrl.set(url);
    });
    wp.customize.section('jagif_design_single_product', function (section) {
        section.expanded.bind(function (isExpanded) {
            if (isExpanded) {
                let current_url = wp.customize.previewer.previewUrl.get(),
                    single_product = jagif_preview_setting.single_product_customize;
                if (single_product && current_url.indexOf(single_product) !== '0') {
                    wp.customize.previewer.send('jagif_update_url', single_product);
                }
            }
        });
    });
    wp.customize.section('jagif_design_icon_gift', function (section) {
        section.expanded.bind(function (isExpanded) {
            if (isExpanded) {
                let current_url = wp.customize.previewer.previewUrl.get(),
                    shop_url = jagif_preview_setting.shop_url,
                    single_product = jagif_preview_setting.single_product_customize;
                if (!single_product || current_url.indexOf(shop_url) !== '0') {
                    wp.customize.previewer.send('jagif_update_url', shop_url);
                }
            }

        });
    });

}

function jagif_customize_pg_design() {
    let pg_toggle = [
        'pg_position',
        'pg_icon',
        'pg_enable_auto_show',
        'pg_icon_box_shadow',
        'pg_horizontal',
        'pg_vertical',
        'pg_icon_color',
        'pg_icon_bg',
        'pg_icon_count_color',
        'pg_icon_count_bg_color'
    ];
    if (jQuery('select[id="_customize-input-jagif_woo_free_gift_params[gb_display_style]"]').val() === '0') {
        jQuery.each(pg_toggle, function (k, v) {
            jQuery('#customize-control-jagif_woo_free_gift_params-' + v).addClass('jagif-hide');
        })
    } else {
        jQuery.each(pg_toggle, function (k, v) {
            jQuery('#customize-control-jagif_woo_free_gift_params-' + v).removeClass('jagif-hide');
        })
    }
    jQuery('select[id="_customize-input-jagif_woo_free_gift_params[gb_display_style]"]').on('change', function () {

        if (jQuery(this).val() === '0') {
            jQuery.each(pg_toggle, function (k, v) {
                jQuery('#customize-control-jagif_woo_free_gift_params-' + v).addClass('jagif-hide');
            })
        } else {
            jQuery.each(pg_toggle, function (k, v) {
                jQuery('#customize-control-jagif_woo_free_gift_params-' + v).removeClass('jagif-hide');
            })
        }
    });
}