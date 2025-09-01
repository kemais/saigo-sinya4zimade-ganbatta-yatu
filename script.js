// ================== ゲーム基本値 ==================
let day = 1;
let turn = -1;
const maxTurnsPerDay = 4;
const maxDays = 7;

const params = {
  体力: 100,
  幸せ: 50,
  スマホ依存度: 30,
  勉強度: 0,
  眠気: 0,
  _勉強中毒: false,
  _勉強依存エンディング: false,
  _勉強中毒イベント済み: false
};

// ================== 行動効果 ==================
const actionEffects = {
  "散歩する": { 体力:-10, 幸せ:10, 眠気:-5 },
  "ゲームをする": { スマホ依存度:30, 幸せ:5 },
  "昼寝する": { 眠気:-20, 体力:5 },
  "音楽を聴く": { 幸せ:10, 眠気:-5 },
  "電話する": { 幸せ:8, スマホ依存度:10 },
  "掃除する": { 体力:-5, 幸せ:5 },
  "図書館で勉強する": { 勉強度:15, 眠気:10 },
  "カフェに行く": { 幸せ:15, 体力:-5, スマホ依存度:-5 },
  "映画を見る": { 幸せ:20, 眠気:5, スマホ依存度:5 },
  "友達と遊ぶ": { 幸せ:25, 体力:-10 },
  "ランニングする": { 体力:-20, 幸せ:5, 眠気:-10 },
  "料理する": { 幸せ:10, 体力:-5 },
  "買い物する": { 幸せ:15, 体力:-5, スマホ依存度:-5 },
  "温泉に行く": { 体力:20, 幸せ:15, 眠気:-10 },
  "SNSをチェック": { スマホ依存度:20, 幸せ:2 },
  "漫画を読む": { 幸せ:12, 眠気:-5 },
  "ごはんを食べる": { 体力:10, 幸せ:5 },
  "夜更かしする": { 幸せ:5, 眠気:20, 体力:-10 },
  "早起きする": { 体力:-5, 幸せ:5, 勉強度:5 },
  "ジョギングする": { 体力:-15, 幸せ:8, 眠気:-5 },
  "ペットと遊ぶ": { 幸せ:20, 体力:-5 },
  "怒る": { 幸せ: -20, 体力:-5 },
  "徹夜作業をする": { 眠気: 25, 体力:-10 },
　"ひたすら勉強する": { 勉強度:20, 幸せ:-5, 眠気:15 },
"夜更かしゲーム": { 眠気:20, 幸せ:10, 体力:-10 },
"徹夜で映画鑑賞": { 眠気:30, 幸せ:15, 体力:-15 },
"泣く": { 幸せ:-15, 眠気:5 },
"イライラする": { 幸せ:-10, 眠気:5 },
"ストレス解消しない": { 幸せ:-5, 体力:-5 },
"おやつを食べる": { 幸せ:10, 体力:5 },
"コーヒーを飲む": { 眠気:-15, 体力:-5 },
"SNS中毒": { スマホ依存度:25, 幸せ:5, 眠気:5 },
"無限スクロール": { スマホ依存度:20, 幸せ:8, 体力:-5 },
"オンラインチャット": { スマホ依存度:15, 幸せ:10, 眠気:5 },
"スマホで動画視聴": { スマホ依存度:20, 幸せ:12, 眠気:10 },

// スマホ依存度を減少
"スマホを置く": { スマホ依存度:-20, 幸せ:-5, 体力:5 },
"自然散策": { スマホ依存度:-15, 幸せ:10, 体力:-5 },
"読書タイム": { スマホ依存度:-25, 幸せ:5, 眠気:5 },
"瞑想する": { スマホ依存度:-20, 幸せ:10, 眠気:-5 },

// 勉強度減少系
"サボる": { 勉強度:-15, 幸せ:5, 体力:5 },
"ゲームで遊ぶ": { 勉強度:-10, 幸せ:10, 眠気:-5 },
"友達と遊ぶ（勉強休み）": { 勉強度:-20, 幸せ:15, 体力:-5 },
"昼寝して勉強忘れ": { 勉強度:-10, 幸せ:5, 眠気:-15 },
"問題集チャレンジ": { 勉強度:12, 眠気:5 },
"参考書読み込み": { 勉強度:15, 幸せ:-2 },
"模試に挑戦": { 勉強度:18, 体力:-5, 眠気:10 },
"暗記カード勉強": { 勉強度:10, 幸せ:-1, 眠気:5 },
"オンライン講座受講": { 勉強度:15, 幸せ:0, 眠気:5 },
"軽くストレッチ": { 眠気: -15, 体力: -2 },
"深呼吸": { 眠気: -10, 幸せ: 2 },
"冷たい水を飲む": { 眠気: -20, 体力: 0 },
"おやつで糖分補給": { 眠気: -10, 幸せ: 5, 体力: 5 },
};
const allActions = Object.keys(actionEffects);
const timeLabels = ["朝","昼","夕方","夜"];

