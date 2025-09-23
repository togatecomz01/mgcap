/*---------------------------------------------
        ��ü�޴� �����
---------------------------------------------*/
function initMobileMenu() {
    const menuTit = document.querySelectorAll('.menu-tit li');
    const gnb = document.querySelectorAll('.menu-inner > li');

    menuTit.forEach((item, index) => {
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

// // ����� �Լ���
// function toggleMenu() {
//     const menu = document.querySelector('.allmenu');
//     menu.classList.toggle('hidden');
// }

// function closeMenu() {
//     const menu = document.querySelector('.allmenu');
//     menu.classList.add('hidden');
// }

// ������ �ε� �� �ʱ�ȭ
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
});