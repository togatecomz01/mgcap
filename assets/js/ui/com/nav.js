window.addEventListener('load', function() {
    fullMenu();
    allMenuToggle();
    headerMenu();
    scrollState();
    allSearchToggle();
});

/*---------------------------------------------
    ��ũ�� ���� �Լ�
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
    ��ü�޴� �����
---------------------------------------------*/
function fullMenu() {
    const menuTit = document.querySelectorAll('.menu-tit li');
    const gnb = document.querySelectorAll('.menu-inner > li');

    menuTit.forEach((item) => {
        item.addEventListener('click', function() {
            const span = this.querySelector('span');
            const focusTarget = span.getAttribute('data-focus');

            // ��� menu-tit li���� on Ŭ���� ����
            menuTit.forEach(li => li.classList.remove('on'));

            // Ŭ���� li�� on Ŭ���� �߰�
            this.classList.add('on');

            // ��� menu-inner li���� on Ŭ���� ����
            gnb.forEach(li => li.classList.remove('on'));

            // data-focus�� ��ġ�ϴ� menu-inner li�� on Ŭ���� �߰�
            const targetMenuItem = document.querySelector(`.menu-inner .${focusTarget}`);
            if (targetMenuItem) {
                targetMenuItem.classList.add('on');
            }
        });
    });
}

/*---------------------------------------------
    ��ü�޴� ����/�ݱ� ��� (PC & Mobile)
---------------------------------------------*/
function allMenuToggle() {
    const menuBtn = document.querySelector('.menu-btn[data-open="modal"]') || document.querySelector('.menu-btn');
    const allMenu = document.getElementById('allMenu');
    const closeBtn = document.querySelector('.allmenu-header-inner .close-btn');

    // �޴� ����
    function openMenu() {
        allMenu.classList.add('on');
        scrollState();
    }

    // �޴� �ݱ�
    function closeMenu() {
        allMenu.classList.remove('on');
        scrollState();
    }

    // �޴� ��ư Ŭ��/��ġ
    if (menuBtn) {
        menuBtn.addEventListener('click', openMenu);
        menuBtn.addEventListener('touchend', openMenu);
    }

    // �ݱ� ��ư Ŭ��/��ġ
    if (closeBtn) {
        closeBtn.addEventListener('click', closeMenu);
        closeBtn.addEventListener('touchend', closeMenu);
    }

    // ȭ�� ũ�� ���� �� ��ũ�� ���� üũ
    window.addEventListener('resize', scrollState);
}

/*---------------------------------------------
    �˻�â ����/�ݱ� ��� (PC & Mobile)
---------------------------------------------*/
function allSearchToggle() {
    const searchBtn = document.querySelector('.search-btn[data-open="searchWrap"]') || document.querySelector('.search-btn');
    const allSearch = document.getElementById('allSearch');
    const headerCloseBtn = document.querySelector('.header-btn-wrap .close-btn');

    // �޴� ����
    function openSearch() {
        allSearch.classList.add('on');
        scrollState();
    }

    // �޴� �ݱ�
    function closeSearch() {
        allSearch.classList.remove('on');
        scrollState();
    }

    // �޴� ��ư Ŭ��/��ġ
    if (searchBtn) {
        searchBtn.addEventListener('click', openSearch);
        searchBtn.addEventListener('touchend', openSearch);
    }

    // �ݱ� ��ư Ŭ��/��ġ
    if (headerCloseBtn) {
        headerCloseBtn.addEventListener('click', closeSearch);
        headerCloseBtn.addEventListener('touchend', closeSearch);
    }

    // �˻�â,�ݱ� ��ư show hide
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

    // ȭ�� ũ�� ���� �� ��ũ�� ���� üũ
    window.addEventListener('resize', scrollState);
}

/*---------------------------------------------
    ��� ��Ӵٿ� �޴� ���
---------------------------------------------*/
function headerMenu() {
    const menuButtons = document.querySelectorAll('.lnb .menu-item > .menu-tit');
    const menuItems = document.querySelectorAll('.lnb .menu-item');
    const submenuItems = document.querySelectorAll('.lnb .submenu2 > li');
    const submenu3Items = document.querySelectorAll('.lnb .submenu3 > li');

    // ��� ��Ӵٿ� �޴��� �ݴ� �Լ�
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

    // �� �޴� ��ư�� Ŭ�� �̺�Ʈ �߰�
    menuButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const parentMenuItem = this.parentElement;
            const listItem = parentMenuItem.querySelector('.list-item');
            const href = this.getAttribute('href');

            // ��� �޴� �ݱ� �ʱ�ȭ
            closeAllMenus();

            // menu-item�� list-item�� ������ ������ �̵� �� �Լ� ����
            if (!listItem) {
                if (href) {
                    window.location.href = href;
                }
                return;
            }

            const isCurrentlyOpen = parentMenuItem.classList.contains('on');
            // ��� �޴� �ݱ�
            menuItems.forEach(item => {
                item.classList.remove('on');
                const btn = item.querySelector('.menu-tit');
                if (btn) {
                    btn.classList.remove('on');
                    btn.setAttribute('aria-expanded', 'false');
                }
            });

            // ���� Ŭ���� �޴��� �����־��ٸ� ����
            if (!isCurrentlyOpen) {
                parentMenuItem.classList.add('on');
                this.classList.add('on');
                this.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // submenu2 > li�� Ŭ�� �̺�Ʈ �߰�
    submenuItems.forEach(li => {
        li.addEventListener('click', function (e) {
            e.stopPropagation();
            // �ٸ� submenu �������� on ����
            submenuItems.forEach(item => {
                item.classList.remove('on');
            });

            // ��� submenu3 �������� 'on' Ŭ���� ���� (�ʱ�ȭ)
            submenu3Items.forEach(item => {
                item.classList.remove('on');
            });

            // ���� ���� li�� submenu3�� �����ϰ� �ִٸ�
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

    // submenu3 > li�� Ŭ�� �̺�Ʈ �߰� (���� �߰��� �κ�)
    submenu3Items.forEach(li => {
        li.addEventListener('click', function (e) {
            e.stopPropagation();
            // ��� submenu3 > li�� on Ŭ���� ����
            submenu3Items.forEach(item => {
                item.classList.remove('on');
            });

            // ���� Ŭ���� submenu3 > li�� on �߰�
            this.classList.add('on');
        });
    });

    // �ٸ� �� Ŭ���� �޴� �ݱ�
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