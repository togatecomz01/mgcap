$(function(){
  $('[data-include-path]').each(function(){
    var path = $(this).attr('data-include-path');
    var url  = path + (path.indexOf('?')>-1 ? '&' : '?') + '_v=' + Date.now();
    var $this = $(this);
    $this.load(url, function(res, status, xhr){
      if(status === 'error'){
        $this.html('로드 실패: ' + xhr.status + ' ' + xhr.statusText + '<br><code>'+url+'</code>');
      } else {
        // include 완료 후 nav.js 실행
        if (path.indexOf('nav.html') > -1) {
          // nav.js가 이미 로드되어 있는지 확인
          if (typeof window.mobileMenu === 'undefined') {
            // nav.js 로드
            $.getScript('../../assets/js/ui/com/nav.js', function() {
              console.log('nav.js 로드 완료');
            });
          } else {
            // 이미 로드된 경우 함수들 재실행
            if (typeof window.mobileMenu === 'function') window.mobileMenu();
            if (typeof window.menuToggle === 'function') window.menuToggle();
            if (typeof window.headerMenu === 'function') window.headerMenu();
          }
          
          // 스크롤 이벤트 재바인딩 시도
          setTimeout(function() {
            if (typeof window.bindScrollEvents === 'function') {
              console.log('스크롤 이벤트 재바인딩 시도');
              window.bindScrollEvents();
            }
          }, 100);
        }
      }
    });
  });
});