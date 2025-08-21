"use strict";

$(document).ready(function () {
  /**
   * accortion
   **/
  var accordionToggle = function () {
    return {
      open: function open(target) {
        target.addClass("on");
        target.attr("title", "�ݱ�");
      },
      close: function close(target) {
        target.removeClass("on");
        target.attr("title", "����");
      },
      toggle: function toggle(target) {
        if (target.hasClass("on")) {
          this.close(target);
        } else {
          this.open(target);
        }
      }
    };
  }();
  /**
   * event
   */


  $(document).on("click", ".accordionToggle .accordion-item > .tit", function () {
    var $currentAccordion = $(this).closest(".accordion-item");
    accordionToggle.toggle($currentAccordion);
  });
});
//# sourceMappingURL=accordion.dev.js.map
