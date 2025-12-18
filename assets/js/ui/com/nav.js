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
    const shouldLockScroll = allMenu?.classList.contains('on');

    document.body.classList.toggle('no-scroll', shouldLockScroll);

    if (shouldLockScroll && menuInner) {
        if (window.innerWidth < 768) {
            menuInner.style.maxHeight = '100vh';
        } else {
            const headerHeight = document.querySelector('.allmenu-header')?.offsetHeight || 0;
            const navTabHeight = document.querySelector('.menu-cont .menu-l .menu-tit')?.offsetHeight || 0;
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
        // 키보드 접근성을 위한 속성 추가
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
                if (window.innerWidth >= 786) {
                    updateActiveTabOnScroll();
                }
            }, 100);
        });
    }

    // 스크롤 위치에 따라 탭 활성화
    function updateActiveTabOnScroll() {
        const scrollTop = menuInner.scrollTop;
        // const menuInnerTop = menuInner.getBoundingClientRect().top;
        
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
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (allMenu?.classList.contains('on')) {
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
    const allSearchCloseBtn = document.querySelector('.allsearch-header-inner .close-btn')
    
    if (searchBtn && allSearch) {
        searchBtn.addEventListener('click', function() {
            allSearch.classList.add('on');
            searchBtn.style.display = 'none';
            if (searchCloseBtn) {
                searchCloseBtn.classList.add('on');
            }
        });
        
        if (searchCloseBtn) {
            searchCloseBtn.addEventListener('click', function() {
                allSearch.classList.remove('on');
                searchBtn.style.display = 'inline-block';
                this.classList.remove('on');
            });
        }

        // 모바일 검색
        if (allMenuSearchBtn && allSearchCloseBtn) {
            allMenuSearchBtn.addEventListener('click', function () {
                console.log('click');
                allSearch.classList.add('on');
                allMenuSearchBtn.style.display = 'none';
            });
            
            allSearchCloseBtn.addEventListener('click', function () {
                allSearch.classList.remove('on');
                allMenuSearchBtn.style.display = 'inline-block';
            });
        }

        function handleResize() {
            if (window.innerWidth < 767) {
                console.log('이하');
                searchBtn.style.display = 'none';
            } else {
                searchBtn.style.display = 'inline-block';
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
                // active는 제거하지 않음!
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
                } else {
                    // 타이머 클리어
                    if (closeTimer) {
                        clearTimeout(closeTimer);
                        closeTimer = null;
                    }
                    
                    // 다른 메뉴의 active 제거
                    menuItems.forEach(function(otherItem) {
                        if (otherItem !== menuItem) {
                            const otherBtn = otherItem.querySelector('.menu-tit');
                            if (otherBtn) {
                                otherBtn.classList.remove('active');
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
            const allSubmenu3 = document.querySelectorAll('.lnb .submenu3 > li');
            
            allSubmenu2.forEach(function(el) {
                el.classList.remove('on');
            });
            allSubmenu3.forEach(function(el) {
                el.classList.remove('on');
            });
            
            this.classList.add('on');
        });
    });

    // 키보드 이벤트
    const allMenuLinks = document.querySelectorAll('.lnb .menu-tit, .lnb .submenu a, .lnb .submenu button, .lnb .submenu2 a, .lnb .submenu2 button, .lnb .submenu3 a, .lnb .submenu3 button');
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