  // ===============================
  // 스텝/미리보기 스크립트 (scrollTop 0 버전)
  // - 스텝 전환 시 항상 페이지 상단으로 스크롤
  // - 미리보기: 전체 펼침 + readonly/disabled + 스텝바 숨김
  // - 라디오/체크박스: '체크 안 된 것'만 disabled (상태 보존)
  // ===============================
  $(function () {
    const HEADER_H = 0;

    const $page     = $('.page-container');
    const $groups   = $page.find('.group');
    const $stepsbar = $('.step-container');
    const $stepLis  = $stepsbar.find('ul li');
    const PROC      = $stepLis.length;     // 입력 스텝 수 (예: 5)
    const PREVIEW   = PROC + 1;            // 미리보기 단계 (예: 6)
    let cur         = 1;

    // 스크롤: 항상 페이지 상단으로 이동
    function scrollToActive() {
      $('html, body').stop(true).animate({ scrollTop: 0 }, 300);
    }

    // 버튼라벨 한글 라벨을 유니코드로 안전하게
    const LABEL_SUBMIT  = '\uCD5C\uC885\uC81C\uCD9C';   // 최종제출
    const LABEL_PREVIEW = '\uBBF8\uB9AC\uBCF4\uAE30';   // 미리보기
    const LABEL_NEXT    = '\uB2E4\uC74C';               // 다음

    const primaryText = (step) =>
    step === PREVIEW ? LABEL_SUBMIT :
    step === PROC    ? LABEL_PREVIEW : LABEL_NEXT;

    // 현재 스텝 카드 내 버튼 상태 갱신
    function updateButtons(step){
      if (step === PREVIEW) return;
      const $active = $groups.eq(Math.max(0, step-1));
      const $pri = $active.find('.btn-primary');
      const $sec = $active.find('.btn-secondary');
      $pri.text(primaryText(step));
      (step === 1) ? $sec.hide() : $sec.show();
    }

    // 스텝 인디케이터 갱신
    function updateIndicator(step){
      $stepLis.each((i, li)=>{
        const idx = i + 1;
        $(li)
          .toggleClass('prev', idx < step)
          .toggleClass('on',   idx === step)
          .toggleClass('next', idx > step)
          .attr('aria-selected', idx === step ? 'true' : 'false');
      });
    }

    // select는 readonly가 없어 disabled, 라디오/체크박스는 '미선택만 disabled'
    function toggleReadonlyAll(lock){
      const $textLike = $page.find('input[type="text"], input[type="number"], input[type="email"], input[type="tel"], input[type="search"], input[type="url"], input[type="password"], textarea');
      const $selects  = $page.find('select');
      // 미리보기 CTA 버튼은 제외
      const $buttons  = $page.find('button, input[type="button"], input[type="submit"], input[type="reset"]')
                             .not('[data-role="preview-back"], [data-role="preview-submit"]');
      const $radios   = $page.find('input[type="radio"]');
      const $checks   = $page.find('input[type="checkbox"]');

      if (lock) {
        // 텍스트/textarea는 읽기전용
        $textLike.attr('readonly', true).attr('aria-readonly', 'true');

        // select/button은 비활성
        $selects.prop('disabled', true).attr('aria-disabled', 'true');
        $buttons.prop('disabled', true).attr('aria-disabled', 'true');

        // 체크박스: 체크 안 된 것만 disabled, 체크된 건 클릭 무효 처리
        $checks.off('click._lock');
        $checks.prop('disabled', false).removeAttr('aria-disabled');
        $checks.not(':checked').prop('disabled', true).attr('aria-disabled', 'true');
        $checks.filter(':checked').on('click._lock', function(e){ e.preventDefault(); });

        // 라디오: 체크 안 된 것만 disabled, 체크된 건 클릭 무효 처리
        $radios.off('click._lock');
        $radios.prop('disabled', false).removeAttr('aria-disabled');
        $radios.not(':checked').prop('disabled', true).attr('aria-disabled', 'true');
        $radios.filter(':checked').on('click._lock', function(e){ e.preventDefault(); });
      } else {
        // 원복
        $textLike.removeAttr('readonly').removeAttr('aria-readonly');
        $selects.prop('disabled', false).removeAttr('aria-disabled');
        $buttons.prop('disabled', false).removeAttr('aria-disabled');
        $radios.prop('disabled', false).removeAttr('aria-disabled').off('click._lock');
        $checks.prop('disabled', false).removeAttr('aria-disabled').off('click._lock');
      }
    }

    // 스텝 전환
    function setStep(n){
      cur = Math.max(1, Math.min(n, PREVIEW));

      if (cur === PREVIEW) {
        // 미리보기: 전체 펼침 + 스텝바 숨김 + 읽기전용/부분 disabled
        $page.addClass('is-preview');
        $groups.removeClass('active'); // CSS에서 .is-preview일 때 .group 전체 block 처리
        $stepsbar.addClass('is-hidden');
        toggleReadonlyAll(true);
      } else {
        // 일반 모드
        $page.removeClass('is-preview');
        $groups.removeClass('active').eq(cur-1).addClass('active');
        $stepsbar.removeClass('is-hidden');
        toggleReadonlyAll(false);
        updateButtons(cur);
      }

      updateIndicator(cur);
      scrollToActive(); // ? 항상 페이지 최상단으로 이동
    }

    // 다음
    $(document).on('click', '[data-role="next"]', function(e){
      e.preventDefault();
      if (cur < PREVIEW) setStep(cur + 1);
    });

    // 이전
    $(document).on('click', '[data-role="prev"]', function(e){
      e.preventDefault();
      if (cur > 1) setStep(cur - 1);
    });

    // 미리보기 CTA - 이전(미리보기 → 마지막 입력 스텝)
    $(document).on('click', '[data-role="preview-back"]', function(e){
      e.preventDefault();
      setStep(PROC);
    });

    // 미리보기 CTA - 최종제출
    //$(document).on('click', '[data-role="preview-submit"]', function(e){
      //e.preventDefault();
      //alert('제출이 완료되었습니다.');
      // 실제 서버 제출 시:
      // $('form').first().trigger('submit');
      // setStep(1);
    //});

    // 초기 스텝: 해시(#preview, #stepN) 반영
    (function initFromHash(){
      const h = (location.hash || '').replace('#','');
      if (h === 'preview') {
        setStep(PREVIEW);
      } else if (/^step[1-9]\d*$/.test(h)) {
        const n = parseInt(h.replace('step',''), 10);
        setStep(isNaN(n) ? 1 : Math.min(Math.max(n,1), PREVIEW));
      } else {
        setStep(1);
      }
    })();
  });



