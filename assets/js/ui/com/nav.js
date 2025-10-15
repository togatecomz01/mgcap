window.addEventListener('load', function() {
    mobileMenu();
    menuToggle();
    headerMenu();
    searchToggle();
});

/*---------------------------------------------
    ��ũ�� ���� �Լ� (����)
---------------------------------------------*/
function updateScrollState() {
    const allMenu = document.getElementById('allMenu');
    const shouldLockScroll = window.innerWidth <= 480 && allMenu?.classList.contains('on');
    document.body.classList.toggle('no-scroll', shouldLockScroll);
}

/*---------------------------------------------
    ��ü�޴� �����
---------------------------------------------*/
function mobileMenu() {
    const menuTabs = document.querySelectorAll('.menu-tit li');
    const menuContents = document.querySelectorAll('.menu-inner > li');

    for (let i = 0; i < menuTabs.length; i++) {
        // Ű���� ���ټ��� ���� �Ӽ� �߰�
        menuTabs[i].setAttribute('tabindex', '0');
        
        // �� Ȱ��ȭ �Լ�
        function activateTab(tab) {
            // ��� �� ��Ȱ��ȭ
            for (let j = 0; j < menuTabs.length; j++) {
                menuTabs[j].classList.remove('on');
            }
            for (let k = 0; k < menuContents.length; k++) {
                menuContents[k].classList.remove('on');
            }

            // Ŭ���� �� Ȱ��ȭ
            tab.classList.add('on');

            const targetClass = tab.querySelector('span').getAttribute('data-focus');
            if (targetClass) {
                document.querySelector('.menu-inner .' + targetClass).classList.add('on');
            }
        }

        // Ŭ�� �̺�Ʈ
        menuTabs[i].addEventListener('click', function() {
            activateTab(this);
        });
        
        // Ű���� �̺�Ʈ (Enter, Space)
        menuTabs[i].addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                activateTab(this);
            }
        });
    }
}

/*---------------------------------------------
    �޴�/�˻� ��� ���� �Լ�
---------------------------------------------*/
function menuToggle() {
    // ��ü�޴� ���
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

// �˻� ��� 20251010 ����
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
                searchCloseBtn.classList.add('on');/* 20250929 ���� */
            }
        });
        
        if (searchCloseBtn) {
            searchCloseBtn.addEventListener('click', function() {
                allSearch.classList.remove('on');
                searchBtn.style.display = 'inline-block';
                this.classList.remove('on');/* 20250929 ���� */
            });
        }

        // ����� �˻�
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
                console.log('����');
                searchBtn.style.display = 'none';
            } else {
                searchBtn.style.display = 'inline-block';
            }
        }

        // �ʱ� ����
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
    ��� ��Ӵٿ� �޴� ���
---------------------------------------------*/
function headerMenu() {
    const menu = document.querySelector('.lnb .menu');
    const menuItems = document.querySelectorAll('.lnb .menu-item');
    
    // ��� �޴� �ݱ� �Լ�
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
        
        // �޴� ����
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
        
        // �޴� �ݱ� ����
        function scheduleClose() {
            closeTimer = setTimeout(function() {
                menuItem.classList.remove('on');
                if (menuButton) {
                    menuButton.classList.remove('on');
                }
            }, 100);
        }
        
        // menu-tit�� ���콺 ����
        if (menuButton) {
            menuButton.addEventListener('mouseenter', openMenu);
            menuButton.addEventListener('mouseleave', scheduleClose);
            
            // Ŭ�� �̺�Ʈ
            menuButton.addEventListener('click', function(e) {
                if (!hasSubmenu) {
                    const href = this.getAttribute('href');
                    if (href) {
                        window.location.href = href;
                    }
                } else {
                    e.preventDefault();
                    // Ű���� ����ڸ� ���� ��� ���
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

        // list-item�� ���콺 ����/��Ż
        if (listItem) {
            listItem.addEventListener('mouseenter', openMenu);
            listItem.addEventListener('mouseleave', scheduleClose);
        }
    }
    
    // 2depth - ���콺���� �̺�Ʈ
    const submenu2Items = document.querySelectorAll('.lnb .submenu2 > li');
    for (let i = 0; i < submenu2Items.length; i++) {
        // 20251015 Ű���� �̺�Ʈ
        const submenu2Link = submenu2Items[i].querySelector('a, button');
        
        if (submenu2Link) {
            submenu2Link.setAttribute('tabindex', '0');
        }

        submenu2Items[i].addEventListener('mouseenter', function(e) {
            e.stopPropagation();
            
            // ���� ���� �޴��� �ʱ�ȭ
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

    // 20251015 Ű���� �̺�Ʈ
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