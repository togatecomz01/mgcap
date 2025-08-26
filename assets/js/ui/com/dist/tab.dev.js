"use strict";

$(document).ready(function () {
  /**
   *   TAB
  **/
  var Tabs = function () {
    return {
      init: function init(container) {
        var $tabContainer = $(container);
        var $tabs = $tabContainer.find('.tab-item, .nested-tab-item'); // var $panels = $tabContainer.find('.tab-panel, .nested-tab-panel');
        // �ʱ� Ȱ�� ��

        $tabs.each(function () {
          var $tab = $(this);
          var targetId = $tab.attr('data-tab');
          var $panel = $('#' + targetId);

          if ($tab.hasClass('active')) {
            $tab.attr('title', '���õ�');
            $panel.show();
          } else {
            $tab.removeAttr('title');
            $panel.hide();
          }
        }); // event binding

        $tabs.on('click', function () {
          Tabs.switchTab($(this), $tabContainer);
        });
      },
      switchTab: function switchTab($clickedTab, $tabContainer) {
        var targetId = $clickedTab.attr('data-tab');
        var $targetPanel = $('#' + targetId);
        var isNested = $clickedTab.hasClass('nested-tab-item'); // ���� �׷��� �� ã��

        var $allTabs = isNested ? $tabContainer.find('.nested-tab-item') : $tabContainer.find('.tab-item');
        var $allPanels = isNested ? $tabContainer.find('.nested-tab-panel') : $tabContainer.find('.tab-panel'); // ���� �� �ʱ�ȭ

        $allTabs.removeClass('active').removeAttr('title');
        $allPanels.hide(); // �� �� Ȱ��ȭ

        $clickedTab.addClass('active').attr('title', '���õ�');
        $targetPanel.show();
      }
    };
  }(); // ��� �� �ʱ�ȭ


  $('.jsTab, .nestedJsTab').each(function () {
    Tabs.init(this);
  });
  /**
   *   TAB Swiper
  **/

  var tabSwiperL = function () {
    var pager = ['����', '����2', '����3', '����4'];
    var tabSwiper = new Swiper('.tabs.tab-area.swiper', {
      spaceBetween: 20,
      autoHeight: true,
      pagination: {
        el: '.tabs ul',
        clickable: true,
        renderBullet: function renderBullet(index, className) {
          return '<li class="tab-item ' + className + '">' + pager[index] + '</li>';
        }
      }
    });
    return tabSwiper;
  }();
});
//# sourceMappingURL=tab.dev.js.map
