// 画像ビュワー用CSS
if (document.getElementById('md-ImgViewer-style') == null) {
const styleElem = document.createElement('style');
styleElem.setAttribute('id', 'md-ImgViewer-style');
styleElem.setAttribute('type', 'text/css');
styleElem.innerHTML = '#md-media-viewer{display:none;position:fixed;top:0;left:0;z-index:998;width:auto;height:100vh;background:#14171a77;transition-property:background,top;transition:0s}#md-media-viewer.md-swipeY{background:#0000}#md-media-viewer.md-swipeClose{transition:.2s}.md-media-container,.md-img-container{width:100%;height:100%}.md-img-container{display:flex;flex-direction:row;flex-wrap:nowrap;justify-content:flex-start;overflow-x:scroll}#md-media-viewer.md-smooth{transition:left .12s linear}.md-img-item{position:relative;width:100vw;height:100%;min-width:100vw;min-height:100%}.md-img{width:100%;height:100%;object-fit:contain;transform:scale(1);transition:.2s}.md-img.md-dragging,.md-img.md-pinchInOut{transition:0s}.md-button{position:fixed;top:13px;right:13px;z-index:99;width:40px;height:40px;margin:0;padding:0;line-height:35px;text-align:center;background-color:#00000090;border-radius:50%;transform:rotate(90deg)}.md-button>i{width:40px !important;height:40px !important;line-height:37px !important;font-size:30px !important;vertical-align:unset !important;color:#ffffffc4}.md-dropdown-menu{position:fixed;top:13px;right:13px;z-index:100;width:140px;height:50px;border-radius:7px;overflow:hidden;transition:.2s}html .md-dropdown-menu{background-color:#fff;box-shadow:0 1px 7px -1px #00000050}html .md-dropdown-menu>li:hover+html .md-dropdown-menu,html .md-dropdown-menu>li:active+html .md-dropdown-menu{background-color:#fff}html.dark .md-dropdown-menu{background-color:#222;box-shadow:0 1px 7px -1px #000000a1}html.dark .md-dropdown-menu>li:hover+html.dark .md-dropdown-menu,html.dark .md-dropdown-menu>li:active+html.dark .md-dropdown-menu{background-color:#fff}.md-dropdown-menu>li{width:100%;height:40px;line-height:40px;text-align:center;margin:5px 0 !important;user-select:none;transition:.1s}html .md-dropdown-menu>li{color:#333}html.dark .md-dropdown-menu>li{color:#fff}.md-swipeY .md-dropdown-menu,.md-closeMenu{width:0;height:0}';
document.head.appendChild(styleElem);
}

// 画像表示用
function addMediaViewer() {
  if (document.getElementById('md-media-viewer') === null) {
    const mediaViewer = document.createElement('div');
    mediaViewer.setAttribute('id', 'md-media-viewer');
    mediaViewer.setAttribute('style', 'display: none;');
    mediaViewer.innerHTML = '<div class=\"md-media-container\"><div class=\"md-img-container\"></div></div><div class=\"md-button-container\"><div class=\"md-button\" md-jsaction=\"menu\"><i class=\"icon icon-more\"></i></div><ul class=\"md-dropdown-menu md-closeMenu\"><li md-jsaction=\"save\">保存</li><li md-jsaction=\"save-png\">PNG形式で保存</li></ul></div>';
    document.body.appendChild(mediaViewer);
  }
};
addMediaViewer();

