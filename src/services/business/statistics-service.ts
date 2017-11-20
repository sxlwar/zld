import { Injectable } from "@angular/core";
import { AttendanceService } from "../../services/business/attendance-service";
import { AttendanceStatistics } from "../../interfaces/response-interface";
import { Observable } from "rxjs/Observable";
import { values } from 'lodash';

@Injectable()
export class StatisticsService {
    constructor(
        public attendance: AttendanceService
    ) { }

    getAttendanceResultStatistics(): Observable<number> {
        return this.attendance.getAttendanceStatistics()
            .mergeMap(item => Observable.from(item)
                .mergeMap(item => this.countUnconfirmAttendance(item).reduce(this.accumulator))
                .reduce(this.accumulator)
            );
    }

    countUnconfirmAttendance(source: AttendanceStatistics): Observable<number> {
        return Observable.from(values(source.confirm_status))
            .filter(item => !!item.unconfirm_count)
            .map(item => item.unconfirm_count)
            .reduce(this.accumulator);
    }

    private accumulator(num1: number, num2: number): number {
        return num1 + num2;
    }
}