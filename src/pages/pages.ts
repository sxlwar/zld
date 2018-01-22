export interface Page {
    title: string;
    component: string;
    inMenu: boolean;
}

// The page the user lands on after opening the app and without a session
export const FirstRunPage = 'TutorialPage';

// The main page the user will see as they use the app over a long period of time.
export const MainPage = 'TabsPage';

/*=======================================pages before login in to app==========================================*/

export const welcomePage = 'WelcomePage';

export const tutorialPage = 'TutorialPage';

export const loginPage = 'LoginPage';

export const searchCompanyPage = 'SearchCompanyPage';

export const certificationPage = 'CertificationPage';


/*============================================Initial page of tabs==============================================*/

export const tabsPage = 'TabsPage';

export const MessageRoot = 'MessagePage';

export const ProjectRoot = 'ProjectPage';

export const MissionRoot = 'MissionPage';

export const MineRoot = 'MinePage';

/*============================================message tab pages===================================================*/

export const messageContentPage = 'MessageContentPage'

/*============================================project tab pages===================================================*/

export const attendancePage = 'AttendancePage';

export const projectBillPage = 'ProjectBillPage';

export const projectBillDetailPage = 'ProjectBillDetailPage';

export const organizationPage = 'OrganizationPage';

export const teamMembersPage = 'TeamMembersPage';

export const membersPage = 'MembersPage';

export const memberStatisticsPage = 'MemberStatisticsPage';

export const editWorkerContractPage = 'EditWorkerContractPage';

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

export const attendanceConfirmDetailPage = 'AttendanceConfirmDetailPage';

export const overtimePage = 'OvertimePage';

export const overtimeDetailPage = 'OvertimeDetailPage';

export const leavePage = 'LeavePage';

export const leaveDetailPage = 'LeaveDetailPage';

export const pieceAuditPage = 'PieceAuditPage';

export const pieceAuditDetailPage = 'PieceAuditDetailPage';

export const attendanceModifyPage = 'AttendanceModifyPage';

export const attendanceModifyDetailPage = 'AttendanceModifyDetailPage';

export const signWorkerContractPage = 'SignWorkerContractPage';

export const searchWorkerPage = 'SearchWorkerPage';

export const iStartedPage = 'IStartedPage';

export const iCompletedPage = 'ICompletedPage';

export const applyAttendanceModifyPage = 'ApplyAttendanceModifyPage';

export const applyLeavePage = 'ApplyLeavePage';

export const applyOvertimePage = 'ApplyOvertimePage';

export const applyPieceAuditPage = 'ApplyPieceAuditPage';

export const applyWorkerContractModifyPage = 'ApplyWorkerContractModifyPage';

/*============================================common pages===================================================*/

export const attendanceRecordPage = 'AttendanceRecordPage';

export const salaryDetailPage = 'SalaryDetailPage';

export const personalPage = 'PersonalPage';

export const workerContractPage = 'WorkerContractPage';

/*============================================mine tab pages===================================================*/

export const personalAttendancePage = 'PersonalAttendancePage';

export const salaryPage = 'SalaryPage';

export const personalInformationPage = 'PersonalInformationPage';

export const familyInformationPage = 'FamilyInformationPage';

export const educationExperiencePage = 'EducationExperiencePage';

export const workExperiencePage = 'WorkExperiencePage';

export const bankcardPage = 'BankcardPage';

export const resetPasswordPage = 'ResetPasswordPage';

export const contactPage = 'ContactPage';

export const versionPage = 'VersionPage';

export const workCertificatePage = 'WorkCertificatePage';

export const accountChangePage = 'AccountChangePage';

