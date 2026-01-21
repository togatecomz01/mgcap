$(document).ready(function () {
    (function () {
      var DEBUG = false;
  
      // ? 마지막으로 팝업을 연 트리거(버튼/인풋/라벨)
      var lastTriggerEl = ßnull;
  
      // ? 포커스 가능한 요소 후보 셀렉터
      var FOCUSABLE =
        'button, [href], input, select, textarea, [role="button"], [tabindex]:not([tabindex="-1"])';
  
      function log() {
        if (!DEBUG) return;
        try { console.log.apply(console, arguments); } catch (e) {}
      }
  
      // ? 팝업 내부로 포커스 이동 (렌더/transition 타이밍 재시도)
      function focusIntoPopup($target) {
        if (!$target || !$target.length) return;
  
        function pick() {
          // 1) pop-area
          var $el = $target.find(".pop-area").first();
  
          // 2) pop-content
          if (!$el.length) $el = $target.find(".pop-content").first();
  
          // 3) 내부 첫 포커스 요소
          if (!$el.length) $el = $target.find(FOCUSABLE).first();
  
          // 4) 최후: 팝업 컨테이너
          if (!$el.length) $el = $target;
  
          // programmatic focus용(tab순서에 끼지 않게 -1)
          if (!$el.is("button,a,input,select,textarea")) {
            if (!$el.is("[tabindex]")) $el.attr("tabindex", "-1");
          }
  
          return $el;
        }
  
        var tries = 0;
        (function attempt() {
          tries++;
          var $el = pick();
          try { $el.get(0).focus(); } catch (e) {}
  
          if (document.activeElement === $el.get(0)) return;
          if (tries < 4) setTimeout(attempt, 60);
        })();
      }
  
      var popupL = {
         /** 팝업 초기화**/
        initPopup: function (id) {
          var $target = $("#" + id);
          if (!$target.length) return;
  
          $target.addClass("on");
          $target.find(".pop-content").scrollTop(0);
          $("body, .contentWrap").css("overflow", "hidden");
  
          log("initPopup:", id);
  
          focusIntoPopup($target);
        },
        /**
           * 팝업 열기
           */
        openPopup: function (id) {
          this.initPopup(id);
        },
        /**
           * 모달 열기
           */
        openModal: function (id) {
          this.initPopup(id);
          log("openModal:", id);
        },
        /**
           * 메뉴 팝업 열기
           */
        openMenu: function (id) {
          this.initPopup(id);
          log("openMenu:", id);
        },
  
        /**
           * 팝업 닫기
           */
        closePopup: function (id) {
          var _target = document.getElementById(id);
          if (_target) _target.classList.remove("on");
  
          this.fkSelAndPopupResetOverflow();
  
          // full 팝업 header fixed 초기화
          if (_target && _target.classList.contains("full")) {
            var header = _target.querySelector(".pop-header");
            if (header) header.style.position = "";
          }
  
          this.fkSelAndPopupResetOverflow();
  
          // ? 닫히면 트리거로 포커스 복귀
          setTimeout(function () {
            if (lastTriggerEl && document.contains(lastTriggerEl)) {
              try { lastTriggerEl.focus(); } catch (e) {}
            }
          }, 50);
        },
  
        fkSelAndPopupResetOverflow: function () {
          var isPopupOpen = $(".layerPopup.on").length > 0;
          var isSelectOpen = $(".stove-option-layer.on").length > 0;
  
          if (!isPopupOpen && !isSelectOpen) {
            $("body, .contentWrap").css("overflow", "");
  
            // tabindex 제거(열릴 때 -1 부여한 것들 정리)
            $(".pop-area, .pop-content").removeAttr("tabindex");
  
            setTimeout(function () {
              $(".layerPopup.toggleUp").removeClass("active");
            }, 10);
          }
        },
      };
  
      var btmShtTL = {
        btmAti: function (id) {
          var $target = $("#" + id);
          if (!$target.length) return;
  
          var $contentWrap = $target.find(".pop-content");
          $target.toggleClass("active");
  
          log("btmAti:", id);
  
          if ($target.hasClass("active")) {
            $contentWrap.scrollTop(0);
            $contentWrap.attr("tabindex", "-1");
  
            // 타이밍 대응 2회만
            setTimeout(function () { try { $contentWrap.get(0).focus(); } catch (e) {} }, 0);
            setTimeout(function () { try { $contentWrap.get(0).focus(); } catch (e) {} }, 60);
          } else {
            $contentWrap.removeAttr("tabindex");
          }
        },
      };
  
      // ? 라벨 + change 로 팝업 여는 케이스
      $(document).on("change", "input, select, textarea", function () {
        var $label = $('label[for="' + this.id + '"]');
        var popupId = $label.data("popup-open");
        if (!popupId) return;
  
        lastTriggerEl = $label.get(0) || this;
        popupL.openPopup(popupId);
      });
  
      // ? 클릭으로 여닫는 케이스
      $(document).on("click", function (e) {
        var $t = $(e.target);
  
        var $openBtn = $t.closest("[data-popup-open]");
        if ($openBtn.length) {
          lastTriggerEl = $openBtn.get(0);
          return popupL.openPopup($openBtn.data("popup-open"));
        }
  
        var $modalBtn = $t.closest("[data-modal-open]");
        if ($modalBtn.length) {
          lastTriggerEl = $modalBtn.get(0);
          return popupL.openModal($modalBtn.data("modal-open"));
        }
  
        var $menuBtn = $t.closest("[data-menu-open]");
        if ($menuBtn.length) {
          lastTriggerEl = $menuBtn.get(0);
          return popupL.openMenu($menuBtn.data("menu-open"));
        }
  
        var $closeBtn = $t.closest("[data-popup-close]");
        if ($closeBtn.length) return popupL.closePopup($closeBtn.data("popup-close"));
  
        var $btmToggleBtn = $t.closest("[data-btm-toggle]");
        if ($btmToggleBtn.length) {
          lastTriggerEl = $btmToggleBtn.get(0);
          return btmShtTL.btmAti($btmToggleBtn.data("btm-toggle"));
        }
  
        // 바텀시트 dim 클릭 시 닫기
        var $dimLayer = $t.closest(".layerPopup.btmSheet");
        if ($dimLayer.length && $t.is($dimLayer)) {
          $dimLayer.removeClass("active").find(".pop-content").removeAttr("tabindex");
          popupL.closePopup($dimLayer.attr("id"));
        }
      });
  
      // 전역 노출
      window.popupL = popupL;
      window.btmShtTL = btmShtTL;
      window.fkSelAndPopupResetOverflow = popupL.fkSelAndPopupResetOverflow;
    })();
});
  







