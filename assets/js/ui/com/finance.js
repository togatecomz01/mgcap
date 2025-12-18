$(document).ready(function() {
    const isMobile = () => window.innerWidth <= 768;
    
    // 초기 상태 설정
    function initPanels() {
        const buttons = $('.anchor-list .btn-group button');
        const activeButton = buttons.filter('.active');
        
        if (isMobile()) {
            // 모바일: active 패널만 표시
            $('.anchor-panel').hide();
            const targetButton = activeButton.length ? activeButton : buttons.first();
            $(targetButton.data('target')).show();
            targetButton.addClass('active');
        } else {
            // PC: 모든 패널 표시
            $('.anchor-panel').show();
            if (!activeButton.length) buttons.first().addClass('active');
        }
    }

    // 모바일 스크롤 이벤트 설정
    function setupMobileScroll() {
        const $body = $('body');
        const $header = $('.headerOn');
        const $visualContainer = $('.visual-container');
        const $anchorList = $('.anchor-list');
        
        const headerHeight = $header.outerHeight() || 0;
        const visualHeight = $visualContainer.outerHeight() || 0;
        
        $body.off('scroll').on('scroll', function() {
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
        
        if (isMobile()) {
            // 모바일: 탭 전환
            $('.anchor-panel').hide();
            $(target).show();
            
            // 현재 스크롤 위치 확인
            const currentScroll = $('body').scrollTop();
            const $header = $('.headerOn');
            const $visualContainer = $('.visual-container');
            const headerHeight = $header.outerHeight() || 0;
            const visualHeight = $visualContainer.outerHeight() || 0;
            const minScrollForFixed = headerHeight + visualHeight;
            
            // 이미 fixed 상태인 경우에만 스크롤 이동
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
                
                $('body').stop().animate({
                    scrollTop: $target.offset().top + $('body').scrollTop() - offset
                }, 400);
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
                $('body').off('scroll');
            }
            initPanels();
        }, 150);
    });
});