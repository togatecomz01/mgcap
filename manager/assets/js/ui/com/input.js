(function ($) {

    /*---------------------------
      Android 인풋 포커스 스크롤
    ---------------------------*/
    function iptFocusScrl() {
      if (/Android/i.test(navigator.userAgent)) {
        window.addEventListener('resize', function () {
          var el = document.activeElement;
          if (el && el.tagName === 'INPUT') {
            window.setTimeout(function () {
              el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 0);
          }
        });
      }
    }
  
    /*---------------------------
      3자리 콤마 포맷
    ---------------------------*/
    var commaFormatter = (function () {
      function format(input) {
        var v = (input.value || '').replace(/[^0-9]/g, '');
        v = v.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        input.value = v;
      }
      return { format: format };
    })();
  
    /*---------------------------
      파일 업로더
    ---------------------------*/
    var fileUploader = (function () {
      return {
        init: function () {
          var $uploadInput = $('.uploadInput'); // 텍스트 박스(읽기전용)
          var $fileInput = $('#files');
          var $btnPick = $('#btnPick');
          var $fileLabel = $('.fileLabel');
  
          function openPicker(e) {
            if (e && e.preventDefault) e.preventDefault();
            if ($fileInput && $fileInput.length) $fileInput.trigger('click');
          }
  
          // 선택 버튼이 있을 경우만 바인딩
          if ($btnPick && $btnPick.length) {
            $btnPick.on('click', openPicker);
            $btnPick.on('keydown', function (e) {
              var k = e.key || e.keyCode;
              if (k === 'Enter' || k === 13 || k === ' ' || k === 32) openPicker(e);
            });
          }
  
          // 파일 선택 → 프록시 텍스트에 파일명, 라벨 갱신, 클리어 버튼 갱신
          $fileInput.on('change', function () {
            var name = (this.files && this.files.length) ? this.files[0].name : '';
            $uploadInput.val(name)[name ? 'addClass' : 'removeClass']('up').trigger('input');
            if ($fileLabel.length) {
              $fileLabel.text(name ? ('선택된 파일: ' + name) : '파일선택');
            }
          });
        }
      };
    })();
  
    /*---------------------------
      입력 클리어 버튼
      - 래퍼가 없으면 자동으로 감쌈
      - 값 있을 때만 버튼 생성
    ---------------------------*/
    function refreshClearBtn($input) {
      var $wrap = $input.closest('.ipt-clear');
      if ($wrap.length === 0) {
        // 래퍼 자동 생성 (주석 정책 반영)
        $input.wrap('<span class="ipt-clear"></span>');
        $wrap = $input.parent();
      }
  
      var disabled = $input.prop('disabled') || $input.prop('readonly');
      var hasVal = ($input.val() || '').trim() !== '';
      var $btn = $wrap.find('> .btn-clear');
  
      if (hasVal && !disabled) {
        if ($btn.length === 0) {
          $('<button type="button" class="btn-clear" aria-label="입력 지우기" title="지우기">\xd7</button>')
            .appendTo($wrap)
            .on('click', function (e) {
              e.preventDefault();
  
              // 1) 텍스트 입력 초기화
              var $text = $(this).siblings('input[type="text"]').first();
              $text.val('').removeClass('up').focus().trigger('input');
  
              // 2) 파일 업로드와 연결된 경우: 실제 파일 input 및 라벨 초기화
              var $fileBox = $(this).closest('.ipt-file');
              if ($fileBox.length) {
                var $fileInput = $fileBox.find('input[type="file"]').first();   // 예: #files
                var $fileLabel = $fileBox.find('.fileLabel').first();           // 시각 숨김 라벨
                if ($fileInput.length) {
                  $fileInput.val('').trigger('change'); // 내부 상태 초기화 + 리스너 통지
                }
                if ($fileLabel.length) {
                  $fileLabel.text('파일선택');
                }
              }
  
              // 3) 버튼 제거
              $(this).remove();
            });
        }
      } else {
        $btn.remove();
      }
    }
  
    function bindOnce($input) {
      if ($input.data('clear-bound')) return;
      $input
        .on('input', function () { refreshClearBtn($(this)); })
        .on('keyup change propertychange', function () { refreshClearBtn($(this)); }); // IE 대응
      $input.data('clear-bound', true);
      refreshClearBtn($input); // 초기값 반영
    }
  
    function initClearable() {
      $('input[type="text"]').each(function () { bindOnce($(this)); });
    }
  
    /*---------------------------
      DOM Ready
    ---------------------------*/
    $(function () {
      iptFocusScrl();
      fileUploader.init();
  
      // 숫자 인풋 3자리 콤마
      $(document).on('input', 'input[inputmode=numeric]', function () {
        commaFormatter.format(this);
      });
  
      // 클리어 버튼: 초기화 + 동적 요소 대응
      initClearable();
      $(document).on('focusin', 'input[type="text"]', function () { bindOnce($(this)); });
    });
  
  })(jQuery);
  
  // 셀렉트 option 색상변경 (별도 구현부)
  