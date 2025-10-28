$(document).ready(function(){
  /*---------------------------------------------
ready, load, init
  ---------------------------------------------*/
  $(document).ready(function(){
      iptFocusScrl();
      fileUploader.init();
      initClearable(); // 클리어 버튼 초기화
  });

  /**
   * 3자리 수마다 콤마 적용
  **/
  var commaFormatter = (function () {
      return {
          format: function (input) {
              // unit 클래스가 없으면 그냥 종료
              if (!input.classList.contains('unit')) return;
  
              var value = input.value.replace(/[^0-9]/g, ''); // 숫자 이외 제거
              value = value.replace(/,/g, ''); // 기존 ',' 제거
              value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 3자리마다 ',' 추가
  
              input.value = value;
          }
      };
  })();
  // event
  $(document).on('keyup', 'input[inputmode=numeric]', function() {
      commaFormatter.format(this);
  });

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


  /**
   * 파일 업로드
   */
  var fileUploader = (function () {
      return {
          init: function () {
              // 각 .ipt-file 컨테이너를 개별적으로 처리
              $('.ipt-file').each(function() {
                  var $container = $(this);
                  var $uploadButton = $container.find('.uploadButton');
                  var $fileInput = $container.find('input[type="file"]');
                  var $fileLabel = $container.find('.fileLabel');
                  
                  // 파일 선택 버튼 클릭
                  $uploadButton.on('click', function () {
                      $fileInput.trigger('click');
                  });
                  
                  // 키보드 접근성
                  $uploadButton.on('keydown', function (e) {
                      if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          $fileInput.trigger('click');
                      }
                  });
                  
                  // 파일 선택 시 파일명 표시 및 이미지 미리보기
                  $fileInput.on('change', function () {
                      var file = this.files[0];
                      var fileName = file ? file.name : '';
                      
                      // 현재 컨테이너의 레이블만 업데이트
                      $fileLabel.text(fileName);
                      
                      // 이미지 미리보기 (첫 번째 .img-photo만)
                      var $imgPhoto = $('.img-photo').first();
                      if ($fileInput.attr('id') === 'files' && file && file.type.startsWith('image/')) {
                        var reader = new FileReader();
                        reader.onload = function(e) {
                          $imgPhoto.html('<img src="' + e.target.result + '" alt="업로드된 이미지" style="max-width: 103px; max-height: 132px;">');
                        };
                        reader.readAsDataURL(file);
                      } else if ($fileInput.attr('id') === 'files') {
                        $imgPhoto.empty();
                      }
                      
                      // 파일 업로드 후 클리어 버튼 생성
                      if (fileName) {
                        // 기존 클리어 버튼 제거
                        $fileLabel.find('.btn-clear').remove();
                        
                        // 클리어 버튼 생성
                        $('<button type="button" class="btn-clear" aria-label="입력 지우기" title="지우기">×</button>')
                          .appendTo($fileLabel)
                          .on('click', function (e) {
                            e.preventDefault();
                            
                            // 파일 초기화 (현재 컨테이너만)
                            $fileInput.val('');
                            $fileLabel.text('');
                            
                            // 첫 번째 파일 input이면 이미지 미리보기도 제거
                            if ($fileInput.attr('id') === 'files') {
                              $imgPhoto.empty();
                            }
                            
                            // 버튼 제거
                            $(this).remove();
                          });
                      }
                  });
              });
          }
      };
  })();

    /**
     * Android 인풋 포커스 스크롤 이슈
    **/
    function iptFocusScrl() {
        if(/Android/i.test(navigator.userAgent) ) {
            window.addEventListener("resize", function(){
                if( document.activeElement.tagName=="INPUT" ){
                    window.setTimeout(function(){
                        document.activeElement.scrollIntoView({ behavior: "smooth", block: "center" });
                    },0);
                }
            });
        }
    }

});