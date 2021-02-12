// 画像ビュワー用CSS ////////////////////////////////////////////////////////////
if(document.getElementById('md-ImgViewer-style') === null){
  const elemStyle = document.createElement('style');
  elemStyle.setAttribute('id', 'md-ImgViewer-style');
  elemStyle.setAttribute('type', 'text/css');
  elemStyle.innerHTML = '.md-spinner{width:60px;height:60px;position:absolute;top:calc((100% - 60px)/ 2);left:calc((100% - 60px)/ 2);z-index:999}.md-spinner-b1,.md-spinner-b2{width:100%;height:100%;border-radius:50%;background-color:#fff;opacity:.6;position:absolute;top:0;left:0;-webkit-animation:sk-bounce 2s infinite ease-in-out;animation:sk-bounce 2s infinite ease-in-out}.md-spinner-b2{-webkit-animation-delay:-1s;animation-delay:-1s}@-webkit-keyframes sk-bounce{0%,100%{-webkit-transform:scale(0)}50%{-webkit-transform:scale(1)}}@keyframes sk-bounce{0%,100%{transform:scale(0);-webkit-transform:scale(0)}50%{transform:scale(1);-webkit-transform:scale(1)}}.md-spinner{display:none}.md-loadingImg+.md-spinner{display:block}#md-media-viewer{display:none;position:fixed;top:0;left:0;z-index:998;width:auto;height:100vh;margin:0!important;padding:0!important;background:#14171a77;overflow:hidden;will-change:background;transition-property:background;transition-duration:.2s}#md-media-viewer.md-swipeY{background:#0000}.md-img-container,.md-media-container{width:100%;height:100%}.md-img-container{display:flex;flex-direction:row;flex-wrap:nowrap;justify-content:flex-start;overflow:hidden;will-change:transform;transition-property:transform}.md-smooth{transition:.13s cubic-bezier(.4,0,.2,1)}.md-smooth-pc{transition:.5s cubic-bezier(.4,0,.2,1)}.md-swipeClose{transition:.2s cubic-bezier(.4,0,.2,1)}.md-img-item{position:relative;width:100vw;height:100%;min-width:100vw;min-height:100%;will-change:transform;transition:.2s}.md-img-item.md-dragging,.md-img-item.md-pinchInOut{transition:0s}.md-img{width:100%;height:100%;object-fit:contain;will-change:transform;transition:.2s}.md-img.md-dragging,.md-img.md-pinchInOut{transition:0s}.md-button{cursor:pointer}.md-btnCir{position:fixed;z-index:99;width:40px;height:40px;margin:0;padding:0;line-height:40px;text-align:center;background-color:#00000090;border-radius:50%;transition:.2s}.md-button[md-jsaction=menu]{display:none;top:13px;right:13px;transform:rotate(90deg)}.md-button[md-jsaction=next]{top:calc((100% - 40px)/ 2);right:13px}.md-button[md-jsaction=prev]{top:calc((100% - 40px)/ 2);left:13px}.md-button[md-jsaction=close]{top:13px;left:13px;background-color:#0000}.md-button[md-jsaction=close]:hover{background-color:#00000090}.md-button.md-btnHide{display:none!important}.md-btnCir>i{width:40px!important;height:40px!important;line-height:40px!important;font-size:30px!important;vertical-align:unset!important;color:#ffffffc4}.md-btnCir[md-jsaction=close]>i,.md-btnCir[md-jsaction=menu]>i{line-height:37px!important}.md-dropdown-menu{position:fixed;top:13px;right:13px;z-index:100;width:140px;height:50px;border-radius:7px;overflow:hidden;transition:.2s}html .md-dropdown-menu{background-color:#fff;box-shadow:0 1px 7px -1px #00000050}html.dark .md-dropdown-menu{background-color:#222;box-shadow:0 1px 7px -1px #000000a1}.md-dropdown-menu>li{width:100%;height:40px;line-height:40px;text-align:center;margin:5px 0!important;user-select:none;cursor:pointer;transition:.3s}html .md-dropdown-menu>li{color:#333}html.dark .md-dropdown-menu>li{color:#fff}html .md-dropdown-menu>li:active{background-color:#00000013}html.dark .md-dropdown-menu>li:active{background-color:#ffffff13}.md-closeMenu,.md-swipeY .md-dropdown-menu{width:0;height:0}.md-ua-smp .md-button[md-jsaction=menu]{display:block}.md-ua-smp .md-button[md-jsaction=close],.md-ua-smp .md-button[md-jsaction=next],.md-ua-smp .md-button[md-jsaction=prev]{display:none}';
  document.head.appendChild(elemStyle);
}

