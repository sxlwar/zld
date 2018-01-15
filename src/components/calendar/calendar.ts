import { RequestOption } from 'interfaces/request-interface';
import { workerContractList, WorkerContract } from './../../services/api/command';
import { WorkerService } from './../../services/business/worker-service';
import { Observable } from 'rxjs/Observable';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { dayNames, TimeService, Calendar } from '../../services/utils/time-service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { chain, isEmpty, every } from 'lodash';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add//operator/skip';
import { AttendanceRecordService } from '../../services/business/attendance-record-service';

export interface DatePeriod {
    start: string;
    end: string;
    records?: string[];
}

@Component({
    selector: 'calendar',
    templateUrl: 'calendar.html'
})
export class CalendarComponent implements OnInit {
    @Input() isMonth: boolean;

    @Output() dayClicked = new EventEmitter();

    data: Observable<Array<Date[]>>;

    heads = dayNames;

    constructor(
        public timeService: TimeService,
        public contract: WorkerService,
        public instant: AttendanceRecordService
    ) {
    }

    ngOnInit() {
        this.data = this.getCalendar().take(1);
    }

    getCalendar(): Observable<Date[][]> {
        const today = this.timeService.getDate(new Date(), true);

        return this.getPredicateData()
            .map(result => {
                const calendar = this.generateCalendar();

                const { start, end, records } = result;

                calendar.forEach(currentWeek => {
                    currentWeek.forEach(item => {
                        if (item) {
                            const date = this.timeService.getDate(item, true);

                            const acturlEnd = end > today ? today : end;

                            const isLegalDay = date >= start && date < acturlEnd;

                            item['isLegalDay'] = isLegalDay;

                            const isNormalAttendance = records.indexOf(date) !== -1;

                            item['isNormalAttendance'] = isNormalAttendance;
                        }
                    });
                })

                return calendar;
            })
    }

    generateCalendar(): Date[][] {
        const data: Calendar[] = this.timeService.createCalendar(new Date(), this.isMonth);

        const calendar: Date[][] = chain(data).map('days').each(this.repairCalendar).unzip().reject(this.empty).value() as Array<Date[]>;

        return calendar;
    }

    getPredicateData(): Observable<DatePeriod> {

        return this.instant.getAttendanceRecord(this.getOption())
            .skip(1)
            .switchMap(records => Observable.from(records)
                .map(record => record.day)
                .distinctUntilChanged()
                .reduce((acc, cur) => {
                    acc.push(cur);
                    return acc;
                }, []))
            .combineLatest(this.getContractDate())
            .map(result => {
                const [records, dates] = result;

                const { start, end } = dates;

                return { start, end, records }
            })
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
        const result = {
            start_day: this.timeService.getDate(this.timeService.getFirstDateOfMonth(new Date()), true),
            end_day: this.timeService.getDate(this.timeService.getYesterday(), true)
        }

        return Observable.of(result);
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
}
