(()=>{
  let timeout = null;
  let tStart = null;
  let isHashtag = false;
  let parent = null;

  function resetAll(){
    if(timeout) clearTimeout(timeout);
    tStart = null;
    isHashtag = false;
    parent = null;
  }

  document.body.addEventListener('touchstart', function(e){
    resetAll();
    try{
      const touches = e.touches[0];
      tStart = { x: touches.pageX, y: touches.pageY };
      const target = e.target;
      parent = target.parentNode;
      const rel = (parent.tagName == 'A' && parent.rel) ? parent.rel : null;
      const ismdhashtag = parent.classList.contains('md-hashtag');
      // ハッシュタグかどうか
      isHashtag = (rel == 'hashtag' || ismdhashtag);
      if(isHashtag){
        if(!ismdhashtag) parent.classList.add('md-hashtag');
        timeout = setTimeout(()=>{
          // カラムに追加
          parent.rel = 'hashtag';
          parent.click();
        }, 500);
      }
    }catch(e){
      resetAll();
    }
  }, {passive: true});

  document.body.addEventListener('touchmove', function(e){
    try{
      if(!timeout) return;
      const touches = e.touches[0];
      if(Math.abs(tStart.x - touches.pageX) >= 15 || Math.abs(tStart.y - touches.pageY) >= 15){
        resetAll();
      }
    }catch(e){
      resetAll();
    }
  }, {passive: true});

  document.body.addEventListener('touchend', function(){
    if(isHashtag){
      parent.rel = 'url noopener noreferrer';
    }
    resetAll();
  }, {passive: true});

  document.body.addEventListener('touchcancel', function(){
    resetAll();
  }, {passive: true});
})();
