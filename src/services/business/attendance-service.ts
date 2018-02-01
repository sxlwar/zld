import 'rxjs/add/observable/empty';

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { InfiniteScroll } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular/components/action-sheet/action-sheet-controller';
import { orderBy, uniqBy } from 'lodash';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import {
    IncreaseAttendancePageAction,
    ResetAttendanceDataAction,
    ResetAttendancePageAction,
    SetAttendanceEndDateAction,
    SetAttendanceStartDateAction,
    SetQueryAttendanceStateAction,
    ToggleAttendanceSortTypeAction,
    ToggleOrderTypeAction,
} from '../../actions/action/attendance-action';
import { RequestOption } from '../../interfaces/request-interface';
import { AttendanceResult } from '../../interfaces/response-interface';
import {
    AppState,
    selectAttendanceDatePeriod,
    selectAttendanceLimit,
    selectAttendancePage,
    selectAttendanceResponse,
} from '../../reducers/index-reducer';
import { DatePeriod } from '../../reducers/reducer/attendance-reducer';
import { UserService } from '..//business/user-service';
import { ProcessorService } from '../api/processor-service';
import { ErrorService } from '../errors/error-service';
import {
    AddAttendancesToModifyAction,
    RemoveAttendanceFromReadyToModify,
    ResetAttendancesToModifyAction,
} from './../../actions/action/attendance-action';
import { AttendanceSortType, AttendanceState } from './../../interfaces/attendance-interface';
import { GetNextPage } from './../../interfaces/paging-query-interface';
import { AttendanceModifyRecordListOptions } from './../../interfaces/request-interface';
import { AttendanceModify, AttendanceResultListResponse, AttendanceStatistics } from './../../interfaces/response-interface';
import {
    selectAttendanceConfirmOptions,
    selectAttendanceModifyRecordListResponse,
    selectAttendanceOrderType,
    selectAttendanceResultConfirmResponse,
    selectAttendanceSortType,
    selectAttendanceStatistics,
    selectAttendanceStatisticsResponse,
    selectAttendancesToModify,
    selectSelectedAttendanceState,
} from './../../reducers/index-reducer';
import { TimeService } from './../utils/time-service';
import { RecordOptionService } from './record-option-service';
import { TeamService } from './team-service';

@Injectable()
export class AttendanceService extends RecordOptionService implements GetNextPage {
    constructor(
        private store: Store<AppState>,
        private processor: ProcessorService,
        private userInfo: UserService,
        private error: ErrorService,
        private translate: TranslateService,
        private actionSheet: ActionSheetController,
        private teamService: TeamService,
        private timeService: TimeService
    ) {
        super();
    }

    /* =========================================================Data acquisition========================================================== */

    getAttendanceResultResponse(): Observable<AttendanceResultListResponse> {
        return this.store.select(selectAttendanceResponse).filter(value => !!value);
    }

    getAttendanceResultList(): Observable<AttendanceResult[]> {
        return this.getAttendanceResultResponse().map(res => res.attendance_results);
    }

    getWrappedAttendanceResultList(): Observable<AttendanceResult[]> {
        return this.getAttendanceResultList()
            .scan((acc, cur) => acc.concat(cur), [])
            .mergeMap(source => this.getConfirmedAttendance()
                .map(ids => source.map(item => ids.indexOf(item.id) === -1 ? item : { ...item, confirm: 1 }))
            )
            .combineLatest(
            this.getSortType().map(type => AttendanceSortType[type]).distinctUntilChanged(),
            this.getOrderType().distinctUntilChanged(),
            this.getSelectedDate().map(date => ({
                start: this.timeService.getDate(date.start, true),
                end: this.timeService.getDate(date.end, true),
            })),
            this.teamService.getSelectedTeams(),
            this.getSelectedAttendanceState(),
            (list: AttendanceResult[], type: string, order: string, { start, end }, teamIds: number[], confirmState: number) =>
                orderBy(list, [type], [order]).filter(
                    item => (teamIds.length === 0 || teamIds.indexOf(item.contract__team_id) !== -1) &&
                        (item.confirm === confirmState || confirmState === 3) &&
                        item.day >= start &&
                        item.day <= end
                )
            )
            .map(result => uniqBy(result, item => item.id)); // because of team id condition, so need to uniq result here.
    }

    getAttendanceCount(): Observable<number> {
        return this.getAttendanceResultResponse().map(res => res.count);
    }

    getWrappedAttendanceCount(): Observable<number> {
        return this.getAttendanceCount().combineLatest(
            this.getConfirmedAttendance().map(ids => ids.length),
            this.getSelectedAttendanceState(),
            (count, confirmedCount, state) => state === AttendanceState.unconfirmed || state === AttendanceState.allTypes ? count - confirmedCount : count
        );
    }

    getAttendanceModifyRecordLists(): Observable<AttendanceModify[]> {
        return this.store.select(selectAttendanceModifyRecordListResponse)
            .filter(value => !!value)
            .map(res => res.attend_amends);
    }

    getAttendanceStatistics(): Observable<AttendanceStatistics[]> {
        return this.store.select(selectAttendanceStatistics);
    }

    getSelectedAttendanceState(): Observable<number> {
        return this.store.select(selectSelectedAttendanceState);
    }

    haveMoreData(): Observable<boolean> {
        return this.getAttendanceCount()
            .combineLatest(
            this.store.select(selectAttendanceLimit),
            this.store.select(selectAttendancePage),
            (count, limit, page) => limit * page < count
            );
    }

    getSortType(): Observable<number> {
        return this.store.select(selectAttendanceSortType);
    }

    getOrderType(): Observable<string> {
        return this.store.select(selectAttendanceOrderType);
    }

