$(document).ready(function () {
    var TermsAgreement = (function () {
        var $termsPopup = $("#fullPopup"), // ?��?��
            $termsList = $(".terms-list-area li"), // ?���? 리스?��
            $chkAll = $("#chkAll"), // ?���? ?��?�� 체크박스
            $reqChks = $(".chkReq"), // ?��?�� ?���? 체크박스
            $termsBtn = $(".btn-secondary"), // "?��?��?��?��?��?��" 버튼
            $submitBtn = $("#submitBtn"), // ?���? 버튼
            $popupWrap = $(".pop-con-wrap"), // ?��?���? 감�???��
            currentIndex = 0;

        return {
            // 초기?��
            init: function () {
                this.bindEvents();
            },

            // ?��벤트 바인?��
            bindEvents: function () {
                var self = this;

                // ?���? ?���? ?�� ?��?�� ?���?
                $(".check-box.terms").on("click", function () {
                    self.openPopup("fullPopup");
                });

                // ?��?���? ?��벤트 감�??
                $popupWrap.on("scroll", function () {
                    self.checkScroll();
                });

                // "?��?��?��?��?��?��" 버튼 ?���? ?�� ?��?�� ?���??���? ?��?��
                $termsBtn.on("click", function () {
                    self.nextTerm();
                });

                // ?���? ?��?�� 체크박스 �?�? ?�� 모든 ?���? 체크
                $chkAll.on("change", function () {
                    self.toggleAll($(this).prop("checked"));
                });

                // 개별 체크박스 �?�? ?�� ?���? ?��?�� ?���? ?��?��?��?��
                $reqChks.on("change", function () {
                    self.updateAllCheck();
                });
            },

            // ?��?�� ?���? (popupL ?��?��)
            openPopup: function (id) {
                if (typeof popupL !== "undefined" && popupL.openPopup) {
                    popupL.openPopup(id);
                } else {
                    console.error("popupL?�� ?��?��?���? ?��?��");
                }
                this.showCurrentTerm();
            },

            // ?��?�� ?���? ?��?��
            showCurrentTerm: function () {
                if ($termsList.length === 0) {
                    console.error("?���? 리스?���? 존재?���? ?��?��?��?��.");
                    return;
                }

                // 모든 ?���? ?��기고, ?��?�� ?���?�? 보이�? ?��?��
                $termsList.hide();
                var $currentTerm = $termsList.eq(currentIndex);

                if ($currentTerm.length === 0) {
                    console.warn("?��못된 currentIndex:", currentIndex);
                    return;
                }

                $currentTerm.show();
                $popupWrap.scrollTop(0); // ?��?���? 초기?��
                $termsBtn.text("?��?��롤을 ?��까�?? ?��?��주세?��").prop("disabled", true);
            },

            // ?��?��롤이 ?��까�?? ?��?��갔는�? ?��?��
            checkScroll: function () {
                var scrollHeight = $popupWrap.prop("scrollHeight");
                var scrollTop = $popupWrap.scrollTop();
                var clientHeight = $popupWrap.outerHeight();

                if (scrollTop + clientHeight >= scrollHeight - 10) {
                    $termsBtn.text("?��?��?��?��?��?��").prop("disabled", false);
                }
            },

            // ?��?�� ?���??���? ?��?��
            nextTerm: function () {
                // ?��?�� ?���? 체크 처리
                $reqChks.eq(currentIndex).prop("checked", true);

                // ?��?�� ?���??���? ?��?��
                currentIndex++;

                if (currentIndex < $termsList.length) {
                    this.showCurrentTerm();
                } else {
                    this.closePopup("fullPopup");
                    this.updateAllCheck();
                }
            },

            // ?��?�� ?���?
            closePopup: function (id) {
                if (typeof popupL !== "undefined" && popupL.closePopup) {
                    popupL.closePopup(id);
                } else {
                    console.error("popupL?�� ?��?��?���? ?��?��");
                }
            },

            // ?���? ?��?�� 체크박스 ?��?�� ?��?��?��?��
            updateAllCheck: function () {
                var allChecked = $reqChks.length === $reqChks.filter(":checked").length;
                $chkAll.prop("checked", allChecked);
                $submitBtn.prop("disabled", !allChecked);
            },

            // ?���? ?��?�� ?��?��
            toggleAll: function (isChecked) {
                $reqChks.prop("checked", isChecked);
                this.updateAllCheck();
            }
        };
    })();

    TermsAgreement.init();
});
