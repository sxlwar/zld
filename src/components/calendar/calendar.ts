import 'rxjs/add//operator/skip';
import 'rxjs/add/operator/combineLatest';

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RequestOption } from 'interfaces/request-interface';
import { chain, every, isEmpty } from 'lodash';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AttendanceDate } from '../../interfaces/attendance-interface';
import { BusinessComponentModel } from '../../interfaces/core-interface';
import { AttendanceRecordService } from '../../services/business/attendance-record-service';
import { Calendar, dayNames, TimeService } from '../../services/utils/time-service';
import { putInArray } from '../../services/utils/util';
import { WorkerContract, workerContractList } from './../../services/api/command';
import { WorkerService } from './../../services/business/worker-service';

export interface DatePeriod {
    start: string;
    end: string;
    records?: string[];
}

@Component({
    selector: 'calendar',
    templateUrl: 'calendar.html',
})
export class CalendarComponent implements BusinessComponentModel {
    @Input() isMonth: boolean;

    @Output() dayClicked: EventEmitter<AttendanceDate> = new EventEmitter();

    data: Observable<AttendanceDate[][]>;

    heads = dayNames;

    subscriptions: Subscription[] = [];

    constructor(
        private timeService: TimeService,
        private contract: WorkerService,
        private instant: AttendanceRecordService
    ) {
    }

    ngOnInit() {
        this.initialModel();

        this.launch();
    }

    initialModel(): void {
        this.data = this.getCalendar().take(1);
    }

    launch(): void {
        this.subscriptions = [
            this.instant.getAttendanceInstantList(this.getOption()),

            this.instant.handleError(),
        ];
    }

    getCalendar(): Observable<AttendanceDate[][]> {
        const today = this.timeService.getDate(new Date(), true);

        return this.getPredicateData()
            .map(result => {
                const calendar = this.generateCalendar();

                const { start, end, records } = result;

                return calendar.map(currentWeek => {
                    return currentWeek.map(item => {
                        if (item) {
                            const date = this.timeService.getDate(item, true);

                            const actualEnd = end > today ? today : end;

                            const isLegalDay = date >= start && date < actualEnd;

                            const isNormalAttendance = records.indexOf(date) !== -1;

                            return { ...item, isLegalDay, isNormalAttendance };
                        } else {
                            return null;
                        }

                    });
                })
            })
    }

    generateCalendar(): Date[][] {
        const data: Calendar[] = this.timeService.createCalendar(new Date(), this.isMonth);

        const calendar: Date[][] = chain(data).map('days').each(this.repairCalendar).unzip().reject(this.empty).value() as Array<Date[]>;

        return calendar;
    }

    getPredicateData(): Observable<DatePeriod> {

        return this.instant.getAttendanceRecord()
            .switchMap(records => Observable.from(records)
                .map(record => record.day)
                .distinctUntilChanged()
                .reduce(putInArray, [])
                .combineLatest(this.getContractDate())
                .map(result => {
                    const [records, dates] = result;

                    const { start, end } = dates;

                    return { start, end, records }
                })
            );
    }

    getContractDate(): Observable<DatePeriod> {
        const unexpired = WorkerContract.unexpired;

        const subOption = workerContractList.noMagicNumber.get(unexpired).value;

        const option = Observable.of(Object.assign({ request_status: '完成' }, subOption))

        return this.contract.getOwnContract(option).map(contract => {
            const { start_day, finish_day } = contract;

            return { start: start_day, end: finish_day };
        });
    }

    private getOption(): Observable<RequestOption> {
        return Observable.of({
            start_day: this.timeService.getDate(this.timeService.getFirstDateOfMonth(new Date()), true),
            end_day: this.timeService.getDate(this.timeService.getYesterday(), true),
        });
    }

    private repairCalendar(ary: Date[], idx: number, list): Date[] {
        const firstWeekDay = ary[0].getDate();

        const firstSaturday = list[6][0].getDate();

        if (firstWeekDay > firstSaturday) {
            ary.unshift(null);
        } else {
            ary.push(null);
        }

        return ary;
    }

    private empty(data): boolean {
        return isEmpty(data) || every(data, item => item == null);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
