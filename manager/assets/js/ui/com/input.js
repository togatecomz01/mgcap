(function ($) {

    /*---------------------------
      Android ��ǲ ��Ŀ�� ��ũ��
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
      3�ڸ� �޸� ����
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
      ���� ���δ�
    ---------------------------*/
    var fileUploader = (function () {
      return {
        init: function () {
          var $uploadInput = $('.uploadInput'); // �ؽ�Ʈ �ڽ�(�б�����)
          var $fileInput = $('#files');
          var $btnPick = $('#btnPick');
          var $fileLabel = $('.fileLabel');
  
          function openPicker(e) {
            if (e && e.preventDefault) e.preventDefault();
            if ($fileInput && $fileInput.length) $fileInput.trigger('click');
          }
  
          // ���� ��ư�� ���� ��츸 ���ε�
          if ($btnPick && $btnPick.length) {
            $btnPick.on('click', openPicker);
            $btnPick.on('keydown', function (e) {
              var k = e.key || e.keyCode;
              if (k === 'Enter' || k === 13 || k === ' ' || k === 32) openPicker(e);
            });
          }
  
          // ���� ���� �� ���Ͻ� �ؽ�Ʈ�� ���ϸ�, �� ����, Ŭ���� ��ư ����
          $fileInput.on('change', function () {
            var name = (this.files && this.files.length) ? this.files[0].name : '';
            $uploadInput.val(name)[name ? 'addClass' : 'removeClass']('up').trigger('input');
            if ($fileLabel.length) {
              $fileLabel.text(name ? ('���õ� ����: ' + name) : '���ϼ���');
            }
          });
        }
      };
    })();
  
    /*---------------------------
      �Է� Ŭ���� ��ư
      - ���۰� ������ �ڵ����� ����
      - �� ���� ���� ��ư ����
    ---------------------------*/
    function refreshClearBtn($input) {
      var $wrap = $input.closest('.ipt-clear');
      if ($wrap.length === 0) {
        // ���� �ڵ� ���� (�ּ� ��å �ݿ�)
        $input.wrap('<span class="ipt-clear"></span>');
        $wrap = $input.parent();
      }
  
      var disabled = $input.prop('disabled') || $input.prop('readonly');
      var hasVal = ($input.val() || '').trim() !== '';
      var $btn = $wrap.find('> .btn-clear');
  
      if (hasVal && !disabled) {
        if ($btn.length === 0) {
          $('<button type="button" class="btn-clear" aria-label="�Է� �����" title="�����">\xd7</button>')
            .appendTo($wrap)
            .on('click', function (e) {
              e.preventDefault();
  
              // 1) �ؽ�Ʈ �Է� �ʱ�ȭ
              var $text = $(this).siblings('input[type="text"]').first();
              $text.val('').removeClass('up').focus().trigger('input');
  
              // 2) ���� ���ε�� ����� ���: ���� ���� input �� �� �ʱ�ȭ
              var $fileBox = $(this).closest('.ipt-file');
              if ($fileBox.length) {
                var $fileInput = $fileBox.find('input[type="file"]').first();   // ��: #files
                var $fileLabel = $fileBox.find('.fileLabel').first();           // �ð� ���� ��
                if ($fileInput.length) {
                  $fileInput.val('').trigger('change'); // ���� ���� �ʱ�ȭ + ������ ����
                }
                if ($fileLabel.length) {
                  $fileLabel.text('���ϼ���');
                }
              }
  
              // 3) ��ư ����
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
        .on('keyup change propertychange', function () { refreshClearBtn($(this)); }); // IE ����
      $input.data('clear-bound', true);
      refreshClearBtn($input); // �ʱⰪ �ݿ�
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
  
      // ���� ��ǲ 3�ڸ� �޸�
      $(document).on('input', 'input[inputmode=numeric]', function () {
        commaFormatter.format(this);
      });
  
      // Ŭ���� ��ư: �ʱ�ȭ + ���� ��� ����
      initClearable();
      $(document).on('focusin', 'input[type="text"]', function () { bindOnce($(this)); });
    });
  
  })(jQuery);
  
  // ����Ʈ option ���󺯰� (���� ������)
  