// ================== メッセージ ==================
const actionMessages = {
  "散歩する":["外に出た。","風が気持ちいい。","リフレッシュできた。"],
  "ゲームをする":["ゲームを起動。","夢中でプレイ。","気分がちょっと上向き！"],
  "昼寝する":["横になった。","うとうと……","少しスッキリ。"],
  "音楽を聴く":["イヤホンを装着。","お気に入りの曲が流れる。","気分が上がった！"],
  "電話する":["スマホを手に取った。","会話がはずむ。","気持ちが軽くなった。"],
  "掃除する":["片付け開始。","だいぶキレイに。","気持ちもスッキリ！"],
  "図書館で勉強する":["図書館へ向かった。","ノートを開く。","集中して勉強した！"],
  "カフェに行く":["カフェに到着。","コーヒーの香りが心地よい。","落ち着いた時間を過ごした。"],
  "映画を見る":["映画館の大スクリーン！","笑ったり泣いたり…。","大満足だった。"],
  "友達と遊ぶ":["友達と集合！","笑い声が響く。","楽しい時間を過ごせた。"],
  "ランニングする":["シューズを履いて出発。","汗をかいた。","健康的な気分になった。"],
  "料理する":["材料を準備。","おいしい匂いが広がる。","満足できる料理ができた！"],
  "買い物する":["街へ出かけた。","欲しい物を探す。","いい買い物ができた！"],
  "温泉に行く":["温泉に到着。","湯に浸かる。","心も体もポカポカ！"],
  "SNSをチェック":["スマホを開いた。","色んな投稿を見ている。","時間が溶けていった…。"],
  "漫画を読む":["漫画を開いた。","面白くて止まらない！","気分が晴れた。"],
  "ごはんを食べる":["お腹が空いた。","美味しく食べる。","満足した！"],
  "夜更かしする":["夜が更けていく。","スマホを触ってる。","気づけば深夜…。"],
  "早起きする":["まだ暗い。","少し眠い。","1日を有効に使えそう！"],
  "ジョギングする":["外に出た。","リズムよく走る。","汗をかいて爽快！"],
  "ペットと遊ぶ":["ペットと戯れる。","癒される。","最高の時間！"],
　"怒る":["怒り爆発！","気分が沈む…","少し疲れた。"],
　"徹夜作業をする":["夜通し作業開始…","眠気が増す…","体力も削られる。"],
　"ひたすら勉強する":["ノートを開く…","集中して勉強！","眠気も増えた…幸せは減少。"],
　"夜更かしゲーム":["夜更かししてゲーム…","眠気が増した…","体力も減少。"],
"徹夜で映画鑑賞":["映画を一晩中鑑賞…","眠気がMAX！","体力もガクッと減った。"],
"泣く":["涙が止まらない…","少し気分が落ちた。","心が重い…"],
"イライラする":["イライラして何も手につかない…","幸せが下がった…","眠気も増す…"],
"ストレス解消しない":["ストレスをため込む…","幸せが少し減った…","体力も少し減少。"],
"おやつを食べる":["甘いものを食べた…","気分が上がる！","幸せ…"],
"コーヒーを飲む":["コーヒーで目が覚めた！","眠気が減った…","体力は少し減った。"],
"SNS中毒": ["SNSを開く…","投稿をチェック…","スマホ依存度が増えた！"],
"無限スクロール": ["スクロールし続ける…","時間を忘れる…","スマホ依存度が上昇！"],
"オンラインチャット": ["チャット開始…","会話が楽しい…","スマホ依存度も増加…"],
"スマホで動画視聴": ["動画再生…","止まらない…","スマホ依存度が上がった！"],

"スマホを置く": ["スマホを置いた…","少し不安…","依存度が減った！"],
"自然散策": ["森を歩く…","気分がリフレッシュ…","スマホ依存度が下がった！"],
"読書タイム": ["本を開く…","集中できた…","スマホ依存度が減少！"],
"瞑想する": ["呼吸を整える…","心が落ち着く…","スマホ依存度が減った！"],

"サボる": ["今日はサボり！","勉強は減った…","少し幸せになった。"],
"ゲームで遊ぶ": ["ゲーム起動…","勉強は後回し！","楽しさアップ！"],
"友達と遊ぶ（勉強休み）": ["友達と遊ぶ…","勉強は減ったけど楽しい！","体力も少し消費。"],
"昼寝して勉強忘れ": ["横になる…","勉強を忘れた…","眠気が減った。"],
"問題集チャレンジ": ["問題集を解く…","頭をフル回転…","勉強度が増えた！"],
"参考書読み込み": ["参考書を読み込む…","理解が深まる…","勉強度アップ！"],
"模試に挑戦": ["模試を受ける…","集中力全開…","勉強度が増加！"],
"暗記カード勉強": ["カードで暗記…","繰り返し学習…","勉強度が上がった！"],
"オンライン講座受講": ["講座に参加…","知識を吸収…","勉強度増加！"],
"軽くストレッチ": ["体を伸ばす…","血流が良くなる…","眠気が少し減った！"],
"深呼吸": ["息を整える…","頭がスッキリ…","眠気が減少！"],
"冷たい水を飲む": ["水で目が覚める…","眠気が和らぐ…","体もスッキリ！"],
"おやつで糖分補給": ["甘いものを食べる…","エネルギー補給…","眠気が減った！"],
};

