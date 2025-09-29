window.addEventListener('load', function() {
    mobileMenu();
    menuToggle();
    headerMenu();
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
    
    // �˻� ���
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
    ��� ��Ӵٿ� �޴� ���
---------------------------------------------*/
function headerMenu() {
    const menuItems = document.querySelectorAll('.lnb .menu-item');
    const menuButtons = document.querySelectorAll('.lnb .menu-item > .menu-tit');
    
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
    for (let i = 0; i < menuButtons.length; i++) {
        menuButtons[i].addEventListener('click', function(e) {
            e.preventDefault();
            
            const parentItem = this.parentElement;
            const hasSubmenu = parentItem.querySelector('.list-item');
            
            // ����޴��� ������ ������ �̵�
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
            
            // 3depth�� ������ ù��° Ȱ��ȭ
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
            
    //         // ���� ���� �޴��� �ʱ�ȭ
    //         const allSubmenu3 = document.querySelectorAll('.lnb .submenu3 > li');
    //         for (let j = 0; j < allSubmenu3.length; j++) {
    //             allSubmenu3[j].classList.remove('on');
    //         }
            
    //         this.classList.add('on');
    //     });
    // }
    
    // �ܺ� Ŭ���� �޴� �ݱ�
    document.addEventListener('click', function(e) {
        let clickedElement = e.target;
        let isInsideMenu = false;
        
        // Ŭ���� ��Ұ� �޴� �ȿ� �ִ��� Ȯ��
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