    getConfirmedAttendance(): Observable<number[]> {
        return this.store
            .select(selectAttendanceResultConfirmResponse)
            .filter(value => !!value && !value.errorMessage)
            .mergeMapTo(
            this.store.select(selectAttendanceConfirmOptions)
                .filter(value => !!value)
                .map(options => options.attendance_result_id)
            )
            .startWith([]);
    }

    getAttendancesToModify(): Observable<AttendanceResult[]> {
        return this.store.select(selectAttendancesToModify).filter(value => !!value);
    }

    /* =========================================================API request operation================================================= */

    getAttendances(option: Observable<RequestOption> = Observable.empty()): Subscription {
        return this.processor.attendanceListProcessor(
            option.combineLatest(
                this.userInfo.getSid(),
                this.store.select(selectAttendancePage),
                this.store.select(selectAttendanceLimit),
                (option, sid, page, limit) => ({ ...option, sid, page, limit })
            )
        );
    }

    getAttendanceStatisticsByTeam(): Subscription {
        return this.processor.attendanceResultTeamStatListProcessor(
            this.teamService.getOwnTeams()
                .filter(teams => !!teams.length)
                .map(teams => teams.map(team => team.id))
                .withLatestFrom(this.userInfo.getSid(), (team_ids, sid) => ({ team_ids, sid }))
        );
    }

    getAttendanceModifyRecord(option: Observable<RequestOption>): Subscription {
        return this.processor.attendanceModifyRecordListProcessor(
            option.withLatestFrom(
                this.userInfo.getSid(),
                (option, sid) => ({ ...option, sid })
            ) as Observable<AttendanceModifyRecordListOptions>
        );
    }

    confirmAttendance(attendance: Observable<AttendanceResult[]>): Subscription {
        return this.processor.attendanceResultConfirmProcessor(
            attendance.map(attendances => attendances.map(item => item.id))
                .withLatestFrom(
                this.userInfo.getSid(),
                (attendance_result_id, sid) => ({ attendance_result_id, sid })
                )
        );
    }

    getNextPage(notification: Observable<InfiniteScroll>): Subscription[] {
        return [
            notification.subscribe(_ => this.store.dispatch(new IncreaseAttendancePageAction())),

            this.getAttendanceResultResponse()
                .skip(1)
                .withLatestFrom(notification, (_, infiniteScroll) => infiniteScroll)
                .subscribe(infiniteScroll => infiniteScroll.complete()),
        ];
    }

    /* =========================================================Local state operation================================================= */

    getSelectedDate(): Observable<DatePeriod> {
        return this.store.select(selectAttendanceDatePeriod);
    }

    setDate(type: string, data: string): void {
        if (type === 'start') {
            this.store.dispatch(new SetAttendanceStartDateAction(data));
        } else {
            this.store.dispatch(new SetAttendanceEndDateAction(data));
        }
    }

    switchSortType(num: number): void {
        this.store.dispatch(new ToggleAttendanceSortTypeAction(num));
    }

    switchOrderType(order: string): void {
        this.store.dispatch(new ToggleOrderTypeAction(order));
    }

    setSelectedAttendanceState(state: number): void {
        this.store.dispatch(new SetQueryAttendanceStateAction(state));
    }

    resetPage(): void {
        this.store.dispatch(new ResetAttendancePageAction());
    }

    resetAttendance(): void {
        this.store.dispatch(new ResetAttendanceDataAction());
    }

    resetAttendancesToModify(): void {
        this.store.dispatch(new ResetAttendancesToModifyAction());
    }

    addAttendancesToModify(attendances: AttendanceResult[]): void {
        this.store.dispatch(new AddAttendancesToModifyAction(attendances));
    }

    removeAttendanceFromReadyToModify(id: number): void {
        this.store.dispatch(new RemoveAttendanceFromReadyToModify(id));
    }

    /* =========================================================Attendance modify operation================================================= */

    showActionSheet(attendances: AttendanceResult[], applyModifyFn): Subscription {
        return this.translate
            .get(['ATTENDANCE_CONFIRM', 'ATTENDANCE_APPLY_FOR_MODIFY', 'CANCEL_BUTTON'])
            .subscribe(value => this.createActionSheet(value, attendances, applyModifyFn));
    }

    private createActionSheet(buttonText: { [key: string]: string }, attendances: AttendanceResult[], applyModifyFn) {
        const actionSheet = this.actionSheet.create({
            buttons: [
                {
                    text: buttonText.ATTENDANCE_CONFIRM,
                    handler: () => {
                        const subscription = this.confirmAttendance(Observable.of(attendances));

                        actionSheet.dismiss(subscription);

                        return false;
                    },
                },
                {
                    text: buttonText.ATTENDANCE_APPLY_FOR_MODIFY,
                    handler: () => {
                        this.addAttendancesToModify(attendances);

                        applyModifyFn();

                        actionSheet.dismiss();

                        return false;
                    },
                },
                {
                    text: buttonText.CANCEL_BUTTON,
                    role: 'cancel',
                    handler: () => { },
                },
            ],
        });

        actionSheet.present().then(() => { });

        actionSheet.onDidDismiss((subscription: Subscription) => subscription && subscription.unsubscribe());
    }

    /* ================================================================Error handle================================================= */

    handleAttendanceError(): Subscription {
        return this.error.handleApiRequestError(this.getAttendanceResultResponse());
    }

    handleStatisticsError(): Subscription {
        return this.error.handleApiRequestError(this.store.select(selectAttendanceStatisticsResponse));
    }

    handleAttendanceModifyError(): Subscription {
        return this.error.handleApiRequestError(this.store.select(selectAttendanceModifyRecordListResponse));
    }

    handleAttendanceConfirmError(): Subscription {
        return this.error.handleApiRequestError(this.store.select(selectAttendanceResultConfirmResponse));
    }
}
