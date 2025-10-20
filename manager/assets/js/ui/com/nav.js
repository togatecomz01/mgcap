(function () {
    'use strict';

    var lnb = document.querySelector('#menuWrap');
    if (!lnb) return;

   
    var singleMode = lnb.getAttribute('data-accordion') === 'single';


    var CLASS_OPEN = 'active';
    var CLASS_TOGGLE = 'accordion';
    var SELECTOR_SUBMENU = '.submenu';

    var KEY_ENTER = 13;
    var KEY_SPACE = 32;

    function hasClass(el, className) {
        if (!el || !className) return false;
        return (' ' + el.className + ' ').indexOf(' ' + className + ' ') > -1;
    }
    function addClass(el, className) {
        if (!el || !className || hasClass(el, className)) return;
        el.className = (el.className + ' ' + className).replace(/\s+/g, ' ').trim();
    }
    function removeClass(el, className) {
        if (!el || !className || !hasClass(el, className)) return;
        el.className = el.className.replace(new RegExp('\\s*' + className + '\\s*', 'g'), ' ').replace(/\s+/g, ' ').trim();
    }

    // IE11�� closest ��ü: �־��� �±�(LI)���� ���� Ž��
    function closestTag(el, tagName) {
        tagName = tagName.toUpperCase();
        while (el && el !== document && el.nodeType === 1) {
            if (el.tagName === tagName) return el;
            el = el.parentNode;
        }
        return null;
    }

    function closeItem(li) {
        if (!li) return;
        var btn = li.querySelector('.' + CLASS_TOGGLE);
        if (btn) btn.setAttribute('aria-expanded', 'false');
        removeClass(li, CLASS_OPEN);
    }
    function openItem(li) {
        if (!li) return;
        var btn = li.querySelector('.' + CLASS_TOGGLE);
        if (btn) btn.setAttribute('aria-expanded', 'true');
        addClass(li, CLASS_OPEN);
    }
    function closeSiblings(currentLi) {
        if (!currentLi || !currentLi.parentNode) return;
        var siblings = currentLi.parentNode.children;
        for (var i = 0; i < siblings.length; i++) {
            if (siblings[i] !== currentLi) closeItem(siblings[i]);
        }
    }
    function toggleItem(li) {
        if (!li) return;
        var isOpen = hasClass(li, CLASS_OPEN);
        if (isOpen) {
            closeItem(li);
        } else {
            if (singleMode) closeSiblings(li); // �ٸ� �޴� �ݱ�
            openItem(li);
        }
    }

    function handleClick(e) {
        var target = e.target || e.srcElement;

        // ��ư(.accordion)���� �Ž��� �ö�
        while (target && target !== lnb && !hasClass(target, CLASS_TOGGLE)) {
            target = target.parentNode;
        }
        if (!target || target === lnb) return;

        // #3: ��ư�� ���� LI�� ��Ȯ�� ã��(��ø ��ũ�� ���?)
        var li = closestTag(target, 'LI');
        toggleItem(li);
    }

    function handleKeydown(e) {
        var target = e.target || e.srcElement;
        if (!hasClass(target, CLASS_TOGGLE)) return;
        var key = e.keyCode || e.which;
        if (key === KEY_ENTER || key === KEY_SPACE) {
            if (e.preventDefault) e.preventDefault(); else e.returnValue = false;
            var li = closestTag(target, 'LI');
            toggleItem(li);
        }
    }

    lnb.addEventListener('click', handleClick, false);
    lnb.addEventListener('keydown', handleKeydown, false);
})();
