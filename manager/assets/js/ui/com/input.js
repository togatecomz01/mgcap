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
  
    /*---------------------------
      ���� ���δ� (�����̳ʺ� ���ε�)
      - .ipt-file ���� ��Ҹ� ���� �� ���� ���δ� OK
    ---------------------------*/
    function initFileUploader() {
      $('.ipt-file').each(function () {
        var $box   = $(this);
        var $text  = $box.find('.uploadInput').first();       // ���ϸ� ǥ�ÿ�(�밳 readonly)
        var $file  = $box.find('input[type="file"]').first(); // ���� ���� ��ǲ
        var $label = $box.find('.fileLabel').first();         // SR�� ��
  
        // (����) �ؽ�Ʈ Ŭ�� �� ���� ���� ����
        if ($text.length && $file.length) {
          $text.off('click.file').on('click.file', function () {
            $file.trigger('click');
          });
        }
  
        // ���� ���� �� �ؽ�Ʈ/�� ���� + Ŭ���� ��ư �ݿ�
        $box.off('change.file').on('change.file', 'input[type="file"]', function () {
          var name = (this.files && this.files.length) ? this.files[0].name : '';
          if ($text.length) {
            $text.val(name)[name ? 'addClass' : 'removeClass']('up').trigger('input'); // ensureClear ȣ�� ����
          }
          if ($label.length) {
            $label.text(name ? ('���õ� ����: ' + name) : '���ϼ���');
          }
        });
  
        // �� �ؽ�Ʈ ��ǲ�� Ŭ���� �����ϵ��� ���ε�
        if ($text.length) bindClearOnce($text);
      });
    }
  
    /*---------------------------
      üũ ��ü����
    ---------------------------*/
    function uncheck() {
        var $chkAllLabel = $('label[for="chkAll"]');
        var $chkAll = $('#chkAll');
        var $thCheck = $('tbody td input[type="checkbox"]');

      if (!$chkAllLabel.length) {
          console.log('��ü ������ �����ϴ�');
          return;
      }

      $chkAllLabel.off('click').on('click', function(e) {
        e.preventDefault();

        // ��ü���� üũ�ڽ� ����
        $chkAll.prop('checked', false);

        // ��� �� üũ�ڽ� ����
        $thCheck.prop('checked', false);
      });
    }
    /*---------------------------
      DOM Ready
    ---------------------------*/
    $(function () {
      iptFocusScrl();
  
      // ���� ��ǲ 3�ڸ� �޸�
      $(document).on('input', 'input[inputmode=numeric]', function () {
        commaFormatter.format(this);
      });
  
      // ���δ�/Ŭ���� �ʱ�ȭ
      initFileUploader();
      initClearable();

      // üũ�ڽ� ��ü���� �ʱ�ȭ
      uncheck();
  
      // ���� �߰� ����
      $(document).on('focusin', 'input[type="text"]', function () {
        bindClearOnce($(this));
      });
    });
  
  })(jQuery);
  