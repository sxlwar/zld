import { RequestOption } from '../../interfaces/request-interface';
import { PermissionService } from './../../services/config/permission-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { AttendanceService } from '../../services/business/attendance-service';
import { TimeService } from '../../services/utils/time-service';
import { Observable } from 'rxjs/Observable';
import { AttendanceResult, Team } from '../../interfaces/response-interface';
import { TeamService } from '../../services/business/team-service';
import { Subscription } from 'rxjs/Subscription';
import { attendanceList, attendance } from '../../services/api/command';
import { ActionSheetController } from 'ionic-angular/components/action-sheet/action-sheet-controller';
import { attendance as attendanceIcon } from '../../services/business/icon-service';
import { ProjectRoot, attendanceRecordPage } from '../../pages/pages';

@IonicPage()
@Component({
  selector: 'page-attendance',
  templateUrl: 'attendance.html',
})
export class AttendancePage {
  startDate: string;

  endDate: string;

  today: string;

  teams: Observable<Team[]>;

  attendances: Observable<AttendanceResult[]>;

  subscriptions: Subscription[] = [];

  allSelected: boolean;

  sortType = 1;

  operatePermission: Observable<boolean>;

  actionSheet$$: Subscription;

  page$$: Subscription;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public attendance: AttendanceService,
    public timeService: TimeService,
    public teamService: TeamService,
    public translate: TranslateService,
    public actionSheet: ActionSheetController,
    public permission: PermissionService
  ) {
    this.today = timeService.getDate(new Date(), true);
    this.operatePermission = this.getOperatePermission();
  }

  ionViewCanEnter() {
    const { view, opt } = this.navParams.get('permission');

    return opt || view;
  }

  ionViewDidLoad() {
    this.launch();

    this.initialModel();
  }

  launch() {
    this.subscriptions = [
      this.attendance.monitorPage(),
      this.attendance.getAttendances(this.getAttendanceOption()),
      this.getDate(),
      this.attendance.getAllSelectedState().subscribe(all => this.allSelected = all),
      this.attendance.handleAttendanceError()
    ];
  }

  initialModel() {
    this.attendances = this.attendance.getAttendanceResult();

    this.teams = this.teamService.getOwnTeams()
      .withLatestFrom(this.teamService.getSelectedTeams(), (teams, ids) => {
        teams.forEach(team => team.selected = ids.indexOf(team.id) !== -1);
        return teams;
      });
  }

  /* ========================================================Initial data model========================================================= */

  getDate(): Subscription {
    return this.attendance.getSelectedDate()
      .subscribe(data => {
        this.startDate = this.timeService.getDate(data.start, true);
        this.endDate = this.timeService.getDate(data.end, true);
      });
  }

  getOperatePermission(): Observable<boolean> {
    return this.permission.getOperatePermission(attendanceIcon.icon, ProjectRoot);
  }

  /* ========================================================Attendance operation========================================================= */

  getAttendanceOption(): Observable<RequestOption> {
    return this.teamService.getSelectedTeams()
      .combineLatest(
      this.attendance.getSelectedDate().map(data => ({ start_day: this.timeService.getDate(data.start, true), end_day: this.timeService.getDate(data.end, true) })),
      Observable.of(attendanceList.noMagicNumber.get(attendance.unconfirmed).value)
      )
      .map(([ids, date, queryType]) => ({ ...date, team_id: ids, ...queryType }));
  }

  setDate(type: string) {
    const data = type === 'start' ? this.startDate : this.endDate;

    this.attendance.setDate(type, data);
  }

  toggleAllSelected(isSelected) {
    this.attendance.toggleAllSelected(this.allSelected);
  }

  toggleSelected(att: AttendanceResult) {
    this.attendance.toggleSelected(att);
  }

  getNextPage(infiniteScroll: InfiniteScroll) {
    this.attendance.increasePage();

    this.page$$ && this.page$$.unsubscribe();

    this.page$$ = this.attendance.getAttendanceResultResponse().subscribe(_ => infiniteScroll.complete());
  }

  sortAttendanceBy(target: string) {
    this.sortType = -this.sortType;

    this.attendance.switchSortType(this.sortType);

    this.attendance.sortBy(target);
  }

  /* ========================================================Team operation========================================================= */

  setTeam(teams) {
    const teamIds: Observable<number> = Observable.from(teams).map((team: Team) => team.id);

    this.teamService.setSelectTeams(teamIds);
  }

  showActionSheet() {
    this.actionSheet$$ && this.actionSheet$$.unsubscribe();

    this.actionSheet$$ = this.attendance.showActionSheet();
  }

  goToDetailPage(attendance: AttendanceResult) {
    this.navCtrl.push(attendanceRecordPage, { day: attendance.day, workerId: attendance.contract__worker_id, rootName: ProjectRoot, iconName: attendanceIcon.icon }).then(() => { });
  }

  ionViewWillUnload() {
    this.subscriptions.forEach(item => item && item.unsubscribe());

    this.actionSheet$$ && this.actionSheet$$.unsubscribe();
  }
}