// ================== ユーティリティ ==================
function clampParams(){
  for(const k in params){
    if(k.startsWith("_")) continue;
    params[k] = Math.max(0,Math.min(100,params[k]));
  }
}

// ================== プレビュー管理 ==================
let previewedAction = null;
let previewValues = {};

function buildMeter(label,value){
  const wrap = document.createElement("div");
  wrap.className = "param-bar-container";

  const title = document.createElement("div");
  title.className = "param-label";
  title.textContent = `${label}: ${value}`;

  if(previewedAction && previewValues[label]!==undefined){
    const span = document.createElement("span");
    const delta = previewValues[label];
    span.className = delta>=0 ? "preview positive" : "preview negative";
    span.textContent = ` (${delta>=0?"+":""}${delta})`;
    title.appendChild(span);
  }

  const bar = document.createElement("div");
  bar.className = "param-bar";

  const fill = document.createElement("div");
  fill.className = `param-bar-fill bar-${label}`;
  fill.style.width = value + "%";

  bar.appendChild(fill);
  wrap.appendChild(title);
  wrap.appendChild(bar);

  return wrap;
}

function updateMeters(){
  clampParams();
  const box = document.getElementById("statusBox");
  box.innerHTML = "";
  ["体力","幸せ","スマホ依存度","勉強度","眠気"].forEach(k=>{
    box.appendChild(buildMeter(k,params[k]));
  });
  document.getElementById("addictionLabel").style.display = params._勉強中毒?"block":"none";
}

// ================== 選択肢 ==================
function addButton(text,onClick){
  const btn = document.createElement("button");
  btn.textContent = text;
  btn.style.margin = "6px";
  btn.onclick = onClick;
  document.getElementById("choices").appendChild(btn);
}

function getAllowedActions(){
  const currentTime=timeLabels[turn]||"朝";
  return allActions.filter(a=>{
    if(a==="昼寝する"&&!["昼","夕方"].includes(currentTime)) return false;
    if(a==="映画を見る" && currentTime!=="夜") return false;
　　　if(a==="徹夜作業をする" && currentTime!=="夜") return false;
    if(a==="夜更かしする" && currentTime!=="夜") return false;
    if(a==="早起きする" && currentTime!=="朝") return false;
    return true;
  });
}

function pickRandom(arr,n){
  const copy=[...arr];
  for(let i=copy.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [copy[i],copy[j]]=[copy[j],copy[i]];
  }
  return copy.slice(0,Math.min(n,copy.length));
}

