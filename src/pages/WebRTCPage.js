import { routeConfig } from '../route';

export class WebRTCPage {
    constructor(router, samplePath) {
      this.router = router;
      this.samplePath = samplePath; 
    }
  
    render() {
      if (!document.getElementById('webrtc-styles')) {
        const link1 = document.createElement('link');
        link1.id = 'webrtc-styles';
        link1.rel = 'stylesheet';
        link1.href = '/src/webrtc/css/main.css';
        document.head.appendChild(link1);

        const link2 = document.createElement('link');
        link2.rel = 'stylesheet';
        link2.href = '/src/webrtc/css/toggle-target.css';
        document.head.appendChild(link2);
      }

      if (this.samplePath) {
        this._renderSampleView();
      } else {
        this._renderListView();
      }
    }

    _renderSampleView() {
      const app = document.getElementById('app');
      app.innerHTML = '';
      
      // Use flexbox to prevent scrollbars when header is present
      app.style.display = 'flex';
      app.style.flexDirection = 'column';
      app.style.height = '100%';
  
      const header = document.createElement('header');
      header.style.padding = '10px';
      header.style.background = '#f0f0f0';
      header.style.borderBottom = '1px solid #ccc';
      header.style.display = 'flex';
      header.style.justifyContent = 'space-between';
      header.style.alignItems = 'center';
      header.style.flexShrink = '0'; // Prevent header from shrinking
  
      const backBtn = document.createElement('button');
      backBtn.textContent = '이전';
      backBtn.addEventListener('click', () => this.router.navigateTo('/webrtc'));
      header.appendChild(backBtn);
  
      const title = document.createElement('span');
      title.textContent = `Viewing: ${this.samplePath}`;
      title.style.fontWeight = 'bold';
      header.appendChild(title);
  
      app.appendChild(header);
  
      const iframe = document.createElement('iframe');
      iframe.src = this.samplePath;
      iframe.style.width = '100%';
      iframe.style.flex = '1'; // Take remaining space
      iframe.style.border = 'none';
      iframe.style.display = 'block'; // Remove extra space below iframe

      iframe.onload = () => {
        try {
          const doc = iframe.contentDocument || iframe.contentWindow.document;
          
          // Inject main.css
          const link1 = doc.createElement('link');
          link1.rel = 'stylesheet';
          link1.href = '/src/webrtc/css/main.css';
          doc.head.appendChild(link1);

          // Inject toggle-target.css
          const link2 = doc.createElement('link');
          link2.rel = 'stylesheet';
          link2.href = '/src/webrtc/css/toggle-target.css';
          doc.head.appendChild(link2);

        } catch (e) {
          console.warn('Could not inject styles into iframe (cross-origin or other error):', e);
        }
      };

      app.appendChild(iframe);
    }
  
    _renderListView() {
      const app = document.getElementById('app');
      app.innerHTML = '';
  
      // Root Portal Button
      const header = document.createElement('div');
      header.style.padding = '10px';
      const homeBtn = document.createElement('a');
      homeBtn.textContent = 'Home';
      homeBtn.href = '/';
      header.appendChild(homeBtn);
      app.appendChild(header);

      const container = document.createElement('div');
      container.id = 'container'; // Important for original CSS
  
      const title = document.createElement('h1');
      title.textContent = 'WebRTC samples';
      container.appendChild(title);
  
      const introSection = document.createElement('section');
      introSection.innerHTML = `
        <p>
            이는 <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API">WebRTC API</a>의 다양한 부분을 시연하는
            여러 작은 예제들의 모음입니다. 모든 예제의 코드는
            <a href="https://github.com/webrtc/samples">GitHub 저장소</a>에서 확인할 수 있습니다.
        </p>
        <p>
            대부분의 예제는 사양 변경이나 브라우저별 프리픽스 차이를 보완하기 위한 작은 라이브러리(shim)인
            <a href="https://github.com/webrtc/adapter">adapter.js</a>를 사용합니다.
        </p>
        <p>
            <a href="https://webrtc.org/getting-started/testing" title="Command-line flags for WebRTC testing">
                https://webrtc.org/getting-started/testing
            </a>
            에서는 Chrome에서 개발 및 테스트할 때 유용한 커맨드라인 플래그 목록을 확인할 수 있습니다.
        </p>
        <p>
            패치나 이슈 제보는 언제든 환영합니다! 자세한 내용은
            <a href="https://github.com/webrtc/samples/blob/gh-pages/CONTRIBUTING.md">CONTRIBUTING.md</a>
            를 참고하세요.
        </p>
        <p class="warning">
            <strong>경고:</strong> 테스트 중에는 반드시 헤드폰 사용을 권장합니다.
            그렇지 않으면 시스템에서 큰 오디오 피드백이 발생할 수 있습니다.
        </p>
      `;
      container.appendChild(introSection);
  
      const samplesSection = document.createElement('section');
      routeConfig.forEach(section => {
        const h2 = document.createElement('h2');
        h2.textContent = section.title;
        samplesSection.appendChild(h2);
  
        const ul = document.createElement('ul');
        section.items.forEach(item => {
           this._createLinkItem(ul, item.text, item.href);
        });
        samplesSection.appendChild(ul);
      });
      container.appendChild(samplesSection);
  
      app.appendChild(container);
    }
  
    _createLinkItem(parent, text, href) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.textContent = text;
      a.href = href;
      
      a.addEventListener('click', (e) => {
        e.preventDefault();
        this.router.navigateTo(`/webrtc?path=${encodeURIComponent(href)}`);
      });
  
      li.appendChild(a);
      parent.appendChild(li);
    }

    unmount() {
        // Nothing to clean up
    }
  }
