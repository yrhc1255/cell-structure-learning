const SPREADSHEET_ID = '1SS7EigDpKZGfPbp3czhIAVwylKC91eon_I35LqRjRbo';
const SHEET_NAME = '成績總表';
const HEADERS = ['時間', '班級', '座號', '姓名', '形成性評量（一）', '形成性評量（二）', '細胞學習英雄榜最高分'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    const payload = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const classCode = cleanText_(payload.classCode, 24);
    const seatNumber = cleanText_(payload.seatNumber, 12);
    const nameCode = cleanText_(payload.nameCode, 40);

    if (!classCode || !seatNumber || !nameCode) {
      return json_({ok: false, error: '學生資料不完整'});
    }

    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) return json_({ok: false, error: '找不到成績總表'});

    ensureHeaders_(sheet);
    const row = findStudentRow_(sheet, classCode, seatNumber, nameCode);
    const current = row ? sheet.getRange(row, 1, 1, HEADERS.length).getValues()[0] : [];
    const assess1 = scoreOrExisting_(payload.assess1Score, current[4], 0, 100);
    const assess2 = scoreOrExisting_(payload.assess2Score, current[5], 0, 100);
    const incomingHero = validScore_(payload.challengeScore, 0, 60000);
    const existingHero = validScore_(current[6], 0, 60000);
    const heroBest = incomingHero === '' ? existingHero : Math.max(Number(existingHero || 0), Number(incomingHero));
    const values = [[new Date(), classCode, seatNumber, nameCode, assess1, assess2, heroBest]];

    if (row) sheet.getRange(row, 1, 1, HEADERS.length).setValues(values);
    else sheet.appendRow(values[0]);

    return json_({ok: true, updated: Boolean(row), challengeHighScore: heroBest});
  } catch (error) {
    return json_({ok: false, error: String(error && error.message || error)});
  } finally {
    lock.releaseLock();
  }
}

function ensureHeaders_(sheet) {
  const current = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  if (HEADERS.some((header, index) => current[index] !== header)) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  }
  sheet.setFrozenRows(1);
}

function findStudentRow_(sheet, classCode, seatNumber, nameCode) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return 0;
  const rows = sheet.getRange(2, 2, lastRow - 1, 3).getDisplayValues();
  const index = rows.findIndex(row => row[0].trim() === classCode && row[1].trim() === seatNumber && row[2].trim() === nameCode);
  return index < 0 ? 0 : index + 2;
}

function scoreOrExisting_(incoming, existing, min, max) {
  const score = validScore_(incoming, min, max);
  return score === '' ? validScore_(existing, min, max) : score;
}

function validScore_(value, min, max) {
  if (value === '' || value === null || typeof value === 'undefined') return '';
  const score = Number(value);
  return Number.isInteger(score) && score >= min && score <= max ? score : '';
}

function cleanText_(value, maxLength) {
  return String(value || '').trim().replace(/[<>\u0000-\u001f]/g, '').slice(0, maxLength);
}

function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
