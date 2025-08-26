
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

                // 초기 ?��?�� ?��
                $tabs.each(function () {
                    var $tab = $(this);
                    var targetId = $tab.attr('data-tab');
                    var $panel = $('#' + targetId);

                    if ($tab.hasClass('active')) {
                        $tab.attr('title', '?��?��?��');
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

                // 같�?? 그룹?�� ?�� 찾기
                var $allTabs = isNested ? $tabContainer.find('.nested-tab-item') : $tabContainer.find('.tab-item');
                var $allPanels = isNested ? $tabContainer.find('.nested-tab-panel') : $tabContainer.find('.tab-panel');

                // 기존 ?�� 초기?��
                $allTabs.removeClass('active').removeAttr('title');
                $allPanels.hide();

                // ?�� ?�� ?��?��?��
                $clickedTab.addClass('active').attr('title', '?��?��?��');
                $targetPanel.show();
            }
        };
    })();

    // 모든 ?�� 초기?��
    $('.jsTab, .nestedJsTab').each(function () {
        Tabs.init(this);
    });

    /**
     *   TAB Swiper
    **/
    var tabSwiperL = (function () {
        var pager = ['?��?��', '?��?��2', '?��?��3', '?��?��4'];

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

/* ----------����Ͽ� tab(select) jquery----------- */
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