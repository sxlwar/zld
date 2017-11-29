//region
import { PermissionService } from './../../services/config/permission-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
import { uniqBy } from 'lodash';
//endregion

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
  operatePermission: Observable<boolean>

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
    const {view, opt} = this.navParams.get('permission');

    return opt || view; 
  }

  ionViewDidLoad() {
    this.initialDate();
    this.initialTeam();
    this.getAttendances();
    this.monitorAllSelect();
  }

  /* ========================================================Initial data model========================================================= */

  initialDate() {
    const subscription = this.attendance.getSelectedDate()
      .subscribe(data => {
        this.startDate = this.timeService.getDate(data.start, true);
        this.endDate = this.timeService.getDate(data.end, true);
      });
    this.subscriptions.push(subscription);
  }

  initialTeam() {
    this.teams = this.teamService.getOwnTeams()
      .withLatestFrom(this.teamService.getSelectedTeams(), (teams, ids) => {
        teams.forEach(team => team.selected = ids.indexOf(team.id) !== -1);
        return teams;
      });
  }

  getAttendances() {
    const option = this.getAttendanceOption();

    this.attendances = this.attendance.getAttendanceResult(option);
  }

  getOperatePermission(): Observable<boolean> {
    return this.permission.getOperatePermission(attendanceIcon.icon, ProjectRoot);
  }

  /* ========================================================Attendance operation========================================================= */

  getAttendanceOption() {
    const queryType = attendanceList.noMagicNumber.get(attendance.unconfirmed).value;

    return this.teamService.getSelectedTeams()
      .map(ids => ({ start_day: this.startDate, end_day: this.endDate, team_id: ids, ...queryType }));
  }

  setDate(type: string) {
    const data = type === 'start' ? this.startDate : this.endDate;

    this.attendance.setDate(type, data);

    this.getAttendances();
  }

  toggleAllSelected(isSelected) {
    this.attendance.toggleAllSelected(this.allSelected);
  }

  toggleSelected(att: AttendanceResult) {
    this.attendance.toggleSelected(att);
  }

  monitorAllSelect() {
    const subscription = this.attendance.getAllSelectedState().subscribe(all => this.allSelected = all);

    this.subscriptions.push(subscription);
  }

  getNextPage(infiniteScroll) {
    this.attendance.increasePage();

    this.attendances = this.attendances.scan((acc, cur) => acc.concat(cur)).map(res => uniqBy(res, 'id'));

    this.attendance.getAttendances(this.getAttendanceOption());

    return this.attendance.getAttendanceResultList().toPromise();  //FIXME: 下拉刷新有问题。
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

    this.getAttendances();
  }

  showActionSheet() {
    this.attendance.showActionSheet();
  }

  goToDetailPage(attendance: AttendanceResult) {
    const day = attendance.day;

    const workerId = attendance.contract__worker_id;

    this.navCtrl.push(attendanceRecordPage, { day, workerId, rootName: ProjectRoot, iconName: attendanceIcon.icon }).then(() => { });
  }

  ionViewWillUnload() {
    this.subscriptions.forEach(item => item && item.unsubscribe());
    this.attendance.unSubscribe();
  }
}
