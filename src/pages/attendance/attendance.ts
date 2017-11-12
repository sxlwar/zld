//region
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { AttendanceService } from '../../serveices/business/attendance-service';
import { TimeService } from '../../serveices/utils/time-service';
import { Observable } from 'rxjs/Observable';
import { Team, AttendanceResult } from '../../interfaces/response-interface';
import { TeamService } from '../../serveices/business/team-service';
import { Subscription } from 'rxjs/Subscription';
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
  toppings = 'Bacon';
  pepperoni = '';
  sausage = '';
  mushrooms = '';
  teams: Observable<Team[]>;
  attendances: Observable<AttendanceResult[]>;
  selectedTeams: string;
  dateSubscription: Subscription;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public attendance: AttendanceService,
    public timeService: TimeService,
    public teamService: TeamService,
    public translate: TranslateService) {
  }

  ionViewDidLoad() {
    this.initialDate();
    this.teams = this.teamService.getOwnTeams();
    this.getAttendances();
  }

  initialDate() {
    const datePeriod = this.attendance.getSelectedDate();

    this.dateSubscription = datePeriod.subscribe(data => {
      this.startDate = this.timeService.getDate(data.start, true);
      this.endDate = this.timeService.getDate(data.end, true);
    });
  }

  setDate(type: string) {
    const data = type === 'start' ? this.startDate: this.endDate;
    this.attendance.setDate(type, data);
  }

  getAttendances() {
    // const option = Observable.of({})
    // this.attendances = this.attendance.getAttendanceResultList();
  }

  getAttendanceResultList() {

  }

  getItems(input: string) {

  }

  click() {
    console.log('arrow clicked');
  }

  ionViewWillUnload(){
   this.dateSubscription.unsubscribe();
  }

}
