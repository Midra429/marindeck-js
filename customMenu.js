(()=>{
  // ツイートを埋め込む
  const svg_embed = '<svg viewBox="0 0 24 24"><g><path d="M23.804 11.5l-6.496-7.25c-.278-.31-.752-.334-1.06-.06-.308.277-.334.752-.058 1.06L22.238 12l-6.047 6.75c-.275.308-.25.782.06 1.06.142.127.32.19.5.19.204 0 .41-.084.558-.25l6.496-7.25c.252-.28.258-.713 0-1zm-23.606 0l6.496-7.25c.278-.31.752-.334 1.06-.06.308.277.334.752.058 1.06L1.764 12l6.047 6.75c.277.308.25.782-.057 1.06-.143.127-.322.19-.5.19-.206 0-.41-.084-.56-.25L.197 12.5c-.252-.28-.257-.713 0-1zm9.872 12c-.045 0-.09-.004-.135-.012-.407-.073-.68-.463-.605-.87l3.863-21.5c.074-.407.466-.674.87-.606.408.073.68.463.606.87l-3.864 21.5c-.065.363-.38.618-.737.618z"></path></g></svg>';
  // data-actionと各SVG, フォントの関係
  const icon_svg = {
    'embed': svg_embed
  }
  const icon_fonts = {
    'reference-to': 'copylink',
    'message-to': 'message',
    'email': 'message',
    'mention': 'mention',
    'followOrUnfollow': 'follow',
    'favoriteOrUnfavorite': 'favorite',
    'message': 'message',
    'lists': 'addList',
    'customtimelines': 'addCollection',
    'search-for-quoted': 'search',
    'destroy': 'remove',
    'flag-media': 'report',
    'mute': 'mute',
    'muteConversation': 'mute',
    'block': 'block',
    'report-tweet': 'report'
  };

  // カスタムメニュー用CSS
  let cmenuStyle;
  if(!document.getElementById('md-style-menu')){
    const style = document.createElement('style');
    style.id = 'md-style-menu';
    style.type = 'text/css';
    style.innerHTML = '.dropdown-menu .caret{display:none}#md-custom-menu{display:block;position:fixed;top:0;left:0;z-index:999;width:100vw;height:100vh;background-color:#0000;transition-property:background-color;transition-duration:.13s}#md-custom-menu.md-cmenu-open{background-color:#00000060}#md-custom-menu.md-cmenu-hide{display:none}#md-custom-menu>.dropdown-menu{display:block!important;position:absolute!important;top:unset!important;bottom:0!important;left:0!important;right:unset!important;margin:0!important;width:100%;border-radius:15px 15px 0 0!important;box-shadow:0 0 7px 0 rgb(0 0 0 / 13%)!important;font-size:14px!important}#md-custom-menu>.dropdown-menu li.is-selectable{position:relative;height:35px}#md-custom-menu>.dropdown-menu li>.md-cmenu-icon,#md-custom-menu>.dropdown-menu li>svg{display:inline-block;position:absolute;top:0;left:20px;width:auto;height:21px;line-height:21px;padding:7px 0;box-sizing:content-box!important;fill:currentcolor}#md-custom-menu>.dropdown-menu li>a{display:inline-block;width:100%;height:100%;line-height:35px;padding:0 25px 0 50px}#md-custom-menu>.dropdown-menu li.is-selectable>a:after{font-size:14px!important}#md-custom-menu .icon:before{font-weight:400}.md-icon-mention:before{content:"\\F064"}.md-icon-copylink:before{content:"\\F098"}.md-icon-message:before{content:"\\F054"}.md-icon-follow:before{content:"\\F175"}.md-icon-favorite:before{content:"\\F148"}.md-icon-addList:before{content:"\\F712"}.md-icon-addCollection{transform:scale(-1,1)}.md-icon-addCollection:before{content:"\\F214"}.md-icon-search:before{content:"\\F058"}.md-icon-mute:before{content:"\\F101"}.md-icon-block:before{content:"\\E609"}.md-icon-report:before{content:"\\F038"}.md-icon-remove:before{content:"\\F154"}';
    cmenuStyle = document.head.appendChild(style);
  }
  // カスタムメニュー用要素
  let cmenuElem;
  if(!document.getElementById('md-custom-menu')){
    const elem = document.createElement('div');
    elem.id = 'md-custom-menu';
    elem.classList.add('md-cmenu-hide');
    elem.addEventListener('click', (e)=>{
      closeCustomMenu();
    });
    cmenuElem = document.body.appendChild(elem);
  }

  // カスタムメニューを開く
  function openCustomMenu(menu){
    if(cmenuElem && cmenuStyle){
      // 元の要素を移動
      cmenuElem.appendChild(menu);
      // クラス追加・削除
      cmenuElem.classList.remove('md-cmenu-hide');
      cmenuElem.classList.add('md-cmenu-open');
      // アイコン追加
      const selectable = menu.querySelectorAll('li.is-selectable > a[data-action]');
      for(let i = 0; i < selectable.length; i++){
        const action = selectable[i].dataset.action;
        if(action){
          if(icon_fonts[action]){
            const iconElem = `<div class="md-cmenu-icon"><i class="icon md-icon-${icon_fonts[action]}"></i></div>`;
            selectable[i].insertAdjacentHTML('beforebegin', iconElem);
          }else if(icon_svg[action]){
            selectable[i].insertAdjacentHTML('beforebegin', icon_svg[action]);
          }
        }
      }
    }
  }

  // カスタムメニューを閉じる
  function closeCustomMenu(){
    if(!cmenuElem) return;
    // 要素内を削除
    while(cmenuElem.firstChild){
      cmenuElem.removeChild(cmenuElem.firstChild);
    }
    // クラス追加・削除
    cmenuElem.classList.remove('md-cmenu-open');
    setTimeout(()=>{
      cmenuElem.classList.add('md-cmenu-hide');
    }, 130);
  }

  // document.body.addEventListener('click', (e)=>{
  //
  // });

  let observer;
  let target;
  let config;
  function createObserver(){
    observer = new MutationObserver((e)=>{
      observer.disconnect();
      for(let i = 0; i < e.length; i++){
        // 追加されたノードがドロップダウンメニューか判定
        const addedNodes = e[i].addedNodes;
        const added = addedNodes ? addedNodes[0] : null;
        if(added && added.classList && added.classList.contains('dropdown-menu')){
          if(added.closest('a[data-action="message-menu"]') == null && added.closest('nav.app-navigator') == null){
            openCustomMenu(added);
          }
        }else{
          // 削除されたノードがドロップダウンメニューか判定
          const removedNodes = e[i].removedNodes;
          const removed = removedNodes ? removedNodes[0] : null;
          if(removed && removed.classList && removed.classList.contains('dropdown-menu')){
            closeCustomMenu();
          }
        }
      }
      observer.observe(target, config);
    });
    config = {
      childList: true,
      subtree: true
    };
  }
  let int_observer = setInterval(()=>{
    target = document.body;
    if(target){
      createObserver();
      observer.observe(target, config);
      clearInterval(int_observer);
    }
  }, 300);
})();
