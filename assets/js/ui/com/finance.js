$(document).ready(function() {
    const isMobile = () => window.innerWidth <= 768;

    //21.1.28 웹접근성 선택 title 처리 함수(추가)
    function setSelectedTitle($btn) {
        const $buttons = $('.anchor-list .btn-group button');
        $buttons.removeAttr('title');          // 기존 title 제거(최소)
        $btn.attr('title', '선택됨');           // 현재 선택만 title 부여
    }

    // 21.1.28 웹접근성 스크롤 후 포커스 이동 함수(추가)
    function focusTargetAfterScroll($target) {
        if (!$target || !$target.length) return;

        // 포커스 가능한 요소가 아니면 임시로 tabindex 부여
        const hadTabindex = $target.is('[tabindex]');
        if (!hadTabindex) $target.attr('tabindex', '-1');

        $target.focus();

        // 원래 tabindex 없던 애는 복구(눈에 안 띄게)
        if (!hadTabindex) {
            setTimeout(() => {
                // 혹시 다른 로직이 tabindex를 넣었을 수도 있으니 -1일 때만 제거
                if ($target.attr('tabindex') === '-1') $target.removeAttr('tabindex');
            }, 0);
        }
    }

    // 초기 상태 설정
    function initPanels() {
        const buttons = $('.anchor-list .btn-group button');
        const activeButton = buttons.filter('.active');

        if (isMobile()) {
            $('.anchor-panel').hide();
            const targetButton = activeButton.length ? activeButton : buttons.first();
            $(targetButton.data('target')).show();
            targetButton.addClass('active');

            // 21.1.28 웹접근성 초기에도 title 세팅(추가)
            setSelectedTitle(targetButton);

        } else {
            $('.anchor-panel').show();
            const targetButton = activeButton.length ? activeButton : buttons.first();
            if (!activeButton.length) targetButton.addClass('active');

            // 21.1.28 웹접근성 초기에도 title 세팅(추가)
            setSelectedTitle(targetButton);
        }
    }

    function setupMobileScroll() {
        const $body = $('body');
        const $header = $('.headerOn');
        const $visualContainer = $('.visual-container');
        const $anchorList = $('.anchor-list');

        const headerHeight = $header.outerHeight() || 0;
        const visualHeight = $visualContainer.outerHeight() || 0;

        $body.off('scroll.finance').on('scroll.finance', function() {
            const scrollTop = $body.scrollTop();
            $visualContainer.toggleClass('sticky', scrollTop >= headerHeight);
            $anchorList.toggleClass('fixed', scrollTop >= headerHeight + visualHeight);
        });
    }

    // 초기화
    initPanels();
    if (isMobile()) setupMobileScroll();

    // 버튼 클릭 이벤트
    $('.anchor-list button').on('click', function(e) {
        e.preventDefault();

        const $this = $(this);
        const target = $this.data('target');

        $('.anchor-list button').removeClass('active');
        $this.addClass('active');

        // 21.1.28 웹접근성 클릭 시 title 갱신(추가)
        setSelectedTitle($this);

        if (isMobile()) {
            $('.anchor-panel').hide();
            $(target).show();

            const currentScroll = $('body').scrollTop();
            const $header = $('.headerOn');
            const $visualContainer = $('.visual-container');
            const headerHeight = $header.outerHeight() || 0;
            const visualHeight = $visualContainer.outerHeight() || 0;
            const minScrollForFixed = headerHeight + visualHeight;

            if (currentScroll >= minScrollForFixed) {
                const $target = $(target);
                if ($target.length) {
                    const $anchorList = $('.anchor-list');
                    const anchorListHeight = $anchorList.outerHeight() || 0;
                    const targetScrollTop = $target.offset().top + currentScroll - headerHeight - anchorListHeight;
                    const finalScrollTop = Math.max(targetScrollTop, minScrollForFixed);

                    $('body').stop().animate({
                        scrollTop: finalScrollTop
                    }, 300);
                }
            }

        } else {
            // PC: 스크롤 이동
            const $target = $(target);
            if ($target.length) {
                const headerHeight = $('.headerOn').outerHeight() || 0;
                const anchorListHeight = $('.anchor-list').outerHeight() || 0;
                const offset = headerHeight + anchorListHeight - 70;

                // 21.1.28 웹접근성 스크롤 애니메이션 완료 후 대상에 포커스 이동(추가)
                $('body').stop().animate({
                    scrollTop: $target.offset().top + $('body').scrollTop() - offset
                }, 400, function() {
                    focusTargetAfterScroll($target);
                });
            }
        }
    });

    // 리사이즈 이벤트
    let resizeTimer;
    $(window).on('resize', function() {
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