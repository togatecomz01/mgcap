$(function () {
    var $root = $('.WCR50204VQ');
    if (!$root.length) return;
  
    // ---------- 읽기전용 처리 ----------
    // input/textarea
    $root.find('input, textarea')
      .prop('readonly', true)
      .attr('aria-readonly', 'true');
  
    // select는 readonly 대체 처리(값 변경 차단)
    $root.find('select').each(function () {
      var $sel = $(this);
      $sel.data('readonly-prev', $sel.val());
      $sel.attr('aria-readonly', 'true');
    });
    $root.on('focus mousedown keydown wheel touchstart', 'select[aria-readonly="true"]', function (e) {
      e.preventDefault(); this.blur();
    });
    $root.on('change', 'select[aria-readonly="true"]', function () {
      var $sel = $(this); $sel.val($sel.data('readonly-prev'));
    });
  
    // ---------- 빈 값 판정 ----------
    function isEmptyField($el, $row) {
      var tag  = ($el.prop('tagName') || '').toUpperCase();
      var type = ($el.attr('type') || '').toLowerCase();
  
      if (tag === 'SELECT') {
        var v = $el.val();
        var $opt = $el.find('option:selected');
        return (
          v === '' || v === '0' || $opt.is('[disabled],[data-placeholder]') ||
          (($opt.text() || '').trim() === '')
        );
      }
      if (type === 'checkbox' || type === 'radio') {
        var name = $el.attr('name');
        if (!name) return !$el.is(':checked');
        var $group = $row.find('input[name="' + name.replace(/([\\[\\].])/g, '\\$1') + '"]');
        return $group.filter(':checked').length === 0;
      }
      // 일반 input/textarea/date/number 등
      var val = ($el.val() || '').trim();
      return val === '';
    }
  
    function isRowAllEmpty($tr) {
      var $fields = $tr.find('input:not([type="hidden"]), select, textarea');
      if (!$fields.length) return false; // 필드 없는 행은 건너뜀
      var allEmpty = true;
      $fields.each(function () {
        if (!isEmptyField($(this), $tr)) { allEmpty = false; return false; }
      });
      return allEmpty;
    }
  
    function getColspan($table) {
      var ths = $table.find('thead tr:first th').length;
      if (ths > 0) return ths;
      var cols = $table.find('colgroup col').length;
      if (cols > 0) return cols;
      // fallback: 첫 tbody의 TD 최대 개수
      var maxTds = 0;
      $table.find('tbody tr').each(function () {
        maxTds = Math.max(maxTds, $(this).children('td,th').length);
      });
      return Math.max(1, maxTds);
    }
  
    function collapseEmptyRowsPerTbody($table) {
      var colspan = getColspan($table);
  
      $table.find('tbody').each(function () {
        var $tbody = $(this);
        var $rows  = $tbody.find('tr');
        if (!$rows.length) return;
  
        var anyVisible = false;
  
        $rows.each(function () {
          var $tr = $(this);
          if (isRowAllEmpty($tr)) {
            $tr.hide().attr('aria-hidden', 'true');
          } else {
            anyVisible = true;
          }
        });
  
        // 모두 빈 행이면 '데이터 없음' 1행 삽입
        $tbody.find('tr.__emptyRow').remove();
        if (!anyVisible) {
          $tbody.append(
            '<tr class="__emptyRow"><td colspan="' + colspan + '">데이터 없음</td></tr>'
          );
        }
      });
    }
  
    // 실행(영역 내 모든 테이블 대상)
    $root.find('table').each(function () {
      collapseEmptyRowsPerTbody($(this));
    });
  
    // 비동기 데이터 바인딩 후에도 재호출 가능:
    // collapseEmptyRowsPerTbody($('.WCR50204VQ .td-l').eq(0));
  });