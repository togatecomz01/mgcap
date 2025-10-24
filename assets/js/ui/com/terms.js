$(document).ready(function () {
    /**
     * ��� ����
     */
    var TermsAgreement = (function () {
        var $chkAll, $reqChks, $optChks, $consChk, $consChks, $allChks, $submitBtn;

        return {
            // �ʱ�ȭ
            init: function () {
                $chkAll = $("#chkAll"); // ��ü ���� (�θ�)
                $reqChks = $(".chkReq"); // �ʼ� üũ
                $optChks = $(".chkOpt"); // ���� üũ
                $consChk = $("#chkCons"); // ������ ���� (�θ�)
                $consChks = $(".chkConsChild"); // ������ ���� üũ (SMS, �̸���, ��ȭ)
                $allChks = $(".chkReq, .chkOpt, #chkCons, .chkConsChild"); // ��ü üũ
                // $submitBtn = $('#submitBtn'); // ���� ��ư

                this.bindEvents();
            },

            // �̺�Ʈ
            bindEvents: function () {
                var self = this;

                // ��ü ���� (�θ�)
                $chkAll.on("change", function () {
                    self.toggleAll($(this).prop("checked"));
                });

                // ��ü üũ
                $allChks.on("change", function () {
                    // self.uptSubmitBtn();
                    self.uptAllChk();
                });

                // ������ ���� (�θ�)
                $consChk.on("change", function () {
                    var isChecked = $(this).prop("checked");
                    $consChks.prop("checked", isChecked);
                    self.uptAllChk();
                });

                // ������ ���� üũ
                $consChks.on("change", function () {
                    self.uptConsAllChk();
                    self.uptAllChk();
                });
            },

            toggleAll: function (isChecked) {
                $allChks.prop("checked", isChecked);
                // this.uptSubmitBtn();
                this.uptAllChk();
            },

            // ��ü ���� üũ ���� ������Ʈ (üũ ����)
            uptAllChk: function () {
                var allReqChked = $reqChks.length === $reqChks.filter(":checked").length; // �ʼ� üũ
                var allSelChked = $optChks.length === $optChks.filter(":checked").length; // ���� üũ
                var allConsChked = $consChks.length === $consChks.filter(":checked").length; // ������ ����
                var allChecked = $allChks.length === $allChks.filter(":checked").length; // ��ü üũ

                //  �ʼ� + ���� + ������ ���� ( ��ü üũ �� ��ü ���� üũ Ȱ��ȭ )
                if (allReqChked && allSelChked && allConsChked) {
                    $chkAll.prop("checked", true);
                } else {
                    $chkAll.prop("checked", false);
                }
            },

            // ������ ���� üũ (���� üũ �� �ϳ��� üũ ��)
            uptConsAllChk: function () {
                var anyConsChked = $consChks.filter(":checked").length > 0;
                $consChk.prop("checked", anyConsChked);
            },

            //��ư Ȱ��ȭ (�ʼ� üũ)
            // uptSubmitBtn: function () {
            //     var allReqChked = $reqChks.length === $reqChks.filter(':checked').length;
            //     $submitBtn.prop('disabled', !allReqChked);
            // }
        };
    })();

    TermsAgreement.init();

    // �� Ŭ�� �� üũ�ڽ� üũ/���� + �˾� ����
    $(document).on("click", "label.check-button[data-popup-open]", function (e) {
        e.preventDefault(); // üũ�ڽ� üũ/���� ����

        var popupId = $(this).data("popup-open");
        if (popupId && window.popupL) {
            window.popupL.openPopup(popupId);
        }
    });

    // onclick �Ӽ��� ���� label Ŭ�� �� �˾� ����
    $(document).on("click", "label.check-button[onclick]", function (e) {
        e.preventDefault(); // üũ�ڽ� üũ/���� ����
        
        var onclickAttr = $(this).attr("onclick");
        if (onclickAttr && typeof window[onclickAttr.split("(")[0]] === "function") {
            eval(onclickAttr);
        }
    });
});

$(function () {
    var BREAKPOINT = 768; // �����: <=768, PC: >768
    var mq = window.matchMedia("(max-width: " + BREAKPOINT + "px)");

    // ���� ��ҿ� ���� ���/����/����
    function backupIfNeeded($els) {
        $els.each(function () {
            var $el = $(this);
            if (!$el.attr("data-open-bak") && $el.is("[data-popup-open]")) {
                $el.attr("data-open-bak", $el.attr("data-popup-open")); // �� ���
            }
            if (!$el.attr("onclick-bak") && $el.attr("onclick")) {
                $el.attr("onclick-bak", $el.attr("onclick")); // onclick ���
            }
        });
    }
    
    function toMobile($scope) {
        var $els = ($scope || $(document)).find("label[data-open-bak], label[onclick-bak]");
        // ����� �ִ� �ֵ��� ��� ����
        $els.each(function () {
            var $el = $(this);
            if ($el.attr("data-open-bak")) {
                $el.attr("data-popup-open", $el.attr("data-open-bak"));
            }
            if ($el.attr("onclick-bak")) {
                $el.attr("onclick", $el.attr("onclick-bak"));
            }
        });
    }
    
    function toPC($scope) {
        var $els = ($scope || $(document)).find("label[data-popup-open], label[data-open-bak], label[onclick], label[onclick-bak]");
        // �켱 ���� ���� ��ҵ� ��� ����
        backupIfNeeded($els);
        // �׸��� data-popup-open�� onclick ����
        $els.filter("[data-popup-open]").removeAttr("data-popup-open");
        $els.filter("[onclick]").removeAttr("onclick");
    }

    // �ʱ� ���
    backupIfNeeded($("label[data-popup-open], label[onclick]"));

    // ��� ����
    function applyMode(isMobile, $scope) {
        if (isMobile) toMobile($scope);
        else toPC($scope);
    }

    // ���� 1ȸ
    applyMode(mq.matches);

    // �극��ũ����Ʈ ���� ����
    if (mq.addEventListener) {
        mq.addEventListener("change", function (e) {
            applyMode(e.matches);
        });
    } else if (mq.addListener) {
        // ���� ������
        mq.addListener(function (e) {
            applyMode(e.matches);
        });
    } else {
        // ����: resize�� ���� ����
        var lastMobile = mq.matches;
        $(window).on("resize", function () {
            var nowMobile = $(window).width() <= BREAKPOINT;
            if (nowMobile !== lastMobile) {
                lastMobile = nowMobile;
                applyMode(nowMobile);
            }
        });
    }

    // ���� �߰� ����
    if (window.MutationObserver) {
        var mo = new MutationObserver(function (muts) {
            muts.forEach(function (m) {
                var $added = $(m.addedNodes);
                if (!$added.length) return;
                var $scope = $(); // batch
                $added.each(function () {
                    $scope = $scope.add(this.nodeType === 1 ? this : []);
                });
                if ($scope.length) {
                    // ���� �߰��� label�� ���ؼ��� ��� ����
                    applyMode(mq.matches, $scope);
                }
            });
        });
        mo.observe(document.body, { childList: true, subtree: true });
    } else {
        // ����: �ֱ������� üũ
        setInterval(function () {
            applyMode(mq.matches);
        }, 500);
    }
});
