window.addEventListener('load', function() {
    mobileMenu();
    menuToggle();
    headerMenu();
    searchToggle();
});

/*---------------------------------------------
    스크롤 제어 함수 (통합)
---------------------------------------------*/
function updateScrollState() {
    const allMenu = document.getElementById('allMenu');
    const menuInner = document.querySelector('.menu-inner');
    const shouldLockScroll = allMenu && allMenu.classList.contains('on');

    document.body.classList.toggle('no-scroll', shouldLockScroll);

    if (shouldLockScroll && menuInner) {
        if (window.innerWidth < 768) {
            menuInner.style.maxHeight = '100vh';
        } else {
            const headerHeight = document.querySelector('.allmenu-header') ? document.querySelector('.allmenu-header').offsetHeight : 0;
            const navTabHeight = document.querySelector('.menu-cont .menu-l .menu-tit') ? document.querySelector('.menu-cont .menu-l .menu-tit').offsetHeight : 0;
            menuInner.style.maxHeight = `calc(100vh - ${headerHeight + navTabHeight}px)`;
        }
    }
}

/*--------------------------------------------------------
    전체메뉴 탭 (모바일: 탭 전환 / PC: 스크롤 이동) 2025.12.05 수정
----------------------------------------------------------*/
function mobileMenu() {
    const menuTabs = document.querySelectorAll('.menu-tit li');
    const menuContents = document.querySelectorAll('.menu-inner > li');
    const menuInner = document.querySelector('.menu-inner');

    for (let i = 0; i < menuTabs.length; i++) {
        // 키보드 접근성
        menuTabs[i].setAttribute('tabindex', '0');
        
        // 탭 활성화 함수 (모바일용)
        function activateTab(tab) {
            // 모든 탭 비활성화
            for (let j = 0; j < menuTabs.length; j++) {
                menuTabs[j].classList.remove('on');
            }
            for (let k = 0; k < menuContents.length; k++) {
                menuContents[k].classList.remove('on');
            }

            // 클릭한 탭 활성화
            tab.classList.add('on');

            const targetClass = tab.querySelector('span').getAttribute('data-focus');
            if (targetClass) {
                document.querySelector('.menu-inner .' + targetClass).classList.add('on');
            }
        }

        // 스크롤 이동 함수 (PC용)
        function scrollToSection(tab) {
            const targetClass = tab.querySelector('span').getAttribute('data-focus');
            const targetSection = document.querySelector('.menu-inner > .' + targetClass);
            
            if (targetSection && menuInner) {
                // 탭 활성화
                for (let j = 0; j < menuTabs.length; j++) {
                    menuTabs[j].classList.remove('on');
                }
                tab.classList.add('on');

                // 스크롤 이동 (헤더와 탭 높이를 고려한 위치 계산)
                const header = document.querySelector('.allmenu-header');
                const menuL = document.querySelector('.menu-l');
                const headerHeight = header ? header.offsetHeight : 0;
                const tabHeight = menuL ? menuL.offsetHeight : 0;
                const offsetTop = targetSection.offsetTop - headerHeight - tabHeight;
                
                menuInner.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }

        // 클릭 이벤트
        menuTabs[i].addEventListener('click', function() {
            if (window.innerWidth < 768) {
                // 모바일/태블릿: 탭 전환
                activateTab(this);
            } else {
                // PC: 스크롤 이동
                scrollToSection(this);
            }
        });
        
        // 키보드 이벤트 (Enter, Space)
        menuTabs[i].addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (window.innerWidth < 768) {
                    activateTab(this);
                } else {
                    scrollToSection(this);
                }
            }
        });
    }

    // PC에서 스크롤 시 탭 자동 활성화 (선택사항)
    if (menuInner) {
        let scrollTimeout;
        menuInner.addEventListener('scroll', function() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(function() {
                if (window.innerWidth >= 768) {
                    updateActiveTabOnScroll();
                }
            }, 100);
        });
    }

    // 스크롤 위치에 따라 탭 활성화
    function updateActiveTabOnScroll() {
        const scrollTop = menuInner.scrollTop;
        let currentSection = null;
        let minDistance = Infinity;

        for (let i = 0; i < menuContents.length; i++) {
            const section = menuContents[i];
            const sectionTop = section.offsetTop - menuInner.offsetTop;
            const distance = Math.abs(scrollTop - sectionTop);
            
            if (distance < minDistance) {
                minDistance = distance;
                currentSection = section;
            }
        }

        if (currentSection) {
            const targetClass = currentSection.classList[0];
            
            for (let i = 0; i < menuTabs.length; i++) {
                const tabTarget = menuTabs[i].querySelector('span').getAttribute('data-focus');
                if (tabTarget === targetClass) {
                    for (let j = 0; j < menuTabs.length; j++) {
                        menuTabs[j].classList.remove('on');
                    }
                    menuTabs[i].classList.add('on');
                    break;
                }
            }
        }
    }
}

