export class Router {
  constructor(routes) {
    this.routes = routes;
    this._loadInitialRoute();
  }

  _loadInitialRoute() {
    const path = window.location.pathname;
    this._loadRoute(path);

    window.onpopstate = () => {
      this._loadRoute(window.location.pathname);
    };
  }

  _loadRoute(path) {
    if (this.currentRoute && this.currentRoute.instance && typeof this.currentRoute.instance.unmount === 'function') {
      this.currentRoute.instance.unmount();
    }

    // Split the path and query string, only use the path for matching
    const [pathOnly] = path.split('?');
    const routeConfig = this.routes[pathOnly] || this.routes['/404'] || this.routes['/'];

    if (routeConfig) {
      const queryParams = new URLSearchParams(window.location.search);
      const samplePath = queryParams.get('path');

      this.currentRoute = {
        factory: routeConfig,
        instance: routeConfig(this, samplePath)
      };
      this.currentRoute.instance.render();
    } else {
        console.error('No route found for', path);
    }
  }

  navigateTo(path) {
    window.history.pushState({}, path, window.location.origin + path);
    this._loadRoute(path);
  }
}