$(function () {
    /* ===== 기본 설정 ===== */
    const DEFAULT_MAX = 10;
  
    function getMaxFor($wrap){
      const dmax = parseInt($wrap.attr('data-max'), 10);
      return isNaN(dmax) ? DEFAULT_MAX : dmax;
    }
  
    function stripTrailingNumber(txt){ return (txt || '').replace(/\s*\d+\s*$/, '').trim(); }
    function getBaseTitle($wrap){
      const t = ($wrap.attr('data-title') || '').trim();
      if (t) return t;
      const $h4 = $wrap.find('> .table-group').first().children('h4').first();
      return $h4.length ? stripTrailingNumber($h4.text()) : '항목';
    }
  
    function resetValues($group){
      $group.find('input[type="text"], input[type="month"], input[type="date"], textarea').val('');
      $group.find('select').prop('selectedIndex', 0);
      $group.find('input[type="radio"], input[type="checkbox"]').prop('checked', false);

    }
  
    function baseFromId(id){ return (id || '').replace(/_\d+$/, ''); }
    function baseFromName(name){
      if (!name) return '';
      return name.replace(/\[\]$/, '').replace(/_\d+$/, '');
    }
  
    function applyIdsAndFors($group, idx){
      $group.find('[id]').each(function(){
        const $el = $(this);
        const tag = this.tagName.toLowerCase();
        const base = baseFromId($el.attr('id'));
        if(!base) return;
        const newId = base + '_' + idx;
        if(tag === 'label') $el.attr('for', newId);
        else $el.attr('id', newId);
      });
  
      $group.find('label[for]').each(function(){
        const $el = $(this);
        const base = baseFromId($el.attr('for'));
        if(!base) return;
        $el.attr('for', base + '_' + idx);
      });
  
      $group.find('[name]').each(function(){
        const $el = $(this);
        const type = ($el.attr('type') || '').toLowerCase();
        const base = baseFromName($el.attr('name'));
        if(!base) return;
        if(type === 'radio' || type === 'checkbox'){
          $el.attr('name', base + '_' + idx);
        } else {
          $el.attr('name', base + '[]');
        }
      });
    }
  
    function reindexAll($wrap){
      const baseTitle = getBaseTitle($wrap);
      const $groups = $wrap.find('> .table-group');
      const count = $groups.length;
  
      $groups.each(function(i){
        const $g = $(this);
        const idx = i + 1;
        $g.attr('data-index', idx);
        applyIdsAndFors($g, idx);
  
        const $h4 = $g.children('h4').first();
        if ($h4.length) $h4.text(idx === 1 ? baseTitle : (baseTitle + ' ' + idx));
  
        const $add = $g.find('.btn-add');
        const $del = $g.find('.btn-del');
  
        if (count === 1){
          $add.show();  $del.hide();
        } else {
          if (idx === 1){ $add.show();  $del.hide(); }
          else          { $add.hide();  $del.show(); }
        }
      });
    }
  
    // (중요) 기존 바인딩 제거 후, 네임스페이스로 재바인딩
    $(document).off('click.eduRepeat', '.edu-repeat .btn-add')
               .on('click.eduRepeat',  '.edu-repeat .btn-add', function(e){
      e.preventDefault();
      const $wrap   = $(this).closest('.edu-repeat');
      const $status = $wrap.find('[role="status"]');
      const $last   = $wrap.find('> .table-group').last();
      const count   = $wrap.find('> .table-group').length;
      const max     = getMaxFor($wrap);
  
      if (count >= max){
        alert('최대 ' + max + '개까지만 등록할 수 있습니다.');
        if ($status.length) $status.text('최대 ' + max + '개 제한으로 추가되지 않았습니다.');
        return;
      }
  
      // clone(true, true) 금지 → 이벤트 복제 없이
      const $clone = $last.clone(false, false);
      resetValues($clone);
      $clone.insertAfter($last);
  
      reindexAll($wrap);
  
      //포커스 첫벗째로 이동
      //const $firstInput = $clone.find('input, select, textarea').filter(':visible').first();
      //if($firstInput.length) $firstInput.focus();
  
      //if ($status.length) $status.text('새로운 입력 항목이 추가되었습니다.');
    });
  
    $(document).off('click.eduRepeat', '.edu-repeat .btn-del')
               .on('click.eduRepeat',  '.edu-repeat .btn-del', function(e){
      e.preventDefault();
      const $wrap   = $(this).closest('.edu-repeat');
      const $status = $wrap.find('[role="status"]');
      const $grp    = $(this).closest('.table-group');
      if ($grp.is(':first-child')) return;
      $grp.remove();
      reindexAll($wrap);
      //if ($status.length) $status.text('입력 항목이 삭제되었습니다.');
    });
  
    // 초기 실행
    $('.edu-repeat').each(function(){ reindexAll($(this)); });
  });