/*---------------------------------------------
    메뉴/검색 토글 통합 함수
---------------------------------------------*/
function menuToggle() {
    // 전체메뉴 토글
    const menuBtn = document.querySelector('.menu-btn');
    const allMenu = document.getElementById('allMenu');
    const menuCloseBtn = document.querySelector('.allmenu-header-inner .close-btn');
    
    if (menuBtn && allMenu) {
        menuBtn.addEventListener('click', function() {
            allMenu.classList.add('on');
            updateScrollState();
        });
        
        if (menuCloseBtn) {
            menuCloseBtn.addEventListener('click', function() {
                allMenu.classList.remove('on');
                updateScrollState();
            });
        }
    }
    // resize 시 높이 재계산
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (allMenu && allMenu.classList.contains('on')) {
                updateScrollState();
            }
        }, 100);
    });
}

// 검색 토글
function searchToggle() {
    const searchBtn = document.querySelector('.search-btn');
    const allSearch = document.getElementById('allSearch');
    const searchCloseBtn = document.querySelector('.header-btn-wrap .close-btn');
    const allMenuSearchBtn = document.querySelector('.allmenu-header-inner .search-btn');
    const allSearchCloseBtn = document.querySelector('.allsearch-header-inner .close-btn');
    
    if (searchBtn && allSearch) {
        // 검색창 열기 함수
        function openSearch(triggerButton, closeButton) {
            const menuItems = document.querySelectorAll('.lnb .menu-item');
            menuItems.forEach(function(item) {
                item.classList.remove('on');
                const btn = item.querySelector('.menu-tit');
                if (btn) {
                    btn.classList.remove('on');
                }
            });
            
            allSearch.classList.add('on');
            
            // 트리거 버튼 숨김 처리
            if (triggerButton) {
                triggerButton.style.display = 'none';
            }
            
            // 닫기 버튼 표시
            if (closeButton) {
                closeButton.classList.add('on');
            }
            
            // 포커스 이동 (입력 필드로 먼저 이동)
            setTimeout(function() {
                // 검색창 내부의 첫 번째 입력 필드 찾기
                const searchInput = allSearch.querySelector('input[type="text"], input[type="search"], input:not([type])');
                
                if (searchInput) {
                    searchInput.focus();
                } else {
                    // 입력 필드가 없으면 첫 번째 포커스 가능 요소
                    const focusableElements = allSearch.querySelectorAll(
                        'input:not([disabled]), button:not([disabled]), a[href], textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
                    );
                    if (focusableElements.length > 0) {
                        focusableElements[0].focus();
                    }
                }
            }, 100);
        }
        
        // 검색창 닫기 함수
        function closeSearch(triggerButton, closeButton) {
            allSearch.classList.remove('on');
            
            // 트리거 버튼 다시 표시
            if (triggerButton) {
                triggerButton.style.display = 'inline-block';
                // 원래 버튼으로 포커스 복귀
                setTimeout(function() {
                    triggerButton.focus();
                }, 100);
            }
            
            // 닫기 버튼 숨김
            if (closeButton) {
                closeButton.classList.remove('on');
            }
        }
        
        // PC 검색 버튼
        searchBtn.addEventListener('click', function() {
            openSearch(searchBtn, searchCloseBtn);
        });
        
        if (searchCloseBtn) {
            searchCloseBtn.addEventListener('click', function() {
                closeSearch(searchBtn, searchCloseBtn);
            });
        }

        // 모바일 검색 버튼
        if (allMenuSearchBtn && allSearchCloseBtn) {
            allMenuSearchBtn.addEventListener('click', function() {
                openSearch(allMenuSearchBtn, allSearchCloseBtn);
            });
            
            allSearchCloseBtn.addEventListener('click', function() {
                closeSearch(allMenuSearchBtn, allSearchCloseBtn);
            });
        }
        
        // 포커스 트랩 (검색창 내부 → 닫기 버튼 순환)
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab' && allSearch.classList.contains('on')) {
                // 활성화된 닫기 버튼 찾기
                let activeCloseBtn = null;
                if (searchCloseBtn && searchCloseBtn.classList.contains('on')) {
                    activeCloseBtn = searchCloseBtn;
                } else if (allSearchCloseBtn) {
                    activeCloseBtn = allSearchCloseBtn;
                }
                
                if (!activeCloseBtn) return;
                
                // 검색창 내부 포커스 가능 요소만 (닫기 버튼 제외)
                const searchFocusable = Array.from(allSearch.querySelectorAll(
                    'input:not([disabled]), button:not([disabled]), a[href], textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
                ));

                if (searchFocusable.length === 0) return;

                const firstSearchElement = searchFocusable[0];
                const lastSearchElement = searchFocusable[searchFocusable.length - 1];

                // 검색창 마지막 요소 → 닫기 버튼
                if (!e.shiftKey && document.activeElement === lastSearchElement) {
                    e.preventDefault();
                    activeCloseBtn.focus();
                }
                // 닫기 버튼 → 검색창 첫 요소
                else if (!e.shiftKey && document.activeElement === activeCloseBtn) {
                    e.preventDefault();
                    firstSearchElement.focus();
                }
                // 검색창 첫 요소 → 닫기 버튼
                else if (e.shiftKey && document.activeElement === firstSearchElement) {
                    e.preventDefault();
                    activeCloseBtn.focus();
                }
                // 닫기 버튼 → 검색창 마지막 요소
                else if (e.shiftKey && document.activeElement === activeCloseBtn) {
                    e.preventDefault();
                    lastSearchElement.focus();
                }
            }
        });

        // 반응형 처리
        function handleResize() {
            if (window.innerWidth < 767) {
                searchBtn.style.display = 'none';
            } else {
                if (!allSearch.classList.contains('on')) {
                    searchBtn.style.display = 'inline-block';
                }
            }
        }

        // 초기 실행
        handleResize();

        // resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(handleResize, 10);
        });
    }
}

