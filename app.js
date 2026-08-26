const STORAGE_KEY = 'cellStructureDemo';

window.addEventListener('pageshow', (event) => {
  if (event.persisted) window.location.reload();
});

function shuffleControls(form) {
  const options = [...form.querySelectorAll(':scope > .answer-option')];
  for (let index = options.length - 1; index > 0; index -= 1) {
    const random = new Uint32Array(1);
    crypto.getRandomValues(random);
    const swapIndex = random[0] % (index + 1);
    [options[index], options[swapIndex]] = [options[swapIndex], options[index]];
  }
  const button = form.querySelector('.check-question');
  options.forEach(option => form.insertBefore(option, button));
  const select = form.querySelector('select');
  if (select) {
    const choices = [...select.options].filter(option => option.value !== '');
    for (let index = choices.length - 1; index > 0; index -= 1) {
      const random = new Uint32Array(1);
      crypto.getRandomValues(random);
      const swapIndex = random[0] % (index + 1);
      [choices[index], choices[swapIndex]] = [choices[swapIndex], choices[index]];
    }
    choices.forEach(option => select.appendChild(option));
  }
}

function readState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function writeState(patch) {
  const next = { ...readState(), ...patch };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

function isPageReload() {
  const navigation = performance.getEntriesByType('navigation')[0];
  return navigation?.type === 'reload' || performance.navigation?.type === 1;
}

function clearSavedAnswers(keys) {
  const state = readState();
  keys.forEach((key) => delete state[key]);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  return state;
}

function createCourseSessionId() {
  const random = new Uint32Array(1);
  crypto.getRandomValues(random);
  return `${Date.now()}-${random[0]}`;
}

function resetCourseFromHomeEntry() {
  if (window.CellLearningMode?.isTeacher()) return readState();
  let cameFromHome = false;
  try {
    const referrerPath = new URL(document.referrer).pathname;
    cameFromHome = referrerPath.endsWith('/1_home.html') || referrerPath === '/';
  } catch {
    cameFromHome = false;
  }
  if (!cameFromHome) return null;
  const previous = readState();
  const fresh = {
    classCode: previous.classCode || '',
    seatNumber: previous.seatNumber || '',
    nameCode: previous.nameCode || '',
    currentPage: 'guide',
    courseSessionId: createCourseSessionId()
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
  return fresh;
}

const studentForm = document.querySelector('#student-form');
if (studentForm) {
  const clearHomeForm = () => {
    if (!window.CellLearningMode?.isTeacher()) localStorage.removeItem(STORAGE_KEY);
    studentForm.reset();
    document.querySelector('#class-code').value = '';
    document.querySelector('#seat-number').value = '';
    document.querySelector('#name-code').value = '';
    document.querySelector('#form-message').textContent = '';
  };
  clearHomeForm();
  window.addEventListener('pageshow', clearHomeForm);

  studentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (window.CellLearningMode?.isTeacher()) {
      window.location.href = '2_guide.html';
      return;
    }
    const classCode = document.querySelector('#class-code').value.trim();
    const seatNumber = document.querySelector('#seat-number').value.trim();
    const nameCode = document.querySelector('#name-code').value.trim();
    if (!classCode || !seatNumber || !nameCode) {
      document.querySelector('#form-message').textContent = '請完成班級代號、座號與名稱代碼。';
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      classCode,
      seatNumber,
      nameCode,
      currentPage: 'guide',
      courseSessionId: createCourseSessionId()
    }));
    window.location.href = '2_guide.html';
  });
}