// 画像ビュアーの基礎を追加 /////////////////////////////////////////////////////
function addMediaViewer(){
  if(!document.getElementById('md-media-viewer')){
    // 要素の作成
    const elemMediaViewer = document.createElement('div');
    elemMediaViewer.setAttribute('id', 'md-media-viewer');
    elemMediaViewer.setAttribute('style', 'display: none;');
    elemMediaViewer.insertAdjacentHTML('beforeend', '<div class="md-media-container"><div class="md-img-container"></div></div><div class="md-button-container"><div class="md-button md-btnCir" md-jsaction="menu"><i class="icon icon-more"></i></div><ul class="md-dropdown-menu md-closeMenu"><li class="md-button md-btnSqr" md-jsaction="save">保存</li></ul><div class="md-button md-btnCir" md-jsaction="next"><i class="icon icon-arrow-r"></i></div><div class="md-button md-btnCir" md-jsaction="prev"><i class="icon icon-arrow-l"></i></div><div class="md-button md-btnCir" md-jsaction="close"><i class="icon icon-close"></i></div></div>');
    // イベントを追加
    elemMediaViewer.addEventListener('click', fncClick, {passive: false});
    elemMediaViewer.addEventListener('wheel', fncWheel, {passive: false});
    elemMediaViewer.addEventListener('touchstart', fncTouchStart, {passive: false});
    elemMediaViewer.addEventListener('touchmove', fncTouchMove, {passive: false});
    elemMediaViewer.addEventListener('touchend', fncTouchEnd, {passive: false});
    // bodyに追加
    return document.body.appendChild(elemMediaViewer);
  }
};

let mediaViewer;
let urlLength = 1;
let imgContainer;
let nowIndex;
// 画像ビュアーを開く ///////////////////////////////////////////////////////////
function openImageViewer(urlArray, firstIdx){
  // 画像の枚数
  urlLength = urlArray.length;
  if(urlLength === 0) return;

  /*** 初期値を設定 ***/
  maxTransX = window.innerWidth * (urlLength - 1) * -1;
  nowIndex = firstIdx;
  /*******************/

  // 画像ビュアーがなければ追加
  if(!mediaViewer) mediaViewer = addMediaViewer();

  // ユーザーエージェントからスマホかどうか判定する
  if(navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/i)){
    mediaViewer.classList.add('md-ua-smp');
  }else{
    mediaViewer.classList.remove('md-ua-smp');
  }

  // container を取得
  imgContainer = mediaViewer.querySelector('div.md-img-container');
  // container の子要素を全て削除
  while(imgContainer.firstChild){
    imgContainer.removeChild(imgContainer.firstChild);
  }
  // 画像を container に追加
  for(let i = 0; i < urlLength; i++){
    // img.md-img を作成
    const img = document.createElement('img');
    img.classList.add('md-img', 'md-loadingImg');
    img.style.transform = 'scale(1) translate3d(0px, 0px, 0px)';
    img.src = urlArray[i];
    // 画像のロード中は .md-loadingImg が付いてるので、ロード後に消すイベントを追加
    img.addEventListener('load', (e)=>{e.target.classList.remove('md-loadingImg');});
    // div.md-img-item を作成
    const imgItem = document.createElement('div');
    imgItem.classList.add('md-img-item');
    imgItem.appendChild(img);
    // ロード中のアニメーションを追加
    imgItem.insertAdjacentHTML('beforeend', '<div class="md-spinner"><div class="md-spinner-b1"></div><div class="md-spinner-b2"></div></div>');
    // div.md-img-item を container に追加
    imgContainer.appendChild(imgItem);
  }

  // スクロールさせる値
  const scrollX = window.innerWidth * firstIdx * -1;
  // X軸をスクロール
  imgContainer.style.transform = `translate3d(${scrollX}px, 0px, 0px)`;
  // 画像の表示位置からボタンを表示させるかどうか
  const nextBtn = mediaViewer.querySelector('div.md-button[md-jsaction="next"]');
  const prevBtn = mediaViewer.querySelector('div.md-button[md-jsaction="prev"]');
  if(nextBtn && prevBtn){
    nextBtn.classList.remove('md-btnHide');
    prevBtn.classList.remove('md-btnHide');
    if(urlLength <= 1){
      nextBtn.classList.add('md-btnHide');
      prevBtn.classList.add('md-btnHide');
    }else if(firstIdx <= 0){
      prevBtn.classList.add('md-btnHide');
    }else if(urlLength - 1 <= firstIdx){
      nextBtn.classList.add('md-btnHide');
    }
  }

  // 既存の画像ビュアーを閉じる
  if(document.getElementById('open-modal').style.display !== 'block'){
    setTimeout(()=>{
      const viewer = document.getElementById('open-modal');
      // viewer の子要素を全て削除
      while(viewer.firstChild){
        viewer.removeChild(viewer.firstChild);
      }
      viewer.style.display = 'none';
    }, 0);
  }

  // 画像ビュアーを表示
  mediaViewer.style.display = 'block';
}

