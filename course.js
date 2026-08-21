const COURSE_STORAGE_KEY = 'cellStructureDemo';
const course = window.CELL_COURSE;

window.addEventListener('pageshow', (event) => {
  if (event.persisted) window.location.reload();
});

function courseState() {
  try { return JSON.parse(localStorage.getItem(COURSE_STORAGE_KEY)) || {}; }
  catch { return {}; }
}
function saveCourseState(patch) {
  const next = {...courseState(),...patch};
  localStorage.setItem(COURSE_STORAGE_KEY,JSON.stringify(next));
  return next;
}
function isPageReload() {
  const navigation = performance.getEntriesByType('navigation')[0];
  return navigation?.type === 'reload' || performance.navigation?.type === 1;
}
function clearModuleAttempt(pageId) {
  const state=courseState();
  delete state[`${pageId}Correct`];
  delete state[`${pageId}Answered`];
  delete state[`${pageId}Score`];
  localStorage.setItem(COURSE_STORAGE_KEY,JSON.stringify(state));
  return state;
}
function completedSet(state=courseState()) {
  const ids = new Set(state.completedModules || []);
  if (state.classCode && state.seatNumber && state.nameCode) ids.add('home');
  if (state.guideCompleted || state.warmupChoice) ids.add('guide');
  if (state.discoveryPageCompleted || (state.discoveryCorrectAnswers || []).length >= 6) ids.add('discovery');
  return ids;
}
function isUnlocked(id,state=courseState()) {
  const index = course.order.findIndex(item=>item.id===id);
  if (index <= 0) return true;
  return completedSet(state).has(course.order[index-1].id);
}
function markModuleComplete(id,extra={}) {
  const state=courseState(); const done=new Set(state.completedModules||[]); done.add(id);
  return saveCourseState({...extra,completedModules:[...done],currentPage:id});
}
function escapeText(value) {
  return String(value).replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
}
function shuffleArray(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const random = new Uint32Array(1);
    crypto.getRandomValues(random);
    const swapIndex = random[0] % (index + 1);
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}
function shuffledQuestionOptions(question) {
  if (question.type !== 'select') return shuffleArray(question.options);
  return [
    ...question.options.filter(([value]) => value === ''),
    ...shuffleArray(question.options.filter(([value]) => value !== ''))
  ];
}
function questionMarkup(question,index){
  const options=shuffledQuestionOptions(question).map(([value,label])=>{
    if(question.type==='select') return `<option value="${escapeText(value)}">${escapeText(label)}</option>`;
    const type=question.type==='checkbox'?'checkbox':'radio';
    return `<label class="answer-option"><input type="${type}" name="question-${index}" value="${escapeText(value)}"><span>${escapeText(label)}</span></label>`;
  }).join('');
  const controls=question.type==='select'?`<label class="select-label">選擇答案<select name="question-${index}">${options}</select></label>`:options;
  return `<section class="question-card module-question" data-question-index="${index}"><div class="question-meta"><span>第 ${index+1} 題／<b class="question-total"></b></span><span>${question.type==='checkbox'?'複選題':question.type==='select'?'下拉選擇':'單選題'}</span></div><h2>${escapeText(question.prompt)}</h2><form>${controls}<button class="primary-button check-question" type="submit" disabled>檢查答案</button></form><div class="feedback" aria-live="polite" hidden></div></section>`;
}

