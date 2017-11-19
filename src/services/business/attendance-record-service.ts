//region
import { Injectable } from '@angular/core';
import { AppState, selectAttendanceRecordInstant, selectAttendanceRecordPage, selectAttendanceRecordLimit, selectAttendanceRecordResponse, selectAttendanceRecordCount } from '../../reducers/index-reducer';
import { Store } from '@ngrx/store';
import { ProcessorService } from '..//api/processor-service';
import { ErrorService } from '..//errors/error-service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { AttendanceInstant, AttendanceInstantType, AttendanceInstantListResponse } from '../../interfaces/response-interface';
import { RequestOption, AttendanceInstantListOptions } from '../../interfaces/request-interface';
import { UserService } from '..//business/user-service';
import { IncreaseRecordPageAction, ResetRecordPageAction } from '../../actions/action/attendance-record-action';
import { ResetAttendnacePageAction } from '../../actions/action/attendance-action';
import 'rxjs/add/observable/from';
//endregion

@Injectable()
export class AttendanceRecordService {

    subscriptions: Subscription[] = [];

    constructor(
        public store: Store<AppState>,
        public process: ProcessorService,
        public error: ErrorService,
        public userInfo: UserService,
    ) {
        this.handleError();
        this.monitorPage();
    }

    getAttendanceRecord(option: Observable<RequestOption>): Observable<AttendanceInstant[]> {
        this.getAttendaceInstantList(option);

        return this.store.select(selectAttendanceRecordInstant).mergeMap(records => this.mapRecordType(records));
    }

    getAttendanceRecordResponse(): Observable<AttendanceInstantListResponse> {
        return this.store.select(selectAttendanceRecordResponse);
    }

    getAttendaceInstantList(option: Observable<RequestOption> = Observable.empty()): void {
        const sid = this.userInfo.getSid();

        const page = this.store.select(selectAttendanceRecordPage);

        const limit = this.store.select(selectAttendanceRecordLimit);

        const params = sid.zip(
            limit,
            page,
            option,
            (sid, limit, page, option) => ({ sid, limit, page, ...option })
        ) as Observable<AttendanceInstantListOptions>;

        const subscription = this.process.attendanceRecordListProcessor(params);

        this.subscriptions.push(subscription);

    }

    increasePage(): void {
        this.store.dispatch(new IncreaseRecordPageAction());
    }

    resetPage(): void {
        this.store.dispatch(new ResetRecordPageAction());
    }
    
    mapRecordType(records: AttendanceInstant[]): Observable<AttendanceInstant[]> {
        return Observable.from(records)
            .map(record => {
                const type = AttendanceInstantType[record.type];

                return Object.assign({}, record, { type })
            })
            .reduce((acc, cur) => {
                acc.push(cur);
                return acc;
            }, []);
    }

    private monitorPage() {
        const subscription = this.store.select(selectAttendanceRecordPage)
            .combineLatest(
            this.store.select(selectAttendanceRecordCount),
            this.store.select(selectAttendanceRecordLimit)
            )
            .subscribe(value => {
                const [page, count, limit] = value;

                if (page * limit >= count) this.store.dispatch(new ResetAttendnacePageAction());
            });

        this.subscriptions.push(subscription);
    }

    /* =================================Error handle and refuse clean==================================== */

    private handleError() {
        const target = this.store.select(selectAttendanceRecordResponse);

        const subscription = this.error.handleErrorInSpecific(target, 'APP_ERROR');

        this.subscriptions.push(subscription);
    }

    unSubscribe() {
        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
