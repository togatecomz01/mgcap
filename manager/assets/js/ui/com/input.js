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
      입력 클리어 버튼 (공용)
      - .ipt-clear 래퍼 없으면 자동 생성
      - readonly 허용(= 버튼 생성 막지 않음)
    ---------------------------*/
    function ensureClear($input) {
      // 래퍼 보장
      var $wrap = $input.closest('.ipt-clear');
      /*if (!$wrap.length) {
        $input.wrap('<span class="ipt-clear"></span>');
        $wrap = $input.parent();
      }*/
  
      // disabled만 막음 (readonly는 허용)
      var disabled = $input.prop('disabled');
      var hasVal = ($input.val() || '').trim() !== '' && !disabled;
      var $btn = $wrap.find('> .btn-clear');
  
      if (hasVal && !$btn.length) {
        $('<button type="button" class="btn-clear" aria-label="입력 지우기" title="지우기">\xd7</button>')
          .appendTo($wrap)
          .on('click', function (e) {
            e.preventDefault();
  
            // 1) 텍스트 초기화
            $input.val('').removeClass('up').focus().trigger('input');
  
            // 2) 같은 .ipt-file 컨테이너가 있다면 파일/라벨도 초기화
            var $box = $wrap.closest('.ipt-file');
            if ($box.length) {
              var $file  = $box.find('input[type="file"]').first();
              var $label = $box.find('.fileLabel').first();
              if ($file.length)  $file.val('').trigger('change'); // 내부 상태/리스너 동기화
              if ($label.length) $label.text('파일선택');
            }
  
            // 3) 버튼 제거
            $(this).remove();
          });
      } else if (!hasVal && $btn.length) {
        $btn.remove();
      }
    }
  
    function bindClearOnce($input) {
      if ($input.data('clear-bound')) return;
      $input
        .on('input', function () { ensureClear($(this)); })
        .on('keyup change propertychange', function () { ensureClear($(this)); }); // IE 대응
      $input.data('clear-bound', true);
      ensureClear($input); // 초기 상태 반영
    }
  
    function initClearable(scope) {
      (scope || $(document)).find('input[type="text"]').each(function () {
        bindClearOnce($(this));
      });
    }
  
    /*---------------------------
      파일 업로더 (컨테이너별 바인딩)
      - .ipt-file 내부 요소만 참조 → 다중 업로더 OK
    ---------------------------*/
    function initFileUploader() {
      $('.ipt-file').each(function () {
        var $box   = $(this);
        var $text  = $box.find('.uploadInput').first();       // 파일명 표시용(대개 readonly)
        var $file  = $box.find('input[type="file"]').first(); // 실제 파일 인풋
        var $label = $box.find('.fileLabel').first();         // SR용 라벨
  
        // (선택) 텍스트 클릭 시 파일 선택 열기
        if ($text.length && $file.length) {
          $text.off('click.file').on('click.file', function () {
            $file.trigger('click');
          });
        }
  
        // 파일 선택 → 텍스트/라벨 갱신 + 클리어 버튼 반영
        $box.off('change.file').on('change.file', 'input[type="file"]', function () {
          var name = (this.files && this.files.length) ? this.files[0].name : '';
          if ($text.length) {
            $text.val(name)[name ? 'addClass' : 'removeClass']('up').trigger('input'); // ensureClear 호출 유도
          }
          if ($label.length) {
            $label.text(name ? ('선택된 파일: ' + name) : '파일선택');
          }
        });
  
        // 이 텍스트 인풋도 클리어 가능하도록 바인딩
        if ($text.length) bindClearOnce($text);
      });
    }
  
    /*---------------------------
      체크 전체해제
    ---------------------------*/
    function uncheck() {
        var $chkAllLabel = $('label[for="chkAll"]');
        var $chkAll = $('#chkAll');
        var $thCheck = $('tbody td input[type="checkbox"]');

      if (!$chkAllLabel.length) {
          console.log('전체 해제가 없습니다');
          return;
      }

      $chkAllLabel.off('click').on('click', function(e) {
        e.preventDefault();

        // 전체해제 체크박스 해제
        $chkAll.prop('checked', false);

        // 모든 행 체크박스 해제
        $thCheck.prop('checked', false);
      });
    }
    /*---------------------------
      DOM Ready
    ---------------------------*/
    $(function () {
      iptFocusScrl();
  
      // 숫자 인풋 3자리 콤마
      $(document).on('input', 'input[inputmode=numeric]', function () {
        commaFormatter.format(this);
      });
  
      // 업로더/클리어 초기화
      initFileUploader();
      initClearable();

      // 체크박스 전체해제 초기화
      uncheck();
  
      // 동적 추가 대응
      $(document).on('focusin', 'input[type="text"]', function () {
        bindClearOnce($(this));
      });
    });
  
  })(jQuery);
  