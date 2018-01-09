import { uniqBy, orderBy } from 'lodash';
import { TimeService } from './../utils/time-service';
import { AttendanceSortType, AttendanceState } from './../../interfaces/attendance-interface';
import { RecordOptionService } from './record-option-service';
import { AttendanceModifyRecordListOptions } from './../../interfaces/request-interface';
import { AttendanceStatistics, AttendanceModify, AttendanceResultListResponse } from './../../interfaces/response-interface';
import { selectAttendanceStatisticsResponse, selectAttendanceStatistics, selectAttendanceModifyRecordListResponse, selectSelectedAttendanceState, selectAttendanceSortType, selectAttendanceOrderType, selectAttendanceResultConfirmResponse, selectAttendanceConfirmOptions } from './../../reducers/index-reducer';
import { TeamService } from './team-service';
import { Injectable } from '@angular/core';
import { AppState, selectAttendanceDatePeriod, selectAttendanceLimit, selectAttendancePage, selectAttendanceResponse } from '../../reducers/index-reducer';
import { Store } from '@ngrx/store';
import { ProcessorService } from '../api/processor-service';
import { ErrorService } from '../errors/error-service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { AttendanceResult } from '../../interfaces/response-interface';
import { RequestOption } from '../../interfaces/request-interface';
import 'rxjs/add/observable/empty'
import { DatePeriod } from '../../reducers/reducer/attendance-reducer';
import { SetAttendanceEndDateAction, SetAttendanceStartDateAction, IncreaseAttendancePageAction, ResetAttendancePageAction, ToggleAttendanceSortTypeAction, SetQueryAttendanceStateAction, ToggleOrderTypeAction, ResetAttendanceDataAction } from '../../actions/action/attendance-action';
import { UserService } from '..//business/user-service';
import { TranslateService } from '@ngx-translate/core';
import { ActionSheetController } from 'ionic-angular/components/action-sheet/action-sheet-controller';
import { putInArray } from '../utils/util';

@Injectable()
export class AttendanceService extends RecordOptionService {

  constructor(
    public store: Store<AppState>,
    public processor: ProcessorService,
    public userInfo: UserService,
    public error: ErrorService,
    public translate: TranslateService,
    public actionSheet: ActionSheetController,
    public teamService: TeamService,
    public timeService: TimeService
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
      .mergeMap(source => this.getConfirmedAttendance().map(ids => source.map(item => ids.indexOf(item.id) === -1 ? item : { ...item, confirm: 1 })))
      .combineLatest(
      this.getSortType().map(type => AttendanceSortType[type]).distinctUntilChanged(),
      this.getOrderType().distinctUntilChanged(),
      this.getSelectedDate().map(date => ({ start: this.timeService.getDate(date.start, true), end: this.timeService.getDate(date.end, true) })),
      this.teamService.getSelectedTeams(),
      this.getSelectedAttendanceState(),
      (list: AttendanceResult[], type: string, order: string, { start, end }, teamIds: number[], confirmState: number) => orderBy(list, [type], [order]).filter(item => (teamIds.length === 0 || teamIds.indexOf(item.contract__team_id) !== -1) && (item.confirm === confirmState || confirmState === 3) && item.day >= start && item.day <= end)
      )
      .map(result => uniqBy(result, item => item.id)) // because of team id condition, so need to uniq result here.
  }

  getAttendanceCount(): Observable<number> {
    return this.getAttendanceResultResponse().map(res => res.count);
  }

  getWrappedAttendanceCount(): Observable<number> {
    return this.getAttendanceCount()
      .combineLatest(
      this.getConfirmedAttendance().map(ids => ids.length),
      this.getSelectedAttendanceState(),
      (count, confirmedCount, state) => state === AttendanceState.unconfirmed || state === AttendanceState.allTypes ? count - confirmedCount : count
      );
  }

  getAttendanceModifyRecordLists(): Observable<AttendanceModify[]> {
    return this.store.select(selectAttendanceModifyRecordListResponse)
      .filter(value => !!value)
      .map(res => res.attend_amends)
  }

  getAttendanceStatistics(): Observable<AttendanceStatistics[]> {
    return this.store.select(selectAttendanceStatistics);
  }

  getSelectedAttendanceState(): Observable<number> {
    return this.store.select(selectSelectedAttendanceState);
  }