// ================== 特別イベント ==================
function checkSpecialEvents(){
  const currentTime=timeLabels[turn];
  if(day===1 && currentTime==="朝"){
    const c=document.getElementById("choices");
    c.innerHTML="";
    addButton("ノートを買う",()=>{ params.勉強度+=10; params.スマホ依存度-=5; nextTurn(); });
    addButton("買わない",()=>{ nextTurn(); });
    return true;
  }
  if(day===3 && currentTime==="夜"){
    const c=document.getElementById("choices");
    c.innerHTML="";
    addButton("スマホを見る",()=>{ params.スマホ依存度+=15; params.眠気+=10; nextTurn(); });
    addButton("羊を数える",()=>{ params.幸せ+=5; params.眠気-=10; nextTurn(); });
    return true;
  }
  if(day===5 && currentTime==="昼"){
    const c=document.getElementById("choices");
    c.innerHTML="";
    addButton("遊ぶ",()=>{ params.幸せ+=20; params.勉強度-=10; nextTurn(); });
    addButton("断る",()=>{ params.勉強度+=15; params.幸せ-=5; nextTurn(); });
    return true;
  }
  return false;
}

// ================== 選択肢表示 ==================
function showChoices(){
  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML="";
  previewedAction=null;

  if(checkSpecialEvents()){ updateMeters(); return; }

  const allowed=getAllowedActions();
  const picks=pickRandom(allowed,3);
  picks.forEach(a=>addButton(a,()=>onActionClick(a)));
  updateMeters();
}

// ================== プレビュー + 決定 ==================
function onActionClick(action){
  if(previewedAction!==action){
    previewedAction=action;
    previewAction(action);
  }else{
    applyAction(action);
    previewedAction=null;
    previewValues={};
  }
}

function previewAction(action){
  const eff = actionEffects[action];
  previewValues = {...eff};
  previewValues.眠気=(previewValues.眠気||0)+5;
  updateMeters();
}

function applyAction(action){
  const eff = actionEffects[action];
  for(const k in eff) params[k] += eff[k];
  params.眠気 += 5;

  const msgs = [...(actionMessages[action]||[action+"をした。"])];
  clampParams();
  updateMeters();

  if(params.体力<=0){ triggerAmbulanceEvent(); return; }

  showMessagesSequentially(msgs,()=>{
    if(turn>=maxTurnsPerDay-1){
      day++;
      turn=-1;
      params.眠気=Math.max(0,params.眠気-10);
    }
    nextTurn();
  });
}

// ================== メッセージアニメ ==================
function showMessagesSequentially(messages,done){
  const anim=document.getElementById("animationScreen");
  const text=document.getElementById("animationText");
  document.getElementById("game").style.display="none";
  anim.style.display="block";

  let i=0;
  function step(){
    if(i<messages.length){
      text.textContent=messages[i++];
      setTimeout(step,900);
    }else{
      anim.style.display="none";
      document.getElementById("game").style.display="block";
      done && done();
    }
  }
  step();
}

// ================== ターン進行 ==================
// ================== 勉強中毒イベント ==================
function checkStudyAddictionEvent(){
  if(params._勉強中毒) return; // すでに中毒中は無視
  if(params.勉強度 >= 80 && !params._勉強中毒イベント済み){
    params._勉強中毒 = true;
    params._勉強中毒イベント済み = true;
    triggerStudyAddictionEvent();
  }
}

function triggerStudyAddictionEvent(){
  const c = document.getElementById("choices");
  c.innerHTML = "";

  // 画面上に勉強中毒表示
  document.getElementById("addictionLabel").textContent = "勉強中毒！";
  document.getElementById("addictionLabel").style.display = "block";

  addButton("勉強する", ()=>{
    params._勉強依存エンディング = true;
    showEnding(); // 特殊エンディング
  });

  addButton("勉強をやめる", ()=>{
    params._勉強中毒 = false;
    document.getElementById("addictionLabel").style.display = "none";
    nextTurn(); // 通常進行に戻る
  });
}
// ================== アニメーション制御フラグ ==================
let isAnimating = false;

