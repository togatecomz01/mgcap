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

    /* =========================================================
       [2026-01-15] 공통 복귀 함수(팝업 "최종 닫힘"에서만 사용)
       - 원칙: 레이어가 하나도 없을 때(=완전히 닫힘)만 "부모 트리거"로 복귀
    ========================================================= */
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

    /* =========================================================
       [2026-01-16] START (오늘 작업)
        핵심 목표: "팝업 안에서 confirm/alert 레이어가 뜨는 2중 팝업"을 공통으로 해결
       ---------------------------------------------------------
       1) 레이어(팝업/confirm/alert)를 스택으로 관리
          - 열림: 해당 레이어 내부로 포커스 주입
          - 닫힘: 아래 레이어로 복귀 (레이어가 없으면 restoreFocusBack)
       2) 기존 소스 최대 활용:
          - restoreFocusBack() 그대로 사용 (단, 레이어가 0개일 때만 호출되도록 유도)
          - focusIntoPopup() 그대로 사용 (layerPopup 열림 시 주입)
          - 기존 click 핸들러/closePopup 유지
       3) 기존 #G(알럿 닫힘에서 restoreFocusBack 호출)는 2중 구조에서 튐의 원인이라 제거/대체
    ========================================================= */

    /* ---------------------------------------------
       #E(기존 유지) : data-* 안 쓰는(클래스/onclick) 트리거도 lastTriggerEl로 저장
       - 팝업/알럿 내부 클릭은 트리거로 덮어쓰지 않음
       - click보다 먼저 잡기 위해 캡처(pointerdown/mousedown/keydown) 사용
    --------------------------------------------- */
    function rememberTrigger(target) {
      var $cand = $(target).closest(
        'a[href], button, input, select, textarea, label, [role="button"], [tabindex]'
      );
      if (!$cand.length) return;

      // 팝업/알럿 내부 클릭은 트리거로 덮어쓰지 않음(닫기/확인 버튼 등)
      if ($cand.closest(".layerPopup, [role='alert'], [role='alertdialog'], [aria-modal='true'], .ui-dialog, [role='dialog']").length) return;

      lastTriggerEl = $cand.get(0);
    }
    document.addEventListener("pointerdown", function (e) { rememberTrigger(e.target); }, true);
    document.addEventListener("mousedown", function (e) { rememberTrigger(e.target); }, true);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") rememberTrigger(e.target);
    }, true);

    /* ---------------------------------------------
       [레이어 판별] : "팝업/confirm/alert" 컨테이너 후보
       - 상담신청 팝업: .layerPopup.on
       - confirm/alert: .pop-content.alert (예시), .confirm, [role='alertdialog'] 등
    --------------------------------------------- */
    function getLayerContainer(el) {
      if (!el) return null;
      return el.closest(
        ".layerPopup.on, .layerPopup.active," +                 // 메인 팝업
        ".pop-content.alert, .alert, .confirm, .layerAlert," +  // confirm/alert 계열(프로젝트 공통)
        ".message, .messagePop, .modalAlert," +
        ".ui-dialog, [role='dialog'], [role='alertdialog'], [aria-modal='true']"
      );
    }

    /* ---------------------------------------------
       [레이어 내부 첫 포커스] : confirm은 버튼 우선
    --------------------------------------------- */
    function firstFocusableIn(container) {
      if (!container) return null;

      // 예시: confirm_yes/no 가 있으면 최우선
      var el =
        container.querySelector("#confirm_yes, #confirm_no") ||
        container.querySelector("[data-confirm-yes], [data-confirm-no]");
      if (el) return el;

      el = container.querySelector(FOCUSABLE);
      if (el) return el;

      // 최후: 컨테이너 자체
      if (!container.hasAttribute("tabindex")) container.setAttribute("tabindex", "-1");
      return container;
    }

    /* ---------------------------------------------
       [열려있는 레이어 목록] : 닫힘 후 어디로 갈지 판단용
    --------------------------------------------- */
    function getOpenLayers() {
      var nodes = Array.prototype.slice.call(
        document.querySelectorAll(
          ".layerPopup.on, .layerPopup.active," +
          ".pop-content.alert, .alert, .confirm, .layerAlert," +
          ".message, .messagePop, .modalAlert," +
          ".ui-dialog, [role='alertdialog'], [role='dialog'][aria-modal='true']"
        )
      );

      return nodes.filter(function (n) {
        if (!n || !document.contains(n)) return false;
        var cs = window.getComputedStyle(n);
        return cs.display !== "none" && cs.visibility !== "hidden";
      });
    }

    /* ---------------------------------------------
       [레이어 내부로 포커스 주입] (재시도 포함)
    --------------------------------------------- */
    function focusIntoLayer(container) {
      if (!container || !document.contains(container)) return;

      var tries = 0;
      (function attempt() {
        tries++;
        var el = firstFocusableIn(container);
        try { el.focus(); } catch (e) {}

        if (document.activeElement === el) return;
        if (tries < 4) setTimeout(attempt, 60);
      })();
    }

    /* ---------------------------------------------
       [레이어 스택] : 2중 팝업 포커스 복귀를 공통 처리
    --------------------------------------------- */
    var layerStack = []; // { el: HTMLElement, lastFocusInside: HTMLElement|null }

    function pushLayer(container) {
      if (!container) return;

      // 중복 push 방지
      for (var i = layerStack.length - 1; i >= 0; i--) {
        if (layerStack[i].el === container) {
          focusIntoLayer(container);
          return;
        }
      }

      layerStack.push({ el: container, lastFocusInside: null });
      focusIntoLayer(container);
    }

    function markLastFocusInside(container, focusEl) {
      if (!container || !focusEl) return;

      for (var i = layerStack.length - 1; i >= 0; i--) {
        if (layerStack[i].el === container) {
          layerStack[i].lastFocusInside = focusEl;
          return;
        }
      }

      // 스택에 없으면(레거시로 갑자기 뜬 레이어) push하고 기록
      layerStack.push({ el: container, lastFocusInside: focusEl });
    }

    function popLayer(container) {
      if (!container) return;

      // 스택에서 제거
      for (var i = layerStack.length - 1; i >= 0; i--) {
        if (layerStack[i].el === container) {
          layerStack.splice(i, 1);
          break;
        }
      }

      // 닫힘 후에도 레이어가 남아있으면 -> 가장 위 레이어로 복귀
      var openLayers = getOpenLayers();

      if (openLayers.length) {
        var top = openLayers[openLayers.length - 1];

        // top 레이어에 lastFocusInside가 있으면 우선 사용
        var last = null;
        for (var k = layerStack.length - 1; k >= 0; k--) {
          if (layerStack[k].el === top && layerStack[k].lastFocusInside && document.contains(layerStack[k].lastFocusInside)) {
            last = layerStack[k].lastFocusInside;
            break;
          }
        }

        if (last) {
          try { last.focus(); } catch (e) {}
          setTimeout(function () { try { last.focus(); } catch (e) {} }, 0);
        } else {
          focusIntoLayer(top);
        }
        return;
      }

      // 레이어가 하나도 없으면 -> 최종적으로 부모 트리거로 복귀
      restoreFocusBack();
    }

    /* ---------------------------------------------
       ? focusin 기록 교체: 레이어 내부는 스택에 기록 / 레이어 밖은 lastActiveEl 기록
       - (기존 "팝업 내부는 기록하지 않음" 로직 제거)
    --------------------------------------------- */
    document.addEventListener("focusin", function () {
      var ae = document.activeElement;
      if (!ae || ae === document.body || ae === document.documentElement) return;

      var layer = getLayerContainer(ae);
      if (layer) {
        markLastFocusInside(layer, ae);
        return;
      }

      lastActiveEl = ae;
    });

    /* ---------------------------------------------
       ? 레이어 열림/닫힘 감지 (class 토글 + DOM 추가/삭제 모두)
    --------------------------------------------- */
    (function observeLayerOpenClose() {
      if (!window.MutationObserver) return;

      // 1) class 토글(on/active) 감지
      var classObs = new MutationObserver(function (mutations) {
        for (var i = 0; i < mutations.length; i++) {
          var m = mutations[i];
          if (m.type !== "attributes" || m.attributeName !== "class") continue;

          var el = m.target;
          if (!el || el.nodeType !== 1) continue;

          // 레이어 후보만 처리
          if (!el.matches(
            ".layerPopup, .pop-content.alert, .alert, .confirm, .layerAlert, .message, .messagePop, .modalAlert, " +
            ".ui-dialog, [role='dialog'], [role='alertdialog'], [aria-modal='true']"
          )) continue;

          var oldVal = m.oldValue || "";
          var wasOpen = (oldVal.indexOf("on") !== -1) || (oldVal.indexOf("active") !== -1);
          var isOpen = el.classList.contains("on") || el.classList.contains("active");

          if (!wasOpen && isOpen) {
            // 열림: 내부로 포커스 주입
            pushLayer(el);
          } else if (wasOpen && !isOpen) {
            // 닫힘: 아래 레이어 or 부모로 복귀
            setTimeout(function () { popLayer(el); }, 0);
          }
        }
      });

      classObs.observe(document.body, {
        subtree: true,
        attributes: true,
        attributeOldValue: true,
        attributeFilter: ["class"]
      });

      // 2) DOM 추가/삭제 감지 (confirm이 remove 되는 타입)
      var domObs = new MutationObserver(function (muts) {
        muts.forEach(function (m) {
          // added
          if (m.addedNodes && m.addedNodes.length) {
            Array.prototype.forEach.call(m.addedNodes, function (node) {
              if (!node || node.nodeType !== 1) return;

              if (node.matches && node.matches(
                ".pop-content.alert, .alert, .confirm, .layerAlert, .message, .messagePop, .modalAlert, [role='alertdialog'], [role='dialog'][aria-modal='true']"
              )) {
                pushLayer(node);
              }
            });
          }

          // removed
          if (m.removedNodes && m.removedNodes.length) {
            Array.prototype.forEach.call(m.removedNodes, function (node) {
              if (!node || node.nodeType !== 1) return;

              if (node.matches && node.matches(
                ".pop-content.alert, .alert, .confirm, .layerAlert, .message, .messagePop, .modalAlert, [role='alertdialog'], [role='dialog'][aria-modal='true'], .layerPopup"
              )) {
                setTimeout(function () { popLayer(node); }, 0);
              }
            });
          }
        });
      });

      domObs.observe(document.body, { childList: true, subtree: true });
    })();

    /* =========================================================
       [2026-01-16] END (오늘 작업)
    ========================================================= */

    // 팝업 내부로 포커스 이동 (기존 함수 최대 활용 그대로 유지)
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

    var popupL = {
      /** 팝업 초기화 **/
      initPopup: function (id) {
        var $target = $("#" + id);
        if (!$target.length) return;

        $target.addClass("on");
        $target.find(".pop-content").scrollTop(0);
        $("body, .contentWrap").css("overflow", "hidden");

        log("initPopup:", id);

        // 기존 포커스 주입 그대로 사용
        focusIntoPopup($target);

        // 클릭 포커스 되돌림 방지용 2차
        requestAnimationFrame(function () {
          focusIntoPopup($target);
        });

        // [2026-01-16] 레이어 스택에도 등록(열림 시 스택 push)
        // - closePopup이 아니라 class 토글로 열리는 케이스도 있으니 observer가 대부분 처리하지만,
        //   여기서도 안전하게 push(중복은 pushLayer가 방지)
        pushLayer($target.get(0));
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

        // [2026-01-16] 팝업 닫힘은 "레이어 pop"으로 처리
        // - popLayer가 내부 레이어 남아있으면 그쪽으로,
        //   아무것도 없으면 restoreFocusBack()으로 부모 복귀
        setTimeout(function () {
          if (_target) popLayer(_target);
          else restoreFocusBack(); // 안전망
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

          // [2026-01-16] 바텀시트도 레이어 취급(필요 시)
          pushLayer($target.get(0));
        } else {
          $contentWrap.removeAttr("tabindex");

          // [2026-01-16] 닫힘은 pop
          popLayer($target.get(0));
        }
      }
    };

    // 라벨 + change 로 팝업 여는 케이스 (기존 유지)
    $(document).on("change", "input, select, textarea", function () {
      var $label = $('label[for="' + this.id + '"]');
      var popupId = $label.data("popup-open");
      if (!popupId) return;

      lastTriggerEl = $label.get(0) || this;
      popupL.openPopup(popupId);
    });

    // 클릭으로 여닫는 케이스 (기존 유지)
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

      // 바텀시트 dim 클릭 시 닫기 (기존 유지)
      var $dimLayer = $t.closest(".layerPopup.btmSheet");
      if ($dimLayer.length && $t.is($dimLayer)) {
        $dimLayer.removeClass("active").find(".pop-content").removeAttr("tabindex");
        popupL.closePopup($dimLayer.attr("id"));
      }
    });

    /* =========================================================
       [2026-01-13] 추가 #D: 레거시(클래스/onclick)로 열리는 layerPopup 포커스 주입(안전)
       - 원본 기능을 깨지 않기 위해 .layerPopup.on "열림"만 감지
       - [2026-01-16]  여기서는 열림 감지 시 focusIntoPopup + pushLayer로 통일
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
            // [2026-01-16] 스택 push
            pushLayer(el);
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
       - .layerPopup.on 이 빠지는 순간 popLayer() 실행
       - (기존 restoreFocusBack 대신) 스택 규칙으로 아래 레이어/부모 복귀
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
            setTimeout(function () { popLayer(el); }, 50);
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


    /* =========================================================
       [2026-01-16] START  (오늘 작업)
        기존 #G(알럿 닫힘에서 restoreFocusBack 호출) 제거/대체
       - 이유: confirm(알럿) 닫힘은 "부모 트리거"가 아니라 "아래 레이어(상담신청 팝업)"로 가야 함
       - 이제는 observeLayerOpenClose()가 DOM remove/class 토글을 감지해 popLayer()로 처리함
    ========================================================= */
    // (의도적으로 비워둠)  ← 기존 observeGenericAlertClose() 블록은 삭제/주석 처리
    /* =========================================================
       [2026-01-16] END (오늘 작업)
    ========================================================= */

    // 전역 노출
    window.popupL = popupL;
    window.btmShtTL = btmShtTL;
    window.fkSelAndPopupResetOverflow = popupL.fkSelAndPopupResetOverflow;
  })();
});