const moduleRoot=document.querySelector('#module-content');
if(moduleRoot){
  const pageId=document.body.dataset.page; const module=course.modules[pageId]; const index=course.order.findIndex(x=>x.id===pageId);
  if(!module){ location.replace('1_home.html'); }
  else if(!isUnlocked(pageId)){ location.replace(course.order[Math.max(0,index-1)].url); }
  else {
    if(isPageReload()) clearModuleAttempt(pageId);
    document.title=`${module.title}｜微觀細胞研究所`; document.querySelector('#module-unit').textContent=module.unit;
    const state=courseState(); const percent=Math.round(index/(course.order.length-1)*100);
    document.querySelector('#module-progress-label').textContent=`進度 ${percent}％`; document.querySelector('#module-progress').style.width=`${percent}%`;
    document.querySelector('#module-stepper').innerHTML=course.order.map((item,i)=>`<${i<=index?'a':'span'} class="course-step ${i<index?'completed':i===index?'current':'locked'}" ${i<=index?`href="${item.url}"`:''} ${i===index?'aria-current="step"':''}><span>${i+1}</span><strong>${escapeText(item.title)}</strong><small>${i<index?'已完成':i===index?'進行中':'尚未解鎖'}</small></${i<=index?'a':'span'}>`).join('');
    document.querySelector('#module-stepper .current')?.scrollIntoView({behavior:'instant',block:'nearest',inline:'center'});
    moduleRoot.innerHTML=`<section class="content-card lesson-heading"><p class="eyebrow">${escapeText(module.unit)}</p><h1>${escapeText(module.title)}</h1><p class="lead">${escapeText(module.subtitle)}</p></section>${module.sections.map(s=>`<section class="content-card module-section"><h2>${escapeText(s.title)}</h2>${s.html}</section>`).join('')}<section class="practice-heading"><p class="eyebrow">互動任務</p><h2>${module.assessment?'完成所有題目並立即查看本次分數':'全部答對，才能完成本頁'}</h2></section>${module.assessment?'<section class="assessment-score" id="assessment-score" aria-live="polite"><span>目前分數</span><strong id="assessment-score-value">0 分</strong><p id="assessment-score-detail">已完成 0／'+module.questions.length+' 題</p></section>':''}${module.questions.map(questionMarkup).join('')}<nav class="page-navigation"><a class="secondary-button" href="${course.order[index-1].url}">← 上一頁</a><a class="primary-button disabled-link" id="module-next" aria-disabled="true" href="${course.order[index+1].url}">下一頁 →</a></nav>`;
    document.querySelectorAll('.question-total').forEach(x=>x.textContent=module.questions.length);
    let current=courseState(); let correct=new Set(current[`${pageId}Correct`]||[]); let answered=new Set(current[`${pageId}Answered`]||[]); const next=document.querySelector('#module-next');
    function update(){
      const count=module.assessment?answered.size:correct.size;
      const complete=count===module.questions.length; next.classList.toggle('disabled-link',!complete); next.setAttribute('aria-disabled',String(!complete));
      if(module.assessment){
        const score=module.scoreMode==='count'?correct.size:Math.round(correct.size/module.questions.length*100);
        document.querySelector('#assessment-score-value').textContent=`${score} 分`;
        document.querySelector('#assessment-score-detail').textContent=complete?`本次成績已保存：答對 ${correct.size}／${module.questions.length} 題。`:`已完成 ${answered.size}／${module.questions.length} 題，答對 ${correct.size} 題。`;
        document.querySelector('#assessment-score').classList.toggle('score-complete',complete);
      }
      if(complete){ const score=module.scoreMode==='count'?correct.size:Math.round(correct.size/module.questions.length*100); const extra={}; extra[`${pageId}Score`]=score; const latest=markModuleComplete(pageId,extra); window.uploadCellScores?.(latest); }
    }
    function values(form){const vals=[...form.querySelectorAll('input:checked')].map(x=>x.value);const select=form.querySelector('select');if(select?.value)vals.push(select.value);return vals.sort();}
    document.querySelectorAll('.module-question').forEach((card,qIndex)=>{
      const q=module.questions[qIndex],form=card.querySelector('form'),button=card.querySelector('.check-question'),feedback=card.querySelector('.feedback');
      const already=module.assessment?answered.has(qIndex):correct.has(qIndex);
      if(already){q.correct.forEach(v=>{const c=form.querySelector(`[value="${v}"]`);if(c?.tagName==='OPTION')c.parentElement.value=v;else if(c)c.checked=true;c?.closest('.answer-option')?.classList.add('correct')});form.querySelectorAll('input,select').forEach(c=>c.disabled=true);feedback.hidden=false;feedback.className=`feedback ${correct.has(qIndex)?'correct':'incorrect'}`;feedback.innerHTML=`<h3>${correct.has(qIndex)?'已答對':'已完成作答'}</h3><p>${escapeText(q.explanation)}</p>`;}
      form.addEventListener('change',()=>button.disabled=values(form).length===0);
      form.addEventListener('submit',event=>{event.preventDefault();const chosen=values(form),right=[...q.correct].sort(),ok=JSON.stringify(chosen)===JSON.stringify(right);form.querySelectorAll('input,select').forEach(c=>c.disabled=true);button.disabled=true;feedback.hidden=false;
        if(ok){correct.add(qIndex);answered.add(qIndex);form.querySelectorAll('input:checked').forEach(c=>c.closest('.answer-option')?.classList.add('correct'));feedback.className='feedback correct';feedback.innerHTML=`<h3>答對了</h3><p>${escapeText(q.explanation)}</p>`;}
        else{answered.add(qIndex);form.querySelectorAll('input:checked').forEach(c=>c.closest('.answer-option')?.classList.add('incorrect'));feedback.className='feedback incorrect';feedback.innerHTML=`<h3>${module.assessment?'已記錄本題':'再找一次證據'}</h3><p>${escapeText(q.explanation)}</p>${module.assessment?'':'<button type="button" class="retry-button">重新作答</button>'}`;if(!module.assessment)feedback.querySelector('.retry-button').addEventListener('click',()=>{form.reset();form.querySelectorAll('input,select').forEach(c=>c.disabled=false);form.querySelectorAll('.answer-option').forEach(x=>x.classList.remove('incorrect','correct'));feedback.hidden=true;button.disabled=true;});}
        const patch={};patch[`${pageId}Correct`]=[...correct];patch[`${pageId}Answered`]=[...answered];saveCourseState(patch);update();
      });
    });
    update();
  }
}

