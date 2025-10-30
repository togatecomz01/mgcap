const buttons = document.querySelectorAll('.anchor-list .btn-group button');
const isMobile = () => window.innerWidth <= 768;

function initPanels() {
    const activeButton = document.querySelector('.anchor-list .btn-group button.active');
    
    if (isMobile()) {
        $('.anchor-panel').hide();
        const targetButton = activeButton || buttons[0];
        if (targetButton) {
            $(targetButton.dataset.target).show();
            if (!activeButton) targetButton.classList.add('active');
        }
    } else {
        $('.anchor-panel').show();
        if (!activeButton && buttons[0]) buttons[0].classList.add('active');
    }
}

initPanels();

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(initPanels, 150);
});

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const targetId = this.dataset.target;
        
        buttons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        if (isMobile()) {
            e.preventDefault();
            $('.anchor-panel').hide();
            $(targetId).show();
        } else {
            document.querySelector(targetId).scrollIntoView({behavior: 'smooth'});
        }
    });
});