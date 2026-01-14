window.syncTitleFromHead = function () {
    try {
      // 1) 우선 #head_title에서 제목 텍스트 얻기
      var el = document.getElementById("head_title");
      var title = el ? (el.textContent || "") : "";
  
      title = title.replace(/\s+/g, " ").trim();
  
      // 2) 없으면 head > title에서라도 가져오기
      if (!title) {
        var tEl = document.querySelector("head title");
        title = tEl ? (tEl.textContent || "").replace(/\s+/g, " ").trim() : "";
      }
  
      if (!title) return;
  
      // 3) 프레임 문서 title + 부모 탭 title 모두 세팅
      document.title = title;
      if (window.top && window.top.document) window.top.document.title = title;
  
    } catch (e) {}
  };
  
  
  
  syncTitleFromHead();
  
  /*********타자연습***********/
  (function () {
    var FRAME = "TopContentFrame";
    var FALLBACK = "MG캐피탈";
    var bound = false;
  
    function norm(s) {
      return (s || "").replace(/\s+/g, " ").trim();
    }
  
    function getFrameDoc() {
      try {
        var w = top.frames[FRAME];
        return w ? w.document : null;
      } catch (e) {
        return null;
      }
    }
  
    function readTitle(doc) {
      if (!doc) return "";
  
      // 1) #head_title 우선
      var el = doc.getElementById("head_title");
      var t = el ? norm(el.textContent) : "";
      if (t) return t;
  
      // 2) head > title fallback
      var tEl = doc.querySelector("head title");
      return tEl ? norm(tEl.textContent) : "";
    }
  
    function sync() {
      var d = getFrameDoc();
      var title = readTitle(d) || FALLBACK;
      top.document.title = title;
    }
  
    function bind() {
      if (bound) return true;
  
      var frameEl = document.querySelector('frame[name="' + FRAME + '"], iframe[name="' + FRAME + '"]');
      if (!frameEl) return false;
  
      bound = true;
  
      // 최초 1회
      sync();
  
      // 프레임 이동/갱신마다
      frameEl.addEventListener("load", function () {
        sync();
        setTimeout(sync, 120);
        setTimeout(sync, 350);
        setTimeout(sync, 700);
      });
  
      return true;
    }
  
    // frame DOM 지연 대응
    if (!bind()) {
      var n = 0;
      var timer = setInterval(function () {
        n++;
        if (bind() || n >= 80) clearInterval(timer);
      }, 100);
    }
  })();
  