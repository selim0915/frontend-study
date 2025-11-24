
console.log('Starting application...');

// process.env 테스트
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('API_KEY:', process.env.API_KEY);

console.log('Application started successfully!');

// DOM 준비 후 메뉴 렌더링
window.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app') || document.body;

  const container = document.createElement('div');
  container.style.textAlign = 'center';
  container.style.marginTop = '24px';

  const title = document.createElement('h2');
  title.textContent = 'WebRTC 샘플 바로가기';

  const desc = document.createElement('p');
  desc.textContent = '원하는 샘플을 선택하세요. HTTPS 환경에서 테스트하세요.';

  const btnmMinimalCopyPaste = document.createElement('button');
  btnmMinimalCopyPaste.textContent = '웹소켓 또는 수동 복붙으로 WebRTC 연결 테스트';
  btnmMinimalCopyPaste.addEventListener('click', () => {
    location.href = '/src/webrtc/minimal-copy-paste.html';
  });

  const btnP2P = document.createElement('button');
  btnP2P.textContent = 'Firestore/WebSocket P2P Demo';
  btnP2P.addEventListener('click', () => {
    location.href = '/src/webrtc/backup/p2p-webrtc.html';
  });

  container.appendChild(title);
  container.appendChild(desc);
  container.appendChild(btnmMinimalCopyPaste);
  // container.appendChild(btnP2P);

  app.appendChild(container);
});
