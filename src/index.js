
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
  title.textContent = '테스트 환경 바로가기';

  const desc = document.createElement('p');
  desc.textContent = 'HTTPS 환경에서 테스트하세요.';

  const btnmMinimalCopyPaste = document.createElement('button');
  btnmMinimalCopyPaste.textContent = 'WebRTC samples';
  btnmMinimalCopyPaste.addEventListener('click', () => {
    location.href = '/src/webrtc';
  });

  container.appendChild(title);
  container.appendChild(desc);
  container.appendChild(btnmMinimalCopyPaste);

  app.appendChild(container);
});
