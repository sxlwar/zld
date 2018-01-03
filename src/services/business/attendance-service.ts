import { RecordOptionService } from './record-option-service';
import { AttendanceModifyRecordListOptions } from './../../interfaces/request-interface';
import { AttendanceStatistics, AttendanceModify, AttendanceResultListResponse } from './../../interfaces/response-interface';
import { selectAttendanceStatisticsResponse, selectAttendanceStatistics, selectAttendanceModifyRecordListResponse } from './../../reducers/index-reducer';
import { TeamService } from './team-service';
import { Injectable } from '@angular/core';
import { AppState, selectAttendanceDatePeriod, selectAttendanceLimit, selectAttendancePage, selectAttendanceResponse, selectAttendanceAllSelected } from '../../reducers/index-reducer';
import { Store } from '@ngrx/store';
import { ProcessorService } from '../api/processor-service';
import { ErrorService } from '../errors/error-service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { AttendanceResult } from '../../interfaces/response-interface';
import { RequestOption } from '../../interfaces/request-interface';
import 'rxjs/add/observable/empty'
import { DatePeriod } from '../../reducers/reducer/attendance-reducer';
import { SetAttendanceEndDateAction, SetAttendanceStartDateAction, AddSelectedAttendanceAction, RemoveSelectedAttendanceAction, ToggleAllSelectedAction, IncreaseAttendancePageAction, ResetAttendancePageAction, SortAttendanceAction, ToggleAttendanceSortTypeAction } from '../../actions/action/attendance-action';
import { UserService } from '..//business/user-service';
import { TranslateService } from '@ngx-translate/core';
import { ActionSheetController } from 'ionic-angular/components/action-sheet/action-sheet-controller';

@Injectable()
export class AttendanceService extends RecordOptionService {

  constructor(
    public store: Store<AppState>,
    public processor: ProcessorService,
    public userInfo: UserService,
    public error: ErrorService,
    public translate: TranslateService,
    public actionSheet: ActionSheetController,
    public teamService: TeamService
  ) {
    super();
  }

  /* =========================================================Attendance data========================================================== */

  getAttendanceResult(): Observable<AttendanceResult[]> {
    return this.getAttendanceResultList();
  }

  getAttendanceResultResponse(): Observable<AttendanceResultListResponse> {
    return this.store.select(selectAttendanceResponse).filter(value => !!value);
  }

  getAttendanceResultList(): Observable<AttendanceResult[]> {
    return this.getAttendanceResultResponse().map(res => res.attendance_results);
  }

  getAttendanceCount(): Observable<number> {
    return this.getAttendanceResultResponse().map(res => res.count);
  }

  getAttendances(option: Observable<RequestOption> = Observable.empty()): Subscription {
    return this.processor.attendanceListProcessor(option.combineLatest(
      this.userInfo.getSid(),
      this.store.select(selectAttendancePage),
      this.store.select(selectAttendanceLimit),
      (option, sid, page, limit) => ({ ...option, sid, page, limit })
    ));
  }

  getAttendanceModifyRecordLists(): Observable<AttendanceModify[]> {
    return this.store.select(selectAttendanceModifyRecordListResponse)
      .filter(value => !!value)
      .map(res => res.attend_amends)
  }

  increasePage(): void {
    this.store.dispatch(new IncreaseAttendancePageAction());
  }

  resetPage(): void {
    this.store.dispatch(new ResetAttendancePageAction());
  }

  getAttendanceStatisticsByTeam(): Subscription {
    const sid = this.userInfo.getSid();

    const teamIds = this.teamService.getOwnTeams()
      .filter(teams => !!teams.length)
      .map(teams => teams.map(team => team.id));

    const option = sid.zip(teamIds, (sid, team_ids) => ({ sid, team_ids }));

    return this.processor.attendanceResultTeamStatListProcessor(option);
  }

  getAttendanceStatistics(): Observable<AttendanceStatistics[]> {
    return this.store.select(selectAttendanceStatistics);
  }

  getAttendanceModifyRecord(option: Observable<RequestOption>): Subscription {
    return this.processor.attendanceModifyRecordListProcessor(option.withLatestFrom(this.userInfo.getSid(), (option, sid) => ({ ...option, sid })) as Observable<AttendanceModifyRecordListOptions>);
  }

  /* =========================================================Attendance date operation================================================= */

  getSelectedDate(): Observable<DatePeriod> {
    return this.store.select(selectAttendanceDatePeriod);
  }

  setDate(type: string, data: string): void {
    if (type === 'start') {
      this.store.dispatch(new SetAttendanceStartDateAction(data));
    }
    this.store.dispatch(new SetAttendanceEndDateAction(data));
  }

  /* =========================================================Attendance select operation================================================= */

  toggleSelected(att: AttendanceResult) {
    if (att.selected) {
      this.store.dispatch(new AddSelectedAttendanceAction(att.id));
    } else {
      this.store.dispatch(new RemoveSelectedAttendanceAction(att.id));
    }
  }

  getAllSelectedState(): Observable<boolean> {
    return this.store.select(selectAttendanceAllSelected);
  }

  toggleAllSelected(isSelected: boolean) {
    this.store.dispatch(new ToggleAllSelectedAction(isSelected));
  }

  /* =========================================================Attendance sort operation================================================= */

  sortBy(type: string): void {
    this.store.dispatch(new SortAttendanceAction(type));
  }

  switchSortType(num: number): void {
    this.store.dispatch(new ToggleAttendanceSortTypeAction(num));
  }

  /* =========================================================Attendance modify operation================================================= */

  showActionSheet(): Subscription {
    return this.translate.get(['ATTENDANCE_CONFIRM', 'ATTENDANCE_APPLY_FOR_MODIFY', 'CANCEL_BUTTON'])
      .subscribe(value => this.createActionSheet(value));
  }

  private createActionSheet(buttonText: { [key: string]: string }) {
    const actionSheet = this.actionSheet.create({
      buttons: [
        {
          text: buttonText.ATTENDANCE_CONFIRM,
          handler: () => {
            console.log('navigation to confirm option');
          }
        },
        {
          text: buttonText.ATTENDANCE_APPLY_FOR_MODIFY,
          handler: () => {
            console.log('navigation to apply modifyt option');
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
  }

  /* ==========================================================Error handle and refuse clean=============================================== */

  monitorPage(): Subscription {
    return this.store.select(selectAttendancePage)
      .combineLatest(
      this.getAttendanceCount(),
      this.store.select(selectAttendanceLimit)
      )
      .subscribe(value => {
        const [page, count, limit] = value;

        if (page * limit >= count) this.store.dispatch(new ResetAttendancePageAction());
      });
  }

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