// ================== 救急車イベント ==================
function triggerAmbulanceEvent(){
  if (isAnimating) return;
  isAnimating = true;

  const animArea = document.getElementById("animationScreen");
  const text = document.getElementById("animationText");
  document.getElementById("game").style.display="none";
  animArea.style.display="block";

  // 画面揺れ
  animArea.classList.add("shake");
  setTimeout(()=>animArea.classList.remove("shake"),600);

  text.textContent = "体力が尽きて倒れてしまった！救急車が呼ばれた…";

  // 救急車の絵文字を生成（右→左に走る）
  const ambulance = document.createElement("div");
  ambulance.className = "ambulance";
  ambulance.style.fontSize="96px";
  ambulance.style.position="absolute";
  ambulance.style.top="50%";
  ambulance.style.transform="translateY(-50%)";
  ambulance.textContent = "🚑";
  ambulance.style.left = (window.innerWidth+100)+"px";

  animArea.appendChild(ambulance);

  let pos = window.innerWidth+100;
  const interval = setInterval(()=>{
    pos -= 15; // スピード
    ambulance.style.left = pos + "px";
    if(pos<-200){
      clearInterval(interval);
      animArea.style.display="none";
      animArea.removeChild(ambulance);
      isAnimating = false;
      showEnding("病院送りエンド","無理をしすぎて体力が尽き、救急車で病院に運ばれた。");
    }
  },30);
}
// ================== エンディング ==================
function showEnding(title,desc){
  document.getElementById("game").style.display="none";
  document.getElementById("animationScreen").style.display="none";
  document.getElementById("endingScreen").style.display="block";

  const ending = document.getElementById("endingText");
  if(title && desc){
    ending.textContent = desc;
    unlockEndingByTitle(title);
  } else if(params._勉強依存エンディング){
    ending.textContent="勉強しすぎて人生が勉強一色に… 勉強依存エンド";
    unlockEndingByTitle("勉強廃人");
  } else if(params.スマホ依存度>90){
    ending.textContent="スマホにとりつかれ、現実を見失った…";
    unlockEndingByTitle("スマホ依存エンド");
  } else if(params.幸せ>=90){
    ending.textContent="とても幸せな一週間だった！最高の思い出！";
    unlockEndingByTitle("幸福エンド");
  } else if(params.幸せ<20){
    ending.textContent="全然楽しくなかった一週間だった… 悲しみエンド";
    unlockEndingByTitle("悲しみエンド");
  } else if(params.勉強度>=100){
    ending.textContent="圧倒的勉強量！合格間違いなし！天才エンド！";
    unlockEndingByTitle("天才エンド");
  } else {
    ending.textContent="無事に一週間を終えた… ふつうのエンド";
    unlockEndingByTitle("ふつうのエンド");
  }
}

// ================== エンディングコレクション ==================
let endings = [
  { id: 1, title: "病院送りエンド", description: "体力を削りすぎた末の悲劇。", condition: "体力が0になる", unlocked: false },
  { id: 2, title: "勉強廃人", description: "勉強に取り憑かれた末路…。", condition: "勉強度80以上で勉強を選び続ける", unlocked: false },
  { id: 3, title: "スマホ依存エンド", description: "スマホに囚われた未来。", condition: "スマホ依存度90以上", unlocked: false },
  { id: 4, title: "幸福エンド", description: "幸せいっぱいでハッピー！", condition: "幸せ90以上で最終日", unlocked: false },
  { id: 5, title: "悲しみエンド", description: "楽しくない一週間…。", condition: "幸せ20未満で最終日", unlocked: false },
  { id: 6, title: "天才エンド", description: "努力の結晶！", condition: "勉強度100以上で最終日", unlocked: false },
  { id: 7, title: "ふつうのエンド", description: "波乱なく終わった日々。", condition: "他の条件に当てはまらない", unlocked: false }
];

if(localStorage.getItem("endings")) endings = JSON.parse(localStorage.getItem("endings"));
else localStorage.setItem("endings",JSON.stringify(endings));

function unlockEndingByTitle(title){
  let data = JSON.parse(localStorage.getItem("endings"));
  let target = data.find(e=>e.title===title);
  if(target && !target.unlocked){
    target.unlocked = true;
    localStorage.setItem("endings",JSON.stringify(data));
    alert(`エンディング解放！「${title}」`);
  }
}

