import { WorkFlowService } from './work-flow-service';
import { WorkFlowAggregation } from './../../interfaces/response-interface';
import { Injectable } from "@angular/core";
import { AttendanceService } from "../../services/business/attendance-service";
import { AttendanceStatistics } from "../../interfaces/response-interface";
import { Observable } from "rxjs/Observable";
import { values } from 'lodash';

@Injectable()
export class StatisticsService {

    constructor(
        public attendance: AttendanceService,
        public workFlow: WorkFlowService
    ) {
     }

    getAttendanceResultStatistics(): Observable<number> {
        return this.attendance.getAttendanceStatistics()
            .mergeMap(item => Observable.from(item)
                .mergeMap(item => this.countUnconfirmedAttendance(item).reduce(this.accumulator))
                .reduce(this.accumulator)
            );
    }

    countUnconfirmedAttendance(source: AttendanceStatistics): Observable<number> {
        return Observable.from(values(source.confirm_status))
            .filter(item => !!item.unconfirm_count)
            .map(item => item.unconfirm_count)
            .reduce(this.accumulator);
    }

    getWorkFlowStatistics(): Observable<WorkFlowAggregation[]> {
        return this.workFlow.getWorkFlowStatistics();        
    }

    private accumulator(num1: number, num2: number): number {
        return num1 + num2;
    }
}