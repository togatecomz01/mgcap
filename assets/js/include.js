$(function(){
  $('[data-include-path]').each(function(){
    var path = $(this).attr('data-include-path');
    var url  = path + (path.indexOf('?')>-1 ? '&' : '?') + '_v=' + Date.now();
    var $this = $(this);
    $this.load(url, function(res, status, xhr){
      if(status === 'error'){
        $this.html('ë¡œë“œ ?‹¤?Œ¨: ' + xhr.status + ' ' + xhr.statusText + '<br><code>'+url+'</code>');
      } else {
        // include ?™„ë£? ?›„ nav.js ?‹¤?–‰
        if (path.indexOf('nav.html') > -1) {
          // nav.jsê°? ?´ë¯? ë¡œë“œ?˜?–´ ?ˆ?Š”ì§? ?™•?¸
          if (typeof window.mobileMenu === 'undefined') {
            // nav.js ë¡œë“œ
            $.getScript('../../assets/js/ui/com/nav.js', function() {
              console.log('nav.js ë¡œë“œ ?™„ë£?');
            });
          } else {
            // ?´ë¯? ë¡œë“œ?œ ê²½ìš° ?•¨?ˆ˜?“¤ ?¬?‹¤?–‰
            if (typeof window.mobileMenu === 'function') window.mobileMenu();
            if (typeof window.menuToggle === 'function') window.menuToggle();
            if (typeof window.headerMenu === 'function') window.headerMenu();
          }
          
          // ?Š¤?¬ë¡? ?´ë²¤íŠ¸ ?¬ë°”ì¸?”© ?‹œ?„
          setTimeout(function() {
            if (typeof window.bindScrollEvents === 'function') {
              console.log('?Š¤?¬ë¡? ?´ë²¤íŠ¸ ?¬ë°”ì¸?”© ?‹œ?„');
              window.bindScrollEvents();
            }
          }, 100);
        }
      }
    });
  });
});