document.querySelectorAll('[data-cell-explorer]').forEach((explorer)=>{
  const status=explorer.querySelector('[data-structure-status]');
  const buttons=[...explorer.querySelectorAll('[data-structure]')];
  const activate=(name)=>{
    explorer.dataset.activeStructure=name;
    buttons.forEach(button=>{const active=button.dataset.structure===name;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});
    explorer.querySelectorAll('[data-hotspot]').forEach(hotspot=>hotspot.classList.toggle('active',hotspot.dataset.hotspot===name));
    const selected=buttons.find(button=>button.dataset.structure===name);
    if(status&&selected) status.textContent=`已選取：${selected.dataset.label}。${selected.dataset.function}`;
  };
  buttons.forEach(button=>button.addEventListener('click',()=>activate(button.dataset.structure)));
  if(buttons[0]) activate(buttons[0].dataset.structure);
});

const resultRoot=document.querySelector('#result-summary');
if(resultRoot){
  if(!isUnlocked('result')) location.replace('13_comprehensive-challenge.html');
  else { markModuleComplete('result'); const state=courseState(); window.uploadCellScores?.(state); resultRoot.innerHTML=`<article class="content-card"><h2>形成性評量（一）</h2><strong class="score-value">${state.assess1Score ?? '—'} 分</strong><p>百分制，完成後自動上傳。</p></article><article class="content-card"><h2>形成性評量（二）</h2><strong class="score-value">${state.assess2Score ?? '—'} 分</strong><p>百分制，完成後自動上傳。</p></article><article class="content-card"><h2>細胞學習英雄榜</h2><strong class="score-value">${state.challengeScore ?? '—'} 分</strong><p>12 個項目，最高 60,000 分；Firebase 與英雄榜只保留最高分。</p></article><p class="score-sync-status" id="score-sync-status" aria-live="polite">正在確認 Firebase 上傳狀態……</p>`; }
}