const warmupChoice = document.querySelector('#warmup-choice');
if (warmupChoice) {
  const homeEntryState = resetCourseFromHomeEntry();
  const saved = homeEntryState || (isPageReload() ? clearSavedAnswers(['warmupChoice']) : readState());
  warmupChoice.value = saved.warmupChoice || '';
  const nextLink = document.querySelector('#guide-next');
  const progressLesson = document.querySelector('#progress-lesson');
  const updateGuide = () => {
    if (window.CellLearningMode?.isTeacher()) {
      nextLink.classList.remove('disabled-link');
      nextLink.setAttribute('aria-disabled', 'false');
      window.CellLearningMode.unlockNavigation();
      return;
    }
    const completed = Boolean(warmupChoice.value);
    nextLink.classList.toggle('disabled-link', !completed);
    nextLink.setAttribute('aria-disabled', String(!completed));
    progressLesson.classList.toggle('locked', !completed);
    progressLesson.classList.toggle('available', completed);
    progressLesson.setAttribute('aria-disabled', String(!completed));
    if (completed) {
      progressLesson.href = '3_cell-discovery.html';
      progressLesson.querySelector('small').textContent = '可以進入';
    } else {
      progressLesson.removeAttribute('href');
      progressLesson.querySelector('small').textContent = '完成本頁解鎖';
    }
  };
  updateGuide();
  warmupChoice.addEventListener('change', () => {
    if (!window.CellLearningMode?.isTeacher()) writeState({ warmupChoice: warmupChoice.value, guideCompleted: Boolean(warmupChoice.value), currentPage: 'guide' });
    updateGuide();
  });
  window.addEventListener('pageshow', () => {
    warmupChoice.value = readState().warmupChoice || '';
    updateGuide();
  });
}

