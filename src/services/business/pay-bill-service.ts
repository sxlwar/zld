//region
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectPayBillListResponse, selectPayBillList } from '../../reducers/index-reducer';
import { ErrorService } from '../errors/error-service';
import { ProcessorService } from '../api/processor-service';
import { ProjectService } from '../business/project-service';
import { Observable } from 'rxjs/Observable';
import { PayBill, PayBillTime, PayBillAmount } from '../../interfaces/response-interface';
import { RequestOption, PayBillListOptions } from '../../interfaces/request-interface';
import { UserService } from '../business/user-service';
//endregion

@Injectable()
export class PayBillService {
    subscriptions: Subscription[] = [];
    payBill$$: Subscription;

    constructor(
        public store: Store<AppState>,
        public error: ErrorService,
        public processor: ProcessorService,
        public project: ProjectService,
        public userInfo: UserService
    ) {
        this.handleError();
    }

    getPayBills(option: Observable<RequestOption>): Observable<PayBill[]> {
        this.getPayBillList(option);

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

    private getPayBillList(option: Observable<RequestOption>): void {
        const sid = this.userInfo.getSid();

        const params = sid.zip(option, (sid, option) => ({ sid, ...option })) as Observable<PayBillListOptions>;

        const subscription = this.processor.payBillListProcessor(params);

        this.subscriptions.push(subscription);
    }

    /**
     * 以下6个函数用来解决后台字段语义模糊不清的问题。 
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

    countAttendanceTotalAmount(bill:PayBill): number {
        return bill[PayBillAmount.prefix + PayBillAmount.systemAtt] + bill[PayBillAmount.prefix + PayBillAmount.manualAtt];
    }

    countOvertimeTotalAmount(bill: PayBill): number {
        return bill[PayBillAmount.prefix + PayBillAmount.systemOvertime] + bill[PayBillAmount.prefix + PayBillAmount.systemOverOvertime] + bill[PayBillAmount.prefix + PayBillAmount.manualOvertime] + bill[PayBillAmount.prefix + PayBillAmount.manualOverOvertime];
    }

    countPieceTotalAmount(bill: PayBill): number {
        return bill.amount;
    }

    /* =================================================Error handle and refuse clean=================================================================================== */

    private handleError() {
        const error = this.store.select(selectPayBillListResponse);

        this.payBill$$ = this.error.handleErrorInSpecific(error, 'API_ERROR');
    }

    unSubscribe() {
        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