  getAttendanceResultMoreData(): Observable<boolean> {
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
    return this.store.select(selectAttendanceResultConfirmResponse)
      .filter(value => !!value && !value.errorMessage)
      .mergeMapTo(this.store.select(selectAttendanceConfirmOptions).filter(value => !!value).map(options => options.attendance_result_id))
      .startWith([]);
  }

  /* =========================================================API request operation================================================= */

  getAttendances(option: Observable<RequestOption> = Observable.empty()): Subscription {
    return this.processor.attendanceListProcessor(option.combineLatest(
      this.userInfo.getSid(),
      this.store.select(selectAttendancePage),
      this.store.select(selectAttendanceLimit),
      (option, sid, page, limit) => ({ ...option, sid, page, limit })
    ));
  }

  getAttendanceStatisticsByTeam(): Subscription {
    const sid = this.userInfo.getSid();

    const teamIds = this.teamService.getOwnTeams()
      .filter(teams => !!teams.length)
      .map(teams => teams.map(team => team.id));

    const option = sid.zip(teamIds, (sid, team_ids) => ({ sid, team_ids }));

    return this.processor.attendanceResultTeamStatListProcessor(option);
  }

  getAttendanceModifyRecord(option: Observable<RequestOption>): Subscription {
    return this.processor.attendanceModifyRecordListProcessor(option.withLatestFrom(this.userInfo.getSid(), (option, sid) => ({ ...option, sid })) as Observable<AttendanceModifyRecordListOptions>);
  }

  /* =========================================================Local state operation================================================= */

  getSelectedDate(): Observable<DatePeriod> {
    return this.store.select(selectAttendanceDatePeriod);
  }

  setDate(type: string, data: string): void {
    if (type === 'start') {
      this.store.dispatch(new SetAttendanceStartDateAction(data));
    }
    this.store.dispatch(new SetAttendanceEndDateAction(data));
  }

  switchSortType(num: number): void {
    this.store.dispatch(new ToggleAttendanceSortTypeAction(num));
  }

  switchOrderType(order: string): void {
    this.store.dispatch(new ToggleOrderTypeAction(order))
  }

  setSelectedAttendanceState(state: number): void {
    this.store.dispatch(new SetQueryAttendanceStateAction(state));
  }

  increasePage(): void {
    this.store.dispatch(new IncreaseAttendancePageAction());
  }

  resetPage(): void {
    this.store.dispatch(new ResetAttendancePageAction());
  }

  resetAttendance(): void {
    this.store.dispatch(new ResetAttendanceDataAction());
  }

  /* =========================================================Attendance modify operation================================================= */

  showActionSheet(attendances: AttendanceResult[]): Subscription {
    console.log(attendances);
    return this.translate.get(['ATTENDANCE_CONFIRM', 'ATTENDANCE_APPLY_FOR_MODIFY', 'CANCEL_BUTTON'])
      .subscribe(value => this.createActionSheet(value, attendances));
  }

  private createActionSheet(buttonText: { [key: string]: string }, attendances: AttendanceResult[]) {
    const actionSheet = this.actionSheet.create({
      buttons: [
        {
          text: buttonText.ATTENDANCE_CONFIRM,
          handler: () => {
            const subscription = this.processor.attendanceResultConfirmProcessor(this.userInfo.getSid().zip(Observable.from(attendances).map(item => item.id).reduce(putInArray, []), (sid, attendance_result_id) => ({ sid, attendance_result_id })));

            actionSheet.dismiss(subscription);

            return false;
          }
        },
        {
          text: buttonText.ATTENDANCE_APPLY_FOR_MODIFY,
          handler: () => {
            console.log('navigation to apply modifyt option');

            actionSheet.dismiss('modify');

            return false;
          }
        },
        {
          text: buttonText.CANCEL_BUTTON,
          role: 'cancel',
          handler: () => {
          }
        }]
    });

    actionSheet.present().then(() => { });

    actionSheet.onDidDismiss((subscription: Subscription) => subscription && subscription.unsubscribe());
  }

  /* ================================================================Error handle================================================= */

  handleAttendanceError(): Subscription {
    return this.error.handleErrorInSpecific(this.getAttendanceResultResponse(), 'API_ERROR');
  }

  handleStatisticsError(): Subscription {
    return this.error.handleErrorInSpecific(this.store.select(selectAttendanceStatisticsResponse), 'API_ERROR');
  }

  handleAttendanceModifyError(): Subscription {
    return this.error.handleErrorInSpecific(this.store.select(selectAttendanceModifyRecordListResponse), 'API_ERROR');
  }
}