export const PAGES: Page[] = [
    { title: '', component: tutorialPage, inMenu: false },
    { title: '', component: welcomePage, inMenu: false },
    { title: '', component: loginPage, inMenu: false },
    { title: '', component: searchCompanyPage, inMenu: false },
    { title: '', component: certificationPage, inMenu: false },

    { title: 'MAIN_PAGE', component: tabsPage, inMenu: true },

    { title: 'MESSAGE', component: MessageRoot, inMenu: false },
    { title: 'PROJECT', component: ProjectRoot, inMenu: false },
    { title: 'MISSION', component: MissionRoot, inMenu: false },
    { title: 'MINE', component: MineRoot, inMenu: false },

    { title: 'MessageContent', component: messageContentPage, inMenu: false },

    { title: 'ATTENDANCE_CHAR', component: attendancePage, inMenu: true },
    { title: '', component: attendanceRecordPage, inMenu: false },
    { title: 'PAYROLL', component: projectBillPage, inMenu: true },
    { title: '', component: projectBillDetailPage, inMenu: false },
    { title: 'ORGANIZATION', component: organizationPage, inMenu: true },
    { title: '', component: teamMembersPage, inMenu: false },
    { title: '', component: personalPage, inMenu: false },
    { title: 'WORKER_MANAGER', component: membersPage, inMenu: true },
    { title: '', component: memberStatisticsPage, inMenu: false },
    { title: '', component: editWorkerContractPage, inMenu: false },
    { title: 'ATTENDANCE_MACHINE', component: attendanceMachinePage, inMenu: true },
    { title: '', component: attendanceMachineRecordPage, inMenu: false },
    { title: 'WORK_PIECE', component: workPiecePage, inMenu: true },
    { title: 'ATTENDANCE_CARD', component: attendanceCardPage, inMenu: true },
    { title: 'IC_LOCATION_CARD', component: locationCardPage, inMenu: true },
    { title: 'WORKER_LOCATION', component: locationPage, inMenu: true },
    { title: 'WORKER_TRAJECTORY', component: trajectoryPage, inMenu: true },
    { title: 'LOCATION_ATTENDANCE', component: locationAttendanceRecordPage, inMenu: true },

    { title: 'ATTENDANCE_CONFIRM', component: attendanceConfirmPage, inMenu: true },
    { title: '', component: attendanceConfirmDetailPage, inMenu: false },
    { title: 'LEAVE_APPLY', component: leavePage, inMenu: true },
    { title: '', component: leaveDetailPage, inMenu: false },
    { title: 'OVERTIME_APPLY', component: overtimePage, inMenu: true },
    { title: '', component: overtimeDetailPage, inMenu: false },
    { title: 'PIECE_AUDIT', component: pieceAuditPage, inMenu: true },
    { title: '', component: pieceAuditDetailPage, inMenu: false },
    { title: 'MODIFY_ATTENDANCE', component: attendanceModifyPage, inMenu: true },
    { title: '', component: attendanceModifyDetailPage, inMenu: false },
    { title: 'MY_APPLY', component: iStartedPage, inMenu: true },
    { title: 'MY_AUDIT', component: iCompletedPage, inMenu: true },
    { title: 'WORK_CONTRACT', component: signWorkerContractPage, inMenu: true },
    { title: '', component: searchWorkerPage, inMenu: false },
    { title: '', component: applyAttendanceModifyPage, inMenu: false },
    { title: '', component: applyLeavePage, inMenu: false },
    { title: '', component: applyOvertimePage, inMenu: false },
    { title: '', component: applyPieceAuditPage, inMenu: false },
    { title: 'MODIFY_WORK_CONTRACT', component: applyWorkerContractModifyPage, inMenu: true },

    { title: 'MY_ATTENDANCE', component: personalAttendancePage, inMenu: true },
    { title: 'MY_SALARY', component: salaryPage, inMenu: true },
    { title: '', component: salaryDetailPage, inMenu: false },
    { title: 'MY_BANK_CARD', component: bankcardPage, inMenu: true },
    { title: 'CERTIFICATE', component: workCertificatePage, inMenu: true },
    { title: 'MY_CONTRACT', component: workerContractPage, inMenu: true },
    { title: 'PERSONAL_INFO', component: personalInformationPage, inMenu: true },
    { title: 'FAMILY_INFO', component: familyInformationPage, inMenu: true },
    { title: 'EDUCATION_EXPERIENCE', component: educationExperiencePage, inMenu: true },
    { title: 'WORK_EXPERIENCE', component: workExperiencePage, inMenu: true },
    { title: '', component: resetPasswordPage, inMenu: false },
    { title: '', component: contactPage, inMenu: false },
    { title: '', component: versionPage, inMenu: false },
    { title: '', component: accountChangePage, inMenu: false },
];
