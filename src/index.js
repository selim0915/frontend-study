import { Router } from './router';
import { RootPage } from './pages/RootPage';
import { WebRTCPage } from './pages/WebRTCPage';

window.addEventListener('DOMContentLoaded', () => {
  
  // Router Setup
  const router = new Router({
    '/': (r) => new RootPage(r),
    '/webrtc': (r, path) => new WebRTCPage(r, path),
  });

  window.router = router;
});