// クリック時 イベント
document.body.addEventListener('click', function(e){
  const target = e.target;
  const hoge = (target.tagName == 'A') ? (target) : (target.parentNode);
  if(hoge.classList.contains('js-media-image-link')){
    let option = false;
    if($('#open-modal').style.display == 'block'){
      option = true;
    }

    hoge.removeAttribute('href');

    let src = [];
    if(hoge.children.length == 0){
      const imgContainElem = target.closest('.media-image-container');
      if(imgContainElem){
        const containParent = imgContainElem.closest('div[class*=\"media-grid-\"]');
        let images = containParent.children;
        images = [].slice.call(images);
        const imgIndex = images.indexOf(imgContainElem);

        const imgLen = images.length;
        for(let i = 0; i < imgLen; i++){
          let backImg = images[i].children[0].style.backgroundImage;
          let imgSrc = backImg.match(/url\(\"(https:.+format=.+)\"\)/)[1];
          imgSrc = imgSrc.replace(/&name=.+/, '&name=large');
          src.push(imgSrc);
        }
        openImageViewer(src, imgIndex, option);
      }else{
        let backImg = target.style.backgroundImage;
        let imgSrc = backImg.match(/url\(\"(https:.+format=.+)\"\)/)[1];
        imgSrc = imgSrc.replace(/&name=.+/, '&name=large');
        src.push(imgSrc);
        openImageViewer(src, 0, option);
      }
    }else{
      let imgSrc = hoge.children[0].getAttribute('src').match(/(https:.+format=.+)/)[1];
      imgSrc = imgSrc.replace(/&name=.+/, '&name=large');
      src.push(imgSrc);
      openImageViewer(src, 0, option);
    }
  }
}, {passive: true});

let closeModal_timeout;
function openImageViewer(imgSrc, firstIdx, option){
  if(imgSrc.length <= 0){ return; }
  if(closeModal_timeout) { clearTimeout(closeModal_timeout); }
  // ビュアー取得
  let mediaViewer = $('#md-media-viewer');

  // ビュアーがない場合
  if (mediaViewer === null) {
    addMediaViewer();
    mediaViewer = $('#md-media-viewer');
  }

  // ビュアーが非表示だったら
  if (mediaViewer && mediaViewer.style.display == 'none') {
    // 表示
    mediaViewer.style.display = 'block';

    const imgContainer = $('#md-media-viewer .md-img-container');

    let imgElems = '';
    for (let i = 0; i < imgSrc.length; i++){
      imgElems += '<div class=\"md-img-item\" style=\"left:0px;\"><img class=\"md-img\" src=\"' + imgSrc[i] + '\" style=\"transform:scale(1);position:relative;top:0;left:0;\"></div>'
    }

    imgContainer.innerHTML = imgElems;

    SnapImgIdx(firstIdx);

    if(!option){
      closeModal_timeout = setTimeout(function(){
        let opemModal = $('#open-modal');
        opemModal.innerHTML = '';
        opemModal.style.display = 'none';
      }, 0);
    }
  }
}

function $(s) { return document.querySelector(s); }
function $$(s) { return document.querySelectorAll(s); }
function setOrigin(t, v1, v2, s){
  const tElem = t.element;
  if(!tElem) return;

  const tWidth = tElem.width * s;
  const tHeight = tElem.height * s;
  const maxW = (tWidth - window.innerWidth) / 2;
  const maxH = (tHeight - window.innerHeight) / 2;

  let setX = v1;
  let setY = v2;

  if(maxW < 0){
    setX = 0;
  }else if(maxW < setX){
    setX = maxW;
  }else if(setX < (maxW * -1)){
    setX = (maxW * -1);
  }
  if(maxH < 0){
    setY = 0;
  }else if(maxH < setY){
    setY = maxH;
  }else if(setY < (maxH * -1)){
    setY = (maxH * -1);
  }

  tElem.style.left = setX + 'px';
  tElem.style.top = setY + 'px';
}
function getOrigin(t){
  const tElem = t.element;
  if(!tElem) return;
  const tLeft = tElem.style.left;
  const tTop = tElem.style.top;
  if(tLeft && tTop){
    return { x: parseFloat(tLeft.replace('px', '')), y: parseFloat(tTop.replace('px', '')) };
  }else{
    return { x: 0, y: 0 };
  }
}

function setScale(t, v){
  const tElem = t.element;
  if(!tElem) return;
  if(v <= 0.5){
    v = 0.5;
  }else if(5 <= v){
    v = 5;
  }
  tElem.style.transform = `scale(${v})`;
}
function getScale(t){
  const tElem = t.element;
  const tTrans = tElem.style.transform;
  if(tElem && tTrans){
    return parseFloat(getComputedStyle(tElem, null).getPropertyValue('transform').match(/matrix\(([^,]+),.+\)/)[1]);
  }else{
    return null;
  }
}
function getScaleElem(elem){
  const tTrans = elem.style.transform;
  if(elem && tTrans){
    return parseFloat(getComputedStyle(elem, null).getPropertyValue('transform').match(/matrix\(([^,]+),.+\)/)[1]);
  }else{
    return null;
  }
}

function getDistance(e){
  if(!e) return;
  const touches = e.changedTouches;
  if(touches.length > 1){
    const t1 = { x: touches[0].pageX, y: touches[0].pageY };
    const t2 = { x: touches[1].pageX, y: touches[1].pageY };
    const distX = t2.x - t1.x;
    const distY = t2.y - t1.y;
    return Math.sqrt(distX * distX + distY * distY);
  }
  return 0;
}

function isImg(e){ if(!e) return; return (e.target.tagName == 'IMG'); }

function isDragging(t){
  const tElem = t.element;
  if(!tElem) return;
  return tElem.classList.contains('md-dragging');
}
function setDragging(t){
  const tElem = t.element;
  if(!tElem) return;
  tElem.classList.add('md-dragging');
}
function unsetDragging(t){
  const tElem = t.element;
  if(!tElem) return;
  tElem.classList.remove('md-dragging');
}

function setPinchInOut(t){
  const tElem = t.element;
  if(!tElem) return;
  tElem.classList.add('md-pinchInOut');
}
function unsetPinchInOut(t){
  const tElem = t.element;
  if(!tElem) return;
  tElem.classList.remove('md-pinchInOut');
}

function isZoom(t){
  const tElem = t.element;
  if(!tElem) return;
  return t.element.classList.contains('md-isZoom');
}
function setZoom(t){
  const tElem = t.element;
  if(!tElem) return;
  tElem.classList.add('md-isZoom');
}
function unsetZoom(t){
  const tElem = t.element;
  if(!tElem) return;
  tElem.classList.remove('md-isZoom');
}

function isSwipeY(){
  const viewer = $('#md-media-viewer');
  if(!viewer) return;
  return viewer.classList.contains('md-swipeY');
}
function setSwipeY(){
  const viewer = $('#md-media-viewer');
  if(!viewer) return;
  viewer.classList.add('md-swipeY');
}
function unsetSwipeY(){
  const viewer = $('#md-media-viewer');
  if(!viewer) return;
  viewer.classList.remove('md-swipeY');
}

function setClose(){
  const viewer = $('#md-media-viewer');
  if(!viewer) return;
  viewer.classList.add('md-swipeClose');
}
function unsetClose(){
  const viewer = $('#md-media-viewer');
  if(!viewer) return;
  viewer.classList.remove('md-swipeClose');
}

function getPoint1(e) {
  if(!e) return;
  const touches = e.touches[0];
  return { x: touches.pageX, y: touches.pageY};
}
function getPoint2(e) {
  if(!e) return;
  const touches = e.touches[1];
  return { x: touches.pageX, y: touches.pageY};
}
function getChangedPoint1(e) {
  if(!e) return;
  const touches = e.changedTouches[0];
  return { x: touches.pageX, y: touches.pageY};
}
function getChangedPoint2(e) {
  if(!e) return;
  const touches = e.changedTouches[1];
  return { x: touches.pageX, y: touches.pageY};
}
function getCenterPoint(e){
  const p1 = getPoint1(e);
  const p2 = getPoint2(e);
  if(!p1 || !p2) return;
  const cX = ((p1.x < p2.x) == true) ? (p1.x + ((p2.x - p1.x) / 2)) : (p2.x + ((p1.x - p2.x) / 2));
  const cY = ((p1.y < p2.y) == true) ? (p1.y + ((p2.y - p1.y) / 2)) : (p2.y + ((p1.y - p2.y) / 2));
  return { x: cX, y: cY };
}

function getImgSize(t){
  if(!t) return;
  let elemWidth = t.width;
  let elemHeight = t.height;
  const imgWidth = t.naturalWidth;
  const imgHeight = t.naturalHeight;

  let imgRatio = 0;
  let horizon = false;
  if(imgWidth > imgHeight){
    imgRatio = imgHeight / imgWidth;
    horizon = true;
  }else{
    imgRatio = imgWidth / imgHeight;
    horizon = false;
  }

  let elemRatio = 0;
  if(elemWidth > elemHeight){
    elemRatio = elemHeight / elemWidth;
  }else{
    elemRatio = elemWidth / elemHeight;
  }

  if(elemRatio > imgRatio){
    if(horizon){
      elemWidth = Math.round(elemHeight / imgRatio);
    }else{
      elemWidth = Math.round(elemHeight * imgRatio);
    }
  }else if(imgRatio > elemRatio){
    if(horizon){
      elemHeight = Math.round(elemWidth * imgRatio);
    }else{
      elemHeight = Math.round(elemWidth / imgRatio);
    }
  }

  return { width: elemWidth, height: elemHeight };
}

function getTargetImgInfo(e){
  const tElem = e.target;
  if(!e || !isImg(e)) return { element: null, width: 0, height: 0 };
  const size = getImgSize(tElem);
  let items = $$('#md-media-viewer div.md-img-item');
  items = [].slice.call(items);
  const item = tElem.closest('.md-img-item');
  const itemIndex = items.indexOf(item);
  return { element: tElem, order: itemIndex, width: size.width, height: size.height };
}

function getCenter(t){
  const tElem = t.element;
  const tScale = getScale(t);
  const tOrigin = getOrigin(t);
  return { x: (tOrigin.x * tScale + tElem.width) / 2, y: (tOrigin.y * tScale + tElem.height) / 2 };
}

function ScrollImg(val, behavior){
  const viewer = $('#md-media-viewer');
  if(!viewer) return;
  let left = val;
  const lMax = (viewer.offsetWidth - window.innerWidth) * -1;
  if(0 < left){
    left = 0;
  }else if(left < lMax){
    left = lMax;
  }
  if(behavior == 'instant'){
    viewer.classList.remove('md-smooth');
  }else if(behavior == 'smooth'){
    viewer.classList.add('md-smooth');
  }
  viewer.style.left = left + 'px';
}
function SnapImg(){
  const viewer = $('#md-media-viewer');
  const itemWidth = window.innerWidth;
  const itemTotal = viewer.offsetWidth / itemWidth;
  const nowLeft = parseFloat(viewer.style.left);
  let snapRef = [];

  for(let i = 0; i <= itemTotal - 1; i++){
    snapRef.push(itemWidth / 2 + itemWidth * i);
  }

  for(let i = itemWidth; i <= itemWidth * itemTotal; i += itemWidth){
    let index = i / itemWidth - 1;
    if(snapRef[index] >= nowLeft * -1){
      ScrollImg(itemWidth * index * -1, 'smooth');
      return;
    }
  }
}
function SnapImgNext(t){
  ScrollImg(window.innerWidth * ++t.order * -1, 'smooth');
}
function SnapImgPrev(t){
  ScrollImg(window.innerWidth * --t.order * -1, 'smooth');
}
function SnapImgIdx(idx){
  ScrollImg(window.innerWidth * idx * -1, 'instant');
}

function calcDistance(p1, p2){
  if(!p1 || !p2) return 0;
  return Math.sqrt((p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y));
}

function calcSpeed(s, e, st, et){
  if(!s || !e || !st || !et) return 0;
  return Math.round(calcDistance(s, e) / ((et - st) / 1000));
}

// function calcTime(s, e){
//   return Math.round((e.time - s.time) / 1000);
// }

function getSwipeDir(s, e){
  const deg = Math.atan2(e.y - s.y, e.x - s.x) * (180 / 3.14);
  if(-45 <= deg && deg <= 45){
    return 'right';
  }else if(-135 < deg && deg < -45){
    return 'top';
  }else if(45 < deg && deg < 135){
    return 'down';
  }else{
    return 'left';
  }
}

let int_mViewer;
function SwipeClose(dir){
  setSwipeY();
  setClose();
  if(int_mViewer){ clearInterval(int_mViewer); }
  const viewer = $('#md-media-viewer');
  const wHeight = viewer.clientHeight;
  if(dir == 'top'){
    viewer.style.top = (wHeight * -1) + 'px';
  }else{
    viewer.style.top = wHeight + 'px';
  }
  int_mViewer = setTimeout(function(){
    unsetSwipeY();
    unsetClose();
    viewer.style.display = 'none';
    viewer.style.top = 0;
    $('#md-media-viewer div.md-img-container').innerHTML = '';
  }, 100);
}

function calcOrigin(base, ref, scale){
  const baseX = Math.round(base.x);
  const baseY = Math.round(base.y);
  const refX = Math.round(ref.x);
  const refY = Math.round(ref.y);
  const rScale = Math.floor(scale * 100) / 100;
  let setX = 0;
  let setY = 0;
  if(baseX < refX){
    setX = ((refX - baseX) / rScale) + baseX;
  }else{
    setX = ((baseX - refX) / rScale) + refX;
  }
  if(baseY < refY){
    setY = ((refY - baseY) / rScale) + baseY;
  }else{
    setY = ((baseY - refY) / rScale) + refY;
  }
  return { x: Math.round(setX), y: Math.round(setY) };
}

function getImgIndex(){
  const viewer = $('#md-media-viewer');
  if(!viewer) return -1;
  const viewerLeft = parseInt(viewer.style.left.replace('px', ''));
  return Math.round(((viewerLeft < 0 == true) ? (viewerLeft * -1) : viewerLeft) / window.innerWidth);
}

// 画面に触れている指の数
let fingers = 0;
// タッチした画像
let targetImg = {
  element: null,
  order: null,
  width: 0,
  height: 0
};
let targetCenter = null;
// タッチ開始・終了時タイム
let startTime = null;
let endTime = null;

let startOrigin = null;
let moving = null;
// 基準点（マルチタッチ）
let refPoint = null;
// ダブルタップ用
let tapCount = 0;
// ダブルタップ範囲比較用
let temp = null;
// ズーム用
let nowScale = null;
// ピンチイン・アウト用
let tempOrigin = null;
let tempScale = null;
let tempScaleMag = null;
// スワイプ方向
let dir = null;

let tap_timeout;

let menu = null;
let mdDropdownMenu = false;
/* メニューボタン */
$('#md-media-viewer div[md-jsaction=\"menu\"]').addEventListener('click', function(e){
  if(!menu) menu = $('#md-media-viewer .md-dropdown-menu');
  if(mdDropdownMenu){
    menu.classList.add('md-closeMenu');
    mdDropdownMenu = false;
  }else{
    menu.classList.remove('md-closeMenu');
    mdDropdownMenu = true;
  }
});

/* 保存 */
$('#md-media-viewer li[md-jsaction=\"save\"]').addEventListener('click', function(e){
  const imgIdx = getImgIndex();
  const images = $$('#md-media-viewer img.md-img');
  let imgSrc = images[imgIdx].getAttribute('src');
  console.log('download:' + imgSrc);

  if(!menu) menu = $('#md-media-viewer .md-dropdown-menu');
  menu.classList.add('md-closeMenu');
  mdDropdownMenu = false;
});

$('#md-media-viewer').addEventListener('touchstart', function(e){
  // e.preventDefault();

  const jsaction = e.target.getAttribute('md-jsaction');
  if(jsaction) return;

  if(!menu) menu = $('#md-media-viewer .md-dropdown-menu');
  menu.classList.add('md-closeMenu');
  mdDropdownMenu = false;

  if(!isImg(e)){ return; }

  const touches = e.touches;
  fingers = touches.length;
  targetImg = getTargetImgInfo(e);
  targetCenter = getCenter(targetImg);

  nowScale = getScale(targetImg);
  if(nowScale === 1){
    setOrigin(targetImg, 0, 0, 1);
  }

  startOrigin = getOrigin(targetImg);
  if(fingers === 1){
    refPoint = getPoint1(e);
    startTime = new Date();
    positionLeft = parseFloat($('#md-media-viewer').style.left);
    unsetDragging(targetImg);

    if(!temp){
      temp = refPoint;
    }

    if(!tapCount){
      tapCount++;
      if(tap_timeout) { clearTimeout(tap_timeout); }
      tap_timeout = setTimeout(function(){
        tapCount = 0;
        temp = null;
      }, 200);
    }else{
      if(Math.abs(refPoint.x - temp.x) < 50 && Math.abs(refPoint.y - temp.y) < 50){
        if(nowScale <= 1){
          setScale(targetImg, 2);
          setZoom(targetImg);
          setOrigin(targetImg, targetCenter.x - refPoint.x, targetCenter.y - refPoint.y, 2);
        }else{
          setScale(targetImg, 1);
          unsetZoom(targetImg);
          setOrigin(targetImg, 0, 0, 1);
        }
      }
      tapCount = 0;
      temp = null;
    }
  }
}, {passive: true});

$('#md-media-viewer').addEventListener('touchend', function(e){
  // e.preventDefault();

  if(!isImg(e)){ return; }

  const touches = e.touches;
  fingers = touches.length;
  targetImg = getTargetImgInfo(e);
  targetCenter = getCenter(targetImg);

  nowScale = getScale(targetImg);
  tempScaleMag = null;
  tempOrigin = null;
  tempScale = null;

  if(fingers > 1){
    refPoint = getCenterPoint(e);
  }else if(fingers == 1){
    refPoint = getPoint1(e);
  }

  if(nowScale == 1){
    if(fingers === 0){
      positionLeft = parseFloat($('#md-media-viewer').style.left);
      const distance = calcDistance(refPoint, moving);
      if(distance > 10){
        endTime = new Date();
        if(calcSpeed(refPoint, moving, startTime, endTime) < 600){
          unsetSwipeY();
          SnapImg();
          $('#md-media-viewer').style.top = 0;
        }else{
          if(dir == 'left'){
            SnapImgNext(targetImg);
          }else if(dir == 'right'){
            SnapImgPrev(targetImg);
          }else if(distance > 30){
            if(isSwipeY(targetImg)){
              SwipeClose(dir);
            }
          }
        }
      }
      dir = null;
      moving = null;
    }
  }

  if(fingers === 0){
    startOrigin = null;
    refPoint = null;
  }

  if(nowScale <= 1){
    setScale(targetImg, 1);
    setOrigin(targetImg, 0, 0, 1);
  }
  unsetDragging(targetImg);
  unsetPinchInOut(targetImg);
}, { passive: true });

$('#md-media-viewer').addEventListener('touchmove', function(e){
  e.preventDefault();

  if(!isImg(e)){ return; }

  const changedTouches = e.changedTouches;
  const touches = e.touches;
  fingers = touches.length;

  if(changedTouches.length === 1 && fingers === 1){
    moving = getPoint1(e);

    const distance = calcDistance(refPoint, moving);
    if(distance > 13){
      nowScale = getScale(targetImg);
      if(nowScale != 1){
        const mag = nowScale / 2;
        setDragging(targetImg);
        setOrigin(targetImg, (startOrigin.x + (refPoint.x - moving.x) * -1), (startOrigin.y + (refPoint.y - moving.y) * -1), nowScale);
      }else{
        if(!dir){ dir = getSwipeDir(refPoint, moving); }
        if(dir == 'left' || dir == 'right'){
          ScrollImg(positionLeft + (refPoint.x - moving.x) * -1, 'instant');
        }else{
          setSwipeY();
          $('#md-media-viewer').style.top = (refPoint.y - moving.y) * -1.3 + 'px';
        }
      }
    }
  }else if(changedTouches.length === 2 && fingers === 2){
    // 2本以上の時の処理
    if(!refPoint){
      refPoint = getCenterPoint(e);
    }
    const distance = calcDistance(getChangedPoint1(e), getChangedPoint2(e));
    if(!tempScaleMag){
      tempScaleMag = 1 / distance;
    }
    if(!tempScale){
      tempScale = getScale(targetImg);
    }
    if(!tempOrigin){
      tempOrigin = getOrigin(targetImg);
    }

    let ss = nowScale * (distance * tempScaleMag);
    if(ss <= 0.5){
      ss = 0.5;
    }else if(5 <= ss){
      ss = 5;
    }

    unsetZoom(targetImg);
    setPinchInOut(targetImg);

    setScale(targetImg, ss);

    const sx = tempOrigin.x + ((targetCenter.x - refPoint.x) * (ss - tempScale) / nowScale);
    const sy = tempOrigin.y + ((targetCenter.y - refPoint.y) * (ss - tempScale) / nowScale);

    setOrigin(targetImg, sx, sy, ss);
  }
}, { passive: false });




//
