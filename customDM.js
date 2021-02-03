(()=>{
  const customDMStyle = document.createElement('style');
  customDMStyle.setAttribute('id', 'md-style-dm');
  customDMStyle.innerHTML = ".md-customDM-container,.md-customDM-rpl,.md-customDM>article{transform:rotate(180deg)}.md-customDM>article{border:none!important;margin:6px 0!important}.md-customDM>article .tweet,.md-customDM>article .tweet>div,.md-customDM>article .tweet>header{transform:rotate(180deg)}.md-customDM>article .tweet{padding-left:0;padding-right:46px}.md-customDM>article .tweet>header{margin-bottom:1px}.md-customDM>article .tweet>header>time{position:absolute;top:-3px;left:0}.md-customDM>article .tweet>header>a{display:inline-block!important;color:#a0abb3}.md-customDM>article .tweet>header>a>div{bottom:55px}.md-customDM>article .tweet>header .username{display:none}.md-customDM>article .tweet>header>a>div.nbfc{display:none}.md-customDM>article .tweet>div.tweet-body{width:80%;margin-left:20%}.md-customDM>article .tweet>div.tweet-body>*{display:inline-block}.md-customDM>article .tweet>div.tweet-body>.tweet-text{width:auto!important;max-width:100%;padding:8px 10px;box-sizing:border-box}.md-customDM>article .tweet>div.tweet-body>.media-preview{width:100%}.md-customDM>article .tweet>div.tweet-body>.media-preview>div{margin:0!important}.md-customDM>article .tweet>div.tweet-body>footer{position:absolute;bottom:0;margin-left:6px}.js-detail-container>div:not(.js-detail-content)>.rpl{padding-bottom:50px}.md-customDM>article.md-myMsg{transform:scale(1,-1)}.md-customDM>article.md-myMsg .dropdown-menu,.md-customDM>article.md-myMsg .tweet>div.tweet-body>:not(footer),.md-customDM>article.md-myMsg .tweet>header>a>div.item-img,.md-customDM>article.md-myMsg .tweet>header>a>div.nbfc>span,.md-customDM>article.md-myMsg .tweet>header>time{transform:scale(-1,1)}.md-customDM>article.md-myMsg .tweet{padding-right:0}.md-customDM>article.md-myMsg .tweet>header .tweet-avatar{display:none}.md-customDM>article.md-myMsg .tweet>div.tweet-body>.tweet-text a{text-decoration:underline}.md-customDM>article .tweet>div.tweet-body>.quoted-tweet{border-color:#1da1f2!important;width:100%;margin:0!important;box-sizing:border-box}html .md-customDM>article .tweet>div.tweet-body>.tweet-text.md-emojionly,html.dark .md-customDM>article .tweet>div.tweet-body>.tweet-text.md-emojionly{margin:0 0 2px 0!important;padding:0!important;overflow:visible!important;background-color:#0000!important}.md-customDM>article .tweet>div.tweet-body>.tweet-text.md-emojionly>*{width:2.2em!important;height:2.2em!important}.md-customDM .tweet-timestamp{padding-left:0!important}.md-customDM>article .tweet>div.tweet-body>.media-preview .media-item,.md-customDM>article .tweet>div.tweet-body>.quoted-tweet,.md-customDM>article .tweet>div.tweet-body>.tweet-text{border-radius:16px 16px 16px 0}.md-customDM>article.md-myMsg .tweet>div.tweet-body>.media-preview .media-item,.md-customDM>article.md-myMsg .tweet>div.tweet-body>.quoted-tweet,.md-customDM>article.md-myMsg .tweet>div.tweet-body>.tweet-text{border-radius:16px 16px 0 16px}.md-customDM>article.md-imgWithText .tweet>div.tweet-body>.tweet-text,.md-customDM>article.md-quotedWithText .tweet>div.tweet-body>.tweet-text{border-radius:0 0 16px 0}.md-customDM>article.md-imgWithText .tweet>div.tweet-body>.media-preview .media-item,.md-customDM>article.md-quotedWithText .tweet>div.tweet-body>.quoted-tweet{border-radius:16px 16px 0 0}.md-customDM>article.md-myMsg.md-imgWithText .tweet>div.tweet-body>.tweet-text,.md-customDM>article.md-myMsg.md-quotedWithText .tweet>div.tweet-body>.tweet-text{border-radius:0 0 0 16px}.md-customDM>article.md-imgWithText .tweet>div.tweet-body>.tweet-text,.md-customDM>article.md-quotedWithText .tweet>div.tweet-body>.tweet-text{width:100%!important;margin-top:-4px!important}.md-customDM>article .tweet>div.tweet-body>footer{display:none}.md-customDM>article[md-onajiuser=bottom] .tweet>header,.md-customDM>article[md-onajiuser=top] .tweet>header{background-color:#6d0000!important;display:none}html .md-customDM>article[md-onajiuser=top],html.dark .md-customDM>article[md-onajiuser=top]{margin:-1px 0 6px!important}html .md-customDM>article[md-onajiuser=top]>div,html.dark .md-customDM>article[md-onajiuser=top]>div{padding:8px 10px 0!important}html .md-customDM>article[md-onajiuser=bottom],html.dark .md-customDM>article[md-onajiuser=bottom]{margin:-1px 0 0!important}html .md-customDM>article[md-onajiuser=bottom]>div,html.dark .md-customDM>article[md-onajiuser=bottom]>div{padding:0 10px!important}html .md-customDM>article[md-onajiuser='bottom last'],html.dark .md-customDM>article[md-onajiuser='bottom last']{margin:6px 0 -1px!important}html .md-customDM>article[md-onajiuser='bottom last']>div,html.dark .md-customDM>article[md-onajiuser='bottom last']>div{padding:0 10px 8px!important}.md-customDM>article[md-onajiuser~=bottom] .tweet>div.tweet-body>.media-preview .media-item,.md-customDM>article[md-onajiuser~=bottom] .tweet>div.tweet-body>.quoted-tweet,.md-customDM>article[md-onajiuser~=bottom] .tweet>div.tweet-body>.tweet-text{border-radius:0 16px 16px 0}.md-customDM>article[md-onajiuser~=bottom].md-myMsg .tweet>div.tweet-body>.media-preview .media-item,.md-customDM>article[md-onajiuser~=bottom].md-myMsg .tweet>div.tweet-body>.quoted-tweet,.md-customDM>article[md-onajiuser~=bottom].md-myMsg .tweet>div.tweet-body>.tweet-text{border-radius:16px 0 0 16px}html .md-customDM>article[md-onajiuser] .tweet>div.tweet-body>.tweet-text.md-emojionly{margin-bottom:10px!important}.md-customDM>article[md-onajiuser~=bottom].md-imgWithText .tweet>div.tweet-body>.media-preview .media-item,.md-customDM>article[md-onajiuser~=bottom].md-quotedWithText .tweet>div.tweet-body>.quoted-tweet{border-radius:0 16px 0 0}.md-customDM>article[md-onajiuser~=bottom].md-imgWithText .tweet>div.tweet-body>.tweet-text,.md-customDM>article[md-onajiuser~=bottom].md-quotedWithText .tweet>div.tweet-body>.tweet-text{border-radius:0 0 16px 0}.md-customDM>article[md-onajiuser~=bottom].md-myMsg.md-imgWithText .tweet>div.tweet-body>.media-preview .media-item,.md-customDM>article[md-onajiuser~=bottom].md-myMsg.md-quotedWithText .tweet>div.tweet-body>.quoted-tweet{border-radius:16px 0 0 0}.md-customDM>article[md-onajiuser~=bottom].md-myMsg.md-imgWithText .tweet>div.tweet-body>.tweet-text,.md-customDM>article[md-onajiuser~=bottom].md-myMsg.md-quotedWithText .tweet>div.tweet-body>.tweet-text{border-radius:0 0 0 16px}html .js-message-detail.md-customDM>article,html.dark .js-message-detail.md-customDM>article{background-color:#0000!important}html .md-customDM>article .tweet>.tweet-body>.tweet-text{background-color:#ebeef0;color:#0f1419}html.dark .md-customDM>article .tweet>.tweet-body>.tweet-text{background-color:#3d5466;color:#fff}html .md-customDM>article.md-myMsg .tweet>.tweet-body>.tweet-text{background-color:#1da1f2;color:#fff}html.dark .md-customDM>article.md-myMsg .tweet>.tweet-body>.tweet-text{background-color:#1da1f2;color:#fff}html .md-customDM>article .tweet>.tweet-body>.quoted-tweet{border-color:#ebeef0!important}html.dark .md-customDM>article .tweet>.tweet-body>.quoted-tweet{border-color:#3d5466!important}html .md-customDM>article.md-myMsg .tweet>.tweet-body>.quoted-tweet{border-color:#1da1f2!important}html.dark .md-customDM>article.md-myMsg .tweet>.tweet-body>.quoted-tweet{border-color:#1da1f2!important}html .md-customDM>article.md-myMsg .tweet>.tweet-body>.tweet-text>a{color:#fff}html.dark .md-customDM>article.md-myMsg .tweet>.tweet-body>.tweet-text>a{color:#fff}";
  document.head.appendChild(customDMStyle);

  let dmObserver = null;
  let dmContainer = null;
  let obConfig = {
    childList: true,
    characterData: true
  };

  function createObserverDM(){
    dmObserver = new MutationObserver(function(m){
      dmObserver.disconnect();
      setAttr();
      dmObserver.observe(dmContainer, obConfig);
    });
  }

  let int_dmObserver = null;
  let count = 0;
  function setObserveDM(){
    int_dmObserver = setInterval(function(){
      if(count > 7) clearInterval(int_dmObserver);
      dmContainer = document.body.querySelector(`section.column[data-column=\"${columnData}\"] div.js-message-detail`);
      if(dmContainer){
        createObserverDM();
        dmObserver.observe(dmContainer, obConfig);
        if(int_dmObserver) clearInterval(int_dmObserver);
      }
      count++;
    }, 100);
  }

  function calcDiffSec(tgt, prev){
    if(isNaN(tgt) || isNaN(prev)) return;
    const targetDate = new Date(tgt);
    const prevDate = new Date(prev);
    const diffSec = Math.floor((targetDate.getTime() - prevDate.getTime()) / 1000);
    return diffSec;
  }

  let st_addClass = null;
  let st_setAttr = null;
  function setAttr(){
    if(st_setAttr) clearTimeout(st_setAttr);
    st_setAttr = setTimeout(function(){
      try{
        const targetColumn = document.body.querySelector(`section.column[data-column=\"${columnData}\"]`);

        const msgLists = targetColumn.querySelectorAll('div.js-message-detail > article[data-account-key]');
        const msgLen = msgLists.length;
        let userLists = [];
        let timestampLists = [];

        // 自分のユーザー名
        const myUsername = targetColumn.querySelector('div.rpl > textarea').getAttribute('placeholder').match(/([@]\w+)/)[0];

        let onajiuserName = null;
        let onajiuserFirstIdx = null;
        let onajiPrevTime = null;

        for(let i = 0; i < msgLists.length; i++){
          const reverseIdx = msgLists.length - i - 1;

          /* タイムスタンプの取得 */
          const timestamp = msgLists[reverseIdx].querySelector('.tweet > header time.tweet-timestamp');
          let time = null;
          if(timestamp){
            time = Number(timestamp.getAttribute('data-time'));
            timestampLists.push(time);
          }

          /* アカウント名の取得 */
          const username = msgLists[reverseIdx].querySelector('.tweet > header span.username');
          let name = null;
          if(username){
            name = username.textContent;
            userLists.push(name);
          }

          /* アカウント名, 時間でまとめるか判定 */
          if(time && name){
            // アカウント名一致（2回目以降）
            if(onajiuserName == name){
              onajiPrevTime = timestampLists[i - 1];
              // 直前の一致したメッセージとの時間差が1分以内なら
              if(calcDiffSec(time, onajiPrevTime) <= 60){
                if(!onajiuserFirstIdx){
                  onajiuserFirstIdx = i - 1;
                }
                // 2回以上連続で一致すれば onajiuserFirstIdx は存在する
                if(onajiuserFirstIdx){
                  // ここ作れ！
                  const onajiuserCnt = i - onajiuserFirstIdx;
                  if(onajiuserCnt == 1){
                    msgLists[reverseIdx + 1].setAttribute('md-onajiuser', 'top');
                    msgLists[reverseIdx].setAttribute('md-onajiuser', 'bottom');
                  }else{
                    msgLists[reverseIdx].setAttribute('md-onajiuser', 'bottom');
                  }
                }
              }else{
                if(onajiuserFirstIdx){
                  msgLists[reverseIdx + 1].setAttribute('md-onajiuser', 'bottom last');
                }
                msgLists[reverseIdx].removeAttribute('md-onajiuser');
                onajiuserName = name;
                onajiuserFirstIdx = null;
              }
            }else{
              // 一致しなくなったら一つ手前は連続した最後になる
              if(onajiuserFirstIdx){
                msgLists[reverseIdx + 1].setAttribute('md-onajiuser', 'bottom last');
              }
              // リセット
              msgLists[reverseIdx].removeAttribute('md-onajiuser');
              onajiuserName = name;
              onajiuserFirstIdx = null;
            }
          }

          // 変更済みなら何もしない
          if(msgLists[reverseIdx].classList.contains('md-dmChanged')) continue;

          /* 自分のメッセージにclass追加 */
          if(name == myUsername){
            username.closest('article.stream-item').classList.add('md-myMsg');
          }

          /* 絵文字のみメッセージにclass追加 */
          const tweetText = msgLists[reverseIdx].querySelector('.tweet-body > .tweet-text');
          if(tweetText && tweetText.textContent == ''){
            if(tweetText.hasChildNodes()){
              tweetText.classList.add('md-emojionly');
            }else{
              tweetText.style.display = 'none';
            }
          }

          /* 画像 + メッセージのURLを削除 & メッセージと画像をくっつける */
          const mediaPreview = msgLists[reverseIdx].querySelector('.tweet-body > .media-preview');
          if(mediaPreview && tweetText){
            const dataKey = mediaPreview.getAttribute('data-key');
            try{
              tweetText.querySelector(`a[data-full-url*=\"https://twitter.com/messages/media/${dataKey}\"]`).remove();
              if(tweetText.innerText == ''){
                tweetText.remove();
              }else{
                const tBody = mediaPreview.closest('.tweet-body');
                tBody.insertBefore(mediaPreview, tweetText);
                msgLists[reverseIdx].classList.add('md-imgWithText');
              }
            }catch(e){}
          }

          /* 引用 + メッセージ */
          const quoted = msgLists[reverseIdx].querySelector('.tweet-body > .quoted-tweet');
          if(quoted && tweetText.innerText){
            const tBody = quoted.closest('.tweet-body');
            tBody.insertBefore(quoted, tweetText);
            msgLists[reverseIdx].classList.add('md-quotedWithText');
          }

          // 変更済みにする
          msgLists[reverseIdx].classList.add('md-dmChanged');
        }
        // 最後のメッセージはfor内で判定されないので
        if(onajiuserFirstIdx){
          msgLists[0].setAttribute('md-onajiuser', 'bottom last');
        }

        /* 一番下までスクロールする */
        if(scrollToBottom){
          if(st_addClass) clearTimeout(st_addClass);
          targetColumn.querySelector('div.js-detail-container > div').classList.add('md-customDM-container');
          targetColumn.querySelector('div.js-detail-container > div > div.rpl').classList.add('md-customDM-rpl');
          targetColumn.querySelector('div.js-detail-container > div > div.js-message-detail').classList.add('md-customDM');
          st_addClass = setTimeout(function(){
            let isInView = null;
            let int_scroll = setInterval(function(){
              try{
                const scrollElem = document.body.querySelector(`section.column[data-column=\"${columnData}\"] div.js-detail-container`);
                scrollElem.scrollTo(0, scrollElem.scrollHeight);
                const rect = targetColumn.querySelector('div.js-detail-container > div > div.rpl').getBoundingClientRect();
                isInView = 0 < rect.top && rect.bottom < window.innerHeight;
                if(isInView && int_scroll) clearInterval(int_scroll);
              }catch(e){
                if(int_scroll) clearInterval(int_scroll);
              }
            }, 100);
            scrollToBottom = false;
          }, 200);
        }
      }catch(e){}
    }, 100);
  }

  let columnData = null;
  let scrollToBottom = true;
  document.body.addEventListener('click', function(e){
    if(document.getElementById('md-style-dm')){
      try{
        const target = e.target;
        const section = target.closest('section.column');
        const iconElem = section.querySelector('header > i.column-type-icon');
        const iconName = iconElem.className.match(/\s*icon-(\w+)/)[1];
        if(iconName != 'message') return;
        columnData = section.getAttribute('data-column');
        const back = target.closest('a.js-column-back');
        if(back && back.closest(`section.column[data-column=\"${columnData}\"]`)){
          dmObserver.disconnect();
          dmObserver = null;
          scrollToBottom = true;
        }else{
          if(!dmObserver){
            setAttr();
            setObserveDM();
          }
        }
      }catch(e){}
    }else{
      try{
        dmObserver.disconnect();
        dmObserver = null;
      }catch(e){}
    }
  });
})();
