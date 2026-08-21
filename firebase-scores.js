(function () {
  const firebaseConfig = {
    apiKey: 'AIzaSyBBN-8HNF0qryGLky6YqQ_xwVXR7QA_IA0',
    authDomain: 'project1-1-a4f7a.firebaseapp.com',
    projectId: 'project1-1-a4f7a',
    storageBucket: 'project1-1-a4f7a.firebasestorage.app',
    messagingSenderId: '196563863148',
    appId: '1:196563863148:web:16a9f31e6639cf9f5bfa49'
  };

  const setStatus = (message, type = '') => {
    const status = document.querySelector('#score-sync-status');
    if (!status) return;
    status.textContent = message;
    status.className = `score-sync-status ${type}`.trim();
  };

  if (!window.firebase) {
    window.uploadCellScores = async () => setStatus('Firebase 程式未載入，分數暫存在本機。', 'error');
    return;
  }

  if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const safePart = value => String(value).trim().replace(/[^0-9A-Za-z_-]/g, '_').slice(0, 24);

  window.uploadCellScores = async function uploadCellScores(state) {
    const { classCode, seatNumber, nameCode } = state || {};
    if (!classCode || !seatNumber || !nameCode) {
      setStatus('缺少班級代號、座號或名稱代碼，分數暫存在本機。', 'error');
      return;
    }

    const scores = {};
    if (Number.isInteger(state.assess1Score)) scores.assess1Score = state.assess1Score;
    if (Number.isInteger(state.assess2Score)) scores.assess2Score = state.assess2Score;
    if (Number.isInteger(state.challengeScore)) scores.challengeScore = state.challengeScore;
    if (!Object.keys(scores).length) return;

    const recordId = [classCode, seatNumber, nameCode].map(safePart).join('__');
    setStatus('正在將分數上傳至 Firebase……');
    try {
      await db.collection('cell_scores').doc(recordId).set({
        classCode: String(classCode).trim(),
        seatNumber: String(seatNumber).trim(),
        nameCode: String(nameCode).trim(),
        ...scores,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
      setStatus('三項已完成的分數已同步至 Firebase。', 'success');
    } catch (error) {
      console.error('Firebase score upload failed:', error);
      setStatus('Firebase 暫時無法上傳；分數仍保存在這台裝置，稍後重新開啟結果頁會再嘗試。', 'error');
    }
  };

  window.uploadChallengeHighScore = async function uploadChallengeHighScore(state, score) {
    const classCode = String(state?.classCode || '').trim();
    const seatNumber = String(state?.seatNumber || '').trim();
    if (!classCode || !seatNumber || !Number.isInteger(score)) throw new Error('排行榜資料不完整');
    const ref = db.collection('challenge_leaderboard').doc([classCode, seatNumber].map(safePart).join('__'));
    await db.runTransaction(async transaction => {
      const snapshot = await transaction.get(ref);
      const previous = snapshot.exists ? Number(snapshot.data().score || 0) : -1;
      if (score > previous) transaction.set(ref, {
        classCode,
        seatNumber,
        score,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    });
  };

  window.loadChallengeLeaderboard = async function loadChallengeLeaderboard() {
    const snapshot = await db.collection('challenge_leaderboard').orderBy('score', 'desc').limit(10).get();
    return snapshot.docs.map(doc => doc.data());
  };
})();
