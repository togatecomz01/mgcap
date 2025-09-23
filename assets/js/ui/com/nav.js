/*---------------------------------------------
        전체메뉴 모바일
---------------------------------------------*/
function initMobileMenu() {
    const menuTit = document.querySelectorAll('.menu-tit li');
    const gnb = document.querySelectorAll('.menu-inner > li');

    menuTit.forEach((item, index) => {
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

// // 데모용 함수들
// function toggleMenu() {
//     const menu = document.querySelector('.allmenu');
//     menu.classList.toggle('hidden');
// }

// function closeMenu() {
//     const menu = document.querySelector('.allmenu');
//     menu.classList.add('hidden');
// }

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
});