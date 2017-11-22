import { AttendanceStatistics } from './../../interfaces/response-interface';
import { selectAttendanceStatisticsResponse, selectAttendanceStatistics } from './../../reducers/index-reducer';
//region
import { TeamService } from './team-service';
import { Injectable } from '@angular/core';
import {
  AppState,
  selectAttendanceDatePeriod,
  selectAttendanceLimit,
  selectAttendancePage,
  selectAttendanceResponse,
  selectAttendanceAllSelected,
  selectAttendanceData,
  selectIcon,
  selectAttendanceCount
} from '../../reducers/index-reducer';
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
//endregion

@Injectable()
export class AttendanceService {
  subscriptions: Subscription[] = [];

  constructor(public store: Store<AppState>,
    public processor: ProcessorService,
    public userInfo: UserService,
    public error: ErrorService,
    public translate: TranslateService,
    public actionSheet: ActionSheetController,
    public teamService: TeamService
  ) {
    this.handleError();
    this.monitorPage();
  }

  /* =========================================================Attendance data========================================================== */

  /**
   * @description  Data returned from this method contains cached.
   * */
  getAttendanceData(option: Observable<RequestOption>): Observable<AttendanceResult[]> {
    this.getAttendances(option);

    return this.store.select(selectAttendanceData);
  }

  /**
   * @description Data returned from this method does not contain cached data.
   */
  getAttendanceResult(option: Observable<RequestOption>): Observable<AttendanceResult[]> {
    this.getAttendances(option);

    return this.getAttendanceResultList();
  }

  getAttendanceResultList(): Observable<AttendanceResult[]> {
    return this.store.select(selectAttendanceResponse).map(res => res.attendance_results);
  }

  getAttendances(option: Observable<RequestOption> = Observable.empty()): void {
    const sid = this.userInfo.getSid();

    const page = this.store.select(selectAttendancePage);

    const limit = this.store.select(selectAttendanceLimit);

    const params = sid.zip(
      page,
      limit,
      option,
      (sid, limit, page, option) => ({ sid, page, limit, ...option })
    );

    const subscription = this.processor.attendanceListProcessor(params);

    this.subscriptions.push(subscription);
  }

  getOperatePermission(iconName: string, rootName?: string): Observable<boolean> {
    const params = rootName ? [rootName, iconName] : iconName;

    return this.store.select(selectIcon(params)).map(icon => icon.permission.opt);
  }

  increasePage(): void {
    this.store.dispatch(new IncreaseAttendancePageAction());
  }

  resetPage(): void {
    this.store.dispatch(new ResetAttendancePageAction());
  }

  getAttendanceStatisticsByTeam():void {
    const sid = this.userInfo.getSid();

    const teamIds = this.teamService.getOwnTeams()
      .filter(teams => !!teams.length)
      .map(teams => teams.map(team => team.id));

    const option = sid.zip(teamIds, (sid, team_ids) => ({sid, team_ids}));

    const subscription = this.processor.attendanceResultTeamStatListProcessor(option);
    
    this.subscriptions.push(subscription); 
  }

  getAttendanceStatistics(): Observable<AttendanceStatistics[]> {
    const result = this.store.select(selectAttendanceStatistics);

    const subscription = result.subscribe(value => !value.length && this.getAttendanceStatisticsByTeam());

    this.subscriptions.push(subscription);

    return result; 
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

  showActionSheet() {
    const subscription = this.translate.get(['ATTENDANCE_CONFIRM', 'ATTENDANCE_APPLY_FOR_MODIFY', 'CANCEL_BUTTON'])
      .subscribe(value => this.createActionSheet(value));

    this.subscriptions.push(subscription);
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

  /* ==========================================================error handle and refuse clean=============================================== */

  private monitorPage() {

    const subscription = this.store.select(selectAttendancePage)
      .combineLatest(
      this.store.select(selectAttendanceCount),
      this.store.select(selectAttendanceLimit)
      )
      .subscribe(value => {
        const [page, count, limit] = value;

        if (page * limit >= count) this.store.dispatch(new ResetAttendancePageAction());
      });

      this.subscriptions.push(subscription);
  }

  private handleError() {
    this.handleAttendanceError();
    this.handleStatisticesError();
  }

  private handleAttendanceError() {
    const error = this.store.select(selectAttendanceResponse);

    const subscription = this.error.handleErrorInSpecific(error, 'API_ERROR');

    this.subscriptions.push(subscription);

  }

  private handleStatisticesError() {
    const error = this.store.select(selectAttendanceStatisticsResponse);

    const subscription = this.error.handleErrorInSpecific(error, 'API_ERROR');

    this.subscriptions.push(subscription);
  }

  unSubscribe() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }
}
