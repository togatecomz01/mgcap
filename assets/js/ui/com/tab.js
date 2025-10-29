

$(document).ready(function(){

    /**
     *   TAB
    **/
    var Tabs = (function () {
        return {
            init: function (container) {
                var $tabContainer = $(container);
                var $tabs = $tabContainer.find('.tab-item, .nested-tab-item');
                // var $panels = $tabContainer.find('.tab-panel, .nested-tab-panel');

                // �ʱ� Ȱ�� ��
                $tabs.each(function () {
                    var $tab = $(this);
                    var targetId = $tab.attr('data-tab');
                    var $panel = $('#' + targetId);

                    if ($tab.hasClass('active')) {
                        $tab.attr('aria-selected', 'true');
                        $panel.show().attr('aria-hidden', 'false');
                        $tab.find('button').attr('aria-label', $tab.find('button').text() + ', ���� ���õ�');
                    } else {
                        $tab.attr('aria-selected', 'false');
                        $panel.hide().attr('aria-hidden', 'true');
                        $tab.find('button').attr('aria-label', $tab.find('button').text());
                    }
                });

                // event binding
                $tabs.on('click', function (e) {
                    e.preventDefault();
                    Tabs.switchTab($(this), $tabContainer);
                });

                // Ű���� �̺�Ʈ ���ε�
                $tabs.on('keydown', function (e) {
                    Tabs.handleKeydown(e, $(this), $tabContainer);
                });

                // ��Ŀ�� �̺�Ʈ ���ε�
                $tabs.on('focus', function () {
                    $(this).addClass('focused');
                }).on('blur', function () {
                    $(this).removeClass('focused');
                });
            },

            switchTab: function ($clickedTab, $tabContainer) {
                var targetId = $clickedTab.attr('data-tab');
                var $targetPanel = $('#' + targetId);
                var isNested = $clickedTab.hasClass('nested-tab-item');

                // ���� �׷��� �� ã��
                var $allTabs = isNested ? $tabContainer.find('.nested-tab-item') : $tabContainer.find('.tab-item');
                var $allPanels = isNested ? $tabContainer.find('.nested-tab-panel') : $tabContainer.find('.tab-panel');

                // ���� �� �ʱ�ȭ
                $allTabs.removeClass('active').attr('aria-selected', 'false');
                $allPanels.hide().attr('aria-hidden', 'true');
                $allTabs.find('button').each(function() {
                    var $btn = $(this);
                    $btn.attr('aria-label', $btn.text());
                });

                // �� �� Ȱ��ȭ
                $clickedTab.addClass('active').attr('aria-selected', 'true');
                $targetPanel.show().attr('aria-hidden', 'false');
                $clickedTab.find('button').attr('aria-label', $clickedTab.find('button').text() + ', ���� ���õ�');
                
                // ����� select ����ȭ
                var $mobileSelect = $tabContainer.find('.tab-select-mobile select');
                if ($mobileSelect.length) {
                    $mobileSelect.val(targetId);
                }

                // ��Ŀ�� �̵� (���ټ� ���)
                $clickedTab.find('button').focus();
                
                // ��ũ�� ������ ���� �� ���� �ȳ�
                announceTabChange($clickedTab.find('button').text());
            },

            handleKeydown: function (e, $currentTab, $tabContainer) {
                var $tabs = $tabContainer.find('.tab-item, .nested-tab-item');
                var currentIndex = $tabs.index($currentTab);
                var $nextTab, $prevTab;

                switch (e.keyCode) {
                    case 37: // Left arrow
                        e.preventDefault();
                        $prevTab = $tabs.eq(currentIndex - 1);
                        if ($prevTab.length) {
                            $prevTab.find('button').focus();
                        } else {
                            $tabs.last().find('button').focus(); // ������ ������
                        }
                        break;
                    case 39: // Right arrow
                        e.preventDefault();
                        $nextTab = $tabs.eq(currentIndex + 1);
                        if ($nextTab.length) {
                            $nextTab.find('button').focus();
                        } else {
                            $tabs.first().find('button').focus(); // ù ��° ������
                        }
                        break;
                    case 36: // Home
                        e.preventDefault();
                        $tabs.first().find('button').focus();
                        break;
                    case 35: // End
                        e.preventDefault();
                        $tabs.last().find('button').focus();
                        break;
                    case 13: // Enter
                    case 32: // Space
                        e.preventDefault();
                        Tabs.switchTab($currentTab, $tabContainer);
                        break;
                }
            }
        };
    })();

    // ��� �� �ʱ�ȭ
    $('.jsTab, .nestedJsTab').each(function () {
        Tabs.init(this);
    });

    /**
     *   RADIO TAB 2025.10.22 �߰�
    **/
    $('.radio[data-tab]').on('change', 'input[type="radio"]', function() {
        if ($(this).is(':checked')) {
            var $radioLabel = $(this).closest('.radio[data-tab]');
            var targetId = $radioLabel.attr('data-tab');
            var $targetPanel = $('#' + targetId);
            
            // ���� �׷��� ��� �г� �����
            var radioName = $(this).attr('name');
            $('input[name="' + radioName + '"]').closest('.radio[data-tab]').each(function() {
                var panelId = $(this).attr('data-tab');
                $('#' + panelId).hide();
            });
            
            // ���õ� �гθ� ǥ��
            $targetPanel.show();
        }
    });

    // �ʱ� �ε� �� ��� �г� �����
    $('.radio[data-tab]').each(function() {
        var panelId = $(this).attr('data-tab');
        $('#' + panelId).hide();
    });

    // �ʱ� �ε� �� üũ�� ������ �гθ� ǥ��
    $('.radio[data-tab] input[type="radio"]:checked').each(function() {
        var targetId = $(this).closest('.radio[data-tab]').attr('data-tab');
        $('#' + targetId).show();
    });
    
    /**
     *   TAB Swiper - IE11 ȣȯ�� ó��
    **/
    var tabSwiperL = (function () {
        var pager = ['����', '����2', '����3', '����4'];
        var tabSwiper = null;

        // Swiper�� �����ϰ� IE11�� �ƴ� ��쿡�� �ʱ�ȭ
        if (typeof Swiper !== 'undefined' && !isIE11()) {
            try {
                tabSwiper = new Swiper('.tabs.tab-area.swiper', {
                    spaceBetween: 20,
                    autoHeight: true,
                    pagination: {
                        el: '.tabs ul',
                        clickable: true,
                        renderBullet: function (index, className) {
                            return '<li class="tab-item ' + className + '">' + pager[index] + '</li>';
                        }
                    }
                });
            } catch (e) {
                console.log('Swiper �ʱ�ȭ ����:', e.message);
                // Swiper �ʱ�ȭ ���� �� �⺻ �� �������� ����
                initFallbackTabs();
            }
        } else {
            // IE11�̰ų� Swiper�� ���� ��� �⺻ �� �������� ����
            initFallbackTabs();
        }

        return tabSwiper;
    })();

    /**
     * IE11 ���� �Լ�
     */
    function isIE11() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ');
        var msie11 = ua.indexOf('Trident/');
        return (msie > 0 || msie11 > 0);
    }

    /**
     * Swiper ��� �⺻ �� �������� ����
     */
    function initFallbackTabs() {
        var $swiperContainer = $('.tabs.tab-area.swiper');
        if ($swiperContainer.length > 0) {
            var $tabList = $swiperContainer.find('.swiper-pager.tab-list');
            var $slides = $swiperContainer.find('.swiper-slide');
            
            // �⺻ �� ��Ÿ�� ����
            $tabList.find('li').each(function(index) {
                var $tab = $(this);
                var $slide = $slides.eq(index);
                
                // ù ��° �Ǹ� Ȱ��ȭ
                if (index === 0) {
                    $tab.addClass('swiper-pagination-bullet-active');
                    $slide.show();
                } else {
                    $slide.hide();
                }
                
                // �� Ŭ�� �̺�Ʈ
                $tab.on('click', function() {
                    $tabList.find('li').removeClass('swiper-pagination-bullet-active');
                    $tab.addClass('swiper-pagination-bullet-active');
                    $slides.hide();
                    $slide.show();
                });
            });
        }
    }

     /**
     * ����� select�� PC �� ����ȭ
     */
    var $mobileSelect = $('.tab-select-mobile select');
    if ($mobileSelect.length) {
        $mobileSelect.on('change', function() {
            var selectedValue = $(this).val();
            var $tabContainer = $(this).closest('.jsTab');
            var $targetTab = $tabContainer.find('.tab-item[data-tab="' + selectedValue + '"]');
            if ($targetTab.length) {
                Tabs.switchTab($targetTab, $tabContainer);
            }
        });
    }

    /**
     * ��ũ�� ������ ���� ���� �ȳ�
     */
    function announceTabChange(tabName) {
        // ��ũ�� ���� ����ڿ��� �� ������ �ȳ�
        var announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = tabName + ' ���� ���õǾ����ϴ�.';
        
        document.body.appendChild(announcement);
        
        // ��� �� ����
        setTimeout(function() {
            document.body.removeChild(announcement);
        }, 1000);
    }

    /**
     * ������ǰ
     */
    const buttons = document.querySelectorAll('.anchor-list .btn-group button');
    const isMobile = () => window.innerWidth <= 768;

    // �ʱ� ���� ���� �Լ�
    function initPanels() {
        const activeButton = document.querySelector('.anchor-list .btn-group button.active');

        if (isMobile()) {
            // �����: ���� active �гθ� ǥ��
            $('.anchor-panel').hide();
            const targetButton = activeButton || buttons[0];
            if (targetButton) {
                $(targetButton.dataset.target).show();
                if (!activeButton) targetButton.classList.add('active');
            }
        } else {
            // PC: ��� �г� ǥ��
            $('.anchor-panel').show();
            if (!activeButton && buttons[0]) buttons[0].classList.add('active');
        }
    }

    // ������ �ε� �� �ʱ�ȭ
    initPanels();

    // ȭ�� ũ�� ���� �� ���ʱ�ȭ (debounce ����)
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(initPanels, 150);
    });

    // ��ư Ŭ�� �̺�Ʈ
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const targetId = this.dataset.target;
            
            // ��ư Ȱ��ȭ ���� ����
            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            if (isMobile()) {
                // �����: �г� ��ȯ
                e.preventDefault();
                $('.anchor-panel').hide();
                $(targetId).show();
            } else {
                // PC: ��� ���� ����Ͽ� ��Ŀ �̵�
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                const targetPosition = targetElement.offsetTop;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

});
