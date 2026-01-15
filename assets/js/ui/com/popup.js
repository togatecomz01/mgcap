$(document).ready(function () {
    (function () {
      var DEBUG = false;
  
      // 마지막으로 팝업을 연 트리거(버튼/인풋/라벨)
      var lastTriggerEl = null;
  
      /* =========================================================
         [2026-01-13] 추가 #A: 마지막으로 포커스가 있던 요소(진입 알럿 대비)
         - 클릭 없이 뜨는 알럿은 lastTriggerEl이 없을 수 있으니 lastActiveEl로 복귀
         ========================================================= */
      var lastActiveEl = null;
  
      document.addEventListener("focusin", function () {
        // 팝업이 열린 상태에서 팝업 내부로 옮겨 다니는 포커스는 기록하지 않음
        var openPopup = document.querySelector(".layerPopup.on");
        if (openPopup && document.activeElement && document.activeElement.closest(".layerPopup.on")) return;
  
        lastActiveEl = document.activeElement;
      });
  
      /* ===== [2026-01-15] START =====
         #E 공통을 안 쓰는(클래스/onclick) 트리거도 lastTriggerEl로 저장
         - 상담신청(.prdt_counsel_app_info) 같은 케이스에서 닫힌 뒤 포커스 복귀용
         - click보다 먼저 잡기 위해 캡처(pointerdown/mousedown/keydown) 사용
      ===== */
      function rememberTrigger(target) {
        var $cand = $(target).closest(
          'a[href], button, input, select, textarea, label, [role="button"], [tabindex]'
        );
        if (!$cand.length) return;
  
        // 팝업/알럿 내부 클릭은 트리거로 덮어쓰지 않음(닫기/확인 버튼 등)
        if ($cand.closest(".layerPopup, [role='alert'], [aria-modal='true'], .ui-dialog").length) return;
  
        lastTriggerEl = $cand.get(0);
      }
  
      document.addEventListener("pointerdown", function (e) { rememberTrigger(e.target); }, true);
      document.addEventListener("mousedown", function (e) { rememberTrigger(e.target); }, true);
      document.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") rememberTrigger(e.target);
      }, true);
      /* ===== [2026-01-15] END ===== */
  
      // 포커스 가능한 요소 후보 셀렉터 (button 보강)
      var FOCUSABLE =
        'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), ' +
        'select:not([disabled]), textarea:not([disabled]), [role="button"], ' +
        '[tabindex]:not([tabindex="-1"])';
  
      function log() {
        if (!DEBUG) return;
        try { console.log.apply(console, arguments); } catch (e) {}
      }
  
      /* =========================================================
         [2026-01-13] 추가 #B: 페이지 진입 알럿에서 "닫힌 후" 보낼 fallback 포커스
         - lastTriggerEl / lastActiveEl이 없으면 여기로 이동
         - 프로젝트에 맞게 selector 우선순위만 약간 잡아둠
         ========================================================= */
      function getFallbackFocusEl() {
        // 1) 로그인 화면이라면 아이디/비번 입력이 최우선
        var el =
          document.querySelector('#loginId, #user_id, #userid, input[name="userId"], input[name="id"], input[type="text"].login') ||
          document.querySelector('#loginPw, #password, input[name="password"], input[type="password"]');
  
        if (el) return el;
  
        // 2) 로그인 버튼/링크(텍스트 기반은 위험하니 class/id 우선)
        el =
          document.querySelector('#btnLogin, .btn-login, a.btn-login, button.btn-login') ||
          document.querySelector('a[href*="login"], button[onclick*="login"], a[onclick*="login"]');
  
        if (el) return el;
  
        // 3) 메인/콘텐츠의 첫 포커스 가능 요소
        el =
          document.querySelector('main ' + FOCUSABLE) ||
          document.querySelector(FOCUSABLE);
  
        return el || null;
      }
  
      // 팝업 내부로 포커스 이동
      function focusIntoPopup($target) {
        if (!$target || !$target.length) return;
  
        function pick() {
          var $firstFocusable = $target
            .find(FOCUSABLE)
            .filter(":visible")
            .first();
  
          if ($firstFocusable.length) return $firstFocusable;
  
          var $el = $target.find(".pop-area").first();
          if (!$el.length) $el = $target.find(".pop-content").first();
          if (!$el.length) $el = $target;
  
          if (!$el.is("[tabindex]")) $el.attr("tabindex", "-1");
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
  
      // [2026-01-15] 공통 복귀 함수(팝업/알럿/레거시 닫힘에서 같이 사용)
      function restoreFocusBack() {
        var backEl =
          (lastTriggerEl && document.contains(lastTriggerEl)) ? lastTriggerEl :
          (lastActiveEl && document.contains(lastActiveEl)) ? lastActiveEl :
          getFallbackFocusEl();
  
        if (!backEl || !document.contains(backEl)) return;
  
        var tries = 0;
        (function attempt() {
          tries++;
          try {
            if (typeof backEl.scrollIntoView === "function") {
              backEl.scrollIntoView({ block: "nearest", inline: "nearest" });
            }
            backEl.focus();
          } catch (e) {}
          if (document.activeElement === backEl) return;
          if (tries < 3) setTimeout(attempt, 60);
        })();
      }
  
      var popupL = {
        /** 팝업 초기화 **/
        initPopup: function (id) {
          var $target = $("#" + id);
          if (!$target.length) return;
  
          $target.addClass("on");
          $target.find(".pop-content").scrollTop(0);
          $("body, .contentWrap").css("overflow", "hidden");
  
          log("initPopup:", id);
  
          focusIntoPopup($target);
  
          // 클릭 포커스 되돌림 방지용 2차 (원본 기능 안 깨는 최소 보강)
          requestAnimationFrame(function () {
            focusIntoPopup($target);
          });
        },
  
        openPopup: function (id) { this.initPopup(id); },
        openModal: function (id) { this.initPopup(id); log("openModal:", id); },
        openMenu: function (id) { this.initPopup(id); log("openMenu:", id); },
  
        /** 팝업 닫기 **/
        closePopup: function (id) {
          var _target = document.getElementById(id);
          if (_target) _target.classList.remove("on");
  
          this.fkSelAndPopupResetOverflow();
  
          if (_target && _target.classList.contains("full")) {
            var header = _target.querySelector(".pop-header");
            if (header) header.style.position = "";
          }
  
          this.fkSelAndPopupResetOverflow();
  
          /* =========================================================
             [2026-01-13] 수정 #C: 닫힘 후 포커스 복귀 대상
             - 1순위 lastTriggerEl
             - 2순위 lastActiveEl (클릭 없이 뜬 알럿 대비)
             - 3순위 fallback(로그인 입력/로그인 버튼/첫 포커스 가능 요소)
             ========================================================= */
          setTimeout(function () {
            // [2026-01-15] 공통 함수로 통일(재시도/스크롤 포함)
            restoreFocusBack();
          }, 50);
        },
  
        fkSelAndPopupResetOverflow: function () {
          var isPopupOpen = $(".layerPopup.on").length > 0;
          var isSelectOpen = $(".stove-option-layer.on").length > 0;
  
          if (!isPopupOpen && !isSelectOpen) {
            $("body, .contentWrap").css("overflow", "");
            $(".pop-area, .pop-content").removeAttr("tabindex");
  
            setTimeout(function () {
              $(".layerPopup.toggleUp").removeClass("active");
            }, 10);
          }
        }
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
            setTimeout(function () { try { $contentWrap.get(0).focus(); } catch (e) {} }, 0);
            setTimeout(function () { try { $contentWrap.get(0).focus(); } catch (e) {} }, 60);
          } else {
            $contentWrap.removeAttr("tabindex");
          }
        }
      };
  
      // 라벨 + change 로 팝업 여는 케이스
      $(document).on("change", "input, select, textarea", function () {
        var $label = $('label[for="' + this.id + '"]');
        var popupId = $label.data("popup-open");
        if (!popupId) return;
  
        lastTriggerEl = $label.get(0) || this;
        popupL.openPopup(popupId);
      });
  
      // 클릭으로 여닫는 케이스
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
  
      /* =========================================================
         [2026-01-13] 추가 #D: 레거시(클래스/onclick)로 열리는 layerPopup 포커스 주입(안전)
         - 원본 기능을 깨지 않기 위해 .layerPopup.on "열림"만 감지
         ========================================================= */
      (function observeLegacyLayerPopupOpen() {
        if (!window.MutationObserver) return;
  
        var obs = new MutationObserver(function (mutations) {
          for (var i = 0; i < mutations.length; i++) {
            var m = mutations[i];
            if (m.type !== "attributes" || m.attributeName !== "class") continue;
  
            var el = m.target;
            if (!el || !el.classList) continue;
            if (!el.classList.contains("layerPopup")) continue;
  
            var oldVal = m.oldValue || "";
            var wasOpen = oldVal.indexOf("on") !== -1;
            var isOpen = el.classList.contains("on");
  
            if (!wasOpen && isOpen) {
              focusIntoPopup($(el));
            }
          }
        });
  
        obs.observe(document.body, {
          subtree: true,
          attributes: true,
          attributeOldValue: true,
          attributeFilter: ["class"]
        });
      })();
  
      /* ===== [2026-01-15] START =====
         #F 레거시 닫힘 감지(공통 closePopup 안 쓰고 class만 빼는 경우)
         - .layerPopup.on 이 빠지는 순간 restoreFocusBack() 실행
      ===== */
      (function observeLegacyLayerPopupClose() {
        if (!window.MutationObserver) return;
  
        var obs = new MutationObserver(function (mutations) {
          for (var i = 0; i < mutations.length; i++) {
            var m = mutations[i];
            if (m.type !== "attributes" || m.attributeName !== "class") continue;
  
            var el = m.target;
            if (!el || !el.classList) continue;
            if (!el.classList.contains("layerPopup")) continue;
  
            var oldVal = m.oldValue || "";
            var wasOpen = oldVal.indexOf("on") !== -1;
            var isOpen = el.classList.contains("on");
  
            if (wasOpen && !isOpen) {
              setTimeout(restoreFocusBack, 50);
            }
          }
        });
  
        obs.observe(document.body, {
          subtree: true,
          attributes: true,
          attributeOldValue: true,
          attributeFilter: ["class"]
        });
      })();
      /* ===== [2026-01-15] END ===== */
  
      /* ===== [2026-01-15] START =====
         #G 알럿/메시지/confirm 계열 공통 닫힘 포커스 복귀
         - messageCloseBtn 말고 다른 id/class여도 대응
         - DOM 제거/remove, display none, class 토글 모두 대비
      ===== */
      (function observeGenericAlertClose() {
        function isAlertContext(el) {
          if (!el) return false;
          return !!el.closest(
            '[role="alert"], [aria-modal="true"], .alert, .alertPop, .message, .messagePop,' +
            '.modalAlert, .ui-dialog, .layerAlert, .confirm'
          );
        }
  
        // 1) 알럿 내부 버튼 클릭 시 복귀 예약(이름 상관없음)
        document.addEventListener("click", function (e) {
          var btn = e.target.closest("button, a, [role='button']");
          if (!btn) return;
          if (!isAlertContext(btn)) return;
  
          setTimeout(restoreFocusBack, 50);
          setTimeout(restoreFocusBack, 150);
        }, true);
  
        // 2) 알럿 DOM 자체가 제거되는 케이스 대비
        if (window.MutationObserver) {
          var obs = new MutationObserver(function (muts) {
            muts.forEach(function (m) {
              if (!m.removedNodes) return;
              Array.prototype.forEach.call(m.removedNodes, function (node) {
                if (node && node.nodeType === 1 && isAlertContext(node)) {
                  setTimeout(restoreFocusBack, 50);
                }
              });
            });
          });
  
          obs.observe(document.body, { childList: true, subtree: true });
        }
      })();
      /* ===== [2026-01-15] END ===== */
  
      // 전역 노출
      window.popupL = popupL;
      window.btmShtTL = btmShtTL;
      window.fkSelAndPopupResetOverflow = popupL.fkSelAndPopupResetOverflow;
    })();
  });
  