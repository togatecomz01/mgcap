$(function(){
    $('[data-include-path]').each(function(){
      var path = $(this).attr('data-include-path');
      var url  = path + (path.indexOf('?')>-1 ? '&' : '?') + '_v=' + Date.now();
      $(this).load(url, function(res, status, xhr){
        if(status === 'error'){
          $(this).html('로드 오류: ' + xhr.status + ' ' + xhr.statusText + '<br><code>'+url+'</code>');
        }
      });
    });
  });
  