var skipNaviL = (function () {

  // ? [추가] finance 영역 여부 (이 조건만 사용)
  function isFinanceContext() {
      return $(".finance").length > 0;
  }

  // 공통으로 타겟(main 영역) 찾는 함수
  function getTarget($link) {

      // ? [추가] finance 페이지일 경우 visual-container 우선
      if (isFinanceContext() && $(".visual-container").length > 0) {
          return $(".visual-container").first();
      }

      // 1) data-target 우선
      var targetSelector = $link.data("target");
      var $target = null;

      if (targetSelector) {
          $target = $(targetSelector);
      }

      // 2) data-target이 없거나 잘못된 경우: fallback
      if (!$target || $target.length === 0) {
          var fallbackSelectors = [
              ".page-container",
              ".contentWrap",
              ".bodyWrap",
              ".main",
              "main"
          ];
          for (var i = 0; i < fallbackSelectors.length; i++) {
              $target = $(fallbackSelectors[i]);
              if ($target.length > 0) {
                  break;
              }
          }
      }

      return ($target && $target.length > 0) ? $target.first() : null;
  }

  // 구조 보정: id, role, href 자동 부여
  function enhanceStructure() {
      var $link = $("#skipnavi a").first();
      if (!$link.length) return;

      var $target = getTarget($link);
      if (!$target) return;

      // 1) 타겟에 id 없으면 자동 부여
      var id = $target.attr("id");
      if (!id) {
          id = "contentArea";
          var i = 1;
          while (document.getElementById(id)) {
              id = "contentArea" + (++i);
          }
          $target.attr("id", id);
      }

      // 2) 메인 랜드마크 없으면 role="main" 달아주기
      if (!$target.is("main") && !$target.attr("role")) {
          $target.attr("role", "main");
      }

      // 3) 스킵 링크 href 보정
      $link.attr("href", "#" + id);
  }

  return {
      moveFocus: function () {

          enhanceStructure();

          $("#skipnavi a").on("click keydown", function (e) {
              if (e.type === "click" || e.keyCode === 13) {
                  e.preventDefault();

                  var $link = $(this);
                  var $target = getTarget($link);
                  if (!$target) return;

                  if (!$target.attr("tabindex")) {
                      $target.attr("tabindex", "-1");
                  }

                  var targetOffset = $target.offset();
                  if (targetOffset) {
                      $("html, body").animate({
                          scrollTop: targetOffset.top - 80
                      }, 300);
                  }

                  setTimeout(function () {
                      $target.focus();
                  }, 100);
              }
          });
      },

      init: function () {
          this.moveFocus();
      }
  };

})();
