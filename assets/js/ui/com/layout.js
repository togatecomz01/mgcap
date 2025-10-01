$(document).ready(function(){

    /*---------------------------------------------
        load, init
    ---------------------------------------------*/
    $(window).on("load", function () {
        if ($('.fullPopupOn .pop-con-wrap').length > 0) { // DOM ?? ?? ?? ??? ?? ??? ???
            headerPopupL.scrolling();
        }

        if ($('.contentWrap').length > 0) {
            sideToolsL.scrolling(); // ?? ?? ??
        }

        if ($('#gnbFull').length > 0) {
            gnbFullL.init();// ???? DOM ??? ??? ??? ??
        }

        if ($('#gnb').length > 0) {
            gnbL.init();// ???? DOM ??? ??? ??? ??
        }

        if ($('#skipnavi').length > 0) {
            skipNaviL.init();// init ?? ?? ?? ?? ??
        }

        console.log('[layout.js] ??? ??');
    });

    /*---------------------------------------------
        resize
    ---------------------------------------------*/
    $(window).on('resize', function () {
        if ($('.wrap .contentWrap').length > 0) {
            headerL.scrolling();
        }

        if ($('.fullPopupOn .pop-con-wrap').length > 0) {
            headerPopupL.scrolling();
        }

        // if ($('.wrap .contentWrap').length > 0) {
        //     sideToolsL.updatePosition();
        // }
    });
    /*---------------------------------------------
        GNB ?? ?? ??
    ---------------------------------------------*/
    var gnbFullL = (function () {

        return {
            $gnbItem: null,

            // ??? ?? ?? ???
            mouseOverFocusIn: function () {
                this.$gnbItem.on("mouseenter focusin", function () {
                    var $this = $(this);
    
                    // ?? ????? ?? ?? ?? (?? ??)
                    if (!$this.hasClass("on")) {
                        $this.addClass("on").siblings().removeClass("on");
    
                        $this.find(".menu-sub").hide().css("display", "flex").stop(true, true).slideDown(200);
                        $this.siblings().find(".menu-sub").stop(true, true).slideUp(200);
                    }
                });
            },

            // ??? ??
            mouseLeave: function () {
                this.$gnbItem.on("mouseleave", function () {
                    var $this = $(this);
                    $this.removeClass("on");
                    $this.find(".menu-sub").stop(true, true).slideUp(200);
                });
            },

            // ?? ??? ?? ? ?? ??
            focusOutGnb: function () {
                $("body").on("focusin", function (e) {
                    if (!$(e.target).closest("#gnbFull").length) {
                        gnbFullL.$gnbItem.removeClass("on");
                        gnbFullL.$gnbItem.find(".menu-sub").stop(true, true).slideUp(200);
                    }
                });
            },

            // ???
            init: function () {
                this.$gnbItem = $("#gnbFull .menu-list .menu-item"); // DOM
                this.mouseOverFocusIn();
                this.mouseLeave();
                this.focusOutGnb();
            }
        };
    })();


    var gnbL = (function () {
        return {
            init: function () {
                this.bindDepthToggle(); // ?? ?? ???
                this.bindMenuClick();   // 1?? ???
                this.bindResize();      // ???? ???
            },
    
            bindMenuClick: function () {
                $(document).on("click", "#gnb .menu-list .menu-item > a", function (e) {
                    e.preventDefault();
                    var $parent = $(this).parent();
    
                    if ($parent.hasClass("on")) {
                        $parent.removeClass("on");
                        $parent.find(".on").removeClass("on");
                    } else {
                        $parent.addClass("on")
                            .siblings(".menu-item")
                            .removeClass("on")
                            .find(".on").removeClass("on");
                    }
                });
            },
    
            bindDepthToggle: function () {
                $(document).on("click", "#gnb .depth-con ul > li > a", function (e) {
                    var $this = $(this);
                    var $parentLi = $this.parent();
                    var $nextDepth = $parentLi.children("div, ul").not("a");
    
                    if (!$nextDepth.length) return;
                    e.preventDefault();
    
                    $parentLi.toggleClass("on");
                    $parentLi.siblings("li").removeClass("on").find("li").removeClass("on");
                    $parentLi.siblings("li").find("div, ul").removeClass("on");
                });
            },
    
            bindResize: function () {
                var _this = this;
    
                $(window).on("resize", function () {
                    // GNB ?? ??? ?? ???? ?? ? ??
                    _this.resetGnb(); // ???
                });
            },
    
            resetGnb: function () {
                // ?? on ??? ?? ? ?? ???
                $("#gnb .menu-item, #gnb li").removeClass("on");
                $("#gnb .menu-sub, #gnb .depth02, #gnb .depth03").removeAttr("style");
            }
        };
    })();
    

    /*---------------------------------------------
        Skip Navi ??? ?? ??
    ---------------------------------------------*/
    var skipNaviL = (function () {
        return {
            moveFocus: function () {
                $("#skipnavi a").on("keydown", function (e) {
                    if (e.keyCode === 13) {
                        if (this.id === "gotoContentArea") {
                            location.href = "#gotoContentArea";

                            $("#gotoContentArea").attr("tabindex", "-1");

                            const homeLink = $(".home > a");
                            if (homeLink.length > 0) {
                                homeLink.focus();
                            } else if ($(".shortcut-area > .btn-wrap > a").length > 0) {
                                $(".shortcut-area > .btn-wrap > a").first().focus(); // ???? ??? ?? ?
                            } else {
                                $("#gotoContentArea").focus(); // fallback ???
                            }
                                
                        } else if (this.id === "gnbFull") {
                            location.href = "#gnbFull";
                            $(".menu-list .menu-item > a").first().focus();
                        }
                    }
                });
            },

            init: function () {
                this.moveFocus();
            }
        };
    })();

    
    /**
     * header on??? ??
    **/
    var headerL = (function() {

        var scrollY = 0;

        return {
            headerAni: function() {
                if (scrollY > 0) {
                    $('.headerOn:visible, .btmWrap:visible').addClass('on');
                    
                } else {
                    $('.headerOn:visible, .btmWrap:visible').removeClass('on');
                }
            },
            // ??? ??
            scrolling: function () {
                scrollY = $('.wrap .contentWrap').length > 0 ? $('.wrap .contentWrap').scrollTop() : 0; //.length ???? ??? ?? .scrollTop() ???? ????? ??? ?? ??
                this.headerAni();
            }
        };
    })();

    //event
    if ($('.wrap .contentWrap').length > 0) {
        $('.wrap .contentWrap').on('scroll', function () {
            headerL.scrolling();
        });
    }

    /**
     * ?? header on ??? ??
     **/
    var headerPopupL = (function() {

        var scrollY = 0;

        return {
            headerAni: function() {
                var headerOn = $('.fullPopupOn:visible .pop-header, .fullPopupOn:visible .pop-btm-wrap');
                if (scrollY > 0) {
                    headerOn.addClass('on');
                } else {
                    headerOn.removeClass('on');
                }
            },
            scrolling: function () {
                scrollY = $('.fullPopupOn .pop-con-wrap').length > 0 ? $('.fullPopupOn .pop-con-wrap').scrollTop() : 0;
                this.headerAni();
            }
        };
    })();

    // event
    if ($('.fullPopupOn .pop-con-wrap').length > 0) {
        $('.fullPopupOn .pop-con-wrap').on('scroll', function () {
            headerPopupL.scrolling();
        });
    }

    /**
     * ??? ? ?? on ??? ??
     **/
    var sideToolsL = (function() {

        var isOn = false;

        return {

            scrolling: function () {
                if ($('.contentWrap').length === 0) return;

                var scrollTop = $('.contentWrap').scrollTop();
                console.log('#sideTools');
                
                if (scrollTop >= 200 && !isOn) {
                    $('#sideTools').addClass('on');
                    isOn = true;
                    console.log('scrolling: ' + 'down');

                } else if (scrollTop < 200 && isOn) {
                    $('#sideTools').removeClass('on');
                    isOn = false;
                    console.log('scrolling: ' + 'up');
                }

                // this.updatePosition();
            },

            // ??? ? ?? ??
            moveTop: function () {
                $('.contentWrap').animate({ scrollTop: 0 }, 300);
                console.log('moveTop: ' + 'scrollUp');
            },

            // updatePosition: function () {

            //     var $sideTools = $('#sideTools');
            //     var $btmCont = $('.btmCont');
            //     var contentScrollTop = $('.contentWrap').scrollTop();
            
            //     if ($btmCont.length === 0 || $btmCont.outerHeight() === 0) {
            //         $sideTools.css({
            //             position: 'absolute',
            //             bottom: '30px'
            //         });
            //         return;
            //     }
            
            //     var btmHeight = $btmCont.outerHeight();
            
            //     if (contentScrollTop >= btmHeight) {
            //         $sideTools.css({
            //             position: 'fixed',
            //             bottom: (btmHeight + 30) + 'px'
            //         });
            //     } else {
            //         $sideTools.css({
            //             position: 'absolute',
            //             bottom: '30px'
            //         });
            //     }
            // },

            plusMenu: function(){
                var $plusMenu = $('#sideTools .sideMenu ul');
                var $overlay = $('.overlay')

                $plusMenu.hide();
                $overlay.removeClass('on');

                $(document).on('click', '#sideTools .sideMenu > button', function(e) {
                    e.preventDefault();
                    var $thisUl = $(this).siblings('ul');
                    if ($thisUl.is(':visible')) {
                        $thisUl.stop(true, true).slideUp(200);
                        $overlay.removeClass('on');
                        $('.sideMenu').removeClass('on');
                        $('#sideTools').css({'z-index' : '9'});
                        $('.sideMenu > button').text('??? ??');
                        
                    } else {
                        $thisUl.stop(true, true).slideDown(200);
                        $overlay.addClass('on');
                        $('.sideMenu').addClass('on');
                        $('#sideTools').css({'z-index' : '12'});
                        $('.sideMenu > button').text('??? ??');
                    }
                });
            }
        };
    })();

    if ($('#sideTools').length > 0) {
        // ??? ??? ???
        if ($('.contentWrap').length > 0) {
            $('.contentWrap').on('scroll', function () {
                sideToolsL.scrolling();
            });
        }

        // TOP ?? ?? ???
        $(document).on('click', '#sideTools .scrollUpBtn', function () {
            sideToolsL.moveTop();
        });

        // ?? ? ?? ?? ??
        // sideToolsL.updatePosition();
        sideToolsL.plusMenu();

    }

    // $(window).on('resize', function () {
    //     sideToolsL.updatePosition();
    // });

});