// The page the user lands on after opening the app and without a session
export const FirstRunPage = 'TutorialPage';

// The main page the user will see as they use the app over a long period of time.
export const MainPage = 'TabsPage';

/*=======================================pages before login in to app==========================================*/

export const welcomePage = 'WelcomePage';
export const tutorialPage = 'TutorialPage';
export const loginPage = 'LoginPage';
export const signupPage = 'SignupPage';
export const searchCompanyPage = 'SearchCompanyPage';
export const certificationPage = 'CertificationPage';


/*============================================Initial page of tabs==============================================*/

export const tabsPage = 'TabsPage';

export const MessageRoot = 'MessagePage';

export const ProjectRoot = 'ProjectPage';

export const MissionRoot = 'MissionPage';

export const MineRoot = 'MinePage';


/*============================================project tab pages===================================================*/

export const attendancePage = 'AttendancePage';

export const projectBillPage = 'ProjectBillPage';

export const projectBillDetailPage = 'ProjectBillDetailPage';

export const organizationPage = 'OrganizationPage';

export const teamMembersPage = 'TeamMembersPage';

export const membersPage = 'MembersPage';

export const attendanceMachinePage = 'AttendanceMachinePage';

export const attendanceMachineRecordPage = 'AttendanceMachineRecordPage';

export const workPiecePage = 'WorkPiecePage';

export const attendanceCardPage = 'AttendanceCardPage';

export const locationCardPage = 'LocationCardPage';

export const locationPage = 'LocationPage';

export const trajectoryPage = 'TrajectoryPage';

export const locationAttendanceRecordPage = 'LocationAttendanceRecordPage';

/*============================================mission tab pages===================================================*/

export const attendanceConfirmPage = 'AttendanceConfirmPage';



/*============================================message tab pages===================================================*/



/*============================================common pages===================================================*/

export const attendanceRecordPage = 'AttendanceRecordPage';

export const salaryDetailPage = 'SalaryDetailPage';

export const personalPage = 'PersonalPage';

export const workerContractPage = 'WorkerContractPage';

/*============================================mine tab pages===================================================*/

export const personalAttendancePage = 'PersonalAttendancePage';

export const salaryPage = 'SalaryPage';


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

  { title: 'Message', component: MessageRoot },
  { title: 'Project', component: ProjectRoot },
  { title: 'Mission', component: MissionRoot },
  { title: 'Mine', component: MineRoot },

  { title: 'Attendance', component: attendancePage },
  { title: 'ProjectBill', component: projectBillPage },
  { title: 'ProjectBillDetail', component: projectBillDetailPage },
  { title: 'Organization', component: organizationPage },
  { title: 'TeamMembers', component: teamMembersPage },
  { title: 'Personal', component: personalPage },
  { title: 'Members', component: membersPage },
  { title: 'AttendanceMachine', component: attendanceMachinePage },
  { title: 'AttendanceMachineRecord', component: attendanceMachineRecordPage },
  { title: 'WorkPiece', component: workPiecePage },
  { title: 'AttendanceCard', component: attendanceCardPage },
  { title: 'LocationCard', component: locationCardPage },
  { title: 'Location', component: locationPage },
  { title: 'Trajectory', component: trajectoryPage },
  { title: 'LocationAttendanceRecord', component: locationAttendanceRecordPage },

  { title: 'AttendanceRecord', component: attendanceRecordPage },

  { title: 'AttendanceConfirm', component: attendanceConfirmPage },

  { title: 'PersonalAttendance', component: personalAttendancePage },
  { title: 'Salary', component: salaryPage },
  { title: 'SalaryDetail', component: salaryDetailPage },
  { title: 'WorkerContract', component: workerContractPage },
];
