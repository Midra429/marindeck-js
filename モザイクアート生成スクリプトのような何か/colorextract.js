window.addEventListener('load', ()=>{
  const btn = document.body.querySelector('div[jsaction="conv"]');
  btn.addEventListener('click', ()=>{
    const url = document.body.querySelector('input[name="url"]').value;
    const size = document.body.querySelector('input[name="size"]').value;
    const mode = document.body.querySelector('input[name="mode"]').value;
    output(url, size, mode);
  });
  const input = document.body.querySelector('input[name="size"]');
  input.addEventListener('input', ()=>{
    const size = Number(document.body.querySelector('input[name="size"]').value);
    if(size === 3){
      document.body.querySelector('input[name="mode"]').disabled = false;
    }else{
      document.body.querySelector('input[name="mode"]').disabled = true;
    }
  })
});

/******************************************************************************
テスト用画像
  ・ノア（かわいい）
    https://pbs.twimg.com/media/EQ81ifWUwAUliLV.png?format=png&name=large
  ・み
    https://pbs.twimg.com/profile_images/1362198309020966913/pn-Pw9kI.jpg
  ・は
    https://pbs.twimg.com/profile_images/1359662503387566083/DFfh3MV6.jpg
  ・ふ
    https://pbs.twimg.com/profile_images/1364001460791308289/BZJF6RP_.jpg
  ・る
    https://pbs.twimg.com/profile_images/1359534988857806850/oxFeksDS.jpg
  ・た
    https://pbs.twimg.com/profile_images/1330706530094641152/_0Ui0Hkz.png
  ・🈂
    https://pbs.twimg.com/profile_images/1363517922803470346/nyCSsfSk.jpg
  ・ドラえもんもどき
    https://pbs.twimg.com/media/EvAeqFhVEAUVxDX.png?format=png&name=large
******************************************************************************/


