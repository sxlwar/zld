import { Component } from '@angular/core';
import { InfiniteScroll, IonicPage, ModalController, NavParams } from 'ionic-angular';
import { uniqBy } from 'lodash';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { FaceImageComponent } from './../../components/face-image/face-image';
import { AttendanceInstant } from './../../interfaces/response-interface';
import { AttendanceMachineService } from './../../services/business/attendance-machine-service';
import { AttendanceRecordService } from './../../services/business/attendance-record-service';
import { TimeService } from './../../services/utils/time-service';

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

    date$: Subject<string> = new Subject();

    maxDate: Observable<string>;

    machineName: Observable<string>;

    id: number;

    subscriptions: Subscription[] = [];

    count: Observable<number>;

    constructor(
        private navParams: NavParams,
        private time: TimeService,
        private instant: AttendanceRecordService,
        private machine: AttendanceMachineService,
        private modalCtrl: ModalController
    ) {
        this.id = this.navParams.get('id');

        this.instant.resetPage();
    }

    ionViewDidLoad() {
        this.initialModel();

        this.launch();
    }

    initialModel(): void {
        this.date = this.time.getDate(new Date(), true);

        this.maxDate = this.instant.getMaxDate().map(date => this.time.getDate(date, true));

        this.machineName = this.machine.getMachineName(this.id);

        this.haveMoreData = this.instant.getHaveMoreData();

        this.records = this.date$
            .startWith(this.date)
            .switchMapTo(
            this.instant
                .getAttendanceRecord()
                .scan((acc, cur) => acc.concat(cur))
                .map(result => uniqBy(result, 'id').filter(item => item.day === this.date))
            );

        this.count = this.instant.getRecordCount();
    }

    launch(): void {
        this.subscriptions = [
            this.date$.subscribe(_ => this.instant.resetPage()),

            this.instant.getAttendanceInstantList(
                this.date$
                    .startWith(this.date)
                    .withLatestFrom(Observable.of(this.id), (date, attendance_machine_id) => ({
                        attendance_machine_id,
                        start_day: date,
                        end_day: date,
                    }))
            ),

            this.instant.handleError(),
        ];
    }

    getNextPage(infiniteScroll: InfiniteScroll): void {
        this.pageSubscription && this.pageSubscription.unsubscribe();

        this.pageSubscription = this.instant.getNextPage(infiniteScroll);
    }

    showCapture(instant: AttendanceInstant): void {
        const { similarity, screen_image, capture_image } = instant;

        this.modalCtrl
            .create(FaceImageComponent, { similarity, screen: screen_image, capture: capture_image })
            .present();
    }

    ionViewWillUnload() {
        this.instant.resetRecordResponse();

        this.subscriptions.forEach(item => item.unsubscribe());

        this.pageSubscription && this.pageSubscription.unsubscribe();
    }
}
