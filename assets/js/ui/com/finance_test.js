$(document).ready(function () {
    const isMobile = () => window.innerWidth <= 768;

    // 초기 상태 설정
    function initPanels() {
        const buttons = $('.anchor-list .btn-group button');
        const activeButton = buttons.filter('.active');

        if (isMobile()) {
            $('.anchor-panel').hide();
            const targetButton = activeButton.length ? activeButton : buttons.first();
            $(targetButton.data('target')).show();
            targetButton.addClass('active');
        } else {
            $('.anchor-panel').show();
            if (!activeButton.length) buttons.first().addClass('active');
        }

        /* =========================================================
            [2026-01-23][접근성] START
           - 활성 탭만 Tab 키 접근 가능
           ========================================================= */
        $('.anchor-list button')
            .attr('tabindex', '-1')
            .filter('.active')
            .attr('tabindex', '0');
        /* =========================================================
            [2026-01-23][접근성] END
           ========================================================= */
    }

    // 모바일 스크롤 이벤트 설정
    function setupMobileScroll() {
        const $body = $('body');
        const $header = $('.headerOn');
        const $visualContainer = $('.visual-container');
        const $anchorList = $('.anchor-list');

        const headerHeight = $header.outerHeight() || 0;
        const visualHeight = $visualContainer.outerHeight() || 0;

        $body.off('scroll.finance').on('scroll.finance', function () {
            const scrollTop = $body.scrollTop();
            $visualContainer.toggleClass('sticky', scrollTop >= headerHeight);
            $anchorList.toggleClass('fixed', scrollTop >= headerHeight + visualHeight);
        });
    }

    // 탭 전환 함수
    function switchTab($button) {
        const target = $button.data('target');

        $('.anchor-list button').removeClass('active');
        $button.addClass('active');

        /* =========================================================
            [2026-01-23][접근성] START
           - 탭 활성화 시 tabindex 재정렬
           ========================================================= */
        $('.anchor-list button')
            .attr('tabindex', '-1')
            .filter('.active')
            .attr('tabindex', '0');
        /* =========================================================
            [2026-01-23][접근성] END
           ========================================================= */

        if (isMobile()) {
            $('.anchor-panel').hide();
            $(target).show();

            const currentScroll = $('body').scrollTop();
            const headerHeight = $('.headerOn').outerHeight() || 0;
            const visualHeight = $('.visual-container').outerHeight() || 0;
            const minScrollForFixed = headerHeight + visualHeight;

            if (currentScroll >= minScrollForFixed) {
                const $target = $(target);
                if ($target.length) {
                    const anchorListHeight = $('.anchor-list').outerHeight() || 0;
                    const targetScrollTop =
                        $target.offset().top + currentScroll - headerHeight - anchorListHeight;

                    $('body').stop().animate({
                        scrollTop: Math.max(targetScrollTop, minScrollForFixed)
                    }, 300);
                }
            }
        } else {
            const $target = $(target);
            if ($target.length) {
                const headerHeight = $('.headerOn').outerHeight() || 0;
                const anchorListHeight = $('.anchor-list').outerHeight() || 0;
                const offset = headerHeight + anchorListHeight - 70;

                const targetScrollTop = Math.max(0, $target.offset().top - offset);

                $('body').stop().animate({
                    scrollTop: targetScrollTop
                }, 400);
            }
        }
    }

    // 초기화
    initPanels();
    if (isMobile()) setupMobileScroll();

    // 버튼 클릭 이벤트
    $('.anchor-list button').on('click', function (e) {
        e.preventDefault();
        switchTab($(this));
    });

    // 키보드 접근성: Enter, Space
    $('.anchor-list button').on('keydown', function (e) {
        if (e.keyCode === 13 || e.keyCode === 32) {
            e.preventDefault();
            switchTab($(this));
        }
    });

    /* =========================================================
       [2026-01-23][접근성] START
       - 방향키로 탭 이동 (ARIA Tabs 패턴)
       ========================================================= */
    $('.anchor-list button').on('keydown', function (e) {
        const $tabs = $('.anchor-list button');
        const idx = $tabs.index(this);

        if (e.keyCode === 37) { // ←
            e.preventDefault();
            $tabs.eq(Math.max(0, idx - 1)).focus();
        }

        if (e.keyCode === 39) { // →
            e.preventDefault();
            $tabs.eq(Math.min($tabs.length - 1, idx + 1)).focus();
        }
    });
    /* =========================================================
       [2026-01-23][접근성] END
       ========================================================= */

    // 리사이즈 이벤트
    let resizeTimer;
    $(window).on('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (isMobile()) {
                setupMobileScroll();
            } else {
                $('.visual-container').removeClass('sticky');
                $('.anchor-list').removeClass('fixed');
                $('body').off('scroll.finance');
            }
            initPanels();
        }, 150);
    });
});
