$(document).ready(function(){
  /*---------------------------------------------
ready, load, init
  ---------------------------------------------*/
  $(document).ready(function(){
      iptFocusScrl();
      fileUploader.init();
      initClearable(); // Ŭ���� ��ư �ʱ�ȭ
  });

  /**
   * 3�ڸ� ������ �޸� ����
  **/
  var commaFormatter = (function () {
      return {
          format: function (input) {
              // unit Ŭ������ ������ �׳� ����
              if (!input.classList.contains('unit')) return;
  
              var value = input.value.replace(/[^0-9]/g, ''); // ���� �̿� ����
              value = value.replace(/,/g, ''); // ���� ',' ����
              value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 3�ڸ����� ',' �߰�
  
              input.value = value;
          }
      };
  })();
  // event
  $(document).on('keyup', 'input[inputmode=numeric]', function() {
      commaFormatter.format(this);
  });

   /*---------------------------
    �Է� Ŭ���� ��ư (����)
    - .ipt-clear ���� ������ �ڵ� ����
    - readonly ���(= ��ư ���� ���� ����)
  ---------------------------*/
  function ensureClear($input) {
    // ���� ����
    var $wrap = $input.closest('.ipt-clear');
    /*if (!$wrap.length) {
      $input.wrap('<span class="ipt-clear"></span>');
      $wrap = $input.parent();
    }*/

    // disabled�� ���� (readonly�� ���)
    var disabled = $input.prop('disabled');
    var hasVal = ($input.val() || '').trim() !== '' && !disabled;
    var $btn = $wrap.find('> .btn-clear');

    if (hasVal && !$btn.length) {
      $('<button type="button" class="btn-clear" aria-label="�Է� �����" title="�����">\xd7</button>')
        .appendTo($wrap)
        .on('click', function (e) {
          e.preventDefault();

          // 1) �ؽ�Ʈ �ʱ�ȭ
          $input.val('').removeClass('up').focus().trigger('input');

          // 2) ���� .ipt-file �����̳ʰ� �ִٸ� ����/�󺧵� �ʱ�ȭ
          var $box = $wrap.closest('.ipt-file');
          if ($box.length) {
            var $file  = $box.find('input[type="file"]').first();
            var $label = $box.find('.fileLabel').first();
            if ($file.length)  $file.val('').trigger('change'); // ���� ����/������ ����ȭ
            if ($label.length) $label.text('���ϼ���');
          }

          // 3) ��ư ����
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
      .on('keyup change propertychange', function () { ensureClear($(this)); }); // IE ����
    $input.data('clear-bound', true);
    ensureClear($input); // �ʱ� ���� �ݿ�
  }

  function initClearable(scope) {
    (scope || $(document)).find('input[type="text"]').each(function () {
      bindClearOnce($(this));
    });
  }


  /**
   * ���� ���ε�
   */
  var fileUploader = (function () {
      return {
          init: function () {
              // �� .ipt-file �����̳ʸ� ���������� ó��
              $('.ipt-file').each(function() {
                  var $container = $(this);
                  var $uploadButton = $container.find('.uploadButton');
                  var $fileInput = $container.find('input[type="file"]');
                  var $fileLabel = $container.find('.fileLabel');
                  
                  // ���� ���� ��ư Ŭ��
                  $uploadButton.on('click', function () {
                      $fileInput.trigger('click');
                  });
                  
                  // Ű���� ���ټ�
                  $uploadButton.on('keydown', function (e) {
                      if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          $fileInput.trigger('click');
                      }
                  });
                  
                  // ���� ���� �� ���ϸ� ǥ�� �� �̹��� �̸�����
                  $fileInput.on('change', function () {
                      var file = this.files[0];
                      var fileName = file ? file.name : '';
                      
                      // ���� �����̳��� ���̺� ������Ʈ
                      $fileLabel.text(fileName);
                      
                      // �̹��� �̸����� (ù ��° .img-photo��)
                      var $imgPhoto = $('.img-photo').first();
                      if ($fileInput.attr('id') === 'files' && file && file.type.startsWith('image/')) {
                        var reader = new FileReader();
                        reader.onload = function(e) {
                          $imgPhoto.html('<img src="' + e.target.result + '" alt="���ε�� �̹���" style="max-width: 103px; max-height: 132px;">');
                        };
                        reader.readAsDataURL(file);
                      } else if ($fileInput.attr('id') === 'files') {
                        $imgPhoto.empty();
                      }
                      
                      // ���� ���ε� �� Ŭ���� ��ư ����
                      if (fileName) {
                        // ���� Ŭ���� ��ư ����
                        $fileLabel.find('.btn-clear').remove();
                        
                        // Ŭ���� ��ư ����
                        $('<button type="button" class="btn-clear" aria-label="�Է� �����" title="�����">��</button>')
                          .appendTo($fileLabel)
                          .on('click', function (e) {
                            e.preventDefault();
                            
                            // ���� �ʱ�ȭ (���� �����̳ʸ�)
                            $fileInput.val('');
                            $fileLabel.text('');
                            
                            // ù ��° ���� input�̸� �̹��� �̸����⵵ ����
                            if ($fileInput.attr('id') === 'files') {
                              $imgPhoto.empty();
                            }
                            
                            // ��ư ����
                            $(this).remove();
                          });
                      }
                  });
              });
          }
      };
  })();

    /**
     * Android ��ǲ ��Ŀ�� ��ũ�� �̽�
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