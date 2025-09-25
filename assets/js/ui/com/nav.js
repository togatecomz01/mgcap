window.addEventListener('load', function() {
    fullMenu();
    allMenuToggle();
    headerMenu();
    scrollState();
    allSearchToggle();
});

/*---------------------------------------------
    스크롤 제어 함수
---------------------------------------------*/
function scrollState() {
    const allMenu = document.getElementById('allMenu');
    
    if (window.innerWidth <= 480 && allMenu && allMenu.classList.contains('on')) {
        document.body.classList.add('no-scroll');
    } else {
        document.body.classList.remove('no-scroll');
    }
}

/*---------------------------------------------
    전체메뉴 모바일
---------------------------------------------*/
function fullMenu() {
    const menuTit = document.querySelectorAll('.menu-tit li');
    const gnb = document.querySelectorAll('.menu-inner > li');

    menuTit.forEach((item) => {
        item.addEventListener('click', function() {
            const span = this.querySelector('span');
            const focusTarget = span.getAttribute('data-focus');

            // 모든 menu-tit li에서 on 클래스 제거
            menuTit.forEach(li => li.classList.remove('on'));

            // 클릭된 li에 on 클래스 추가
            this.classList.add('on');

            // 모든 menu-inner li에서 on 클래스 제거
            gnb.forEach(li => li.classList.remove('on'));

            // data-focus와 일치하는 menu-inner li에 on 클래스 추가
            const targetMenuItem = document.querySelector(`.menu-inner .${focusTarget}`);
            if (targetMenuItem) {
                targetMenuItem.classList.add('on');
            }
        });
    });
}

/*---------------------------------------------
    전체메뉴 열기/닫기 기능 (PC & Mobile)
---------------------------------------------*/
function allMenuToggle() {
    const menuBtn = document.querySelector('.menu-btn[data-open="modal"]') || document.querySelector('.menu-btn');
    const allMenu = document.getElementById('allMenu');
    const closeBtn = document.querySelector('.allmenu-header-inner .close-btn');

    // 메뉴 열기
    function openMenu() {
        allMenu.classList.add('on');
        scrollState();
    }

    // 메뉴 닫기
    function closeMenu() {
        allMenu.classList.remove('on');
        scrollState();
    }

    // 메뉴 버튼 클릭/터치
    if (menuBtn) {
        menuBtn.addEventListener('click', openMenu);
        menuBtn.addEventListener('touchend', openMenu);
    }

    // 닫기 버튼 클릭/터치
    if (closeBtn) {
        closeBtn.addEventListener('click', closeMenu);
        closeBtn.addEventListener('touchend', closeMenu);
    }

    // 화면 크기 변경 시 스크롤 상태 체크
    window.addEventListener('resize', scrollState);
}

/*---------------------------------------------
    검색창 열기/닫기 기능 (PC & Mobile)
---------------------------------------------*/
function allSearchToggle() {
    const searchBtn = document.querySelector('.search-btn[data-open="searchWrap"]') || document.querySelector('.search-btn');
    const allSearch = document.getElementById('allSearch');
    const headerCloseBtn = document.querySelector('.header-btn-wrap .close-btn');

    // 메뉴 열기
    function openSearch() {
        allSearch.classList.add('on');
        scrollState();
    }

    // 메뉴 닫기
    function closeSearch() {
        allSearch.classList.remove('on');
        scrollState();
    }

    // 메뉴 버튼 클릭/터치
    if (searchBtn) {
        searchBtn.addEventListener('click', openSearch);
        searchBtn.addEventListener('touchend', openSearch);
    }

    // 닫기 버튼 클릭/터치
    if (headerCloseBtn) {
        headerCloseBtn.addEventListener('click', closeSearch);
        headerCloseBtn.addEventListener('touchend', closeSearch);
    }

    // 검색창,닫기 버튼 show hide
    function searchToggle() {
        if (allSearch.classList.contains('on')) {
            searchBtn.style.display = 'none';
            headerCloseBtn.style.display = 'inline-block';
        } else {
            searchBtn.style.display = 'inline-block';
            headerCloseBtn.style.display = 'none';
        }
    }

    const observer = new MutationObserver(searchToggle);
    if (allSearch) {
        observer.observe(allSearch, { attributes: true, attributeFilter: ['class'] });
    }

    searchToggle();

    // 화면 크기 변경 시 스크롤 상태 체크
    window.addEventListener('resize', scrollState);
}

