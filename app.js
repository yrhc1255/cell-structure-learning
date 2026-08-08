const STORAGE_KEY = 'cellStructureDemo';

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

const studentForm = document.querySelector('#student-form');
if (studentForm) {
  const saved = readState();
  document.querySelector('#class-code').value = saved.classCode || '';
  document.querySelector('#seat-number').value = saved.seatNumber || '';
  document.querySelector('#name-code').value = saved.nameCode || '';

  studentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const classCode = document.querySelector('#class-code').value.trim();
    const seatNumber = document.querySelector('#seat-number').value.trim();
    const nameCode = document.querySelector('#name-code').value.trim();
    if (!classCode || !seatNumber || !nameCode) {
      document.querySelector('#form-message').textContent = '請完成班級代號、座號與名稱代碼。';
      return;
    }
    writeState({ classCode, seatNumber, nameCode, currentPage: 'guide' });
    window.location.href = '2_guide.html';
  });
}

const warmupChoice = document.querySelector('#warmup-choice');
if (warmupChoice) {
  const saved = readState();
  warmupChoice.value = saved.warmupChoice || '';
  const nextLink = document.querySelector('#guide-next');
  const progressLesson = document.querySelector('#progress-lesson');
  const updateGuide = () => {
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
    writeState({ warmupChoice: warmupChoice.value, guideCompleted: Boolean(warmupChoice.value), currentPage: 'guide' });
    updateGuide();
  });
}

const lessonQuestions = [...document.querySelectorAll('[data-question]')];
if (lessonQuestions.length) {
  const saved = readState();
  const nextLink = document.querySelector('#lesson-next');
  const allQuestionIds = lessonQuestions.map((card) => card.dataset.question);
  const migratedAnswers = saved.discoveryQuestionCorrect ? ['q1'] : [];
  let completedIds = new Set(saved.discoveryCorrectAnswers || migratedAnswers);

  if (!saved.guideCompleted && !saved.warmupChoice) {
    window.location.replace('2_guide.html');
  }

  function updateLessonProgress() {
    const completedCount = completedIds.size;
    const percent = Math.round(18 + (completedCount / allQuestionIds.length) * 7);
    const taskStatus = document.querySelector('#task-status');
    if (taskStatus) taskStatus.textContent = `${completedCount}／${allQuestionIds.length}`;
    document.querySelector('#lesson-progress-label').textContent = `進度 ${percent}％`;
    document.querySelector('#lesson-progress').style.width = `${percent}%`;
    const pageCompleted = completedCount === allQuestionIds.length;
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

  lessonQuestions.forEach((card) => {
    const questionId = card.dataset.question;
    const form = card.querySelector('form');
    const checkButton = form.querySelector('.check-question');
    const feedback = card.querySelector('.feedback');

    if (completedIds.has(questionId)) markQuestionComplete(card);

    form.addEventListener('change', () => {
      checkButton.disabled = currentValues(form).length === 0;
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const selectedValues = currentValues(form);
      const correctValues = card.dataset.correct.split(',').sort();
      const isCorrect = JSON.stringify(selectedValues) === JSON.stringify(correctValues);
      form.querySelectorAll('input,select').forEach((control) => { control.disabled = true; });
      checkButton.disabled = true;
      feedback.hidden = false;

      if (isCorrect) {
        form.querySelectorAll('input:checked').forEach((input) => input.closest('.answer-option')?.classList.add('correct'));
        feedback.className = 'feedback correct';
        feedback.innerHTML = `<h3>答對了</h3><p>${card.dataset.explanation}</p>`;
        completedIds.add(questionId);
        writeState({ discoveryCorrectAnswers: [...completedIds], discoveryPageCompleted: completedIds.size === allQuestionIds.length, currentPage: 'lesson' });
        updateLessonProgress();
      } else {
        form.querySelectorAll('input:checked').forEach((input) => input.closest('.answer-option')?.classList.add('incorrect'));
        feedback.className = 'feedback incorrect';
        feedback.innerHTML = '<h3>再找一次證據</h3><p>回到上方教材文字或圖片尋找線索，再重新作答。</p><button type="button" class="retry-button">重新作答</button>';
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
