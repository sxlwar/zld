import { FaceImageComponent } from './../../components/face-image/face-image';
import { AttendanceMachineService } from './../../services/business/attendance-machine-service';
import { uniqBy } from 'lodash';
import { RequestOption } from './../../interfaces/request-interface';
import { TimeService } from './../../services/utils/time-service';
import { AttendanceRecordService } from './../../services/business/attendance-record-service';
import { Subscription } from 'rxjs/Subscription';
import { AttendanceInstant } from './../../interfaces/response-interface';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-attendance-machine-record',
  templateUrl: 'attendance-machine-record.html',
})
export class AttendanceMachineRecordPage {

  records: Observable<AttendanceInstant[]>;

  pageSubscription: Subscription;

  haveMoreData: Observable<boolean>;

  date: string;

  maxDate: Observable<string>;

  machineName: Observable<string>;

  id: number;

  resultSubscription: Subscription;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public time: TimeService,
    public instant: AttendanceRecordService,
    public machine: AttendanceMachineService,
    public modalCtrl: ModalController
  ) {
    this.id = this.navParams.get('id');
  }

  ionViewDidLoad() {
    this.initialDate();

    this.machineName = this.machine.getMachineName(this.id);

    this.getAttendanceInstant();

    this.haveMoreData = this.instant.getMoreDataFlag();
  }

  initialDate() {
    this.date = this.time.getDate(new Date(), true);

    this.maxDate = this.instant.getMaxDate().map(date => this.time.getDate(date, true));
  }

  getOption(): Observable<RequestOption> {
    const id = this.id;

    const start_day = this.date;

    const end_day = this.date;

    return Observable.of({ id, start_day, end_day });
  }

  getAttendanceInstant() {
    this.instant.resetPage();

    this.instant.toggleMoreData(true);

    this.records = this.instant.getAttendanceRecord(this.getOption())
      .skip(1)
      .scan((acc, cur) => acc.concat(cur))
      .map(result => uniqBy(result, 'id'));
  }

  getNextPage(infiniteScroll) {
    this.instant.increasePage();
    
    this.resultSubscription && this.resultSubscription.unsubscribe();

    this.resultSubscription = this.instant.getAttendanceInstantList(this.getOption());

    this.pageSubscription && this.pageSubscription.unsubscribe();

    this.pageSubscription = this.instant
      .getAttendanceRecordResponse()
      .subscribe(value => infiniteScroll.complete());
  }

  showCapture(instant: AttendanceInstant) {
    const { similarity, screen_image, capture_image } = instant;

    this.modalCtrl.create(FaceImageComponent, { similarity, screen: screen_image, capture: capture_image })
      .present();
  }

  ionViewWillUnload() {
    this.resultSubscription && this.resultSubscription.unsubscribe();
    
    this.pageSubscription && this.pageSubscription.unsubscribe();
  }

}
