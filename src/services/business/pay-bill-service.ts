import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { PayBillListOptions, RequestOption } from '../../interfaces/request-interface';
import { PayBill, PayBillAmount, PayBillTime } from '../../interfaces/response-interface';
import { AppState, selectPayBillList, selectPayBillListResponse } from '../../reducers/index-reducer';
import { ProcessorService } from '../api/processor-service';
import { UserService } from '../business/user-service';
import { ErrorService } from '../errors/error-service';

@Injectable()
export class PayBillService {
    constructor(
        private store: Store<AppState>,
        private error: ErrorService,
        private processor: ProcessorService,
        private userInfo: UserService
    ) {
    }

    getPayBills(): Observable<PayBill[]> {
        return this.store.select(selectPayBillList);
    }

    getPayBillOfMonth(): Observable<PayBill> {
        return this.getPayBills()
            .mergeMap(res => Observable.from(res).take(1));
    }

    getAttendanceTimeStatistics(): Observable<number[]> {
        const source = this.getPayBillOfMonth();

        const attendanceTimeTotal = source.map(payBill => this.countAttendanceTotalTime(payBill));

        const overtimeTotal = source.map(payBill => this.countOvertimeTotalTime(payBill));

        const overOvertimeTotal = source.map(payBill => this.countOverOvertimeTotalTime(payBill));

        return attendanceTimeTotal.zip(overtimeTotal, overOvertimeTotal);
    }

    getPayBillList(option: Observable<RequestOption>): Subscription {
        return this.processor.payBillListProcessor(
            option.withLatestFrom(
                this.userInfo.getSid(),
                (option, sid) => ({ ...option, sid })
            ) as Observable<PayBillListOptions>
        );

    }

    /**
     * 以下函数用来解决后台字段语义模糊不清的问题。 
     */
    countAttendanceTotalTime(payBill: PayBill): number {
        return payBill[PayBillTime.prefix + PayBillTime.systemAtt] + payBill[PayBillTime.prefix + PayBillTime.manualAtt];
    }

    countOvertimeTotalTime(payBill: PayBill): number {
        return payBill[PayBillTime.prefix + PayBillTime.systemOvertime] + payBill[PayBillTime.prefix + PayBillTime.manualOvertime];
    }

    countOverOvertimeTotalTime(payBill: PayBill): number {
        return payBill[PayBillTime.prefix + PayBillTime.systemOverOvertime] + payBill[PayBillTime.prefix + PayBillTime.manualOverOvertime];
    }

    countSystemAttendanceAmount(bill: PayBill): number {
        return bill[PayBillAmount.prefix + PayBillAmount.systemAtt];
    }

    countManualAttendanceAmount(bill: PayBill): number {
        return bill[PayBillAmount.prefix + PayBillAmount.manualAtt];
    }

    countAttendanceTotalAmount(bill: PayBill): number {
        return this.countSystemAttendanceAmount(bill) + this.countManualAttendanceAmount(bill);
    }

    countSystemOvertimeAmount(bill: PayBill): number {
        return bill[PayBillAmount.prefix + PayBillAmount.systemOvertime] + bill[PayBillAmount.prefix + PayBillAmount.systemOverOvertime];
    }

    countManualOvertimeAmount(bill: PayBill): number {
        return bill[PayBillAmount.prefix + PayBillAmount.manualOvertime] + bill[PayBillAmount.prefix + PayBillAmount.manualOverOvertime];
    }

    countOvertimeTotalAmount(bill: PayBill): number {
        return this.countSystemOvertimeAmount(bill) + this.countManualOvertimeAmount(bill);
    }

    countPieceTotalAmount(bill: PayBill): number {
        return bill.amount || 0;
    }

    /* ============================================================Error handle========================================================================= */

    handleError(): Subscription {
        return this.error.handleErrorInSpecific(this.store.select(selectPayBillListResponse), 'API_ERROR');
    }
}
