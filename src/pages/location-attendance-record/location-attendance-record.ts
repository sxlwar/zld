import { WorkerItem } from '../../interfaces/worker-interface';
import { AttendanceMachineType } from './../../interfaces/request-interface';
import { WorkerService } from './../../services/business/worker-service';
import { WorkerSelectComponent } from './../../components/worker-select/worker-select';
import { Subscription } from 'rxjs/Subscription';
import { AttendanceRecordService } from './../../services/business/attendance-record-service';
import { Observable } from 'rxjs/Observable';
import { TimeService } from './../../services/utils/time-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { range } from 'lodash';

export interface RecordItem {
  name: string;
  type: number;
  time: string;
}

@IonicPage()
@Component({
  selector: 'page-location-attendance-record',
  templateUrl: 'location-attendance-record.html',
})
export class LocationAttendanceRecordPage {

  subscriptions: Subscription[] = [];

  endDate: string;

  startDate: string;

  pageSubscription: Subscription;

  maxDate: Observable<string>;

  records: Observable<RecordItem[]>;

  workers: Observable<WorkerItem[]>;

  names: Observable<string>;

  haveMoreData: Observable<boolean>;

  availableYearValues: number[];

  availableMonthValues: number[];

  availableDayValues: number[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public timeService: TimeService,
    public record: AttendanceRecordService,
    public modalCtrl: ModalController,
    public worker: WorkerService
  ) {
    record.resetPage();
  }

  ionViewDidLoad() {
    this.initialModel();

    this.launch();
  }

  initialModel() {
    this.maxDate = this.record.getMaxDate().map(date => this.timeService.getDate(date, true));

    this.haveMoreData = this.record.getMoreDataFlag().startWith(true);

    this.workers = this.worker.getSelectedWorkersContainsWorkerId();

    this.names = this.workers.map(workers => workers.map(item => item.name).join(','));

    this.records = this.getRecords();
  }

  /**
   * TODO: 非常恶心的接口设计，需要通过考勤机的类型来筛选数据，接口里没有支持通过考勤机类型字段请求数据
   * ，只支持一个考勤机ID字段，也就是说只能先用类型查考勤机, 问题是鬼TMD知道查回来的考勤机的ID应该哪个才是对的。
   */
  getRecords(): Observable<RecordItem[]> {
    return this.record.getAttendanceRecordResponse()
      .map(res => res.attendance_instants
        .filter(item => item.attendance_machine__type === AttendanceMachineType.gpsMachine)
        .map((item => ({ name: item.user__employee__realname, time: item.time, type: item.type })))
      )
      .scan((acc, cur) => acc.concat(cur), []);
  }

  launch() {
    this.subscriptions = [
      this.updateSelectedWorkers(),
      this.getAttendanceInstance(),
      this.getDays()
    ];
  }

  getDays(): Subscription {
    return this.record.getOptions().subscribe(option => {
      this.startDate = <string>option.start_day;
      this.endDate = <string>option.end_day;
    });
  }

  getAttendanceInstance(): Subscription {
    return this.record.getAttendanceInstantList(this.record.getOptions());
  }

  /* =======================================================Condition update================================================================== */

  updateSelectedWorkers(): Subscription {
    return this.workers.subscribe(workers => this.record.updateLocationAttendanceRecordUserIds(workers.map(item => item.id)));
  }

  updateStartDate(date: string): void {
    this.updateMaxEndDate(date);

    this.record.updateLocationAttendanceRecordDate(date, 'start');

    this.updateEndDate('');
  }

  updateMaxEndDate(date: string): void {
    const [year, month, day] = date.split('-');

    const maxDay = this.timeService.getLastDayOfMonth(new Date(date));

    this.availableYearValues = [parseInt(year)];

    this.availableMonthValues = range(parseInt(month), 13);

    this.availableDayValues = range(parseInt(day), maxDay + 1);
  }

  updateEndDate(date: string): void {
    this.record.updateLocationAttendanceRecordDate(date, 'end');
  }

  getNextPage(infiniteScroll): void {
    this.record.increasePage();

    this.pageSubscription && this.pageSubscription.unsubscribe();

    this.pageSubscription = this.record
      .getAttendanceRecordResponse()
      .subscribe(_ => infiniteScroll.complete());
  }

  openWorkerSelect() {
    this.modalCtrl.create(WorkerSelectComponent, null, { cssClass: 'inset-modal' }).present();
  }

  /* =======================================================refuse clean================================================================== */

  ionViewWillUnload() {
    this.subscriptions.forEach(item => item.unsubscribe);
  }

}