/*---------------------------------------------
    헤더 드롭다운 메뉴 기능
---------------------------------------------*/
function headerMenu() {
    const menuItems = document.querySelectorAll('.lnb .menu-item');
    
    // 요소가 없으면 함수 종료
    if (!menuItems || menuItems.length === 0) {
        console.warn('headerMenu: .lnb .menu-item 요소를 찾을 수 없습니다.');
        return;
    }
    
    // 현재 페이지의 active 메뉴를 저장 (초기 로드 시 active가 있는 메뉴)
    let currentPageActiveMenu = null;
    menuItems.forEach(function(item) {
        const btn = item.querySelector('.menu-tit');
        if (btn && btn.classList.contains('active')) {
            currentPageActiveMenu = btn;
        }
    });
    
    // 원래 페이지의 active 복원 함수
    function restoreCurrentPageActive() {
        // 모든 active 제거
        menuItems.forEach(function(item) {
            const btn = item.querySelector('.menu-tit');
            if (btn) {
                btn.classList.remove('active');
            }
        });
        
        // 현재 페이지의 active만 복원
        if (currentPageActiveMenu) {
            currentPageActiveMenu.classList.add('active');
        }
    }
    
    // 모든 메뉴 닫기 함수 (on만 제거)
    function closeAllMenus() {
        menuItems.forEach(function(item) {
            item.classList.remove('on');
            const btn = item.querySelector('.menu-tit');
            if (btn) {
                btn.classList.remove('on');
            }
        });
    }

    // 1depth - 각 메뉴 아이템 처리
    menuItems.forEach(function(menuItem) {
        const menuButton = menuItem.querySelector('.menu-tit');
        const listItem = menuItem.querySelector('.list-item');
        const hasSubmenu = listItem !== null;
        
        if (!menuButton) return;
        
        // 각 메뉴마다 독립적인 타이머
        let closeTimer = null;
        
        // 메뉴 열기 (hover용)
        function openMenu() {
            if (closeTimer) {
                clearTimeout(closeTimer);
                closeTimer = null;
            }
            
            if (hasSubmenu) {
                // 다른 메뉴들의 active 제거 (hover 시)
                menuItems.forEach(function(otherItem) {
                    if (otherItem !== menuItem) {
                        otherItem.classList.remove('on');
                        const otherBtn = otherItem.querySelector('.menu-tit');
                        if (otherBtn) {
                            otherBtn.classList.remove('on', 'active');
                        }
                    }
                });
                
                // 현재 메뉴에 on 추가
                menuItem.classList.add('on');
                menuButton.classList.add('on');
            }
        }
        
        // 메뉴 닫기 (hover용 - on만 제거, active는 유지)
        function scheduleClose() {
            closeTimer = setTimeout(function() {
                menuItem.classList.remove('on');
                menuButton.classList.remove('on');
            }, 100);
        }
        
        if (hasSubmenu) {
            // mouseenter/mouseleave 이벤트
            menuItem.addEventListener('mouseenter', openMenu);
            menuItem.addEventListener('mouseleave', scheduleClose);
            
            if (listItem) {
                listItem.addEventListener('mouseenter', openMenu);
                listItem.addEventListener('mouseleave', scheduleClose);
            }
            
            // 클릭 이벤트 - active 토글
            menuButton.addEventListener('click', function(e) {
                e.preventDefault();
                
                const isActive = menuButton.classList.contains('active');
                
                if (isActive) {
                    // active 해제
                    menuButton.classList.remove('active');
                    menuItem.classList.remove('on');
                    menuButton.classList.remove('on');
                } else {
                    // 타이머 클리어
                    if (closeTimer) {
                        clearTimeout(closeTimer);
                        closeTimer = null;
                    }
                    
                    // 다른 메뉴의 active 제거
                    menuItems.forEach(function(otherItem) {
                        if (otherItem !== menuItem) {
                            otherItem.classList.remove('on');
                            const otherBtn = otherItem.querySelector('.menu-tit');
                            if (otherBtn) {
                                otherBtn.classList.remove('active', 'on');
                            }
                        }
                    });
                    
                    // 현재 메뉴에 active 추가
                    menuButton.classList.add('active');
                    
                    // on도 추가 (열린 상태 유지)
                    menuItem.classList.add('on');
                    menuButton.classList.add('on');
                }
            });
        } else {
            // 서브메뉴가 없는 경우 바로 이동
            menuButton.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href && href !== '#') {
                    window.location.href = href;
                }
            });
        }
    });
    
    // 2depth - 마우스오버 이벤트
    const submenu2Items = document.querySelectorAll('.lnb .submenu2 > li');
    submenu2Items.forEach(function(item) {
        const submenu2Link = item.querySelector('a, button');
        
        if (submenu2Link) {
            submenu2Link.setAttribute('tabindex', '0');
        }

        item.addEventListener('mouseenter', function(e) {
            e.stopPropagation();
            
            // 같은 레벨 메뉴들 초기화
            const allSubmenu2 = document.querySelectorAll('.lnb .submenu2 > li');
            
            allSubmenu2.forEach(function(el) {
                el.classList.remove('on');
            });
            
            this.classList.add('on');
        });
    });

    // 키보드 이벤트
    const allMenuLinks = document.querySelectorAll('.lnb .menu-tit, .lnb .submenu a, .lnb .submenu button, .lnb .submenu2 a, .lnb .submenu2 button');
    allMenuLinks.forEach(function(link) {
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // 메뉴 영역 밖으로 마우스가 나갔을 때 원래 페이지의 active 복원
    const gnbElement = document.querySelector('.gnb');
    if (gnbElement) {
        gnbElement.addEventListener('mouseleave', function() {
            closeAllMenus();
            restoreCurrentPageActive();
        });
    }

    // 포커스가 헤더 메뉴 영역을 벗어나면 on 제거하고 active 복원
    const headerWrap = document.getElementById('headerWrap');
    if (headerWrap) {
        document.addEventListener('focusin', function(e) {
            const isInsideHeader = headerWrap.contains(e.target);
            if (!isInsideHeader) {
                closeAllMenus();
                restoreCurrentPageActive();
            }
        });
    }
}