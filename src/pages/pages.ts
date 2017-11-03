// The page the user lands on after opening the app and without a session
export const FirstRunPage = 'TutorialPage';

// The main page the user will see as they use the app over a long period of time.
export const MainPage = 'TabsPage';

/*============================================Initial page of tabs==============================================*/
export const MessageRoot = 'MessagePage';

export const ProjectRoot = 'ProjectPage';

export const MissionRoot = 'MissionPage';

export const MineRoot = 'MinePage';


export const PAGES = [
  { title: 'Tutorial', component: 'TutorialPage' },
  { title: 'Welcome', component: 'WelcomePage' },
  { title: 'Tabs', component: 'TabsPage' },
  { title: 'Cards', component: 'CardsPage' },
  { title: 'Content', component: 'ContentPage' },
  { title: 'Login', component: 'LoginPage' },
  { title: 'Signup', component: 'SignupPage' },
  { title: 'Map', component: 'MapPage' },
  { title: 'Master Detail', component: 'ListMasterPage' },
  { title: 'Menu', component: 'MenuPage' },
  { title: 'Settings', component: 'SettingsPage' },
  { title: 'Search', component: 'SearchPage' },
  { title: 'SearchCompany', component: 'SearchCompanyPage' },
  { title: 'Certification', component: 'CertificationPage' },

  { title: 'Message', component: 'MessagePage'},
  { title: 'Project', component: 'ProjectPage'},
  { title: 'Mission', component: 'MissionPage'},
  { title: 'Mine', component: 'MinePage'},
];
