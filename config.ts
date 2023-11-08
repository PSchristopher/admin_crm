//config.ts

enum LayoutType {
  MIX = 'mix',
  TOP = 'top',
  SIDE = 'side',
}

const CONFIG = {
  appName: 'Handy-Hire',
  enablePWA: true,
  theme: {
    accentColor: '#3146EF',
    sidebarLayout: LayoutType.MIX,
    showBreadcrumb: true,
  },
  metaTags: {
    title: 'Handy-Hire',
    imageURL: 'logo.svg',
  },
};

export default CONFIG;
