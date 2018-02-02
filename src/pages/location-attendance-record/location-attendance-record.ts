import { Component } from '@angular/core';
import { InfiniteScroll, IonicPage, ModalController } from 'ionic-angular';
import { range } from 'lodash';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { BusinessPageModel } from '../../interfaces/core-interface';
import { WorkerItem } from '../../interfaces/worker-interface';
import { WorkerSelectComponent } from './../../components/worker-select/worker-select';
import { AttendanceMachineType } from './../../interfaces/request-interface';
import { AttendanceRecordService } from './../../services/business/attendance-record-service';
import { WorkerService } from './../../services/business/worker-service';
import { TimeService } from './../../services/utils/time-service';

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
export class LocationAttendanceRecordPage implements BusinessPageModel{

    availableDayValues: number[];

    availableMonthValues: number[];

    availableYearValues: number[];

    endDate: string;

    haveMoreData: Observable<boolean>;

    maxDate: Observable<string>;

    names: Observable<string>;

    nextPage$: Subject<InfiniteScroll> = new Subject();

    records: Observable<RecordItem[]>;

    startDate: string;

    subscriptions: Subscription[] = [];

    workers: Observable<WorkerItem[]>;

    constructor(
        private timeService: TimeService,
        private record: AttendanceRecordService,
        private modalCtrl: ModalController,
        private worker: WorkerService
    ) {
        record.resetPage();
    }

    ionViewDidLoad() {
        this.initialModel();

        this.launch();
    }

    initialModel(): void {
        this.maxDate = this.record.getMaxDate().map(date => this.timeService.getDate(date, true));

        this.haveMoreData = this.record.haveMoreData();

        this.workers = this.worker.getSelectedWorkersContainsWorkerId();

        this.names = this.workers.map(workers => workers.map(item => item.name).join(','));

        /**
         * TODO: 非常恶心的接口设计，需要通过考勤机的类型来筛选数据，接口里没有支持通过考勤机类型字段请求数据
         * ，只支持一个考勤机ID字段，也就是说只能先用类型查考勤机, 问题是鬼TMD知道查回来的考勤机的ID应该哪个才是对的。
         */
        this.records = this.record.getAttendanceRecordResponse()
            .map(res => res.attendance_instants
                .filter(item => item.attendance_machine__type === AttendanceMachineType.gpsMachine)
                .map((item => ({ name: item.user__employee__realname, time: item.time, type: item.type })))
            )
            .scan((acc, cur) => acc.concat(cur), []);
    }

    launch(): void {
        this.subscriptions = [
            this.workers.subscribe(workers => this.record.updateLocationAttendanceRecordUserIds(workers.map(item => item.id))),

            this.record.getAttendanceInstantList(this.record.getOptions()),

            this.getDays(),

            ...this.record.getNextPage(this.nextPage$),

            this.record.handleError(),

            this.worker.handleError(),
        ];
    }

    getDays(): Subscription {
        return this.record.getOptions().subscribe(option => {
            this.startDate = <string>option.start_day;
            this.endDate = <string>option.end_day;
        });
    }

    /* =======================================================Condition update================================================================== */

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

    openWorkerSelect(): void {
        this.modalCtrl.create(WorkerSelectComponent, null, { cssClass: 'inset-modal' }).present();
    }

    /* =======================================================refuse clean================================================================== */

    ionViewWillUnload() {
        this.subscriptions.forEach(item => item.unsubscribe);
    }

}
