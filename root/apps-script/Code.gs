var SHEET_NAME = 'Counter';
var CELL = 'A1';
var BUMP_TOKEN = '1qaz-pl,0okm2wsx3edc9ijn';

function doGet(e) {
  var action = (e.parameter.action || 'read').toLowerCase();
  var sheet = getSheet_();
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var count = readCount_(sheet);
    if (action === 'bump') {
      if (e.parameter.token !== BUMP_TOKEN) {
        return json_({ error: 'forbidden', count: count });
      }
      count += 1;
      sheet.getRange(CELL).setValue(count);
    }
    return json_({ count: count });
  } finally {
    lock.releaseLock();
  }
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.getRange(CELL).setValue(0);
  }
  return sheet;
}

function readCount_(sheet) {
  var v = sheet.getRange(CELL).getValue();
  return typeof v === 'number' && v >= 0 ? Math.floor(v) : 0;
}

function json_(obj) {
  var out = ContentService.createTextOutput(JSON.stringify(obj));
  out.setMimeType(ContentService.MimeType.JSON);
  return out;
}
