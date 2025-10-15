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
    const shouldLockScroll = window.innerWidth <= 480 && allMenu?.classList.contains('on');
    document.body.classList.toggle('no-scroll', shouldLockScroll);
}

/*---------------------------------------------
    전체메뉴 모바일
---------------------------------------------*/
function mobileMenu() {
    const menuTabs = document.querySelectorAll('.menu-tit li');
    const menuContents = document.querySelectorAll('.menu-inner > li');

    for (let i = 0; i < menuTabs.length; i++) {
        // 키보드 접근성을 위한 속성 추가
        menuTabs[i].setAttribute('tabindex', '0');
        
        // 탭 활성화 함수
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

        // 클릭 이벤트
        menuTabs[i].addEventListener('click', function() {
            activateTab(this);
        });
        
        // 키보드 이벤트 (Enter, Space)
        menuTabs[i].addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                activateTab(this);
            }
        });
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
}

// 검색 토글 20251010 수정
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
                searchCloseBtn.classList.add('on');/* 20250929 수정 */
            }
        });
        
        if (searchCloseBtn) {
            searchCloseBtn.addEventListener('click', function() {
                allSearch.classList.remove('on');
                searchBtn.style.display = 'inline-block';
                this.classList.remove('on');/* 20250929 수정 */
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
            if (window.innerWidth < 480) {
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
    const menu = document.querySelector('.lnb .menu');
    const menuItems = document.querySelectorAll('.lnb .menu-item');
    
    // 모든 메뉴 닫기 함수
    function closeAllMenus() {
        for (let i = 0; i < menuItems.length; i++) {
            menuItems[i].classList.remove('on');
            const btn = menuItems[i].querySelector('.menu-tit');
            if (btn) {
                btn.classList.remove('on');
            }
        }
    }
    
    // 1depth
    for (let i = 0; i < menuItems.length; i++) {
        const menuItem = menuItems[i];
        const menuButton = menuItem.querySelector('.menu-tit');
        const listItem = menuItem.querySelector('.list-item');
        const hasSubmenu = listItem !== null;
        
        let closeTimer = null;
        
        // 메뉴 열기
        function openMenu() {
            if (closeTimer) {
                clearTimeout(closeTimer);
                closeTimer = null;
            }
            if (hasSubmenu) {
                closeAllMenus();
                menuItem.classList.add('on');
                if (menuButton) {
                    menuButton.classList.add('on');
                }
            }
        }
        
        // 메뉴 닫기 예약
        function scheduleClose() {
            closeTimer = setTimeout(function() {
                menuItem.classList.remove('on');
                if (menuButton) {
                    menuButton.classList.remove('on');
                }
            }, 100);
        }
        
        // menu-tit에 마우스 진입
        if (menuButton) {
            menuButton.addEventListener('mouseenter', openMenu);
            menuButton.addEventListener('mouseleave', scheduleClose);
            
            // 클릭 이벤트
            menuButton.addEventListener('click', function(e) {
                if (!hasSubmenu) {
                    const href = this.getAttribute('href');
                    if (href) {
                        window.location.href = href;
                    }
                } else {
                    e.preventDefault();
                    // 키보드 사용자를 위한 토글 기능
                    const isOpen = menuItem.classList.contains('on');
                    if (isOpen) {
                        menuItem.classList.remove('on');
                        menuButton.classList.remove('on');
                    } else {
                        closeAllMenus();
                        menuItem.classList.add('on');
                        menuButton.classList.add('on');
                    }
                }
            });
        }

        // list-item에 마우스 진입/이탈
        if (listItem) {
            listItem.addEventListener('mouseenter', openMenu);
            listItem.addEventListener('mouseleave', scheduleClose);
        }
    }
    
    // 2depth - 마우스오버 이벤트
    const submenu2Items = document.querySelectorAll('.lnb .submenu2 > li');
    for (let i = 0; i < submenu2Items.length; i++) {
        // 20251015 키보드 이벤트
        const submenu2Link = submenu2Items[i].querySelector('a, button');
        
        if (submenu2Link) {
            submenu2Link.setAttribute('tabindex', '0');
        }

        submenu2Items[i].addEventListener('mouseenter', function(e) {
            e.stopPropagation();
            
            // 같은 레벨 메뉴들 초기화
            const allSubmenu2 = document.querySelectorAll('.lnb .submenu2 > li');
            const allSubmenu3 = document.querySelectorAll('.lnb .submenu3 > li');
            
            for (let j = 0; j < allSubmenu2.length; j++) {
                allSubmenu2[j].classList.remove('on');
            }
            for (let k = 0; k < allSubmenu3.length; k++) {
                allSubmenu3[k].classList.remove('on');
            }
            
            this.classList.add('on');
        });
    }

    // 20251015 키보드 이벤트
    const allMenuLinks = document.querySelectorAll('.lnb .menu-tit, .lnb .submenu a, .lnb .submenu button, .lnb .submenu2 a, .lnb .submenu2 button, .lnb .submenu3 a, .lnb .submenu3 button');
    for (let i = 0; i < allMenuLinks.length; i++) {
        allMenuLinks[i].addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
}