const lessonQuestions = [...document.querySelectorAll('[data-question]')];
if (lessonQuestions.length) {
  const teacherMode = window.CellLearningMode?.isTeacher() === true;
  const saved = teacherMode ? readState() : isPageReload()
    ? clearSavedAnswers(['discoveryQuestionCorrect', 'discoveryCorrectAnswers'])
    : readState();
  const nextLink = document.querySelector('#lesson-next');
  const allQuestionIds = lessonQuestions.map((card) => card.dataset.question);
  const migratedAnswers = saved.discoveryQuestionCorrect ? ['q1'] : [];
  let completedIds = new Set(teacherMode ? [] : (saved.discoveryCorrectAnswers || migratedAnswers));
  const attempts = {...(saved.learningAttempts?.discovery || {})};
  const earnedPoints = {...(saved.learningPoints?.discovery || {})};

  if (!teacherMode && !saved.guideCompleted && !saved.warmupChoice) {
    window.location.replace('2_guide.html');
  }

  function updateLessonProgress() {
    const completedCount = completedIds.size;
    const percent = Math.round(18 + (completedCount / allQuestionIds.length) * 7);
    const taskStatus = document.querySelector('#task-status');
    if (taskStatus) taskStatus.textContent = `${completedCount}／${allQuestionIds.length}`;
    document.querySelector('#lesson-progress-label').textContent = `進度 ${percent}％`;
    document.querySelector('#lesson-progress').style.width = `${percent}%`;
    const pageCompleted = teacherMode || completedCount === allQuestionIds.length;
    nextLink.classList.toggle('disabled-link', !pageCompleted);
    nextLink.setAttribute('aria-disabled', String(!pageCompleted));
  }

  function currentValues(form) {
    const selectedInputs = [...form.querySelectorAll('input:checked')].map((input) => input.value);
    const select = form.querySelector('select');
    if (select?.value) selectedInputs.push(select.value);
    return selectedInputs.sort();
  }

  function markQuestionComplete(card) {
    const form = card.querySelector('form');
    const correctValues = card.dataset.correct.split(',').sort();
    correctValues.forEach((value) => {
      const control = form.querySelector(`[value="${value}"]`);
      if (!control) return;
      if (control.tagName === 'OPTION') control.parentElement.value = value;
      else control.checked = true;
      control.closest('.answer-option')?.classList.add('correct');
    });
    form.querySelectorAll('input,select').forEach((control) => { control.disabled = true; });
    form.querySelector('.check-question').disabled = true;
    const feedback = card.querySelector('.feedback');
    feedback.hidden = false;
    feedback.className = 'feedback correct';
    feedback.innerHTML = `<h3>已答對</h3><p>${card.dataset.explanation}</p>`;
  }

  function saveLearningProgress(questionId, wasCorrect) {
    if (teacherMode) return 0;
    attempts[questionId] = Number(attempts[questionId] || 0) + 1;
    if (wasCorrect && !Number.isInteger(earnedPoints[questionId])) earnedPoints[questionId] = Math.max(1, 4 - attempts[questionId]);
    const latest = readState();
    const learningAttempts = {...(latest.learningAttempts || {}), discovery: attempts};
    const learningPoints = {...(latest.learningPoints || {}), discovery: earnedPoints};
    const learningScore = Object.values(learningPoints).reduce((total, page) => total + Object.values(page || {}).reduce((sum, value) => sum + Number(value || 0), 0), 0);
    writeState({learningAttempts, learningPoints, learningScore});
    window.dispatchEvent(new Event('learning-score-changed'));
    return earnedPoints[questionId];
  }

  lessonQuestions.forEach((card) => {
    const questionId = card.dataset.question;
    const form = card.querySelector('form');
    const checkButton = form.querySelector('.check-question');
    const feedback = card.querySelector('.feedback');
    const pointsLabel = document.createElement('p');
    pointsLabel.className = 'question-points';
    card.appendChild(pointsLabel);
    pointsLabel.textContent = teacherMode ? '教師操作不計分' : Number.isInteger(earnedPoints[questionId]) ? `本題已獲得 ＋${earnedPoints[questionId]} 分` : '尚未得分';
    form.reset();
    form.querySelectorAll('input,select').forEach((control) => { control.disabled = false; });
    form.querySelectorAll('.answer-option').forEach((option) => option.classList.remove('incorrect', 'correct'));
    feedback.hidden = true;
    checkButton.disabled = true;
    shuffleControls(form);

    if (completedIds.has(questionId)) markQuestionComplete(card);

    form.addEventListener('change', () => {
      checkButton.disabled = currentValues(form).length === 0;
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const selectedValues = currentValues(form);
      const correctValues = card.dataset.correct.split(',').sort();
      const isCorrect = JSON.stringify(selectedValues) === JSON.stringify(correctValues);
      const points = saveLearningProgress(questionId, isCorrect);
      form.querySelectorAll('input,select').forEach((control) => { control.disabled = true; });
      checkButton.disabled = true;
      feedback.hidden = false;

      if (isCorrect) {
        form.querySelectorAll('input:checked').forEach((input) => input.closest('.answer-option')?.classList.add('correct'));
        feedback.className = 'feedback correct';
        feedback.innerHTML = `<h3>答對了</h3><p>${card.dataset.explanation}</p>`;
        pointsLabel.textContent = teacherMode ? '教師操作不計分' : `本題獲得 ＋${points} 分`;
        completedIds.add(questionId);
        if (!teacherMode) writeState({ discoveryCorrectAnswers: [...completedIds], discoveryPageCompleted: completedIds.size === allQuestionIds.length, currentPage: 'lesson' });
        updateLessonProgress();
      } else {
        form.querySelectorAll('input:checked').forEach((input) => input.closest('.answer-option')?.classList.add('incorrect'));
        feedback.className = 'feedback incorrect';
        feedback.innerHTML = '<h3>再找一次證據</h3><p>回到上方教材文字或圖片尋找線索，再重新作答。</p><button type="button" class="retry-button">重新作答</button>';
        pointsLabel.textContent = teacherMode ? '教師操作不計分' : `第 ${attempts[questionId]} 次作答，答對可得 ${Math.max(1, 3 - attempts[questionId])} 分`;
        feedback.querySelector('.retry-button').addEventListener('click', () => {
          form.reset();
          form.querySelectorAll('input,select').forEach((control) => { control.disabled = false; });
          form.querySelectorAll('.answer-option').forEach((option) => option.classList.remove('incorrect', 'correct'));
          feedback.hidden = true;
          checkButton.disabled = true;
        });
      }
    });
  });

  window.addEventListener('pageshow', () => {
    const latestAnswers = new Set(readState().discoveryCorrectAnswers || []);
    lessonQuestions.forEach((card) => {
      if (latestAnswers.has(card.dataset.question)) return;
      const form = card.querySelector('form');
      form.reset();
      form.querySelectorAll('input,select').forEach((control) => { control.disabled = false; });
      form.querySelectorAll('.answer-option').forEach((option) => option.classList.remove('incorrect', 'correct'));
      form.querySelector('.check-question').disabled = true;
      card.querySelector('.feedback').hidden = true;
    });
  });

  document.querySelector('#reset-lesson')?.addEventListener('click', () => {
    const state = readState();
    delete state.discoveryQuestionCorrect;
    delete state.discoveryCorrectAnswers;
    delete state.discoveryPageCompleted;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    window.location.reload();
  });

  updateLessonProgress();
}
