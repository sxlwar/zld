// The page the user lands on after opening the app and without a session
export const FirstRunPage = 'TutorialPage';

// The main page the user will see as they use the app over a long period of time.
export const MainPage = 'TabsPage';

/*=======================================pages before login in to app==========================================*/

export const welcomePage = 'WelcomePage';
export const tutorialPage = 'TutorialPage';
export const loginPage = 'LoginPage';
export const signupPage = 'SignupPage';
export const searchCompanyPage = 'SearchCompanyPage' ;
export const certificationPage = 'CertificationPage' ;


/*============================================Initial page of tabs==============================================*/

export const tabsPage = 'TabsPage' ;

export const MessageRoot = 'MessagePage';

export const ProjectRoot = 'ProjectPage';

export const MissionRoot = 'MissionPage';

export const MineRoot = 'MinePage';


/*============================================project tab pages===================================================*/

export const attendancePage = 'AttendancePage';


/*============================================mission tab pages===================================================*/





/*============================================message tab pages===================================================*/






/*============================================mine tab pages===================================================*/

export const PAGES = [
  { title: 'Tutorial', component: tutorialPage },
  { title: 'Welcome', component: welcomePage },
  { title: 'Login', component: loginPage },
  { title: 'Signup', component: signupPage },
  { title: 'SearchCompany', component: searchCompanyPage },
  { title: 'Certification', component: certificationPage },

  { title: 'Tabs', component: tabsPage },

  { title: 'Cards', component: 'CardsPage' },
  { title: 'Content', component: 'ContentPage' },
  { title: 'Map', component: 'MapPage' },
  { title: 'Master Detail', component: 'ListMasterPage' },
  { title: 'Menu', component: 'MenuPage' },
  { title: 'Settings', component: 'SettingsPage' },
  { title: 'Search', component: 'SearchPage' },

  { title: 'Message', component: MessageRoot},
  { title: 'Project', component: ProjectRoot},
  { title: 'Mission', component: MissionRoot},
  { title: 'Mine', component: MineRoot},

  { title: 'Attendance', component: attendancePage }
];


