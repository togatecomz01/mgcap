"use strict";

// ===============================
// ����/�̸����� ��ũ��Ʈ (scrollTop 0 ����)
// - ���� ��ȯ �� �׻� ������ ������� ��ũ��
// - �̸�����: ��ü ��ħ + readonly/disabled + ���ܹ� ����
// - ����/üũ�ڽ�: 'üũ �� �� ��'�� disabled (���� ����)
// ===============================
$(function () {
  var HEADER_H = 0;
  var $page = $('.page-container');
  var $groups = $page.find('.group');
  var $stepsbar = $('.step-container');
  var $stepLis = $stepsbar.find('ul li');
  var PROC = $stepLis.length; // �Է� ���� �� (��: 5)

  var PREVIEW = PROC + 1; // �̸����� �ܰ� (��: 6)

  var cur = 1; // ��ũ��: �׻� ������ ������� �̵�

  function scrollToActive() {
    $('html, body').stop(true).animate({
      scrollTop: 0
    }, 300);
  } // ��ư�� �ѱ� ���� �����ڵ�� �����ϰ�


  var LABEL_SUBMIT = "\uCD5C\uC885\uC81C\uCD9C"; // ��������

  var LABEL_PREVIEW = "\uBBF8\uB9AC\uBCF4\uAE30"; // �̸�����

  var LABEL_NEXT = "\uB2E4\uC74C"; // ����

  var primaryText = function primaryText(step) {
    return step === PREVIEW ? LABEL_SUBMIT : step === PROC ? LABEL_PREVIEW : LABEL_NEXT;
  }; // ���� ���� ī�� �� ��ư ���� ����


  function updateButtons(step) {
    if (step === PREVIEW) return;
    var $active = $groups.eq(Math.max(0, step - 1));
    var $pri = $active.find('.btn-primary');
    var $sec = $active.find('.btn-secondary');
    $pri.text(primaryText(step));
    step === 1 ? $sec.hide() : $sec.show();
  } // ���� �ε������� ����


  function updateIndicator(step) {
    $stepLis.each(function (i, li) {
      var idx = i + 1;
      $(li).toggleClass('prev', idx < step).toggleClass('on', idx === step).toggleClass('next', idx > step).attr('aria-selected', idx === step ? 'true' : 'false');
    });
  } // select�� readonly�� ���� disabled, ����/üũ�ڽ��� '�̼��ø� disabled'


  function toggleReadonlyAll(lock) {
    var $textLike = $page.find('input[type="text"], input[type="number"], input[type="email"], input[type="tel"], input[type="search"], input[type="url"], input[type="password"], textarea');
    var $selects = $page.find('select'); // �̸����� CTA ��ư�� ����

    var $buttons = $page.find('button, input[type="button"], input[type="submit"], input[type="reset"]').not('[data-role="preview-back"], [data-role="preview-submit"]');
    var $radios = $page.find('input[type="radio"]');
    var $checks = $page.find('input[type="checkbox"]');

    if (lock) {
      fillTodayStartEndDate(); // �ؽ�Ʈ/textarea�� �б�����

      $textLike.attr('readonly', true).attr('aria-readonly', 'true'); // select/button�� ��Ȱ��

      $selects.prop('disabled', true).attr('aria-disabled', 'true');
      $buttons.prop('disabled', true).attr('aria-disabled', 'true'); // üũ�ڽ�: üũ �� �� �͸� disabled, üũ�� �� Ŭ�� ��ȿ ó��

      $checks.off('click._lock');
      $checks.prop('disabled', false).removeAttr('aria-disabled');
      $checks.not(':checked').prop('disabled', true).attr('aria-disabled', 'true');
      $checks.filter(':checked').on('click._lock', function (e) {
        e.preventDefault();
      }); // ����: üũ �� �� �͸� disabled, üũ�� �� Ŭ�� ��ȿ ó��

      $radios.off('click._lock');
      $radios.prop('disabled', false).removeAttr('aria-disabled');
      $radios.not(':checked').prop('disabled', true).attr('aria-disabled', 'true');
      $radios.filter(':checked').on('click._lock', function (e) {
        e.preventDefault();
      });
    } else {
      /**s : 26.01.20 */
      var keepMilSelectDisabled = function keepMilSelectDisabled() {
        var v = ($('#milType').val() || '').toString(); // 'F','E','N'
        // ����(N)�̸�: ����+�Ⱓ+�������� ��� disabled ����

        if (v === 'N') {
          $('#milBranch, #serviceStart, #serviceEnd, #exemptReason').prop('disabled', true).attr('aria-disabled', 'true');
        } // ����(E)�̸�: ������ disabled ����(���ϸ�)


        if (v === 'E') {
          $('#milBranch').prop('disabled', true).attr('aria-disabled', 'true');
        }
      };

      // ����
      $textLike.removeAttr('readonly').removeAttr('aria-readonly');
      $selects.prop('disabled', false).removeAttr('aria-disabled');
      $buttons.prop('disabled', false).removeAttr('aria-disabled');
      $radios.prop('disabled', false).removeAttr('aria-disabled').off('click._lock');
      $checks.prop('disabled', false).removeAttr('aria-disabled').off('click._lock'); // ����

      $textLike.removeAttr('readonly').removeAttr('aria-readonly');
      $selects.prop('disabled', false).removeAttr('aria-disabled');
      $buttons.prop('disabled', false).removeAttr('aria-disabled');
      $radios.prop('disabled', false).removeAttr('aria-disabled').off('click._lock');
      $checks.prop('disabled', false).removeAttr('aria-disabled').off('click._lock');
      keepMilSelectDisabled();
      setTimeout(keepMilSelectDisabled, 0);
      /**e :26.01.20 */
    }
  } // ���� ��ȯ


  function setStep(n) {
    cur = Math.max(1, Math.min(n, PREVIEW));

    if (cur === PREVIEW) {
      // �̸�����: ��ü ��ħ + ���ܹ� ���� + �б�����/�κ� disabled
      $page.addClass('is-preview');
      $groups.removeClass('active'); // CSS���� .is-preview�� �� .group ��ü block ó��

      $stepsbar.addClass('is-hidden');
      toggleReadonlyAll(true);
    } else {
      // �Ϲ� ���
      $page.removeClass('is-preview');
      $groups.removeClass('active').eq(cur - 1).addClass('active');
      $stepsbar.removeClass('is-hidden');
      toggleReadonlyAll(false);
      updateButtons(cur);
    }

    updateIndicator(cur);
    scrollToActive(); // ? �׻� ������ �ֻ������ �̵�
  } // ����


  $(document).on('click', '[data-role="next"]', function (e) {
    e.preventDefault();
    if (cur < PREVIEW) setStep(cur + 1);
  }); // ����

  $(document).on('click', '[data-role="prev"]', function (e) {
    e.preventDefault();
    if (cur > 1) setStep(cur - 1);
  }); // �̸����� CTA - ����(�̸����� �� ������ �Է� ����)

  $(document).on('click', '[data-role="preview-back"]', function (e) {
    e.preventDefault();
    setStep(PROC);
  }); // �̸����� CTA - ��������
  //$(document).on('click', '[data-role="preview-submit"]', function(e){
  //e.preventDefault();
  //alert('������ �Ϸ�Ǿ����ϴ�.');
  // ���� ���� ���� ��:
  // $('form').first().trigger('submit');
  // setStep(1);
  //});
  // �ʱ� ����: �ؽ�(#preview, #stepN) �ݿ�

  (function initFromHash() {
    var h = (location.hash || '').replace('#', '');

    if (h === 'preview') {
      setStep(PREVIEW);
    } else if (/^step[1-9]\d*$/.test(h)) {
      var n = parseInt(h.replace('step', ''), 10);
      setStep(isNaN(n) ? 1 : Math.min(Math.max(n, 1), PREVIEW));
    } else {
      setStep(1);
    }
  })();
});
$(function () {
  /* ===== �⺻ ���� ===== */
  var DEFAULT_MAX = 10;

  function getMaxFor($wrap) {
    var dmax = parseInt($wrap.attr('data-max'), 10);
    return isNaN(dmax) ? DEFAULT_MAX : dmax;
  }

  function stripTrailingNumber(txt) {
    return (txt || '').replace(/\s*\d+\s*$/, '').trim();
  }

  function getBaseTitle($wrap) {
    var t = ($wrap.attr('data-title') || '').trim();
    if (t) return t;
    var $h4 = $wrap.find('> .table-group').first().children('h4').first();
    return $h4.length ? stripTrailingNumber($h4.text()) : '�׸�';
  }

  function resetValues($group) {
    $group.find('input[type="text"], input[type="month"], input[type="date"], textarea').val('');
    $group.find('select').prop('selectedIndex', 0);
    $group.find('input[type="radio"], input[type="checkbox"]').prop('checked', false);
  }

  function baseFromId(id) {
    return (id || '').replace(/_\d+$/, '');
  }

  function baseFromName(name) {
    if (!name) return '';
    return name.replace(/\[\]$/, '').replace(/_\d+$/, '');
  }

  function applyIdsAndFors($group, idx) {
    $group.find('[id]').each(function () {
      var $el = $(this);
      var tag = this.tagName.toLowerCase();
      var base = baseFromId($el.attr('id'));
      if (!base) return;
      var newId = base + '_' + idx;
      if (tag === 'label') $el.attr('for', newId);else $el.attr('id', newId);
    });
    $group.find('label[for]').each(function () {
      var $el = $(this);
      var base = baseFromId($el.attr('for'));
      if (!base) return;
      $el.attr('for', base + '_' + idx);
    });
    $group.find('[name]').each(function () {
      var $el = $(this);
      var type = ($el.attr('type') || '').toLowerCase();
      var base = baseFromName($el.attr('name'));
      if (!base) return;

      if (type === 'radio' || type === 'checkbox') {
        $el.attr('name', base + '_' + idx);
      } else {
        $el.attr('name', base + '[]');
      }
    });
  }

  function reindexAll($wrap) {
    var baseTitle = getBaseTitle($wrap);
    var $groups = $wrap.find('> .table-group');
    var count = $groups.length;
    $groups.each(function (i) {
      var $g = $(this);
      var idx = i + 1;
      $g.attr('data-index', idx);
      applyIdsAndFors($g, idx);
      var $h4 = $g.children('h4').first();
      if ($h4.length) $h4.text(idx === 1 ? baseTitle : baseTitle + ' ' + idx);
      var $add = $g.find('.btn-add');
      var $del = $g.find('.btn-del');

      if (count === 1) {
        $add.show();
        $del.hide();
      } else {
        if (idx === 1) {
          $add.show();
          $del.hide();
        } else {
          $add.hide();
          $del.show();
        }
      }
    });
  } // (�߿�) ���� ���ε� ���� ��, ���ӽ����̽��� ����ε�


  $(document).off('click.eduRepeat', '.edu-repeat .btn-add').on('click.eduRepeat', '.edu-repeat .btn-add', function (e) {
    e.preventDefault();
    var $wrap = $(this).closest('.edu-repeat');
    var $status = $wrap.find('[role="status"]');
    var $last = $wrap.find('> .table-group').last();
    var count = $wrap.find('> .table-group').length;
    var max = getMaxFor($wrap);

    if (count >= max) {
      alert('�ִ� ' + max + '�������� ����� �� �ֽ��ϴ�.');
      if ($status.length) $status.text('�ִ� ' + max + '�� �������� �߰����� �ʾҽ��ϴ�.');
      return;
    } // clone(true, true) ���� �� �̺�Ʈ ���� ����


    var $clone = $last.clone(false, false);
    resetValues($clone);
    $clone.insertAfter($last);
    reindexAll($wrap); //��Ŀ�� ù��°�� �̵�
    //const $firstInput = $clone.find('input, select, textarea').filter(':visible').first();
    //if($firstInput.length) $firstInput.focus();
    //if ($status.length) $status.text('���ο� �Է� �׸��� �߰��Ǿ����ϴ�.');
  });
  $(document).off('click.eduRepeat', '.edu-repeat .btn-del').on('click.eduRepeat', '.edu-repeat .btn-del', function (e) {
    e.preventDefault();
    var $wrap = $(this).closest('.edu-repeat');
    var $status = $wrap.find('[role="status"]');
    var $grp = $(this).closest('.table-group');
    if ($grp.is(':first-child')) return;
    $grp.remove();
    reindexAll($wrap); //if ($status.length) $status.text('�Է� �׸��� �����Ǿ����ϴ�.');
  }); // �ʱ� ����

  $('.edu-repeat').each(function () {
    reindexAll($(this));
  });
});
//# sourceMappingURL=WCR50202DS.dev.js.map
