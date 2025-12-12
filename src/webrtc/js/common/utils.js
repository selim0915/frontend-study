/**
 * 새 탭 열기
 * @param {string} url 
 */
window.openTab = function(url) {
  window.open(url, "_blank");
};

/**
 * 복사 이벤트
 */
window.copyText = function(id) {
  var el = document.getElementById(id);
  if (!el) return;

  el.select();
  el.setSelectionRange(0, 999999); // 모바일 대응

  try {
    document.execCommand('copy');
  } catch (e) {
    alert('복사 중 오류: ' + e.message);
  }
}

/**
 * 붙여넣기 이벤트
 */
window.pasteText = function(id) {
  var el = document.getElementById(id);
  if (!el) return;

  // 최신 브라우저 Clipboard API
  if (navigator.clipboard && navigator.clipboard.readText) {
    navigator.clipboard.readText()
      .then(function(text) {
        el.value = text;
      });
    return;
  }

  // fallback (구형)
  alert('클립보드에서 붙여넣기 지원 안됨');
}

/**
 * 지우기 이벤트
 */
window.clearText = function(id) {
  var el = document.getElementById(id);
  if (!el) return;
  el.value = '';
}

/**
 * WebRTC 통화 상태를 나타내는 전역 객체
 */
const CALL_STATUS = {
  IDLE:        { text: '접속', class: 'status-idle' },
  WAITING:     { text: '대기', class: 'status-waiting' },
  CONNECTING:  { text: '연결중', class: 'status-connecting' },
  CONNECTED:   { text: '통화중', class: 'status-connected' },
  DISCONNECTED:{ text: '종료', class: 'status-disconnected' },
  ERROR:       { text: '오류', class: 'status-error' },
};
const WS_STATUS = {
  IDLE:        { id: 'IDLE',        label: '접속' },
  WAITING:     { id: 'WAITING',     label: '대기' },
  CONNECTING:  { id: 'CONNECTING',  label: '연결중' },
  CONNECTED:   { id: 'CONNECTED',   label: '통화중' },
  DISCONNECTED:{ id: 'DISCONNECTED',label: '종료' },
  ERROR:       { id: 'ERROR',       label: '오류'},
};

/**
 * 상태값을 DOM에 반영하는 공통 함수
 * @param {string} elementId - 상태를 넣을 DOM 요소 ID
 * @param {string} status - 표시할 상태 문자열
 */
window.applyStatusToDOM = function(target, statusKey, message) {
  try {
    var el = document.getElementById(target + "Status");
    if (!el) return;
  
    var statusInfo = CALL_STATUS[statusKey];
    
    if (statusInfo) {
      el.textContent = statusInfo.text;
      el.className = statusInfo.class || '';
    } else {
      el.textContent = statusKey;
      el.className = '';
    }

    if (message) {
      console.error(`[${target}] 상태 '${statusKey}' 오류 메시지:`, message);
    }
  } catch (err) {
    console.error('[ERROR] applyStatusToDOM :', err);
  }
};

/** LOGGING */
window.log = function(level, msg) {
  const timestamp = new Date().toISOString();
  const line = `[${timestamp}] [${level}] ${msg}`;
  console.log(line);

  fetch(CONFIG.logUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ level, message: msg, timestamp })
  })
  .catch(e => console.error('[ERROR] log :', e));
};