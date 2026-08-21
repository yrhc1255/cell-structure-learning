(function () {
  const STORAGE_KEY = 'cellStructureDemo';
  const course = window.CELL_COURSE;
  const module = course.modules.challenge;
  const root = document.querySelector('#challenge-game');
  const BASE_SCORE = 5000;
  const MIN_SCORE = 500;
  const PENALTY = 1000;
  const MAX_LIVES = 3;
  const CELL_SHEET = 'assets/course/six-cell-types-original-v3.webp';
  const ANIMAL_CELL = 'assets/course/animal-cell-original-v1.webp';
  const PLANT_CELL = 'assets/course/plant-cell-original-v1.webp';
  let state;
  try { state = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { state = {}; }

  const items = [
    {answer:'細胞膜',description:'區隔細胞內外，並控制物質進出。',image:ANIMAL_CELL,focus:'membrane'},
    {answer:'細胞質',description:'許多代謝反應進行的場所，也是胞器活動的環境。',image:ANIMAL_CELL,focus:'cytoplasm'},
    {answer:'細胞核',description:'含有遺傳物質，並調控細胞的生命活動。',crop:PLANT_CELL,cropClass:'nucleus'},
    {answer:'細胞壁',description:'位於植物細胞最外層，提供保護、支撐並維持形狀。',image:PLANT_CELL,focus:'wall'},
    {answer:'葉綠體',description:'含葉綠素，可吸收光能進行光合作用。',crop:PLANT_CELL,cropClass:'chloroplast'},
    {answer:'粒線體',description:'進行呼吸作用，將養分中的能量轉換成細胞可利用的形式。',crop:PLANT_CELL,cropClass:'mitochondria'},
    {answer:'液泡',description:'可儲存水、養分、色素或廢物；植物細胞中的通常較大。',crop:PLANT_CELL,cropClass:'vacuole'},
    {answer:'保衛細胞',description:'兩兩圍成氣孔，調節氣體交換與水分散失。',sheet:CELL_SHEET,position:'50% 0%'},
    {answer:'肌肉細胞',description:'呈長條狀並能收縮，協助身體產生運動。',sheet:CELL_SHEET,position:'100% 100%'},
    {answer:'神經細胞',description:'具有細長突起，能接收並傳遞訊息。',sheet:CELL_SHEET,position:'100% 0%'},
    {answer:'紅血球細胞',description:'呈雙凹圓盤狀，主要負責運送氧氣。',sheet:CELL_SHEET,position:'50% 100%'},
    {answer:'植物表皮細胞',description:'排列緊密，形成保護植物內部組織的表層。',sheet:CELL_SHEET,position:'0% 0%'}
  ];
  const answerNames = items.map(item => item.answer);
  const completed = new Set(state.completedModules || []);
  if (!completed.has('reading')) { location.replace('12_reading-literacy.html'); return; }

  const escapeText = value => String(value).replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
  const shuffle = values => {
    const copy = [...values];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const random = new Uint32Array(1); crypto.getRandomValues(random);
      const target = random[0] % (index + 1);
      [copy[index], copy[target]] = [copy[target], copy[index]];
    }
    return copy;
  };

  const pageIndex = course.order.findIndex(item => item.id === 'challenge');
  document.querySelector('#module-unit').textContent = '細胞學習英雄榜';
  document.querySelector('#module-progress-label').textContent = '進度 92％';
  document.querySelector('#module-progress').style.width = '92%';
  document.querySelector('#module-stepper').innerHTML = course.order.map((item, index) => `<${index <= pageIndex ? 'a' : 'span'} class="course-step ${index < pageIndex ? 'completed' : index === pageIndex ? 'current' : 'locked'}" ${index <= pageIndex ? `href="${item.url}"` : ''}><span>${index + 1}</span><strong>${escapeText(item.title)}</strong></${index <= pageIndex ? 'a' : 'span'}>`).join('');
  document.querySelector('#module-stepper .current')?.scrollIntoView({behavior:'instant',block:'nearest',inline:'center'});

  root.innerHTML = `
    <section class="content-card game-hero">
      <p class="eyebrow">細胞學習英雄榜</p><h1>辨認細胞與胞器</h1>
      <p class="lead">觀察上方由左向右移動的圖片與功能提示，在圖片抵達終點前點選正確名稱。</p>
      <div class="game-rules"><span>12 個項目</span><span>最高 60,000 分</span><span>3 次生命</span><span>答錯扣 1,000 分</span></div>
      <p>越早答對，分數越高。每個項目最高 5,000 分、最低 500 分。</p>
      <button type="button" class="primary-button" id="game-start">開始挑戰</button>
    </section>
    <section class="hero-game-board" id="game-board" hidden>
      <div class="game-hud"><div><small>目前分數</small><strong id="game-score">0</strong></div><div><small>進度</small><strong id="game-progress">1／12</strong></div><div><small>生命</small><strong id="game-lives">❤️❤️❤️</strong></div></div>
      <section class="content-card moving-track" id="moving-track">
        <div class="track-finish" aria-hidden="true">終點</div>
        <article class="moving-cell-card" id="moving-card">
          <div class="moving-visual" id="moving-visual"></div>
          <p id="moving-description"></p>
        </article>
      </section>
      <section class="content-card answer-deck"><h2>請選擇正確名稱</h2><div id="game-options" class="name-options"></div><p id="game-feedback" class="game-feedback" aria-live="polite"></p></section>
    </section>
    <section class="content-card game-result" id="game-result" hidden></section>
    <section class="content-card leaderboard-card"><div class="leaderboard-heading"><div><p class="eyebrow">即時排名</p><h2>細胞學習英雄榜</h2></div><button type="button" class="secondary-button" id="leaderboard-refresh">重新整理</button></div><p id="leaderboard-status" class="muted">正在讀取英雄榜……</p><div class="leaderboard-wrap"><table class="leaderboard-table"><thead><tr><th>名次</th><th>班級</th><th>座號</th><th>最高分</th></tr></thead><tbody id="leaderboard-body"></tbody></table></div></section>`;

  let roundItems = [];
  let itemIndex = 0;
  let score = 0;
  let lives = MAX_LIVES;
  let position = 0;
  let timer = 0;
  let playing = false;

  function updateStats() {
    document.querySelector('#game-score').textContent = score.toLocaleString('zh-TW');
    document.querySelector('#game-progress').textContent = `${Math.min(itemIndex + 1, items.length)}／${items.length}`;
    document.querySelector('#game-lives').textContent = '❤️'.repeat(lives) + '🖤'.repeat(MAX_LIVES - lives);
  }

  function visualMarkup(item) {
    if (item.sheet) return `<div class="cell-sheet-crop" style="background-image:url('${item.sheet}');background-position:${item.position}"></div>`;
    if (item.crop) return `<div class="organelle-crop crop-${item.cropClass}" style="background-image:url('${item.crop}')" role="img" aria-label="${escapeText(item.description)}"></div>`;
    return `<div class="organelle-visual"><img src="${item.image}" alt=""><span class="organelle-focus focus-${item.focus}"></span></div>`;
  }

  function spawn() {
    if (itemIndex >= roundItems.length) { endGame(true); return; }
    position = 0;
    playing = true;
    const item = roundItems[itemIndex];
    const card = document.querySelector('#moving-card');
    card.style.left = '0%';
    card.classList.remove('right','wrong');
    document.querySelector('#moving-visual').innerHTML = visualMarkup(item);
    document.querySelector('#moving-description').textContent = item.description;
    document.querySelector('#game-feedback').textContent = '';
    document.querySelectorAll('.name-option').forEach(button => { button.disabled = false; button.classList.remove('right','wrong'); });
    updateStats();
    clearInterval(timer);
    const speed = 0.35 + itemIndex * 0.015;
    timer = setInterval(() => {
      if (!playing) return;
      position += speed;
      card.style.left = `calc(${position}% - ${position * 1.45}px)`;
      if (position >= 100) handleWrong(null, '圖片已抵達終點。');
    }, 20);
  }

  function chooseAnswer(button) {
    if (!playing) return;
    const current = roundItems[itemIndex];
    if (button.dataset.answer === current.answer) {
      playing = false;
      clearInterval(timer);
      const points = Math.max(MIN_SCORE, Math.floor(BASE_SCORE - position * 45));
      score += points;
      button.classList.add('right');
      document.querySelector('#moving-card').classList.add('right');
      document.querySelector('#game-feedback').textContent = `答對了，獲得 ${points.toLocaleString('zh-TW')} 分。`;
      updateStats();
      setTimeout(() => { itemIndex += 1; spawn(); }, 650);
    } else {
      handleWrong(button, '名稱不正確。');
    }
  }

  function handleWrong(button, message) {
    if (!playing) return;
    playing = false;
    clearInterval(timer);
    score = Math.max(0, score - PENALTY);
    lives -= 1;
    button?.classList.add('wrong');
    document.querySelector('#moving-card').classList.add('wrong');
    document.querySelector('#game-feedback').textContent = `${message} 扣 1,000 分並失去 1 次生命。`;
    updateStats();
    setTimeout(() => {
      itemIndex += 1;
      if (lives <= 0) endGame(false); else spawn();
    }, 750);
  }

  async function endGame(completedAll) {
    playing = false;
    clearInterval(timer);
    document.querySelector('#game-board').hidden = true;
    const best = Math.max(Number(state.challengeScore || 0), score);
    completed.add('challenge');
    state = {...state,challengeScore:best,completedModules:[...completed],currentPage:'challenge'};
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    const result = document.querySelector('#game-result');
    result.hidden = false;
    result.innerHTML = `<p class="eyebrow">${completedAll ? '挑戰完成' : '生命用完了'}</p><h2>本次得分：${score.toLocaleString('zh-TW')} 分</h2><p>你的最高分是 ${best.toLocaleString('zh-TW')} 分。Firebase 成績與英雄榜都只保留最高分。</p><p id="score-sync-status" class="score-sync-status">正在上傳成績……</p><div class="game-result-actions"><button type="button" class="secondary-button" id="game-retry">再玩一次</button><a class="primary-button" href="14_learning-result.html">查看學習結果 →</a></div>`;
    document.querySelector('#game-retry').addEventListener('click', startGame);
    try {
      await Promise.all([window.uploadCellScores?.(state),window.uploadChallengeHighScore?.(state,score)]);
      await loadLeaderboard();
    } catch (error) {
      console.error(error);
      document.querySelector('#score-sync-status').textContent = '成績已保存在本機，但 Firebase 暫時無法上傳，請稍後再試。';
    }
  }

  function startGame() {
    roundItems = shuffle(items);
    itemIndex = 0; score = 0; lives = MAX_LIVES;
    document.querySelector('#game-result').hidden = true;
    document.querySelector('#game-board').hidden = false;
    document.querySelector('#game-options').innerHTML = shuffle(answerNames).map(name => `<button type="button" class="name-option" data-answer="${escapeText(name)}">${escapeText(name)}</button>`).join('');
    document.querySelectorAll('.name-option').forEach(button => button.addEventListener('click', () => chooseAnswer(button)));
    document.querySelector('#game-board').scrollIntoView({behavior:'smooth',block:'start'});
    spawn();
  }

  async function loadLeaderboard() {
    const status = document.querySelector('#leaderboard-status');
    const body = document.querySelector('#leaderboard-body');
    status.textContent = '正在讀取英雄榜……';
    try {
      const rows = await window.loadChallengeLeaderboard();
      body.innerHTML = rows.length ? rows.map((row,index) => `<tr class="${row.classCode === state.classCode && row.seatNumber === state.seatNumber ? 'current-player' : ''}"><td>${index + 1}</td><td>${escapeText(row.classCode)}</td><td>${escapeText(row.seatNumber)}</td><td>${Number(row.score).toLocaleString('zh-TW')}</td></tr>`).join('') : '<tr><td colspan="4">目前還沒有英雄榜成績</td></tr>';
      status.textContent = '每位學生只保留最高分，顯示前 10 名。';
    } catch (error) {
      console.error(error);
      body.innerHTML = '';
      status.textContent = '英雄榜目前無法讀取；遊戲分數仍會保存在本機。';
    }
  }

  document.querySelector('#game-start').addEventListener('click', startGame);
  document.querySelector('#leaderboard-refresh').addEventListener('click', loadLeaderboard);
  loadLeaderboard();
})();
