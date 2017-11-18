//region
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectPayBillListResponse, selectPayBillList } from '../../reducers/index-reducer';
import { ErrorService } from '..//errors/error-service';
import { ProcessorService } from '..//api/processor-service';
import { ProjectService } from '..//business/project-service';
import { Observable } from 'rxjs/Observable';
import { PayBill } from '../../interfaces/response-interface';
import { RequestOption, PayBillListOptions } from '../../interfaces/request-interface';
import { UserService } from '..//business/user-service';
//endregion

export enum payBillTime {
    systemAtt = 1,
    systemOvertime,
    systemOverOvertime,
    manualAtt,
    manualOvertime,
    manualOverOvertime,
    pieceActual = '',
    prefix = 'hour_'
}
@Injectable()
export class PayBillService {
    subscriptions: Subscription[] = [];

    constructor(
        public store: Store<AppState>,
        public error: ErrorService,
        public processor: ProcessorService,
        public project: ProjectService,
        public userInfo: UserService
    ) {
        this.handleError();
    }

    getPayBills(opton: Observable<RequestOption>): Observable<PayBill[]> {
        this.getPayBillList(opton);

        return this.store.select(selectPayBillList);
    }

    getPayBillOfMonth(option: Observable<RequestOption>): Observable<PayBill> {
        return this.getPayBills(option) 
            .mergeMap(res => Observable.from(res).take(1));
    }

    getAttendanceTimeStatistics(option: Observable<RequestOption>): Observable<number[]> {
        const source = this.getPayBillOfMonth(option);

        const attendanceTimeTotal = source.map(payBill => this.countAttendanceTotalTime(payBill));

        const overtimeTotal = source.map(payBill => this.countOvertimeTotalTime(payBill));

        const overOvertimeTotal = source.map(payBill => this.countOverOvertimeTotalTime(payBill));

        return attendanceTimeTotal.zip(overtimeTotal, overOvertimeTotal);
    }

    countAttendanceTotalTime(payBill: PayBill): number {
        return payBill[payBillTime.prefix + payBillTime.systemAtt] + payBill[payBillTime.prefix + payBillTime.manualAtt];
    }

    countOvertimeTotalTime(payBill: PayBill): number {
        return payBill[payBillTime.prefix + payBillTime.systemOvertime] + payBill[payBillTime.prefix + payBillTime.manualOvertime];
    }

    countOverOvertimeTotalTime(payBill: PayBill): number {
        return payBill[payBillTime.prefix + payBillTime.systemOverOvertime] + payBill[payBillTime.prefix + payBillTime.manualOverOvertime];
    }

    private getPayBillList(option: Observable<RequestOption>): void {
        const sid = this.userInfo.getSid();

        const params = sid.zip(option, (sid, option) => ({ sid, ...option })) as Observable<PayBillListOptions>;

        const subscription = this.processor.payBillListProcessor(params);

        this.subscriptions.push(subscription);
    }

    /* =================================================Error handle and refuse clean=================================================================================== */

    private handleError() {
        const error = this.store.select(selectPayBillListResponse);

        const subscription = this.error.handleErrorInSpecific(error, 'API_ERROR');

        this.subscriptions.push(subscription);
    }

    unSubscribe() {
        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