// 画像ビュアーを閉じる /////////////////////////////////////////////////////////
function closeImageViewer(){
  // 画像ビュアーを取得
  const mdImgViewer = document.getElementById('md-media-viewer');
  if(!mdImgViewer) return;
  // 画像ビュアーを非表示
  mdImgViewer.style.display = 'none';
  // クラスを削除
  mdImgViewer.classList.remove('md-swipeY');
  // container を取得
  const mdImgContainer = mdImgViewer.querySelector('.md-img-container');
  if(!mdImgContainer) return;
  // container の子要素を全て削除
  while(mdImgContainer.firstChild){
    mdImgContainer.removeChild(mdImgContainer.firstChild);
  }

  // classをリセット
  mdImgViewer.classList.remove('md-swipeY');
  const mdDropdownMenu = mediaViewer.querySelector('ul.md-dropdown-menu');
  if(mdDropdownMenu) mdDropdownMenu.classList.add('md-closeMenu');
}

// 画像サイズ大のURLに変換
function changeImgSize(src, size){
  if(!src || !size) return;
  return src.replace(/&name=.+/, `&name=${size}`);
}

// クリック時 //////////////////////////////////////////////////////////////////
document.body.addEventListener('click', (e)=>{
  const target = e.target;
  // 祖先要素の div.media-preview を取得（ツイート）
  const preview = target.closest('div.media-preview');
  // プロフィール
  const mdPrf = target.closest('div.md-prf');

  if(!preview && !mdPrf) return;

  // URLリスト
  let urlArray = [];
  // クリックした画像の index
  let firstIdx = 0;

  try{
    // ツイートの画像かプロフィールの画像か
    if(preview){
      // 画像を探す
      const mediaImages = preview.querySelectorAll('a[rel="mediaPreview"]');
      if(!mediaImages) return;
      // 1枚か複数枚か判断
      if(mediaImages.length === 1){
        /*** 1枚の時 ***/
        // href削除
        mediaImages[0].removeAttribute('href');
        // URLを取得
        let imgSrc;
        if(mediaImages[0].children.length > 0){
          /*** imgタグが存在する場合 ***/
          imgSrc = mediaImages[0].children[0].src.match(/(https:.+format=.+)/)[1];
        }else{
          /*** imgタグが存在しない場合 ***/
          imgSrc = mediaImages[0].style.backgroundImage.match(/url\(\"(https:.+format=.+)\"\)/)[1];
        }
        // 画像サイズ大の時のURLに変換
        imgSrc = changeImgSize(imgSrc, 'large');
        // URLリストに追加
        urlArray.push(imgSrc);
      }else{
        /*** 複数枚の時 ***/
        for(let i = 0; i < mediaImages.length; i++){
          // href削除
          mediaImages[i].removeAttribute('href');
          // URLを取得
          let imgSrc = mediaImages[i].style.backgroundImage.match(/url\(\"(https:.+format=.+)\"\)/)[1];
          // 画像サイズ大のURLに変換
          imgSrc = changeImgSize(imgSrc, 'large');
          // URLリストに追加
          urlArray.push(imgSrc);
          // target と一致するかどうか
          if(mediaImages[i] === target){
            firstIdx = i;
          }
        }
      }
    }else if(mdPrf){
      // // URLを取得
      // const imgSrc = target.getAttribute('data-hqimg');
      // URLを取得
      let imgSrc;
      if(target.classList.contains('avatar')){
        imgSrc = target.src.replace(/(https:\/\/pbs.twimg.com\/profile_images\/\w+\/.{8})_[^\.]+\.(\w+)/, '$1.$2');
      }else{
        imgSrc = target.src.replace(/(https:\/\/pbs.twimg.com\/profile_banners\/\w+\/\w+)\/.+/, '$1');
      }
      // URLリストに追加
      urlArray.push(imgSrc);
    }

    // 画像ビュアーを開く
    openImageViewer(urlArray, firstIdx);
  }catch(e){}
}, {passive: true});

// 2点間の座標からスワイプした向きを計算する /////////////////////////////////////
function getDirection(start, move){
  const sx = start.x, sy = start.y;
  const mx = move.x, my = move.y;

  if(Math.abs(my - sy) <= Math.abs(mx - sx)){
    /*** 左右にスワイプ ***/
    if(sx < mx){  // 右
      return -1;
    }else{        // 左
      return -2;
    }
  }else{
    /*** 上下にスワイプ ***/
    if(sy < my){  // 下
      return 2;
    }else{        // 上
      return 1;
    }
  }
}
// .md-img-container の translate3d を数値型の配列で返す ////////////////////////
function getTranslate3d(t){
  try{
    const transform = t.style.transform;
    let resultTranslate3d = transform.match(/[-|\d|\.]+px/g);
    if(resultTranslate3d){
      // 数値に変換
      for(let i = 0; i < resultTranslate3d.length; i++){
        resultTranslate3d[i] = parseFloat(resultTranslate3d[i].replace('px', ''));
      }
      return resultTranslate3d;
    }
  }catch(e){}
}
// 2点間の距離を計算（2乗した状態で返す） ////////////////////////////////////////
function getDistance(start, move){
  const diffX = Math.abs(move.x - start.x);
  const diffY = Math.abs(move.y - start.y);
  return ((diffX * diffX) + (diffY * diffY));
}
// 引数で指定した位置に画像をスクロール（0～3） //////////////////////////////////
function scrollImg(idx){
  try{
    const sx = window.innerWidth * idx * -1;
    imgContainer.style.transform = `translate3d(${sx}px, 0px, 0px)`;
    cTranslate3d = [sx, 0, 0];
  }catch(e){}
}
// 次の画像 ////////////////////////////////////////////////////////////////////
function scrollImgNext(o){
  // ボタンを表示
  if(urlLength !== 1){
    const prevBtn = mediaViewer.querySelector('div.md-button[md-jsaction="prev"]');
    if(prevBtn) prevBtn.classList.remove('md-btnHide');
  }
  // スクロール
  if(nowIndex < urlLength - 1){
    imgContainer.classList.remove(`md-smooth${o ? '' : '-pc'}`);
    imgContainer.classList.add(`md-smooth${o ? '-pc' : ''}`);
    scrollImg(++nowIndex);
    // ボタンを非表示
    if(urlLength !== 1 && urlLength - 1 <= nowIndex){
      const nextBtn = mediaViewer.querySelector('div.md-button[md-jsaction="next"]');
      if(nextBtn) nextBtn.classList.add('md-btnHide');
    }
  }
}
// 前の画像 ////////////////////////////////////////////////////////////////////
function scrollImgPrev(o){
  // ボタンを表示
  if(urlLength !== 1){
    const nextBtn = mediaViewer.querySelector('div.md-button[md-jsaction="next"]');
    if(nextBtn) nextBtn.classList.remove('md-btnHide');
  }
  // スクロール
  if(nowIndex > 0){
    imgContainer.classList.remove(`md-smooth${o ? '' : '-pc'}`);
    imgContainer.classList.add(`md-smooth${o ? '-pc' : ''}`);
    scrollImg(--nowIndex);
    // ボタンを非表示
    if(urlLength !== 1 && nowIndex <= 0){
      const prevBtn = mediaViewer.querySelector('div.md-button[md-jsaction="prev"]');
      if(prevBtn) prevBtn.classList.add('md-btnHide');
    }
  }
}
// 現在表示されてる画像を取得 ///////////////////////////////////////////////////
function getImage(idx){
  const images = mediaViewer.querySelectorAll('img.md-img');
  return ((images) ? (images[idx] ? images[idx] : null) : null);
}
// ドロップダウンメニューの表示・非表示 //////////////////////////////////////////
function openDropdownMenu(){
  const mdDropdownMenu = mediaViewer.querySelector('ul.md-dropdown-menu');
  if(mdDropdownMenu) mdDropdownMenu.classList.remove('md-closeMenu');
}
function closeDropdownMenu(){
  const mdDropdownMenu = mediaViewer.querySelector('ul.md-dropdown-menu');
  if(mdDropdownMenu) mdDropdownMenu.classList.add('md-closeMenu');
}

// タッチ対象要素
let targetImg;
// 対象画像の情報
let targetInfo;
// .md-img-item
let imgItem;
// 初回タッチ時の座標
let startPoint;
// 初回タッチ時の時間
let startTime;
// タッチ中の座標
let movePoint;
// スワイプ方向
let swipeDir;
// transform: translate3d
let cTranslate3d;
let iTranslate3d;
// .md-img-container のXY軸
let cTranslateX;
let cTranslateY;
// .md-img のXY軸
let iTranslateX;
let iTranslateY;
// translateX の最大値（上限）
let maxTransX;
// ダブルタップ用
let tapCount = 0;
let tap_timeout;
let tap_tempPoint;
let flgMove;
// scale
let nowScale = 1;
////////////////////////////////////////////////////////////////////////////////
function fncTouchStart(e){
  if(e.target.closest('.md-button')) return;
  e.preventDefault();

  // ドロップダウンメニューを閉じる
  closeDropdownMenu();

  // 現在表示されてる画像を取得
  targetImg = getImage(nowIndex);
  if(!targetImg) return;

  const touches = e.touches;
  // 初回タッチ時の座標
  startPoint = {
    x: touches[0].pageX,
    y: touches[0].pageY
  };
  movePoint = startPoint;
  // 初回タッチ時の時間
  startTime = new Date();

  // transform: translate3d を取得
  cTranslate3d = getTranslate3d(imgContainer);
  iTranslate3d = getTranslate3d(targetImg);

  // scale を取得
  nowScale = parseFloat(targetImg.style.transform.match(/scale\(([^\)]+)\)/)[1]);

  if(!tap_tempPoint) tap_tempPoint = startPoint;
  // ダブルタップ
  if(!tapCount){
    tapCount++;
    if(tap_timeout) { clearTimeout(tap_timeout); }
    tap_timeout = setTimeout(()=>{
      tapCount = 0;
      tap_tempPoint = null;
    }, 200);
  }else{
    if(Math.abs(tap_tempPoint.x - startPoint.x) < 50 && Math.abs(tap_tempPoint.y - startPoint.y) < 50){
      targetImg.classList.remove('md-dragging');
      if(nowScale === 1){
        /*** ズーム ***/
        nowScale = 2;
        targetImg.style.transform = `scale(${nowScale}) translate3d(0px, 0px, 0px)`;
      }else{
        /*** 元の倍率に戻す ***/
        nowScale = 1;
        targetImg.style.transform = `scale(${nowScale}) translate3d(0px, 0px, 0px)`;
      }
    }
    tapCount = 0;
    tap_tempPoint = null;
  }
}
////////////////////////////////////////////////////////////////////////////////
function fncTouchMove(e){
  if(e.target.closest('.md-button')) return;
  e.preventDefault();

  if(!imgContainer || !targetImg) return;
  const touches = e.touches;
  // 1点タッチかどうか
  if(touches.length === 1){
    // タッチした座標
    movePoint = {
      x: touches[0].pageX,
      y: touches[0].pageY
    };

    if(nowScale === 1){
      /*** ズームしてない時 **/
      // スワイプ方向を取得
      if(!swipeDir){
        if(20 < getDistance(startPoint, movePoint)){
          // スワイプした向きを取得
          swipeDir = getDirection(startPoint, movePoint);
          // アニメーション削除
          imgContainer.classList.remove('md-smooth');
          imgContainer.classList.remove('md-smooth-pc');
        }
      }else if(swipeDir < 0){ // 左右
        // セットするX軸の値
        cTranslateX = cTranslate3d[0] + (movePoint.x - startPoint.x);
        // はみ出さないようにする
        if(cTranslateX > 0) cTranslateX = 0;
        if(maxTransX > cTranslateX) cTranslateX = maxTransX;
        // 値をセット
        imgContainer.style.transform = `translate3d(${cTranslateX}px, 0px, 0px)`;
      }else{  // 上下
        mediaViewer.classList.add('md-swipeY');
        // セットするY軸の値
        cTranslateY = cTranslate3d[1] + (movePoint.y - startPoint.y);
        // 値をセット
        imgContainer.style.transform = `translate3d(${cTranslate3d[0]}px, ${cTranslateY}px, 0px)`;
      }
    }else{
      /*** ズーム中 ***/
      if(!iTranslate3d) return;

      // ある程度のあそびを作っておく
      if(!flgMove){
        if(Math.abs(movePoint.x - startPoint.x) >= 13 && Math.abs(movePoint.y - startPoint.y) >= 13){
          flgMove = true;
        }
      }
      // 画像をドラッグ
      if(flgMove){
        targetImg.classList.add('md-dragging');
        iTranslateX = iTranslate3d[0] + (movePoint.x - startPoint.x) / nowScale;
        iTranslateY = iTranslate3d[1] + (movePoint.y - startPoint.y) / nowScale;
        targetImg.style.transform = `scale(${nowScale}) translate3d(${iTranslateX}px, ${iTranslateY}px, 0px)`;
      }
    }
  }else{

  }
}
////////////////////////////////////////////////////////////////////////////////
function fncTouchEnd(e){
  if(e.target.closest('.md-button')) return;
  e.preventDefault();

  if(nowScale === 1){
    const time = new Date() - startTime;
    const speed = Math.sqrt(getDistance(startPoint, movePoint)) / (time / 1000);
    // 高速スワイプなら
    if(time < 200 && speed > 700){
      if(swipeDir < 0){ // 左右
        if(swipeDir === -2){ // 左（次の画像）
          scrollImgNext(false);
        }else{  // 右（前の画像）
          scrollImgPrev(false);
        }
      }else{ // 上下
        // アニメーション追加
        mediaViewer.classList.add('md-swipeY');
        imgContainer.classList.remove('md-smooth-pc');
        imgContainer.classList.add('md-smooth');
        if(swipeDir === 1){ // 上
          imgContainer.style.transform = `translate3d(${cTranslate3d[0]}px, ${window.innerHeight * -1}px, 0px)`;
        }else{  // 下
          imgContainer.style.transform = `translate3d(${cTranslate3d[0]}px, ${window.innerHeight}px, 0px)`;
        }
        setTimeout(closeImageViewer, 200);
      }
    }else{
      // 画像の表示位置を自動スクロール
      if(swipeDir < 0){ // 左右
        const diffX = window.innerWidth * 0.5;
        const width = window.innerWidth * -1;
        for(let i = 1; i <= urlLength; i++){
          nowIndex = i - 1;
          const refX = width * i + diffX;
          if(refX < cTranslateX){
            // アニメーション追加
            imgContainer.classList.remove('md-smooth-pc');
            imgContainer.classList.add('md-smooth');
            // 座標セット
            imgContainer.style.transform = `translate3d(${refX + diffX}px, 0px, 0px)`;
            break;
          }
        }
      }else if(swipeDir > 0){ // 上下
        // アニメーション追加
        imgContainer.classList.remove('md-smooth-pc');
        imgContainer.classList.add('md-smooth');
        // 座標セット
        const refY = window.innerHeight * 0.5;
        if(refY * -1 < cTranslateY && cTranslateY < refY){
          mediaViewer.classList.remove('md-swipeY');
          imgContainer.style.transform = `translate3d(${cTranslate3d[0]}px, 0px, 0px)`;
        }else{
          if(refY <= cTranslateY){ // 下
            imgContainer.style.transform = `translate3d(${cTranslate3d[0]}px, ${window.innerHeight}px, 0px)`;
          }else{  // 上
            imgContainer.style.transform = `translate3d(${cTranslate3d[0]}px, ${window.innerHeight * -1}px, 0px)`;
          }
          // アニメーションが終わるタイミングで画像ビュアーを閉じる
          setTimeout(closeImageViewer, 200);
        }
      }
    }
  }

  movePoint = null;
  startPoint = null;
  startTime = null;
  swipeDir = null;
  cTranslate3d = null;
  iTranslate3d = null;
  flgMove = false;
}
////////////////////////////////////////////////////////////////////////////////
function fncClick(e){
  e.preventDefault();

  // ドロップダウンメニューを閉じる
  closeDropdownMenu();
  // ボタンを取得
  const mdButton = e.target.closest('.md-button');
  if(!mdButton) return;
  // ボタンに割り当てられたアクションを取得
  const action = mdButton.getAttribute('md-jsaction');
  switch(action){
    case 'menu':
      openDropdownMenu();
      break;
    case 'save':
      const img = getImage(nowIndex);
      if(img && img.getAttribute('src')){
        console.log(`download:${img.getAttribute('src')}`);
      }
      break;
    case 'next':
      if(nowScale === 1) scrollImgNext(true);
      break;
    case 'prev':
      if(nowScale === 1) scrollImgPrev(true);
      break;
    case 'close':
      closeImageViewer();
      break;
    default: break;
  }
}
////////////////////////////////////////////////////////////////////////////////
/*** PC用（キーボード, マウス操作） ***/
document.body.addEventListener('keydown', (e)=>{
  if(mediaViewer && mediaViewer.style.display == 'block'){
    e.preventDefault();
    const key = e.key;
    if(key === 'c'){
      closeImageViewer();
    }
    if(nowScale !== 1) return;
    if(key === 'ArrowRight'){ // 次の画像
      scrollImgNext(true);
    }else if(key === 'ArrowLeft'){  // 前の画像
      scrollImgPrev(true);
    }else if(key === 'ArrowUp'){
      mediaViewer.classList.add('md-swipeY');
      imgContainer.classList.remove('md-smooth');
      imgContainer.classList.add('md-smooth-pc');
      imgContainer.style.transform = `translate3d(${window.innerWidth * nowIndex * -1}px, ${window.innerHeight * -1 - 1}px, 0px)`;
      setTimeout(closeImageViewer, 200);
    }else if(key === 'ArrowDown'){
      mediaViewer.classList.add('md-swipeY');
      imgContainer.classList.remove('md-smooth');
      imgContainer.classList.add('md-smooth-pc');
      imgContainer.style.transform = `translate3d(${window.innerWidth * nowIndex * -1}px, ${window.innerHeight + 1}px, 0px)`;
      setTimeout(closeImageViewer, 200);
    }
  }
}, {passive: false});
////////////////////////////////////////////////////////////////////////////////
function fncWheel(e){
  targetImg = getImage(nowIndex);
  if(!targetImg) return;

  const mx = e.clientX;
  const my = e.clientY;
  if(targetImg.classList.contains('md-img')){
    nowScale = parseFloat(targetImg.style.transform.match(/scale\(([^\)]+)\)/)[1]);
    // ズーム
    if(e.wheelDeltaY > 0){
      const s = nowScale + 0.2;
      nowScale = (s <= 5) ? s : 5;
      targetImg.style.transform = `scale(${nowScale}) translate3d(0px, 0px, 0px)`;
    }else if(e.wheelDeltaY < 0){
      const s = nowScale - 0.2;
      nowScale = (s >= 1) ? s : 1;
      targetImg.style.transform = `scale(${nowScale}) translate3d(0px, 0px, 0px)`;
    }
    // 移動
    if(nowScale !== 1) return;
    if(e.wheelDeltaX > 0){
      scrollImgPrev(true);
    }else if(e.wheelDeltaX < 0){
      scrollImgNext(true);
    }
  }
}
////////////////////////////////////////////////////////////////////////////////
