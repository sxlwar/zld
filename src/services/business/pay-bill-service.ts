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

    getPayBillList(option: Observable<RequestOption>): void {
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
