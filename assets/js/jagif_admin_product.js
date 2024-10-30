(function () {
    'use strict';
    jQuery(document).ready(function ($) {
        /*
            global jagif_admin_product_params
        */
        if (jagif_admin_product_params['jagif_product_type'] === 'gp') {
            $('#product-type').val('jagif-gift').trigger('change');
        }
        if ($('#jagif-list').find('.list-group-item').length){
            if ($('.jagif_gift_name').length){
                $('#jagif_settings').find('.list-group-item > .jagif-gift-item-content').show();
                _load_select2($('.jagif-display_gift_archive_id'),'product');
            }
        }
        jagif_active_settings();

        $(document).on('change', '#product-type', function () {
            jagif_active_settings();
        });

        $(document).on('click', '.jagif-add-gift_options', function () {
            _load_select2($('#jagif_add_gift').find('.jagif-add-gift-pack_id'), 'gift');
        });

        $(document).on('click', '.btn-del-gift-pack', function () {
            $(this).closest('.jagif_add_gift_pack_field').find('.jagif-add-gift-pack_id').html('');
        });

        $(document).on('change', '#jagif_status_gift_pack', function () {
            if (this.checked) {
                $(this).parent().parent().find('.jagif_visible').addClass('jagif-disabled');
            } else {
                $(this).parent().parent().find('.jagif_visible').removeClass('jagif-disabled');
            }
        });

        function jagif_active_settings() {
            let list_toggle = [
                'product_catdiv',
                'tagsdiv-product_tag',
                'postimagediv',
                'woocommerce-product-images',
                'postcustom',
                'slugdiv',
                'postexcerpt',
                'preview-action',
                'commentsdiv',
                'edit-slug-box',
            ];
            if ($('#product-type').val() === 'jagif-gift') {
                jQuery.each(list_toggle, function (k, v) {
                    $('#' + v).addClass('hide_if_jagif');
                });
                $('li.general_tab').addClass('hide_if_jagif');
                $('li.inventory_tab').addClass('show_if_jagif');
                $('#woocommerce-product-data').find('.options_group ._manage_stock_field').addClass('show_if_jagif');
                $('li.shipping_tab').addClass('hide_if_jagif');
                $('li.linked_product_tab').addClass('hide_if_jagif');
                $('li.attribute_tab').addClass('hide_if_jagif');
                $('li.advanced_tab').addClass('hide_if_jagif');
                $('.panel-wrap .panel').hide();
                setTimeout(() => function () {
                    $('#jagif_settings').show();
                }, 250);
                $('.product_data_tabs li').removeClass('active');
                $('.product_data_tabs li.jagif-gift_tab').addClass('active');
                $('.show_if_jagif').show();
            } else {
                jQuery.each(list_toggle, function (k, v) {
                    $('#' + v).removeClass('hide_if_jagif');
                });
                $('li.general_tab').removeClass('hide_if_jagif');
                $('li.inventory_tab').removeClass('show_if_jagif');
                $('#woocommerce-product-data').find('.options_group ._manage_stock_field').removeClass('show_if_jagif');
                $('li.shipping_tab').removeClass('hide_if_jagif');
                $('li.linked_product_tab').removeClass('hide_if_jagif');
                $('li.attribute_tab').removeClass('hide_if_jagif');
                $('li.advanced_tab').removeClass('hide_if_jagif');
                $('.show_if_jagif').hide();
            }

        }

        $(document).on('click', '.jagif_add_row_product', function () {
            let $this_clone = $(`
            <div class="list-group-item open">
                <h3>
                    <a href="#" class="del_row_product delete">Remove</a>
                    <div class="jagif-sort tips sort" data-tip="Drag and drop to set gift item order"></div>
                    <strong class="jagif_gift_name"></strong>
                </h3>
                <div class="jagif-gift-item-content">
                    <div class="jagif-detail-gift-item product_gift">
                        <label for="">Select product</label>
                        <div class="item_column option_archive_id">
                            <select class="jagif-display_gift_archive_id" name="jagif-display_gift[0][archive_id]">
                            </select>
                        </div>
                    </div>
                    <div class="jagif-detail-gift-item product_gift_qty">
                        <label for="">Quantity:</label>
                        <div class="item_column archive">
                              <input class="jagif-display_gift_archive" name="jagif-display_gift[0][archive]" type="number" min="1" step="1" value="1">
                        </div>
                    </div>
                 </div>
            </div>
            `);
            let check = $('.list-group-item').length;
            let $wrapper = $(this).closest('#jagif_settings');
            let jagif_list = $('#jagif-list');

            jagif_list.append($this_clone);
            _load_name_row_duplicate(jagif_list);
            _load_select2($this_clone.find('.jagif-display_gift_archive_id'), 'product');

            jagif_list.find('.list-group-item').last().find('h3').trigger('click');
            return false;
        });
        $(document).on('change', '.jagif-display_gift_archive_id', function () {
            let gift_name = $(this).closest('.list-group-item').find('.jagif_gift_name');
            let get_name = $(this).find('option:last-of-type').html();
            $(gift_name).html(get_name);
        });
        $(document).on('click', '.del_row_product', function () {
            let $this = $(this),
                $this_val = $(this).val(),
                $this_closet = $this.closest('.list-group-item');

            if ($('#jagif-list .list-group-item').length > 1) {
                let cf = confirm(jagif_admin_product_params.jagif_product_confirm);
                if (cf == true) {
                    $this_closet.remove();
                    _load_name_row_duplicate($('#jagif-list'));
                }
            } else {
                alert('Unable to delete row');
            }
            return false;
        });

        $('.jagif-list-group').sortable({
            items: '.list-group-item',
            cursor: 'move',
            axis: 'y',
            handle: 'h3',
            scrollSensitivity: 40,
            forcePlaceholderSize: true,
            helper: 'clone',
            opacity: 0.65,
            placeholder: 'jagif-metabox-sortable-placeholder',
            start: function (event, ui) {
                ui.item.css('background-color', '#f6f6f6');
            },
            stop: function (event, ui) {
                ui.item.removeAttr('style');
                _load_name_row_duplicate($('#jagif-list'));
            }
        });

        function _load_name_row_duplicate(selector) {
            let _this_wrap_loop = selector.find('.list-group-item');
            let i = 0;

            _this_wrap_loop.each(function () {
                $(this).find('.jagif-display_gift_archive').attr('name', 'jagif-display_gift[' + i + '][archive]');
                $(this).find('.jagif-display_gift_archive_id').attr('name', 'jagif-display_gift[' + i + '][archive_id]');
                i++;
            });
        }

        function _load_select2(selector, type) {
            switch (type) {
                case 'gift':
                    selector.select2({
                        minimumInputLength: 1,
                        dropdownParent: selector.parent(),
                        placeholder: 'Search Gift Pack',
                        allowClear: true,
                        ajax: {
                            url: ajaxurl,
                            dataType: 'json',
                            allowClear: true,
                            data: function (params) {
                                return {
                                    q: params.term,
                                    nonce: jagif_admin_product_params.jagif_nonce,
                                    action: 'jagif_gift_product_ajax'
                                };
                            },
                            processResults: function (data) {
                                let options = [];
                                if (data) {
                                    $.each(data, function (index, text) {
                                        options.push({
                                            id: text[0],
                                            text: text[1] + ' ( ID: ' + text[0] + ' )'
                                        });
                                    });
                                }
                                return {
                                    results: options
                                };
                            },
                            cache: true
                        },
                        escapeMarkup: function (markup) {
                            return markup;
                        }
                    });
                    break;
                case 'product':
                    selector.select2({
                        minimumInputLength: 1,
                        dropdownParent: selector.parent(),
                        placeholder: 'Search Product for Gift',
                        allowClear: true,
                        ajax: {
                            url: ajaxurl,
                            dataType: 'json',
                            allowClear: true,
                            data: function (params) {
                                return {
                                    nonce: jagif_admin_product_params.jagif_nonce,
                                    q: params.term,
                                    action: 'jagif_gift_pack_ajax'
                                };
                            },
                            processResults: function (data) {
                                let id_exists = [];
                                let list_id = $('.option_archive_id select');
                                if (list_id.length > 0) {
                                    $.each(list_id, function (k, v) {
                                        id_exists.push(parseInt(v.value))
                                    })
                                }
                                let options = [];
                                if (data) {
                                    $.each(data, function (index, text) {
                                        if ($.inArray(text[0], id_exists) < 0) {
                                            let product_type = text[2] === 'simple' ? '' : ' ( ' + text[2] + ' )';
                                            options.push({
                                                id: text[0],
                                                text: text[1] + ' ( ID: ' + text[0] + ' )' + product_type,
                                                'type': text[2]
                                            });
                                        }
                                    });
                                }
                                return {
                                    results: options
                                };
                            },
                            cache: true
                        },
                        escapeMarkup: function (markup) {
                            return markup;
                        }
                    });
                    break;
                default :
                    break;
            }
        }
    });

}());