/*---------------------------------------------
    헤더 드롭다운 메뉴 기능
---------------------------------------------*/
function headerMenu() {
    const menuButtons = document.querySelectorAll('.lnb .menu-item > .menu-tit');
    const menuItems = document.querySelectorAll('.lnb .menu-item');
    const submenuItems = document.querySelectorAll('.lnb .submenu2 > li');
    const submenu3Items = document.querySelectorAll('.lnb .submenu3 > li');

    // 모든 드롭다운 메뉴를 닫는 함수
    function closeAllMenus() {
        menuItems.forEach(item => {
            item.classList.remove('on');
            const btn = item.querySelector('.menu-tit');
            if (btn) {
                btn.classList.remove('on');
                btn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // 각 메뉴 버튼에 클릭 이벤트 추가
    menuButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const parentMenuItem = this.parentElement;
            const listItem = parentMenuItem.querySelector('.list-item');
            const href = this.getAttribute('href');

            // 모든 메뉴 닫기 초기화
            closeAllMenus();

            // menu-item에 list-item이 없으면 페이지 이동 후 함수 종료
            if (!listItem) {
                if (href) {
                    window.location.href = href;
                }
                return;
            }

            const isCurrentlyOpen = parentMenuItem.classList.contains('on');
            // 모든 메뉴 닫기
            menuItems.forEach(item => {
                item.classList.remove('on');
                const btn = item.querySelector('.menu-tit');
                if (btn) {
                    btn.classList.remove('on');
                    btn.setAttribute('aria-expanded', 'false');
                }
            });

            // 현재 클릭한 메뉴가 닫혀있었다면 열기
            if (!isCurrentlyOpen) {
                parentMenuItem.classList.add('on');
                this.classList.add('on');
                this.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // submenu2 > li에 클릭 이벤트 추가
    submenuItems.forEach(li => {
        li.addEventListener('click', function (e) {
            e.stopPropagation();
            // 다른 submenu 아이템의 on 제거
            submenuItems.forEach(item => {
                item.classList.remove('on');
            });

            // 모든 submenu3 아이템의 'on' 클래스 제거 (초기화)
            submenu3Items.forEach(item => {
                item.classList.remove('on');
            });

            // 만약 현재 li가 submenu3를 포함하고 있다면
            const submenu3 = this.querySelector('.submenu3');
            if (submenu3) {
                const firstSubmenu3Li = submenu3.querySelector('li');
                if (firstSubmenu3Li) {
                    firstSubmenu3Li.classList.add('on');
                }
            } else {
                this.classList.add('on');
            }
        });
    });

    // submenu3 > li에 클릭 이벤트 추가 (새로 추가된 부분)
    submenu3Items.forEach(li => {
        li.addEventListener('click', function (e) {
            e.stopPropagation();
            // 모든 submenu3 > li에 on 클래스 제거
            submenu3Items.forEach(item => {
                item.classList.remove('on');
            });

            // 현재 클릭한 submenu3 > li에 on 추가
            this.classList.add('on');
        });
    });

    // 다른 곳 클릭시 메뉴 닫기
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.lnb')) {
            menuItems.forEach(item => {
                item.classList.remove('on');
                const btn = item.querySelector('.menu-tit');
                if (btn) {
                    btn.classList.remove('on');
                    btn.setAttribute('aria-expanded', 'false');
                }
            });
        }
    });
}