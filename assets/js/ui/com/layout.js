$(document).ready(function () {
    /*---------------------------------------------
        load, init
    ---------------------------------------------*/
    $(window).on("load", function () {
        if ($(".fullPopupOn .pop-con-wrap").length > 0) {
            // DOM ���� ���� ���� üũ�� �ڿ� �̺�Ʈ ���ε�
            headerPopupL.scrolling();
        }

        if ($(".contentWrap").length > 0) {
            sideToolsL.scrolling(); // �ʱ� ���� Ȯ��
        }

        if ($("#gnbFull").length > 0) {
            gnbFullL.init(); // ���ʿ��� DOM Ž���� ���̰� ���ܸ� ����
        }

        if ($("#gnb").length > 0) {
            gnbL.init(); // ���ʿ��� DOM Ž���� ���̰� ���ܸ� ����
        }

        if ($("#skipnavi").length > 0) {
            skipNaviL.init(); // init ���� ���� ���� ���� Ȯ��
        }

        console.log("[layout.js] �ʱ�ȭ �Ϸ�");
    });

    /*---------------------------------------------
        resize
    ---------------------------------------------*/
    $(window).on("resize", function () {
        if ($(".wrap .contentWrap").length > 0) {
            headerL.scrolling();
        }

        if ($(".fullPopupOn .pop-con-wrap").length > 0) {
            headerPopupL.scrolling();
        }

        // if ($('.wrap .contentWrap').length > 0) {
        //     sideToolsL.updatePosition();
        // }
    });
    /*---------------------------------------------
        GNB �޴� ���� ���
    ---------------------------------------------*/
    var gnbFullL = (function () {
        return {
            $gnbItem: null,

            // ���콺 ���� �Ǵ� ��Ŀ��
            mouseOverFocusIn: function () {
                this.$gnbItem.on("mouseenter focusin", function () {
                    var $this = $(this);

                    // �̹� ���������� �ٽ� ���� ���� (�ߺ� ����)
                    if (!$this.hasClass("on")) {
                        $this.addClass("on").siblings().removeClass("on");

                        $this.find(".menu-sub").hide().css("display", "flex").stop(true, true).slideDown(200);
                        $this.siblings().find(".menu-sub").stop(true, true).slideUp(200);
                    }
                });
            },

            // ���콺 ����
            mouseLeave: function () {
                this.$gnbItem.on("mouseleave", function () {
                    var $this = $(this);
                    $this.removeClass("on");
                    $this.find(".menu-sub").stop(true, true).slideUp(200);
                });
            },

            // �ܺ� ��Ŀ�� �̵� �� �޴� �ݱ�
            focusOutGnb: function () {
                $("body").on("focusin", function (e) {
                    if (!$(e.target).closest("#gnbFull").length) {
                        gnbFullL.$gnbItem.removeClass("on");
                        gnbFullL.$gnbItem.find(".menu-sub").stop(true, true).slideUp(200);
                    }
                });
            },

            // �ʱ�ȭ
            init: function () {
                this.$gnbItem = $("#gnbFull .menu-list .menu-item"); // DOM
                this.mouseOverFocusIn();
                this.mouseLeave();
                this.focusOutGnb();
            },
        };
    })();

    var gnbL = (function () {
        return {
            init: function () {
                this.bindDepthToggle(); // ���� ���� �̺�Ʈ
                this.bindMenuClick(); // 1���� �̺�Ʈ
                this.bindResize(); // �������� �̺�Ʈ
            },

            bindMenuClick: function () {
                $(document).on("click", "#gnb .menu-list .menu-item > a", function (e) {
                    e.preventDefault();
                    var $parent = $(this).parent();

                    if ($parent.hasClass("on")) {
                        $parent.removeClass("on");
                        $parent.find(".on").removeClass("on");
                    } else {
                        $parent.addClass("on").siblings(".menu-item").removeClass("on").find(".on").removeClass("on");
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
                    // GNB ���� �ʱ�ȭ �Ǵ� ����ε� �ʿ� �� ���
                    _this.resetGnb(); // ������
                });
            },

            resetGnb: function () {
                // ��� on Ŭ���� ���� �� �޴� �ʱ�ȭ
                $("#gnb .menu-item, #gnb li").removeClass("on");
                $("#gnb .menu-sub, #gnb .depth02, #gnb .depth03").removeAttr("style");
            },
        };
    })();

    /*---------------------------------------------
        Skip Navi ��Ŀ�� �̵� ���
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
                                $(".shortcut-area > .btn-wrap > a").first().focus(); // �ٷΰ��� ��ư�� ���� ��
                            } else {
                                $("#gotoContentArea").focus(); // fallback ��Ŀ��
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
            },
        };
    })();

    /**
     * header onŬ���� �߰�
     **/
    var headerL = (function () {
        var scrollY = 0;

        return {
            headerAni: function () {
                if (scrollY > 0) {
                    $(".headerOn:visible, .btmWrap:visible").addClass("on");
                } else {
                    $(".headerOn:visible, .btmWrap:visible").removeClass("on");
                }
            },
            // ��ũ�� ó��
            scrolling: function () {
                scrollY = $(".wrap .contentWrap").length > 0 ? $(".wrap .contentWrap").scrollTop() : 0; //.length �������� ������ ���� .scrollTop() ȣ���ؼ� ��ũ��Ʈ�� ���ߴ� ��Ȳ ����
                this.headerAni();
            },
        };
    })();

    //event
    if ($(".wrap .contentWrap").length > 0) {
        $(".wrap .contentWrap").on("scroll", function () {
            headerL.scrolling();
        });
    }

    /**
     * �˾� header on Ŭ���� �߰�
     **/
    var headerPopupL = (function () {
        var scrollY = 0;

        return {
            headerAni: function () {
                var headerOn = $(".fullPopupOn:visible .pop-header, .fullPopupOn:visible .pop-btm-wrap");
                if (scrollY > 0) {
                    headerOn.addClass("on");
                } else {
                    headerOn.removeClass("on");
                }
            },
            scrolling: function () {
                scrollY = $(".fullPopupOn .pop-con-wrap").length > 0 ? $(".fullPopupOn .pop-con-wrap").scrollTop() : 0;
                this.headerAni();
            },
        };
    })();

    // event
    if ($(".fullPopupOn .pop-con-wrap").length > 0) {
        $(".fullPopupOn .pop-con-wrap").on("scroll", function () {
            headerPopupL.scrolling();
        });
    }

    /**
     * ��ũ�� �� ��ư on Ŭ���� ����
     **/
    var sideToolsL = (function () {
        var isOn = false;

        return {
            scrolling: function () {
                if ($(".contentWrap").length === 0) return;

                var scrollTop = $(".contentWrap").scrollTop();
                console.log("#sideTools");

                if (scrollTop >= 200 && !isOn) {
                    $("#sideTools").addClass("on");
                    isOn = true;
                    console.log("scrolling: " + "down");
                } else if (scrollTop < 200 && isOn) {
                    $("#sideTools").removeClass("on");
                    isOn = false;
                    console.log("scrolling: " + "up");
                }

                // this.updatePosition();
            },

            // ��ũ�� �� ���� �̵�
            moveTop: function () {
                $(".contentWrap").animate({ scrollTop: 0 }, 300);
                console.log("moveTop: " + "scrollUp");
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

            plusMenu: function () {
                var $plusMenu = $("#sideTools .sideMenu ul");
                var $overlay = $(".overlay");

                $plusMenu.hide();
                $overlay.removeClass("on");

                $(document).on("click", "#sideTools .sideMenu > button", function (e) {
                    e.preventDefault();
                    var $thisUl = $(this).siblings("ul");
                    if ($thisUl.is(":visible")) {
                        $thisUl.stop(true, true).slideUp(200);
                        $overlay.removeClass("on");
                        $(".sideMenu").removeClass("on");
                        $("#sideTools").css({ "z-index": "9" });
                        $(".sideMenu > button").text("���޴� ����");
                    } else {
                        $thisUl.stop(true, true).slideDown(200);
                        $overlay.addClass("on");
                        $(".sideMenu").addClass("on");
                        $("#sideTools").css({ "z-index": "12" });
                        $(".sideMenu > button").text("���޴� �ݱ�");
                    }
                });
            },
        };
    })();

    if ($("#sideTools").length > 0) {
        // ��ũ�� �̺�Ʈ ���ε�
        if ($(".contentWrap").length > 0) {
            $(".contentWrap").on("scroll", function () {
                sideToolsL.scrolling();
            });
        }

        // TOP ��ư Ŭ�� �̺�Ʈ
        $(document).on("click", "#sideTools .scrollUpBtn", function () {
            sideToolsL.moveTop();
        });

        // ��ġ �� �޴� �ʱ� ����
        // sideToolsL.updatePosition();
        sideToolsL.plusMenu();
    }

    // $(window).on('resize', function () {
    //     sideToolsL.updatePosition();
    // });
});
