import { selectLocationAttendanceOptions } from './../../reducers/index-reducer';
//region
import { selectAttendanceRecordMoreData, selectAttendanceRecordMaxDate } from './../../reducers/index-reducer';
import { ToggleMoreDataFlagAction, SetLocationAttendanceRecordStartDateAction, SetLocationAttendanceRecordEndDateAction, SetLocationAttendanceRecordUsersAction } from './../../actions/action/attendance-record-action';
import { Injectable } from '@angular/core';
import { AppState, selectAttendanceRecordInstant, selectAttendanceRecordPage, selectAttendanceRecordLimit, selectAttendanceRecordResponse, selectAttendanceRecordCount } from '../../reducers/index-reducer';
import { Store } from '@ngrx/store';
import { ProcessorService } from '..//api/processor-service';
import { ErrorService } from '..//errors/error-service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { AttendanceInstant, AttendanceInstantListResponse } from '../../interfaces/response-interface';
import { RequestOption, AttendanceInstantListOptions } from '../../interfaces/request-interface';
import { UserService } from '..//business/user-service';
import { IncreaseRecordPageAction, ResetRecordPageAction } from '../../actions/action/attendance-record-action';
import 'rxjs/add/observable/from';
//endregion

@Injectable()
export class AttendanceRecordService {
    subscriptions: Subscription[] = [];
    attendanceRecord$$: Subscription;
    pageEnd$$: Subscription;

    constructor(
        public store: Store<AppState>,
        public process: ProcessorService,
        public error: ErrorService,
        public userInfo: UserService
    ) {
        this.handleError();
        this.monitorPageEnd();
    }

    /* ===============================================Data acquisition=========================================== */

    getAttendanceRecord(option: Observable<RequestOption>): Observable<AttendanceInstant[]> {
        this.subscriptions.push(this.getAttendanceInstantList(option));

        return this.store.select(selectAttendanceRecordInstant);
    }

    getAttendanceRecordResponse(): Observable<AttendanceInstantListResponse> {
        return this.store.select(selectAttendanceRecordResponse);
    }

    getAttendanceInstantList(option: Observable<RequestOption> = Observable.empty()): Subscription {
        const sid = this.userInfo.getSid();

        const page = this.store.select(selectAttendanceRecordPage);

        const limit = this.store.select(selectAttendanceRecordLimit);

        const params = sid.combineLatest([limit, page, option], (sid, limit, page, option) => ({ sid, limit, page, ...option })) as Observable<AttendanceInstantListOptions>;

        return this.process.attendanceRecordListProcessor(params);
    }

    getOptions(): Observable<RequestOption> {
        return this.store.select(selectLocationAttendanceOptions)
            .filter(option => !!option.endDate && !!option.startDate && !!option.userIds.length)
            .map(({ userIds, startDate, endDate }) => ({ start_day: startDate, end_day: endDate, user_id: userIds }));
    }

    /* ===============================================UI related operation=========================================== */

    increasePage(): void {
        this.store.dispatch(new IncreaseRecordPageAction());
    }

    resetPage(): void {
        this.store.dispatch(new ResetRecordPageAction());
    }

    toggleMoreData(flag: boolean): void {
        this.store.dispatch(new ToggleMoreDataFlagAction(flag));
    }

    getMoreDataFlag(): Observable<boolean> {
        return this.store.select(selectAttendanceRecordMoreData);
    }

    getMaxDate(): Observable<Date> {
        return this.store.select(selectAttendanceRecordMaxDate);
    }

    updateLocationAttendanceRecordDate(date: string, type: string): void {
        if (type === 'start') {
            this.store.dispatch(new SetLocationAttendanceRecordStartDateAction(date));
        } else {
            this.store.dispatch(new SetLocationAttendanceRecordEndDateAction(date));
        }
    }

    updateLocationAttendanceRecordUserIds(userIds: number[]): void {
        this.store.dispatch(new SetLocationAttendanceRecordUsersAction(userIds));
    }

    /* ===============================================Data monitor=================================================== */

    /**
     * @method monitorPageEnd
     * @description This method is used to monitor whether all data has been obtained. 
     * It will help us reset page number and turn off the data acquisition switch.
     */
    private monitorPageEnd() {
        this.pageEnd$$ = this.store.select(selectAttendanceRecordPage)
            .combineLatest(
            this.store.select(selectAttendanceRecordCount),
            this.store.select(selectAttendanceRecordLimit)
            )
            .subscribe(value => {
                const [page, count, limit] = value;

                if (page * limit >= count) {
                    this.store.dispatch(new ResetRecordPageAction());
                    this.toggleMoreData(false);
                }
            });
    }

    /* =================================Error handle and refuse clean================================================= */

    private handleError() {
        const target = this.store.select(selectAttendanceRecordResponse);

        this.attendanceRecord$$ = this.error.handleErrorInSpecific(target, 'APP_ERROR');
    }

    unSubscribe() {
        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
