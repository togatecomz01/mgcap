window.addEventListener('load', function() {
    mobileMenu();
    menuToggle();
    headerMenu();
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
    
    // 검색 토글
    const searchBtn = document.querySelector('.search-btn');
    const allSearch = document.getElementById('allSearch');
    const searchCloseBtn = document.querySelector('.header-btn-wrap .close-btn');
    
    if (searchBtn && allSearch) {
        searchBtn.addEventListener('click', function() {
            allSearch.classList.add('on');
            searchBtn.style.display = 'none';
            if (searchCloseBtn) {
                searchCloseBtn.style.display = 'inline-block';
            }
        });
        
        if (searchCloseBtn) {
            searchCloseBtn.addEventListener('click', function() {
                allSearch.classList.remove('on');
                searchBtn.style.display = 'inline-block';
                this.style.display = 'none';
            });
        }
    }
}


/*---------------------------------------------
    헤더 드롭다운 메뉴 기능
---------------------------------------------*/
function headerMenu() {
    const menuItems = document.querySelectorAll('.lnb .menu-item');
    const menuButtons = document.querySelectorAll('.lnb .menu-item > .menu-tit');
    
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
    for (let i = 0; i < menuButtons.length; i++) {
        menuButtons[i].addEventListener('click', function(e) {
            e.preventDefault();
            
            const parentItem = this.parentElement;
            const hasSubmenu = parentItem.querySelector('.list-item');
            
            // 서브메뉴가 없으면 페이지 이동
            if (!hasSubmenu) {
                const href = this.getAttribute('href');
                if (href) {
                    window.location.href = href;
                }
                return;
            }
            
            const isOpen = parentItem.classList.contains('on');
            closeAllMenus();
            
            if (!isOpen) {
                parentItem.classList.add('on');
                this.classList.add('on');
            }
        });
    }
    
    // 2depth
    const submenu2Items = document.querySelectorAll('.lnb .submenu2 > li');
    for (let i = 0; i < submenu2Items.length; i++) {
        submenu2Items[i].addEventListener('click', function(e) {
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
            
            // 3depth가 있으면 첫번째 활성화
            // const submenu3 = this.querySelector('.submenu3');
            // if (submenu3) {
            //     const firstItem = submenu3.querySelector('li');
            //     if (firstItem) {
            //         firstItem.classList.add('on');
            //     }
            // }
        });
    }
    
    // 3depth
    // const submenu3Items = document.querySelectorAll('.lnb .submenu3 > li');
    // for (let i = 0; i < submenu3Items.length; i++) {
    //     submenu3Items[i].addEventListener('click', function(e) {
    //         e.stopPropagation();
            
    //         // 같은 레벨 메뉴들 초기화
    //         const allSubmenu3 = document.querySelectorAll('.lnb .submenu3 > li');
    //         for (let j = 0; j < allSubmenu3.length; j++) {
    //             allSubmenu3[j].classList.remove('on');
    //         }
            
    //         this.classList.add('on');
    //     });
    // }
    
    // 외부 클릭시 메뉴 닫기
    document.addEventListener('click', function(e) {
        let clickedElement = e.target;
        let isInsideMenu = false;
        
        // 클릭한 요소가 메뉴 안에 있는지 확인
        while (clickedElement) {
            if (clickedElement.classList && clickedElement.classList.contains('lnb')) {
                isInsideMenu = true;
                break;
            }
            clickedElement = clickedElement.parentElement;
        }
        
        if (!isInsideMenu) {
            closeAllMenus();
        }
    });
}