
$(document).ready(function(){

    /**
     *   TAB
    **/
    var Tabs = (function () {
        return {
            init: function (container) {
                var $tabContainer = $(container);
                var $tabs = $tabContainer.find('.tab-item, .nested-tab-item');
                // var $panels = $tabContainer.find('.tab-panel, .nested-tab-panel');

                // ì´ˆê¸° ?™œ?„± ?ƒ­
                $tabs.each(function () {
                    var $tab = $(this);
                    var targetId = $tab.attr('data-tab');
                    var $panel = $('#' + targetId);

                    if ($tab.hasClass('active')) {
                        $tab.attr('title', '?„ ?ƒ?¨');
                        $panel.show();
                    } else {
                        $tab.removeAttr('title');
                        $panel.hide();
                    }
                });

                // event binding
                $tabs.on('click', function () {
                    Tabs.switchTab($(this), $tabContainer);
                });
            },

            switchTab: function ($clickedTab, $tabContainer) {
                var targetId = $clickedTab.attr('data-tab');
                var $targetPanel = $('#' + targetId);
                var isNested = $clickedTab.hasClass('nested-tab-item');

                // ê°™ì?? ê·¸ë£¹?˜ ?ƒ­ ì°¾ê¸°
                var $allTabs = isNested ? $tabContainer.find('.nested-tab-item') : $tabContainer.find('.tab-item');
                var $allPanels = isNested ? $tabContainer.find('.nested-tab-panel') : $tabContainer.find('.tab-panel');

                // ê¸°ì¡´ ?ƒ­ ì´ˆê¸°?™”
                $allTabs.removeClass('active').removeAttr('title');
                $allPanels.hide();

                // ?ƒˆ ?ƒ­ ?™œ?„±?™”
                $clickedTab.addClass('active').attr('title', '?„ ?ƒ?¨');
                $targetPanel.show();
            }
        };
    })();

    // ëª¨ë“  ?ƒ­ ì´ˆê¸°?™”
    $('.jsTab, .nestedJsTab').each(function () {
        Tabs.init(this);
    });

    /**
     *   TAB Swiper
    **/
    var tabSwiperL = (function () {
        var pager = ['?˜?—­', '?˜?—­2', '?˜?—­3', '?˜?—­4'];

        var tabSwiper = new Swiper('.tabs.tab-area.swiper', {
            spaceBetween: 20,
            autoHeight: true,
            pagination: {
                el: '.tabs ul',
                clickable: true,
                renderBullet: function (index, className) {
                    return '<li class="tab-item ' + className + '">' + pager[index] + '</li>';
                }
            }
        });

        return tabSwiper;
    })();


});

/* ----------¸ğ¹ÙÀÏ¿ë tab(select) jquery----------- */
$(document).ready(function() {
    var $mobileSelect = $('.tab-select-mobile select');
    if ($mobileSelect.length) {
        $mobileSelect.on('change', function() {
            var selectedValue = $(this).val();
            var $tabContainer = $(this).closest('.jsTab');
            var $targetTab = $tabContainer.find('.tab-item[data-tab="' + selectedValue + '"]');
            if ($targetTab.length) {
                Tabs.switchTab($targetTab, $tabContainer);
            }
        });
    }
});