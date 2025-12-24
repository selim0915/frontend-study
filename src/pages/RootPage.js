export class RootPage {
    constructor(router) {
      this.router = router;
    }

    navigateTo(path) {
      this.router.navigateTo(path);
    }

    render() {
      const app = document.getElementById('app');
      app.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center;">
          <h1>Frontend Study Portal</h1>
          <nav>
            <ul style="list-style: decimal-leading-zero; padding: 0; display: flex; flex-direction: column; gap: 15px;">
              <li>
                <a href="/webrtc" id="webrtcLink">
                  WebRTC Samples (SPA)
                </a>
              </li>
            </ul>
          </nav>
        </div>
      `;

      document.getElementById('webrtcLink').addEventListener('click', (e) => {
        e.preventDefault();
        this.router.navigateTo('/webrtc');
      });
    }
  
    unmount() {}
  }
