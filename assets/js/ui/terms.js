$(document).ready(function(){

    /**
     * �빟愿� �룞�쓽
     */
    var TermsAgreement = (function () {

        var $chkAll, $reqChks, $optChks, $consChk, $consChks, $allChks, $submitBtn;

        return {
            // 珥덇린�솕
            init: function () {
                $chkAll = $('#chkAll'); // �쟾泥� �룞�쓽 (遺�紐�)
                $reqChks = $('.chkReq'); // �븘�닔 �빆紐�
                $optChks = $('.chkOpt'); // �꽑�깮 �빆紐�
                $consChk = $('#chkCons'); // �닔�떊 �룞�쓽 (遺�紐�)
                $consChks = $('.chkConsChild'); // �닔�떊 �룞�쓽 �빆紐� (SMS, �씠硫붿씪, 愿묎퀬�꽦)
                $allChks = $('.chkReq, .chkOpt, #chkCons, .chkConsChild'); // �쟾泥� �빆紐�
                // $submitBtn = $('#submitBtn'); // 媛��엯 踰꾪듉

                this.bindEvents();
            },

            // �씠踰ㅽ듃
            bindEvents: function () {

                var self = this;

                // �쟾泥� �룞�쓽 (遺�紐�)
                $chkAll.on('change', function () {
                    self.toggleAll($(this).prop('checked'));
                });

                // �쟾泥� �빆紐�
                $allChks.on('change', function () {
                    // self.uptSubmitBtn();
                    self.uptAllChk();
                });

                // �닔�떊 �룞�쓽 (遺�紐�)
                $consChk.on('change', function () {
                    var isChecked = $(this).prop('checked');
                    $consChks.prop('checked', isChecked);
                    self.uptAllChk();
                });

                // �닔�떊 �룞�쓽 �빆紐�
                $consChks.on('change', function () {
                    self.uptConsAllChk()
                    self.uptAllChk();
                });
            },

            toggleAll: function (isChecked) {
                $allChks.prop('checked', isChecked);
                // this.uptSubmitBtn();
                this.uptAllChk();
            },

            // �쟾泥� �룞�쓽 泥댄겕 �긽�깭 �뾽�뜲�씠�듃 (泥댄겕 �뿬遺�)
            uptAllChk: function () {
                var allReqChked = $reqChks.length === $reqChks.filter(':checked').length; // �븘�닔 �빆紐�
                var allSelChked = $optChks.length === $optChks.filter(':checked').length; // �꽑�깮 �빆紐�
                var allConsChked = $consChks.length === $consChks.filter(':checked').length; // �닔�떊 �룞�쓽
                var allChecked = $allChks.length === $allChks.filter(':checked').length; // 紐⑤뱺 �빆紐�

                 //  �븘�닔 + �꽑�깮 + �닔�떊 �룞�쓽 ( 紐⑤몢 泥댄겕 �떆 �쟾泥� �룞�쓽 泥댄겕 �솢�꽦�솕 )
                if (allReqChked && allSelChked && allConsChked) {
                    $chkAll.prop('checked', true);
                } else {
                    $chkAll.prop('checked', false);
                }
            },

            // �닔�떊 �룞�쓽 �빆紐� (�븯�쐞 �빆紐� 以� �븯�굹�씪�룄 �꽑�깮 �떆)
            uptConsAllChk: function () {
                var anyConsChked = $consChks.filter(':checked').length > 0;
                $consChk.prop('checked', anyConsChked);
            },

            //踰꾪듉 �솢�꽦�솕 (�븘�닔 �빆紐�)
            // uptSubmitBtn: function () {
            //     var allReqChked = $reqChks.length === $reqChks.filter(':checked').length;
            //     $submitBtn.prop('disabled', !allReqChked);
            // }
        };
    })();

    TermsAgreement.init();


});


$(function () {
    var BREAKPOINT = 768; // PC 기준 > 768px
  
    function removePopupAttrOnPC() {
      if (window.innerWidth > BREAKPOINT) {
        $('label[data-popup-open]').removeAttr('data-popup-open');
      }
    }
  
    // 1) 최초 로드 시
    removePopupAttrOnPC();
  
    // 2) 창 크기 변경 시 (디바운스)
    var resizeTimer = null;
    $(window).on('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(removePopupAttrOnPC, 150);
    });
  
    // 3) 동적으로 label이 추가되는 경우 대비
    var mo = new MutationObserver(function (mutations) {
      if (window.innerWidth <= BREAKPOINT) return; // 모바일이면 touch 안 함
      mutations.forEach(function (m) {
        // 추가된 노드 중 label[data-popup-open] 찾아서 제거
        var $added = $(m.addedNodes);
        if (!$added.length) return;
  
        // 자신이 label인 경우 + 자식들 중 label 모두 처리
        $added.filter('label[data-popup-open"]').removeAttr('data-popup-open');
        $added.find && $added.find('label[data-popup-open"]').removeAttr('data-popup-open');
      });
    });
  
    mo.observe(document.body, { childList: true, subtree: true });
  });
  
  