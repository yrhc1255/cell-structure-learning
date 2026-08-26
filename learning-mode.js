(function () {
  const STORAGE_KEY = 'cellStructureDemo';
  const TEACHER_KEY = 'cellStructureTeacherMode';
  const MAX_LEARNING_SCORE = 126;
  const pageOrder = [
    ['home', '首頁', '1_home.html'], ['guide', '課前導讀', '2_guide.html'],
    ['discovery', '細胞的發現', '3_cell-discovery.html'], ['shapes', '形態與功能', '4_cell-shapes.html'],
    ['assess1', '形成性評量（一）', '5_assessment-2-1.html'], ['animal', '動物細胞', '6_animal-cell.html'],
    ['plant', '植物細胞', '7_plant-cell.html'], ['compare', '動植物比較', '8_animal-plant-comparison.html'],
    ['lab', '玻片觀察', '10_slide-observation.html'], ['microscope', '顯微影像', '9_microscope-images.html'],
    ['assess2', '形成性評量（二）', '11_assessment-2-2.html'], ['reading', '閱讀素養', '12_reading-literacy.html'],
    ['challenge', '細胞學習英雄榜', '13_comprehensive-challenge.html'], ['result', '學習結果', '14_learning-result.html']
  ];

  function state() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch { return {}; }
  }
  function isTeacher() { return sessionStorage.getItem(TEACHER_KEY) === '1'; }
  function learningScore(current = state()) {
    if (Number.isInteger(current.learningScore)) return current.learningScore;
    return Object.values(current.learningPoints || {}).reduce((total, page) => total + Object.values(page || {}).reduce((sum, value) => sum + Number(value || 0), 0), 0);
  }
  function renderScore() {
    const score = document.querySelector('#learning-score-total');
    if (!score) return;
    score.textContent = isTeacher() ? '教師模式｜不計分' : `學習總分 ${learningScore()}／${MAX_LEARNING_SCORE}`;
  }
  function unlockNavigation() {
    if (!isTeacher()) return;
    const nav = document.querySelector('.course-progress');
    if (!nav) return;
    const currentFile = location.pathname.split('/').pop() || '1_home.html';
    nav.innerHTML = pageOrder.map(([id, title, url], index) => {
      const current = url === currentFile;
      return `<a class="course-step ${current ? 'current' : 'available teacher-available'}" href="${url}" ${current ? 'aria-current="page"' : ''}><span>${current ? index + 1 : '↗'}</span><strong>${title}</strong><small>${current ? '目前頁面' : '教師可進入'}</small></a>`;
    }).join('');
    nav.querySelector('.current')?.scrollIntoView({behavior:'instant', block:'nearest', inline:'center'});
  }
  function updateTeacherUi() {
    document.body.classList.toggle('teacher-mode', isTeacher());
    const button = document.querySelector('#teacher-mode-button');
    if (button) button.innerHTML = isTeacher() ? '🔓 教師模式' : '🔒 教師模式';
    renderScore();
    unlockNavigation();
    // Other page scripts rebuild the progress bar during DOMContentLoaded.
    // Reapply teacher links after those synchronous initializers have finished.
    if (isTeacher()) setTimeout(unlockNavigation, 0);
  }
  function enableDragScroll(nav) {
    let dragging = false;
    let moved = false;
    let startX = 0;
    let startScroll = 0;
    nav.addEventListener('pointerdown', event => {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      dragging = true;
      moved = false;
      startX = event.clientX;
      startScroll = nav.scrollLeft;
      nav.classList.add('dragging');
      nav.setPointerCapture?.(event.pointerId);
    });
    nav.addEventListener('pointermove', event => {
      if (!dragging) return;
      const distance = event.clientX - startX;
      if (Math.abs(distance) > 5) moved = true;
      nav.scrollLeft = startScroll - distance;
    });
    const stop = event => {
      if (!dragging) return;
      dragging = false;
      nav.classList.remove('dragging');
      nav.releasePointerCapture?.(event.pointerId);
    };
    nav.addEventListener('pointerup', stop);
    nav.addEventListener('pointercancel', stop);
    nav.addEventListener('click', event => {
      if (moved) {
        event.preventDefault();
        event.stopPropagation();
        moved = false;
      }
    }, true);
  }
  function buildCompactHeader(controls) {
    const nav = document.querySelector('.course-progress');
    if (!nav) return;
    const oldHeader = document.querySelector('.site-header');
    controls.className = 'compact-course-header';
    controls.innerHTML = '<div class="compact-course-identity"><a class="compact-brand" href="1_home.html">⌕ 微觀細胞研究所</a><button type="button" id="teacher-mode-button" class="teacher-mode-button">🔒 教師模式</button></div><div class="compact-stage-scroll"></div><strong id="learning-score-total" class="learning-score-total"></strong>';
    document.body.insertBefore(controls, document.body.firstChild);
    nav.classList.add('compact-course-progress');
    controls.querySelector('.compact-stage-scroll').appendChild(nav);
    oldHeader?.remove();
    document.body.classList.add('compact-header-ready');
    enableDragScroll(nav);
    nav.querySelector('.current')?.scrollIntoView({behavior:'instant', block:'nearest', inline:'center'});
  }
  function addControls() {
    if (document.querySelector('#teacher-mode-button')) return;
    const controls = document.createElement('div');
    buildCompactHeader(controls);
    const dialog = document.createElement('dialog');
    dialog.className = 'teacher-dialog';
    dialog.innerHTML = '<form method="dialog"><h2>教師模式</h2><p>輸入教師密碼後，可開啟所有課程頁面。教師操作不計分，也不會上傳成績。</p><label>教師密碼<input id="teacher-password" type="password" inputmode="numeric" autocomplete="off" required></label><p id="teacher-password-message" class="form-message" aria-live="polite"></p><div><button type="button" class="secondary-button" id="teacher-cancel">取消</button><button type="submit" class="primary-button">解鎖所有頁面</button></div></form>';
    document.body.appendChild(dialog);
    dialog.querySelector('#teacher-cancel').addEventListener('click', () => dialog.close());
    dialog.querySelector('form').addEventListener('submit', event => {
      event.preventDefault();
      const password = dialog.querySelector('#teacher-password');
      if (password.value === ['55', '688'].join('')) {
        sessionStorage.setItem(TEACHER_KEY, '1');
        password.value = '';
        dialog.close();
        updateTeacherUi();
      } else {
        dialog.querySelector('#teacher-password-message').textContent = '密碼不正確，請重新輸入。';
        password.select();
      }
    });
    controls.querySelector('#teacher-mode-button').addEventListener('click', () => {
      if (isTeacher()) {
        sessionStorage.removeItem(TEACHER_KEY);
        location.reload();
        return;
      }
      dialog.querySelector('#teacher-password-message').textContent = '';
      dialog.showModal();
      dialog.querySelector('#teacher-password').focus();
    });
    updateTeacherUi();
  }

  window.CellLearningMode = { isTeacher, learningScore, maxScore: MAX_LEARNING_SCORE, renderScore, unlockNavigation };
  window.addEventListener('learning-score-changed', renderScore);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addControls);
  else addControls();
})();
