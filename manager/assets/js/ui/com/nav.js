/**
 * 네비게이션 아코디언 컴포넌트
 * IE11 호환(ES5): let/const, forEach, arrow 함수 사용하지 않음
 */
(function () {
    'use strict';
    
    // DOM 요소 캐싱
    var lnb = document.querySelector('#menuWrap');
    if (!lnb) return;

    // 설정값
    var singleMode = lnb.getAttribute('data-accordion') === 'single';
    var CLASS_OPEN = 'acitve';
    var CLASS_TOGGLE = 'accordion';
    var SELECTOR_SUBMENU = '.submenu';
    
    // 키보드 이벤트 상수
    var KEY_ENTER = 13;
    var KEY_SPACE = 32;

    /**
     * 요소에 클래스가 있는지 확인
     * @param {Element} el - 확인할 요소
     * @param {string} className - 확인할 클래스명
     * @returns {boolean}
     */
    function hasClass(el, className) {
        if (!el || !className) return false;
        return (' ' + el.className + ' ').indexOf(' ' + className + ' ') > -1;
    }

    /**
     * 요소에 클래스 추가
     * @param {Element} el - 대상 요소
     * @param {string} className - 추가할 클래스명
     */
    function addClass(el, className) {
        if (!el || !className || hasClass(el, className)) return;
        el.className = (el.className + ' ' + className).trim();
    }

    /**
     * 요소에서 클래스 제거
     * @param {Element} el - 대상 요소
     * @param {string} className - 제거할 클래스명
     */
    function removeClass(el, className) {
        if (!el || !className || !hasClass(el, className)) return;
        el.className = el.className.replace(new RegExp('\\s*' + className + '\\s*', 'g'), ' ').trim();
    }

    /**
     * 메뉴 아이템 닫기
     * @param {Element} li - 닫을 li 요소
     */
    function closeItem(li) {
        if (!li) return;
        
        var btn = li.querySelector('.' + CLASS_TOGGLE);
        var submenu = li.querySelector(SELECTOR_SUBMENU);
        
        if (btn) {
            btn.setAttribute('aria-expanded', 'false');
        }
        
        // CSS 애니메이션을 위해 클래스만 제거 (display 조작 제거)
        removeClass(li, CLASS_OPEN);
    }

    /**
     * 메뉴 아이템 열기
     * @param {Element} li - 열 li 요소
     */
    function openItem(li) {
        if (!li) return;
        
        var btn = li.querySelector('.' + CLASS_TOGGLE);
        var submenu = li.querySelector(SELECTOR_SUBMENU);
        
        if (btn) {
            btn.setAttribute('aria-expanded', 'true');
        }
        
        // CSS 애니메이션을 위해 클래스만 추가 (display 조작 제거)
        addClass(li, CLASS_OPEN);
    }

    /**
     * 형제 메뉴 아이템들 모두 닫기
     * @param {Element} currentLi - 현재 li 요소 (제외할 요소)
     */
    function closeSiblings(currentLi) {
        if (!currentLi || !currentLi.parentNode) return;
        
        var siblings = currentLi.parentNode.children;
        for (var i = 0; i < siblings.length; i++) {
            if (siblings[i] !== currentLi) {
                closeItem(siblings[i]);
            }
        }
    }

    /**
     * 메뉴 아이템 토글
     * @param {Element} li - 토글할 li 요소
     */
    function toggleItem(li) {
        if (!li) return;
        
        var isOpen = hasClass(li, CLASS_OPEN);
        
        if (isOpen) {
            closeItem(li);
        } else {
            // 단일 모드일 때 형제 요소들 닫기
            if (singleMode) {
                closeSiblings(li);
            }
            openItem(li);
        }
    }

    /**
     * 클릭 이벤트 핸들러
     * @param {Event} e - 클릭 이벤트
     */
    function handleClick(e) {
        var target = e.target || e.srcElement;
        
        // 버튼 자체 또는 자식 요소(아이콘 등) 클릭 모두 허용
        while (target && target !== lnb && !hasClass(target, CLASS_TOGGLE)) {
            target = target.parentNode;
        }
        
        if (!target || target === lnb) return;

        var li = target.parentNode;
        toggleItem(li);
    }

    /**
     * 키보드 이벤트 핸들러
     * @param {Event} e - 키보드 이벤트
     */
    function handleKeydown(e) {
        var target = e.target || e.srcElement;
        if (!hasClass(target, CLASS_TOGGLE)) return;
        
        var key = e.keyCode || e.which;
        
        // Enter 또는 Space 키 처리
        if (key === KEY_ENTER || key === KEY_SPACE) {
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false;
            }
            toggleItem(target.parentNode);
        }
    }

    // 이벤트 리스너 등록
    lnb.addEventListener('click', handleClick, false);
    lnb.addEventListener('keydown', handleKeydown, false);
})();