function openEndingCollection(){
  let data = JSON.parse(localStorage.getItem("endings"));
  let html = "";
  data.forEach(e=>{
    if(e.unlocked) html += `<p>✅ <b>${e.title}</b><br><i>${e.description}</i></p>`;
    else html += `<p>❓ ???<br><span style="color:gray;">条件ヒント: ${e.condition}</span></p>`;
  });
  document.getElementById("endingList").innerHTML = html;
  document.getElementById("endingModal").style.display="block";
}

function closeEndingCollection(){
  document.getElementById("endingModal").style.display="none";
}

// ================== スタート/リスタート ==================
function resetParams(){
  params.体力=100; params.幸せ=50; params.スマホ依存度=30;
  params.勉強度=0; params.眠気=0;
  params._勉強中毒=false;
  params._勉強依存エンディング=false;
  params._勉強中毒イベント済み=false;
  document.body.style.backgroundColor="";
  updateMeters();
}

function startGame(){
  day=1; turn=-1;
  resetParams();
  document.getElementById("startButton").style.display="none";
  document.getElementById("endingScreen").style.display="none";
  document.getElementById("animationScreen").style.display="none";
  document.getElementById("game").style.display="block";
  nextTurn();
}

function restartGame(){
  day=1; turn=-1;
  resetParams();
  document.getElementById("endingScreen").style.display="none";
  document.getElementById("animationScreen").style.display="none";
  document.getElementById("game").style.display="block";
  nextTurn();
}




// ================== ウィンドウロード ==================
window.onload = () => {
  document.getElementById("game").style.display = "none";
  document.getElementById("animationScreen").style.display = "none";
  document.getElementById("endingScreen").style.display = "none";
  document.getElementById("storyScreen").style.display = "none";

  document.getElementById("startButton").style.display="inline-block";
  document.getElementById("startButton").onclick = showStoryScreen;

  document.getElementById("storyNextButton").onclick = startFromStory;
  document.getElementById("restartButton").onclick = restartGame;

  updateMeters();
};


function showStoryScreen(){
  document.getElementById("startButton").style.display="none";
  document.getElementById("storyScreen").style.display="block";
}

function startFromStory(){
  document.getElementById("storyScreen").style.display="none";
  startGame();
}

function checkSleepyEvent(){
  if(isAnimating) return false;

  // 50以上で警告、100以上で永眠
  if(params.眠気 >= 50 && params.眠気 < 100){
    document.getElementById("warningText").textContent = "眠気が溜まると…";
    return false;
  } else {
    document.getElementById("warningText").textContent = "";
  }

  if(params.眠気 >= 100){
    isAnimating = true;
    const anim = document.getElementById("animationScreen");
    const text = document.getElementById("animationText");
    document.getElementById("game").style.display="none";
    anim.style.display="block";
    anim.style.backgroundColor="rgba(0,0,0,0)";
    text.textContent = "眠気が限界…";

    let opacity = 0;
    const interval = setInterval(()=>{
      opacity += 0.01;
      if(opacity > 1) opacity = 1;
      anim.style.backgroundColor = `rgba(0,0,0,${opacity})`;
      anim.style.transform = `translate(${Math.random()*4-2}px,${Math.random()*4-2}px)`;
      if(opacity >= 1){
        clearInterval(interval);
        anim.style.transform = "";
        isAnimating = false;
        showEnding("永眠エンド","眠気に抗えず、そのまま永眠してしまった…");
      }
    }, 50);

    return true;
  }

  return false;
}

function nextTurn(){
  if(isAnimating) return; // アニメ中は止める
 checkStudyAddictionEvent();
  if(turn === -1){        // 初回ターンはアニメなしで初期化
    turn = 0;
    document.getElementById("dayText").textContent = `${day}日目（${timeLabels[turn]}）`;
    showChoices();
    return;
  }

  if(checkSleepyEvent()) return; // 永眠チェック

  turn++;
  if(turn >= maxTurnsPerDay){
    turn = 0;
    day++;
    params.眠気 = Math.max(0, params.眠気 - 10); // 眠気少し回復
  }

  if(day > maxDays){ showEnding(); return; }

  document.getElementById("dayText").textContent = `${day}日目（${timeLabels[turn]}）`;
  showChoices();
}