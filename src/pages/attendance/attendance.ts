//region
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { AttendanceService } from '../../serveices/business/attendance-service';
import { TimeService } from '../../serveices/utils/time-service';
import { Observable } from 'rxjs/Observable';
import { AttendanceResult, Team } from '../../interfaces/response-interface';
import { TeamService } from '../../serveices/business/team-service';
import { Subscription } from 'rxjs/Subscription';
import { attendances } from '../../mocks/providers/data';
//endregion

/**
 * Generated class for the AttendancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public attendance: AttendanceService,
    public timeService: TimeService,
    public teamService: TeamService,
    public translate: TranslateService
  ) {
    this.today = timeService.getDate(new Date(), true);
  }

  ionViewDidLoad() {
    this.initialDate();
    this.initialTeam();
    this.getAttendances();
    this.monitorAllSelect();
  }

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

    // this.attendances = this.attendance.getAttendanceResultList(option);
    this.attendances = Observable.of(attendances);
  }

  getAttendanceOption() {
    return this.teamService.getSelectedTeams()
      .map(ids => ({ start_day: this.startDate, end_day: this.endDate, team_id: ids }));
  }

  setDate(type: string) {
    const data = type === 'start' ? this.startDate : this.endDate;

    this.attendance.setDate(type, data);

    this.attendance.getAttendances(this.getAttendanceOption());
  }

  setTeam(teams) {
    const teamIds: Observable<number> = Observable.from(teams).map((team: Team) => team.id);

    this.teamService.setSelectTeams(teamIds);

    this.attendance.getAttendances(this.getAttendanceOption());
  }

  toggleAllSelected(isSelected) {
    this.attendance.toggleAllSelected(this.allSelected);
  }

  toggleSelected(att: AttendanceResult) {
    this.attendance.toggleSelected(att);
  }

  monitorAllSelect() {
    const subscription = this.attendance.getAllSelected().subscribe(all => {
      this.allSelected = all;
    });    
    
    this.subscriptions.push(subscription);
  }

  getAttendanceResultList() {

  }

  getItems(input: string) {

  }

  click() {
    console.log('arrow clicked');
  }

  ionViewWillUnload() {
    this.subscriptions.forEach(item => item && item.unsubscribe());
    this.attendance.unSubscribe();
  }

  ionViewDidLeave() {
    
  }
}