/******************************************************************************
  img_src: 画像のURL
  size: サイズ（実際に出力されるサイズは size/3 × size/3）
  theme: イメージカラーのテーマ（dark, light）*省略可

  size = n（3 <= n <= 1050）
  イメージカラーを取得する場合は 3 に設定。
  1050だとconsoleに出力されるまでに20秒程かかるかも。
  出力されるものは全て比率1:1です。めんどくさいので。
******************************************************************************/
function output(img_src, size, theme){
  'use strict';

  if(size < 3){
    console.log('┐(´Д`)┌');
    alert('┐(´Д`)┌');
  }

  // img要素
  const img = new Image();
  const view_img = document.body.querySelector('.img_item');

  // 色抽出用canvas要素
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  //////////////////////////////////////////////////////////////////////////////
  // RGBをHSLに変換するやつ
  // 引用：https://note.kiriukun.com/entry/20181206-rgb-and-hsl-conversion
  const convHSL = function(rgb){
    const r = rgb.r;
    const g = rgb.g;
    const b = rgb.b;

    const rgb_max = 255;
    const hue_max = 360;
    const saturation_max = 100;
    const lightness_max = 100;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l;

    // Hue
    const hp = hue_max / 6;
    if(max == min){
      h = 0;
    }else if(r == max){
      h = hp * ((g - b) / (max - min));
    }else if(g == max){
      h = hp * ((b - r) / (max - min)) + hue_max / 3;
    }else{
      h = hp * ((r - g) / (max - min)) + hue_max * 2 / 3;
    }
    if(h < 0){
      h += hue_max;
    }

    // Saturation
    const cnt = (max + min) / 2;
    if(cnt < rgb_max / 2){
      if(max + min <= 0){
        s = 0;
      }else{
        s = (max - min) / (max + min) * saturation_max;
      }
    }else{
      s = (max - min) / (rgb_max * 2 - max - min) * saturation_max;
    }

    // Lightness
    l = (max + min) / rgb_max / 2 * lightness_max;

    return { h: Math.floor(h), s: Math.floor(s), l: Math.floor(l) };
  };
  //////////////////////////////////////////////////////////////////////////////

  // 抽出した色データを格納する
  let rgba = [];

  // 画像の読み込み後に色データを取得する
  img.addEventListener('load', ()=>{
    const size_row = size * 4;
    const pixel_row = size / 3;

    // canvasに画像をセット
    canvas.width = size;
    canvas.height = size;
    ctx.drawImage(img, 0, 0, size, size);

    // canvasから画像の色データを取得([r, g, b, a, r, g, b, a...])
    const imgData = ctx.getImageData(0, 0, size, size).data;
    const dataLength = imgData.length / 4;

    // size×sizeピクセルをsize/3×size/3ピクセルにする
    for(let i = 0; i < size; i += 3){
      for(let j = 0; j < size_row; j += 12){
        const col = j + size_row * i;
        // 9つを
        const cd1 = { r: imgData[col], g: imgData[col + 1], b: imgData[col + 2], a: imgData[col + 3] / 255 };
        const cd2 = { r: imgData[col + 4], g: imgData[col + 5], b: imgData[col + 6], a: imgData[col + 7] / 255 };
        const cd3 = { r: imgData[col + 8], g: imgData[col + 9], b: imgData[col + 10], a: imgData[col + 11] / 255 };
        const cd4 = { r: imgData[col + size_row + 0], g: imgData[col + size_row + 1], b: imgData[col + size_row + 2], a: imgData[col + size_row + 3] / 255 };
        const cd5 = { r: imgData[col + size_row + 4], g: imgData[col + size_row + 5], b: imgData[col + size_row + 6], a: imgData[col + size_row + 7] / 255 };
        const cd6 = { r: imgData[col + size_row + 8], g: imgData[col + size_row + 9], b: imgData[col + size_row + 10], a: imgData[col + size_row + 11] / 255 };
        const cd7 = { r: imgData[col + size_row * 2 + 0], g: imgData[col + size_row * 2 + 1], b: imgData[col + size_row * 2 + 2], a: imgData[col + size_row * 2 + 3] / 255 };
        const cd8 = { r: imgData[col + size_row * 2 + 4], g: imgData[col + size_row * 2 + 5], b: imgData[col + size_row * 2 + 6], a: imgData[col + size_row * 2 + 7] / 255 };
        const cd9 = { r: imgData[col + size_row * 2 + 8], g: imgData[col + size_row * 2 + 9], b: imgData[col + size_row * 2 + 10], a: imgData[col + size_row * 2 + 11] / 255 };
        // 1つにまとめる感じ
        const sr = Math.floor((cd1.r + cd2.r + cd3.r + cd4.r + cd5.r + cd6.r + cd7.r + cd8.r + cd9.r) / 9);
        const sg = Math.floor((cd1.g + cd2.g + cd3.g + cd4.g + cd5.g + cd6.g + cd7.g + cd8.g + cd9.g) / 9);
        const sb = Math.floor((cd1.b + cd2.b + cd3.b + cd4.b + cd5.b + cd6.b + cd7.b + cd8.b + cd9.b) / 9);
        const sa = Math.floor((cd1.a + cd2.a + cd3.a + cd4.a + cd5.a + cd6.a + cd7.a + cd8.a + cd9.a) / 9 * 100) / 100;

        rgba.push({ r: sr, g: sg, b: sb, a: sa });
      }
    }

    if(size > 3){
      // モザイク出力用の文字列とスタイルを作成
      let output_str = '\n';
      let output_style = [];
      let cnt = 0;
      for(let i = 0; i < pixel_row; i++){
        for(let j = 0; j < pixel_row; j++){
          // 出力する文字（%cはそのまま）
          output_str += '%c__';
          // 出力する文字のスタイル（大体CSS）
          const s = `background:rgba(${rgba[cnt].r},${rgba[cnt].g},${rgba[cnt].b},${rgba[cnt].a});color:rgba(0, 0, 0, 0);`;
          output_style.push(s);
          cnt++;
        }
        output_str += '\n';
      }
      // モザイク出力
      console.log(output_str, ...output_style);
      console.log(`出力結果\n サイズ: \t${pixel_row} × ${pixel_row}\n ドット数: \t${cnt}`);
    }else if(size == 3){
      // イメージカラーをセット
      const hsl = convHSL(rgba[0]);
      const dominant_color = `hsla(${hsl.h}deg, ${(theme == 'light') ? hsl.s : 26}%, ${(theme == 'light') ? hsl.l : 20}%)`;
      console.log(`%c____%c ${dominant_color}`, `background-color:${dominant_color};color:transparent;`, '');
      document.body.style.backgroundColor =  dominant_color;
    }

    // 削除
    img.remove();
    canvas.remove();
  });

  // srcセット
  img.src = img_src;
  img.crossOrigin = 'anonymous';
  view_img.src = img_src;

  // // srcセット
  // const xhr = new XMLHttpRequest();
  // xhr.open('GET', img_src, true);
  // xhr.responseType = 'blob';
  // xhr.onload = function(e) {
  //   const blob = xhr.response;
  //   img.src = URL.createObjectURL(blob);
  //   view_img.src = URL.createObjectURL(blob);
  // };
  // xhr.send();
}

output('https://pbs.twimg.com/profile_images/1362198309020966913/pn-Pw9kI.jpg', 90);
